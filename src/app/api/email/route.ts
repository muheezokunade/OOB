import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// POST /api/email - Send email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { to, subject, template, data } = body

    if (!to || !subject || !template) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate email content based on template
    let htmlContent = ''
    let textContent = ''

    switch (template) {
      case 'order-confirmation':
        htmlContent = generateOrderConfirmationHTML(data)
        textContent = generateOrderConfirmationText(data)
        break
      case 'order-shipped':
        htmlContent = generateOrderShippedHTML(data)
        textContent = generateOrderShippedText(data)
        break
      case 'order-delivered':
        htmlContent = generateOrderDeliveredHTML(data)
        textContent = generateOrderDeliveredText(data)
        break
      case 'newsletter':
        htmlContent = generateNewsletterHTML(data)
        textContent = generateNewsletterText(data)
        break
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid template' },
          { status: 400 }
        )
    }

    // Send email
    const info = await transporter.sendMail({
      from: `"OmoOniBag" <${process.env.SMTP_FROM || 'noreply@omo-oni-bag.com'}>`,
      to,
      subject,
      text: textContent,
      html: htmlContent,
    })

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      messageId: info.messageId
    })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    )
  }
}

// Email template generators
function generateOrderConfirmationHTML(data: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation - OmoOniBag</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #D4AF37, #FFD700); padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .order-details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="color: white; margin: 0;">OmoOniBag</h1>
          <p style="color: white; margin: 10px 0 0 0;">Order Confirmation</p>
        </div>
        
        <div class="content">
          <h2>Thank you for your order!</h2>
          <p>Dear ${data.customerName},</p>
          <p>We've received your order and it's being processed. Here are your order details:</p>
          
          <div class="order-details">
            <h3>Order #${data.orderNumber}</h3>
            <p><strong>Order Date:</strong> ${new Date(data.orderDate).toLocaleDateString()}</p>
            <p><strong>Total Amount:</strong> ₦${data.total.toLocaleString()}</p>
            
            <h4>Items Ordered:</h4>
            <ul>
              ${data.items.map((item: any) => `
                <li>${item.name} - Qty: ${item.quantity} - ₦${(item.price * item.quantity).toLocaleString()}</li>
              `).join('')}
            </ul>
            
            <h4>Shipping Address:</h4>
            <p>${data.shippingAddress.firstName} ${data.shippingAddress.lastName}<br>
            ${data.shippingAddress.street}<br>
            ${data.shippingAddress.city}, ${data.shippingAddress.state}<br>
            ${data.shippingAddress.country}</p>
          </div>
          
          <p>We'll send you another email when your order ships. If you have any questions, please contact us.</p>
        </div>
        
        <div class="footer">
          <p>© 2024 OmoOniBag. All rights reserved.</p>
          <p>Contact us: +234 906 181 9572 | info@omo-oni-bag.com</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateOrderConfirmationText(data: any) {
  return `
    Order Confirmation - OmoOniBag
    
    Dear ${data.customerName},
    
    Thank you for your order! We've received your order and it's being processed.
    
    Order Details:
    Order #${data.orderNumber}
    Order Date: ${new Date(data.orderDate).toLocaleDateString()}
    Total Amount: ₦${data.total.toLocaleString()}
    
    Items Ordered:
    ${data.items.map((item: any) => `- ${item.name} - Qty: ${item.quantity} - ₦${(item.price * item.quantity).toLocaleString()}`).join('\n')}
    
    Shipping Address:
    ${data.shippingAddress.firstName} ${data.shippingAddress.lastName}
    ${data.shippingAddress.street}
    ${data.shippingAddress.city}, ${data.shippingAddress.state}
    ${data.shippingAddress.country}
    
    We'll send you another email when your order ships. If you have any questions, please contact us.
    
    © 2024 OmoOniBag. All rights reserved.
    Contact us: +234 906 181 9572 | info@omo-oni-bag.com
  `
}

function generateOrderShippedHTML(data: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Shipped - OmoOniBag</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #D4AF37, #FFD700); padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .tracking { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="color: white; margin: 0;">OmoOniBag</h1>
          <p style="color: white; margin: 10px 0 0 0;">Your Order Has Shipped!</p>
        </div>
        
        <div class="content">
          <h2>Great news! Your order is on its way</h2>
          <p>Dear ${data.customerName},</p>
          <p>Your order #${data.orderNumber} has been shipped and is on its way to you.</p>
          
          <div class="tracking">
            <h3>Tracking Information</h3>
            <p><strong>Tracking Number:</strong> ${data.trackingNumber}</p>
            <p><strong>Estimated Delivery:</strong> ${data.estimatedDelivery}</p>
            <p><strong>Shipping Method:</strong> ${data.shippingMethod}</p>
          </div>
          
          <p>You can track your package using the tracking number above. If you have any questions, please contact us.</p>
        </div>
        
        <div class="footer">
          <p>© 2024 OmoOniBag. All rights reserved.</p>
          <p>Contact us: +234 906 181 9572 | info@omo-oni-bag.com</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateOrderShippedText(data: any) {
  return `
    Your Order Has Shipped! - OmoOniBag
    
    Dear ${data.customerName},
    
    Great news! Your order #${data.orderNumber} has been shipped and is on its way to you.
    
    Tracking Information:
    Tracking Number: ${data.trackingNumber}
    Estimated Delivery: ${data.estimatedDelivery}
    Shipping Method: ${data.shippingMethod}
    
    You can track your package using the tracking number above. If you have any questions, please contact us.
    
    © 2024 OmoOniBag. All rights reserved.
    Contact us: +234 906 181 9572 | info@omo-oni-bag.com
  `
}

function generateOrderDeliveredHTML(data: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Delivered - OmoOniBag</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #D4AF37, #FFD700); padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .delivery { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; text-align: center; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="color: white; margin: 0;">OmoOniBag</h1>
          <p style="color: white; margin: 10px 0 0 0;">Your Order Has Been Delivered!</p>
        </div>
        
        <div class="content">
          <h2>Your order has arrived!</h2>
          <p>Dear ${data.customerName},</p>
          <p>We're excited to let you know that your order #${data.orderNumber} has been successfully delivered.</p>
          
          <div class="delivery">
            <h3>Delivery Confirmation</h3>
            <p><strong>Delivered on:</strong> ${new Date(data.deliveryDate).toLocaleDateString()}</p>
            <p><strong>Delivered to:</strong> ${data.deliveryAddress}</p>
          </div>
          
          <p>We hope you love your new items! If you have any questions or need assistance, please don't hesitate to contact us.</p>
          <p>Thank you for choosing OmoOniBag!</p>
        </div>
        
        <div class="footer">
          <p>© 2024 OmoOniBag. All rights reserved.</p>
          <p>Contact us: +234 906 181 9572 | info@omo-oni-bag.com</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateOrderDeliveredText(data: any) {
  return `
    Your Order Has Been Delivered! - OmoOniBag
    
    Dear ${data.customerName},
    
    We're excited to let you know that your order #${data.orderNumber} has been successfully delivered.
    
    Delivery Confirmation:
    Delivered on: ${new Date(data.deliveryDate).toLocaleDateString()}
    Delivered to: ${data.deliveryAddress}
    
    We hope you love your new items! If you have any questions or need assistance, please don't hesitate to contact us.
    
    Thank you for choosing OmoOniBag!
    
    © 2024 OmoOniBag. All rights reserved.
    Contact us: +234 906 181 9572 | info@omo-oni-bag.com
  `
}

function generateNewsletterHTML(data: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Newsletter - OmoOniBag</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #D4AF37, #FFD700); padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="color: white; margin: 0;">OmoOniBag Newsletter</h1>
        </div>
        
        <div class="content">
          <h2>${data.subject}</h2>
          <div>${data.content}</div>
        </div>
        
        <div class="footer">
          <p>© 2024 OmoOniBag. All rights reserved.</p>
          <p>Contact us: +234 906 181 9572 | info@omo-oni-bag.com</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateNewsletterText(data: any) {
  return `
    OmoOniBag Newsletter
    
    ${data.subject}
    
    ${data.content}
    
    © 2024 OmoOniBag. All rights reserved.
    Contact us: +234 906 181 9572 | info@omo-oni-bag.com
  `
}

