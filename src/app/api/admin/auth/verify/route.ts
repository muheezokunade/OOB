import { NextRequest, NextResponse } from 'next/server'
import { AuthService, getTokenFromRequest } from '@/lib/auth'

// GET /api/admin/auth/verify - Verify admin session
export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request)
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No token provided' },
        { status: 401 }
      )
    }

    // Validate session
    const admin = await AuthService.validateSession(token)
    
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        admin: {
          id: admin.id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role,
          permissions: admin.permissions
        }
      }
    })
  } catch (error) {
    console.error('Admin verification error:', error)
    return NextResponse.json(
      { success: false, error: 'Verification failed' },
      { status: 500 }
    )
  }
}




