-- Create RSVPs table for wedding RSVP submissions
CREATE TABLE IF NOT EXISTS rsvps (
  id BIGSERIAL PRIMARY KEY,
  timestamp TEXT NOT NULL,
  guest_name TEXT NOT NULL,
  attendance TEXT NOT NULL CHECK (attendance IN ('Yes', 'No')),
  number_of_guests INTEGER NOT NULL DEFAULT 0,
  source TEXT NOT NULL DEFAULT 'Wedding Website',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_rsvps_created_at ON rsvps(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rsvps_attendance ON rsvps(attendance);
CREATE INDEX IF NOT EXISTS idx_rsvps_guest_name ON rsvps(guest_name);

-- Enable Row Level Security
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert (for API)
CREATE POLICY "Allow service role to insert" ON rsvps
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow service role to read (for API)
CREATE POLICY "Allow service role to read" ON rsvps
  FOR SELECT
  USING (true);
