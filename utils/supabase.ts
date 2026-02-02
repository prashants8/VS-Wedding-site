import { createClient } from '@supabase/supabase-js'

/**
 * Initialize Supabase client
 */
export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

/**
 * Save RSVP to Supabase database
 */
export async function saveRSVPToSupabase(data: {
  timestamp: string
  name: string
  attendance: string
  guests: number
  source: string
}) {
  const supabase = getSupabaseClient()

  const { data: result, error } = await supabase
    .from('rsvps')
    .insert([
      {
        timestamp: data.timestamp,
        guest_name: data.name,
        attendance: data.attendance,
        number_of_guests: data.guests,
        source: data.source,
        created_at: new Date().toISOString(),
      },
    ])
    .select()

  if (error) {
    console.error('Error saving RSVP to Supabase:', error)
    throw error
  }

  return result
}

/**
 * Get all RSVPs from Supabase
 */
export async function getAllRSVPs() {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('rsvps')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching RSVPs:', error)
    throw error
  }

  return data
}
