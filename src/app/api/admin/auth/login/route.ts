import { NextRequest, NextResponse } from 'next/server'
import { AuthService, ADMIN_ROLES, ROLE_PERMISSIONS } from '@/lib/auth'
import { db } from '@/lib/db'

// POST /api/admin/auth/login - Admin login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Get admin from database
    const admin = await AuthService.getAdminByEmail(email)
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Get full admin record for password verification
    const fullAdmin = await db.admin.findUnique({
      where: { email }
    })

    if (!fullAdmin) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await AuthService.verifyPassword(password, fullAdmin.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Check if admin is active
    if (!admin.isActive) {
      return NextResponse.json(
        { success: false, error: 'Account is deactivated' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const tokenPayload = {
      adminId: admin.id,
      email: admin.email,
      role: admin.role,
      permissions: admin.permissions
    }

    const token = AuthService.generateToken(tokenPayload)

    // Create session
    await AuthService.createSession(admin.id, token)

    // Update last login
    await AuthService.updateLastLogin(admin.id)

    // Return success response and set httpOnly cookie for SSR convenience
    const res = NextResponse.json({
      success: true,
      data: {
        token,
        admin: {
          id: admin.id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role,
          permissions: admin.permissions
        }
      },
      message: 'Login successful'
    })

    // Cookie for 7 days
    res.cookies.set('admin_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7
    })

    return res
  } catch (error) {
    console.error('Admin login error:', error)
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 }
    )
  }
}
