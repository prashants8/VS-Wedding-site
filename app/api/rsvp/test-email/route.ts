import { NextResponse } from 'next/server'
import { sendRSVPEmail } from '@/utils/email'

/**
 * Test endpoint to send a test email
 * GET /api/rsvp/test-email
 */
export async function GET() {
  try {
    // Check if Resend is configured
    const resendApiKey = process.env.RESEND_API_KEY
    const recipientEmails = process.env.RSVP_NOTIFICATION_EMAIL || 'vatsal.mishra7794@gmail.com'

    if (!resendApiKey) {
      return NextResponse.json(
        {
          success: false,
          message: 'Resend not configured',
          missing: {
            resendApiKey: !resendApiKey,
          },
          help: 'Add RESEND_API_KEY to .env.local. Get it from https://resend.com',
        },
        { status: 400 }
      )
    }

    // Parse multiple email addresses
    const emailList = recipientEmails
      .split(/[,;]/)
      .map((email) => email.trim())
      .filter((email) => email.length > 0)

    // Send test email
    const testRSVPData = {
      name: 'Test Guest',
      attendance: 'Yes',
      guests: 2,
      timestamp: new Date().toISOString(),
    }

    console.log('🧪 Starting email test...')
    const result = await sendRSVPEmail(testRSVPData)
    console.log('🧪 Email test result:', result)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Test email sent successfully!',
        recipients: emailList,
        messageId: result.messageId,
        recipientsList: result.recipients,
        note: `Check your inbox (and spam folder) at: ${emailList.join(', ')}`,
        debug: {
          emailCount: emailList.length,
          apiKeyExists: !!resendApiKey,
          apiKeyLength: resendApiKey?.length,
        },
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to send email',
          error: result.error || result.message,
          recipients: emailList,
          debug: {
            emailCount: emailList.length,
            apiKeyExists: !!resendApiKey,
          },
        },
        { status: 500 }
      )
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error testing email',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
