import { Resend } from 'resend'

/**
 * Send RSVP notification email via Resend
 */
export async function sendRSVPEmail(rsvpData: {
  name: string
  attendance: string
  guests: number
  timestamp: string
}) {
  const resendApiKey = process.env.RESEND_API_KEY
  const recipientEmails = process.env.RSVP_NOTIFICATION_EMAIL || ''

  console.log('🔍 Email Function - Environment Check:')
  console.log('RESEND_API_KEY exists:', !!resendApiKey)
  console.log('RESEND_API_KEY first 10 chars:', resendApiKey?.substring(0, 10))
  console.log('RSVP_NOTIFICATION_EMAIL:', recipientEmails)

  if (!resendApiKey) {
    console.error('❌ Resend not configured. Missing RESEND_API_KEY')
    return { success: false, message: 'Resend not configured - RESEND_API_KEY missing' }
  }

  // Parse multiple email addresses (comma or semicolon separated)
  const emailList = recipientEmails
    .split(/[,;]/)
    .map((email) => email.trim())
    .filter((email) => email.length > 0)

  console.log('📧 Parsed email list:', emailList)
  console.log('📧 Number of recipients:', emailList.length)

  if (emailList.length === 0) {
    console.error('❌ No valid recipient emails found')
    return { success: false, message: 'No recipient emails configured' }
  }

  const resend = new Resend(resendApiKey)

  const attendanceText = rsvpData.attendance === 'Yes' ? 'will attend' : 'will not attend'
  const guestsText =
    rsvpData.attendance === 'Yes' && rsvpData.guests > 1
      ? ` with ${rsvpData.guests} guests`
      : rsvpData.attendance === 'Yes'
        ? ''
        : ''

  try {
    console.log('📧 Attempting to send email via Resend...')
    console.log('📧 Recipients:', emailList)
    console.log('📧 Number of recipients:', emailList.length)
    console.log('📧 Subject:', `New RSVP: ${rsvpData.name} ${attendanceText}`)
    console.log('📧 From:', process.env.RESEND_FROM_EMAIL || 'Wedding RSVP <onboarding@resend.dev>')

    // Resend test domain only allows sending to account owner
    // So we need to send separate emails to each recipient
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Wedding RSVP <onboarding@resend.dev>'
    const results = []
    const errors = []

    // Send email to each recipient separately
    for (const recipient of emailList) {
      try {
        console.log(`📧 Sending email to: ${recipient}`)
        const { data, error } = await resend.emails.send({
          from: fromEmail,
          to: recipient, // Send to one recipient at a time
      subject: `New RSVP: ${rsvpData.name} ${attendanceText}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #8B4A6B 0%, #D4AF37 100%);
                color: white;
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .info-row {
                margin: 15px 0;
                padding: 15px;
                background: white;
                border-left: 4px solid #8B4A6B;
                border-radius: 4px;
              }
              .label {
                font-weight: bold;
                color: #8B4A6B;
                display: inline-block;
                min-width: 150px;
              }
              .value {
                color: #333;
              }
              .attendance-yes {
                color: #22c55e;
                font-weight: bold;
                font-size: 18px;
              }
              .attendance-no {
                color: #ef4444;
                font-weight: bold;
                font-size: 18px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 New RSVP Received</h1>
              </div>
              <div class="content">
                <div class="info-row">
                  <span class="label">Guest Name:</span>
                  <span class="value">${rsvpData.name || 'Anonymous'}</span>
                </div>
                <div class="info-row">
                  <span class="label">Attendance:</span>
                  <span class="value ${
                    rsvpData.attendance === 'Yes' ? 'attendance-yes' : 'attendance-no'
                  }">
                    ${rsvpData.attendance}${guestsText}
                  </span>
                </div>
                ${rsvpData.attendance === 'Yes' && rsvpData.guests > 1 ? `
                <div class="info-row">
                  <span class="label">Number of Guests:</span>
                  <span class="value">${rsvpData.guests}</span>
                </div>
                ` : ''}
                <div class="info-row">
                  <span class="label">Submitted At:</span>
                  <span class="value">${new Date(rsvpData.timestamp).toLocaleString()}</span>
                </div>
                <div class="info-row">
                  <span class="label">Source:</span>
                  <span class="value">Wedding Website</span>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New RSVP Received

Guest Name: ${rsvpData.name || 'Anonymous'}
Attendance: ${rsvpData.attendance}${guestsText}
${rsvpData.attendance === 'Yes' && rsvpData.guests > 1 ? `Number of Guests: ${rsvpData.guests}\n` : ''}
Submitted At: ${new Date(rsvpData.timestamp).toLocaleString()}
Source: Wedding Website
      `,
        })

        if (error) {
          console.error(`❌ Failed to send to ${recipient}:`, error)
          console.error(`Error details:`, JSON.stringify(error, null, 2))
          
          // If it's a test domain restriction error, try to forward via first email
          if (error.message?.includes('testing emails to your own email address')) {
            console.log(`ℹ️ Test domain restriction detected for ${recipient}`)
            console.log(`💡 Solution: Verify a domain in Resend or add this email to your Resend account`)
          }
          
          errors.push({ recipient, error: error.message || 'Unknown error' })
        } else {
          console.log(`✅ Email sent successfully to ${recipient}!`)
          console.log(`✅ Message ID: ${data?.id}`)
          results.push({ recipient, messageId: data?.id })
        }
      } catch (err: any) {
        console.error(`❌ Exception sending to ${recipient}:`, err)
        errors.push({ recipient, error: err.message })
      }
    }

    // Return success if at least one email was sent
    if (results.length > 0) {
      console.log(`✅ Successfully sent ${results.length} out of ${emailList.length} emails`)
      if (errors.length > 0) {
        console.warn(`⚠️ Failed to send to ${errors.length} recipient(s):`, errors)
      }
      return {
        success: true,
        messageId: results[0].messageId,
        recipients: emailList,
        sentTo: results.map((r) => r.recipient),
        failedTo: errors.map((e) => e.recipient),
      }
    } else {
      console.error('❌ Failed to send email to any recipient')
      return {
        success: false,
        error: 'Failed to send to all recipients',
        errors,
      }
    }
  } catch (error: any) {
    console.error('❌ Exception sending email:', error)
    console.error('Error type:', error?.constructor?.name)
    console.error('Error message:', error?.message)
    console.error('Error stack:', error?.stack)
    return { success: false, error: error.message || 'Unknown error occurred' }
  }
}
