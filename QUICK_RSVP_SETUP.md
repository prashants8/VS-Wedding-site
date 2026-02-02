# Quick RSVP Setup Guide

Your RSVP form is **already connected** to save data to Google Sheets! You just need to set up your Google Sheet.

## What Data Gets Saved

Every time someone fills the RSVP form, this data is saved:
- ✅ **Timestamp** - When they submitted
- ✅ **Guest Name** - Who filled the form
- ✅ **Attendance** - Yes or No
- ✅ **Number of Guests** - How many people (if Yes)
- ✅ **Source** - "Wedding Website"

## Quick Setup (5 minutes)

### Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new sheet
3. Add header row in Row 1:
   ```
   A1: Timestamp
   B1: Guest Name
   C1: Attendance
   D1: Number of Guests
   E1: Source
   ```

### Step 2: Get Sheet ID
- Look at the URL: `https://docs.google.com/spreadsheets/d/[THIS_IS_YOUR_SHEET_ID]/edit`
- Copy the Sheet ID (the long string between `/d/` and `/edit`)

### Step 3: Set Up Google Cloud (One-time setup)

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Create a new project (or use existing)

2. **Enable Google Sheets API**
   - Go to "APIs & Services" > "Library"
   - Search "Google Sheets API"
   - Click "Enable"

3. **Create Service Account**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Name it (e.g., "wedding-rsvp")
   - Click "Create and Continue"
   - Skip role assignment, click "Done"

4. **Create Key**
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose "JSON"
   - Download the JSON file

5. **Get Credentials from JSON**
   - Open the downloaded JSON file
   - Find `client_email` (looks like: `xxx@xxx.iam.gserviceaccount.com`)
   - Find `private_key` (starts with `-----BEGIN PRIVATE KEY-----`)

6. **Share Sheet with Service Account**
   - Open your Google Sheet
   - Click "Share" button
   - Paste the `client_email` from step 5
   - Give "Editor" permission
   - Click "Send"

### Step 4: Add Environment Variables

1. Create `.env.local` file in your project root (same folder as `package.json`)

2. Add these 3 lines (replace with your actual values):

```env
GOOGLE_CLIENT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-sheet-id-from-step-2
```

**Important Notes:**
- For `GOOGLE_PRIVATE_KEY`: Copy the entire private key from JSON, including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- Replace all `\\n` in the JSON with `\n` (single backslash)
- Keep the quotes around the private key

### Step 5: Restart Server

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 6: Test It!

1. Go to your website
2. Fill out the RSVP form
3. Check your Google Sheet - you should see a new row! 🎉

## Viewing Your RSVP Data

Once set up, you can:
- ✅ Open your Google Sheet anytime to see all RSVPs
- ✅ See who said Yes/No
- ✅ See guest names and counts
- ✅ Filter and sort the data
- ✅ Export to Excel if needed

## Troubleshooting

**Not seeing data in sheet?**
- Check server console for errors
- Verify all 3 environment variables are set
- Make sure sheet is shared with service account email
- Check that header row is in Row 1

**Need help?** Check the server terminal for error messages when someone submits RSVP.
