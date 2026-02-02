# Supabase RSVP Setup Guide

This guide will help you set up Supabase to store RSVP data and receive email notifications.

## What You'll Get

✅ **Database Storage**: All RSVPs saved in Supabase database  
✅ **Email Notifications**: Get notified via email when someone submits RSVP  
✅ **SQL Queries**: Query your RSVP data using SQL  
✅ **Real-time Updates**: View RSVPs in Supabase dashboard in real-time  

## Step 1: Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Fill in:
   - **Project Name**: Wedding RSVP (or any name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
5. Click **"Create new project"**
6. Wait 2-3 minutes for project to be created

## Step 2: Create Database Table

1. In your Supabase project, go to **"SQL Editor"** (left sidebar)
2. Click **"New query"**
3. Paste this SQL:

```sql
-- Create RSVPs table
CREATE TABLE IF NOT EXISTS rsvps (
  id BIGSERIAL PRIMARY KEY,
  timestamp TEXT NOT NULL,
  guest_name TEXT NOT NULL,
  attendance TEXT NOT NULL CHECK (attendance IN ('Yes', 'No')),
  number_of_guests INTEGER NOT NULL DEFAULT 0,
  source TEXT NOT NULL DEFAULT 'Wedding Website',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_rsvps_created_at ON rsvps(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rsvps_attendance ON rsvps(attendance);

-- Enable Row Level Security (optional, for security)
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert (for API)
CREATE POLICY "Allow service role to insert" ON rsvps
  FOR INSERT
  WITH CHECK (true);
```

4. Click **"Run"** (or press Ctrl+Enter)
5. You should see: "Success. No rows returned"

## Step 3: Get Supabase Credentials

1. In Supabase dashboard, go to **"Settings"** (gear icon, bottom left)
2. Click **"API"** in the sidebar
3. You'll see:
   - **Project URL** → Copy this (looks like: `https://xxxxx.supabase.co`)
   - **Service Role Key** → Click "Reveal" and copy (starts with `eyJ...`)

⚠️ **Important**: Use **Service Role Key** (not anon key) - it has admin access

## Step 4: Set Up Email (Resend)

1. Go to [Resend](https://resend.com)
2. Sign up for free account
3. Go to **"API Keys"** in dashboard
4. Click **"Create API Key"**
5. Name it: "Wedding RSVP"
6. Copy the API key (starts with `re_...`)

### Verify Your Email Domain (Optional)

For production, you should verify your domain. For testing:
- Resend provides a test domain: `onboarding@resend.dev`
- Or use your personal email for testing

## Step 5: Add Environment Variables

1. Create or edit `.env.local` in your project root
2. Add these variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Resend Email
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=onboarding@resend.dev
RSVP_NOTIFICATION_EMAIL=your-email@example.com
```

**Replace:**
- `NEXT_PUBLIC_SUPABASE_URL` → Your Supabase Project URL
- `SUPABASE_SERVICE_ROLE_KEY` → Your Service Role Key
- `RESEND_API_KEY` → Your Resend API key
- `RESEND_FROM_EMAIL` → Use `onboarding@resend.dev` for testing, or your verified domain for production
- `RSVP_NOTIFICATION_EMAIL` → Your email address (where you want to receive notifications)

## Step 6: Update Email From Address

1. Open `utils/email.ts`
2. Find this line:
   ```typescript
   from: 'Wedding RSVP <noreply@wedding-rsvp.com>',
   ```
3. Replace with:
   - For testing: `onboarding@resend.dev` (Resend's test domain)
   - For production: Your verified domain email

## Step 7: Restart Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

## Step 8: Test It!

1. Go to your website
2. Submit an RSVP
3. Check:
   - ✅ **Supabase Dashboard** → Table Editor → `rsvps` table (should see new row)
   - ✅ **Your Email** → Should receive notification email

## Viewing Your RSVPs

### In Supabase Dashboard:
1. Go to **"Table Editor"** (left sidebar)
2. Click on **"rsvps"** table
3. See all RSVPs in real-time!

### Using SQL:
1. Go to **"SQL Editor"**
2. Run queries like:

```sql
-- Get all RSVPs
SELECT * FROM rsvps ORDER BY created_at DESC;

-- Count Yes vs No
SELECT attendance, COUNT(*) as count 
FROM rsvps 
GROUP BY attendance;

-- Get total guests
SELECT SUM(number_of_guests) as total_guests 
FROM rsvps 
WHERE attendance = 'Yes';
```

## Troubleshooting

### "Missing Supabase environment variables"
- Check `.env.local` exists and has all variables
- Restart server after adding variables

### "Email not sending"
- Check `RESEND_API_KEY` is correct
- Verify `RSVP_NOTIFICATION_EMAIL` is set
- Check Resend dashboard for email logs

### "Database error"
- Verify table was created (check Table Editor)
- Check Service Role Key is correct
- Make sure RLS policies allow inserts

## Next Steps

- ✅ Set up email domain verification in Resend (for production)
- ✅ Create custom email templates
- ✅ Set up Supabase dashboard views for better data visualization
- ✅ Add email notifications for multiple recipients
