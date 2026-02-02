import { NextResponse } from 'next/server'
import { Resend } from 'resend'

/**
 * Debug endpoint to test email sending directly
 * GET /api/rsvp/debug-email
 */
export async function GET() {
  try {
    const resendApiKey = process.env.RESEND_API_KEY
    const recipientEmails = process.env.RSVP_NOTIFICATION_EMAIL || 'vatsal.mishra7794@gmail.com'

    console.log('🔍 Debug Email Configuration:')
    console.log('RESEND_API_KEY exists:', !!resendApiKey)
    console.log('RESEND_API_KEY length:', resendApiKey?.length)
    console.log('RSVP_NOTIFICATION_EMAIL:', recipientEmails)

    if (!resendApiKey) {
      return NextResponse.json(
        {
          success: false,
          message: 'RESEND_API_KEY not found in environment',
          envCheck: {
            nodeEnv: process.env.NODE_ENV,
            hasResendKey: false,
          },
        },
        { status: 400 }
      )
    }

    // Parse emails
    const emailList = recipientEmails
      .split(/[,;]/)
      .map((email) => email.trim())
      .filter((email) => email.length > 0)

    console.log('📧 Parsed email list:', emailList)

    const resend = new Resend(resendApiKey)

    // Send test email
    const { data, error } = await resend.emails.send({
      from: 'Wedding RSVP <onboarding@resend.dev>',
      to: emailList,
      subject: 'Test RSVP Email - Debug',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email to verify email sending is working.</p>
        <p>Recipients: ${emailList.join(', ')}</p>
        <p>Time: ${new Date().toISOString()}</p>
      `,
      text: `Test Email\n\nThis is a test email.\nRecipients: ${emailList.join(', ')}`,
    })

    if (error) {
      console.error('❌ Resend Error:', error)
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to send email',
          error: error,
          recipients: emailList,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Test email sent!',
      messageId: data?.id,
      recipients: emailList,
      note: 'Check both email inboxes and spam folders',
    })
  } catch (error: any) {
    console.error('❌ Exception:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Error',
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    )
  }
}
