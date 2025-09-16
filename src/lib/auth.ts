import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { db } from './db'

export interface AdminUser {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  permissions: string[]
  isActive: boolean
}

export interface AuthToken {
  adminId: string
  email: string
  role: string
  permissions: string[]
}

// Admin roles and permissions
export const ADMIN_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager'
} as const

export const ADMIN_PERMISSIONS = {
  // Product permissions
  PRODUCTS_VIEW: 'products:view',
  PRODUCTS_CREATE: 'products:create',
  PRODUCTS_UPDATE: 'products:update',
  PRODUCTS_DELETE: 'products:delete',
  
  // Order permissions
  ORDERS_VIEW: 'orders:view',
  ORDERS_UPDATE: 'orders:update',
  ORDERS_DELETE: 'orders:delete',
  
  // Customer permissions
  CUSTOMERS_VIEW: 'customers:view',
  CUSTOMERS_UPDATE: 'customers:update',
  CUSTOMERS_DELETE: 'customers:delete',
  
  // Content permissions
  CONTENT_VIEW: 'content:view',
  CONTENT_CREATE: 'content:create',
  CONTENT_UPDATE: 'content:update',
  CONTENT_DELETE: 'content:delete',
  
  // Analytics permissions
  ANALYTICS_VIEW: 'analytics:view',
  REPORTS_VIEW: 'reports:view',
  
  // System permissions
  SETTINGS_VIEW: 'settings:view',
  SETTINGS_UPDATE: 'settings:update',
  ADMINS_VIEW: 'admins:view',
  ADMINS_CREATE: 'admins:create',
  ADMINS_UPDATE: 'admins:update',
  ADMINS_DELETE: 'admins:delete'
} as const

// Role-based permissions mapping
export const ROLE_PERMISSIONS = {
  [ADMIN_ROLES.SUPER_ADMIN]: Object.values(ADMIN_PERMISSIONS),
  [ADMIN_ROLES.ADMIN]: [
    ADMIN_PERMISSIONS.PRODUCTS_VIEW,
    ADMIN_PERMISSIONS.PRODUCTS_CREATE,
    ADMIN_PERMISSIONS.PRODUCTS_UPDATE,
    ADMIN_PERMISSIONS.PRODUCTS_DELETE,
    ADMIN_PERMISSIONS.ORDERS_VIEW,
    ADMIN_PERMISSIONS.ORDERS_UPDATE,
    ADMIN_PERMISSIONS.CUSTOMERS_VIEW,
    ADMIN_PERMISSIONS.CUSTOMERS_UPDATE,
    ADMIN_PERMISSIONS.CONTENT_VIEW,
    ADMIN_PERMISSIONS.CONTENT_CREATE,
    ADMIN_PERMISSIONS.CONTENT_UPDATE,
    ADMIN_PERMISSIONS.CONTENT_DELETE,
    ADMIN_PERMISSIONS.ANALYTICS_VIEW,
    ADMIN_PERMISSIONS.REPORTS_VIEW,
    ADMIN_PERMISSIONS.SETTINGS_VIEW
  ],
  [ADMIN_ROLES.MANAGER]: [
    ADMIN_PERMISSIONS.PRODUCTS_VIEW,
    ADMIN_PERMISSIONS.PRODUCTS_CREATE,
    ADMIN_PERMISSIONS.PRODUCTS_UPDATE,
    ADMIN_PERMISSIONS.ORDERS_VIEW,
    ADMIN_PERMISSIONS.ORDERS_UPDATE,
    ADMIN_PERMISSIONS.CUSTOMERS_VIEW,
    ADMIN_PERMISSIONS.CONTENT_VIEW,
    ADMIN_PERMISSIONS.CONTENT_CREATE,
    ADMIN_PERMISSIONS.CONTENT_UPDATE,
    ADMIN_PERMISSIONS.ANALYTICS_VIEW
  ]
} as const

