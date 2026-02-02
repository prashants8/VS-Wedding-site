import { NextRequest, NextResponse } from 'next/server'
import { sendRSVPEmail } from '@/utils/email'

// Supabase is optional - only import if needed
let saveRSVPToSupabase: any = null
try {
  const supabaseModule = require('@/utils/supabase')
  saveRSVPToSupabase = supabaseModule.saveRSVPToSupabase
} catch (e) {
  console.log('Supabase not configured - skipping database save')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { status, name, guests, timestamp } = body

    // Validate input
    if (!status || (status !== 'yes' && status !== 'no')) {
      return NextResponse.json(
        { error: 'Invalid status. Must be "yes" or "no"' },
        { status: 400 }
      )
    }

    if (status === 'yes' && (!guests || guests < 1 || guests > 5)) {
      return NextResponse.json(
        { error: 'Invalid guest count. Must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Convert status to proper format
    const attendance = status === 'yes' ? 'Yes' : 'No'

    // Prepare RSVP data structure
    const rsvpData = {
      timestamp: timestamp || new Date().toISOString(),
      name: name || 'Guest',
      attendance,
      guests: status === 'yes' ? guests || 1 : 0,
      source: 'Wedding Website',
    }

    // Send email notification FIRST (so it always sends even if DB fails)
    let emailSent = false
    try {
      console.log('📧 Sending RSVP email notification...')
      console.log('RSVP Data:', JSON.stringify(rsvpData, null, 2))
      const emailResult = await sendRSVPEmail(rsvpData)
      if (emailResult.success) {
        console.log('✅ RSVP email sent successfully!')
        console.log('Message ID:', emailResult.messageId)
        emailSent = true
      } else {
        console.error('❌ Failed to send email:', emailResult.error || emailResult.message)
        console.error('Email result:', emailResult)
      }
    } catch (emailError: any) {
      console.error('❌ Error sending email:', emailError)
      console.error('Error details:', {
        message: emailError?.message,
        stack: emailError?.stack,
      })
      // Don't fail the request if email fails
    }

    // Save to Supabase (optional - don't block if it fails)
    if (saveRSVPToSupabase) {
      try {
        await saveRSVPToSupabase(rsvpData)
        console.log('✅ RSVP saved to Supabase:', rsvpData)
      } catch (dbError: any) {
        console.error('⚠️ Failed to save to Supabase (non-critical):', dbError?.message)
        // Email was already sent, so this is okay
      }
    } else {
      console.log('ℹ️ Supabase not configured - skipping database save')
    }

    return NextResponse.json(
      { message: 'RSVP recorded successfully', data: rsvpData },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing RSVP:', error)
    return NextResponse.json(
      { error: 'Failed to process RSVP' },
      { status: 500 }
    )
  }
}
