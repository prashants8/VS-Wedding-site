import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/utils/supabase'

/**
 * Test endpoint to check if Supabase is configured correctly
 * GET /api/rsvp/test
 */
export async function GET() {
  try {
    const supabase = getSupabaseClient()
    
    // Try to read from the rsvps table to verify connection
    const { data, error } = await supabase
      .from('rsvps')
      .select('*')
      .limit(1)

    if (error) {
      // Check if table doesn't exist
      if (error.code === '42P01' || error.message.includes('does not exist')) {
        return NextResponse.json(
          {
            success: false,
            message: 'Supabase connected, but rsvps table not found',
            error: error.message,
            help: 'Run the SQL migration in SUPABASE_SETUP.md Step 2',
          },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json({
      success: true,
      message: 'Supabase is connected! ✅',
      tableExists: true,
      help: 'Your RSVP system is ready to use!',
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'Supabase not configured',
        error: error.message,
        help: 'See SUPABASE_SETUP.md for setup instructions',
      },
      { status: 500 }
    )
  }
}
