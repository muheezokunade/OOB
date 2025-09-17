import { NextRequest, NextResponse } from 'next/server'
import { AuthService, getTokenFromRequest } from '@/lib/auth'

// POST /api/admin/auth/logout - Admin logout
export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request)
    
    if (token) {
      // Invalidate session
      await AuthService.invalidateSession(token)
    }

    return NextResponse.json({
      success: true,
      message: 'Logout successful'
    })
  } catch (error) {
    console.error('Admin logout error:', error)
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    )
  }
}