export class AuthService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'omo-oni-bag-super-secret-jwt-key-2024'
  private static readonly JWT_EXPIRES_IN = '7d'
  private static readonly SESSION_EXPIRES_IN = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

  // Hash password
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12
    return bcrypt.hash(password, saltRounds)
  }

  // Verify password
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  // Generate JWT token
  static generateToken(payload: AuthToken): string {
    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN
    })
  }

  // Verify JWT token
  static verifyToken(token: string): AuthToken | null {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as AuthToken
      return decoded
    } catch (error) {
      return null
    }
  }

  // Create admin session
  static async createSession(adminId: string, token: string): Promise<void> {
    const expiresAt = new Date(Date.now() + this.SESSION_EXPIRES_IN)
    
    await db.adminSession.create({
      data: {
        adminId,
        token,
        expiresAt
      }
    })
  }

  // Validate session
  static async validateSession(token: string): Promise<AdminUser | null> {
    try {
      // Verify JWT token
      const decoded = this.verifyToken(token)
      if (!decoded) return null

      // Check if session exists and is active
      const session = await db.adminSession.findFirst({
        where: {
          token,
          isActive: true,
          expiresAt: {
            gt: new Date()
          }
        },
        include: {
          admin: true
        }
      })

      if (!session || !session.admin.isActive) {
        return null
      }

      return {
        id: session.admin.id,
        email: session.admin.email,
        firstName: session.admin.firstName,
        lastName: session.admin.lastName,
        role: session.admin.role,
        permissions: session.admin.permissions,
        isActive: session.admin.isActive
      }
    } catch (error) {
      console.error('Session validation error:', error)
      return null
    }
  }

  // Invalidate session
  static async invalidateSession(token: string): Promise<void> {
    await db.adminSession.updateMany({
      where: { token },
      data: { isActive: false }
    })
  }

  // Invalidate all sessions for admin
  static async invalidateAllSessions(adminId: string): Promise<void> {
    await db.adminSession.updateMany({
      where: { adminId },
      data: { isActive: false }
    })
  }

  // Check if admin has permission
  static hasPermission(admin: AdminUser, permission: string): boolean {
    // Super admin has all permissions
    if (admin.role === ADMIN_ROLES.SUPER_ADMIN) {
      return true
    }

    // Check if admin has the specific permission
    return admin.permissions.includes(permission)
  }

  // Check if admin has any of the permissions
  static hasAnyPermission(admin: AdminUser, permissions: string[]): boolean {
    return permissions.some(permission => this.hasPermission(admin, permission))
  }

  // Check if admin has all permissions
  static hasAllPermissions(admin: AdminUser, permissions: string[]): boolean {
    return permissions.every(permission => this.hasPermission(admin, permission))
  }

  // Get admin by email
  static async getAdminByEmail(email: string): Promise<AdminUser | null> {
    try {
      const admin = await db.admin.findUnique({
        where: { email, isActive: true }
      })

      if (!admin) return null

      return {
        id: admin.id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        role: admin.role,
        permissions: admin.permissions,
        isActive: admin.isActive
      }
    } catch (error) {
      console.error('Error getting admin by email:', error)
      return null
    }
  }

  // Update last login
  static async updateLastLogin(adminId: string): Promise<void> {
    await db.admin.update({
      where: { id: adminId },
      data: { lastLogin: new Date() }
    })
  }

  // Clean expired sessions
  static async cleanExpiredSessions(): Promise<void> {
    await db.adminSession.deleteMany({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    })
  }
}

// Middleware for protecting admin routes
export function requireAuth(requiredPermissions?: string[]) {
  return async (req: Request): Promise<AdminUser | null> => {
    try {
      // Get token from Authorization header
      const authHeader = req.headers.get('authorization')
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null
      }

      const token = authHeader.substring(7)
      
      // Validate session
      const admin = await AuthService.validateSession(token)
      if (!admin) {
        return null
      }

      // Check permissions if required
      if (requiredPermissions && requiredPermissions.length > 0) {
        if (!AuthService.hasAnyPermission(admin, requiredPermissions)) {
          return null
        }
      }

      return admin
    } catch (error) {
      console.error('Auth middleware error:', error)
      return null
    }
  }
}

// Helper function to extract token from request
export function getTokenFromRequest(req: Request): string | null {
  const authHeader = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}




