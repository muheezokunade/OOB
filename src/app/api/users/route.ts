import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Mock users data - in a real app, this would come from a database
const users: any[] = []

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// POST /api/users/register - Register new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName, phone } = body

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone: phone || '',
      addresses: [],
      preferences: {
        newsletter: false,
        notifications: true,
        language: 'en'
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    users.push(newUser)

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token
      },
      message: 'User registered successfully'
    })
  } catch (error) {
    console.error('Error registering user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to register user' },
      { status: 500 }
    )
  }
}

// GET /api/users - Get user profile (authenticated)
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any
      const user = users.find(u => u.id === decoded.userId)
      
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'User not found' },
          { status: 404 }
        )
      }

      // Remove password from response
      const { password: _, ...userWithoutPassword } = user

      return NextResponse.json({
        success: true,
        data: userWithoutPassword
      })
    } catch (jwtError) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}





