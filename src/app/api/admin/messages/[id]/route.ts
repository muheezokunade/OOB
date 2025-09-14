import { NextRequest, NextResponse } from 'next/server'
import { AuthService, requireAuth, ADMIN_PERMISSIONS } from '@/lib/auth'
import { db } from '@/lib/db'

// GET /api/admin/messages/[id] - Get single contact message
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication and permissions
    const admin = await requireAuth([ADMIN_PERMISSIONS.CUSTOMERS_VIEW])(request)
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

    const message = await db.contactMessage.findUnique({
      where: { id }
    })

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      )
    }

    // Mark as read if not already read
    if (!message.isRead) {
      await db.contactMessage.update({
        where: { id },
        data: { isRead: true }
      })
    }

    return NextResponse.json({
      success: true,
      data: message
    })
  } catch (error) {
    console.error('Error fetching message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch message' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/messages/[id] - Update message status
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication and permissions
    const admin = await requireAuth([ADMIN_PERMISSIONS.CUSTOMERS_UPDATE])(request)
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()

    // Check if message exists
    const existingMessage = await db.contactMessage.findUnique({
      where: { id }
    })

    if (!existingMessage) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      )
    }

    // Update message
    const message = await db.contactMessage.update({
      where: { id },
      data: {
        status: body.status,
        priority: body.priority,
        isRead: body.isRead,
        repliedAt: body.status === 'replied' ? new Date() : existingMessage.repliedAt
      }
    })

    return NextResponse.json({
      success: true,
      data: message,
      message: 'Message updated successfully'
    })
  } catch (error) {
    console.error('Error updating message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update message' },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/messages/[id] - Delete message
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication and permissions
    const admin = await requireAuth([ADMIN_PERMISSIONS.CUSTOMERS_DELETE])(request)
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

    // Check if message exists
    const existingMessage = await db.contactMessage.findUnique({
      where: { id }
    })

    if (!existingMessage) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      )
    }

    // Delete message
    await db.contactMessage.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    )
  }
}
