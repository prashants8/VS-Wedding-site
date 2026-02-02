# Google Sheets Integration Setup Guide

## Prerequisites

1. Google Cloud Project with Sheets API enabled
2. Service Account with JSON key
3. Google Sheet created and shared with service account email

## Environment Variables

Create a `.env.local` file in the root directory with:

```env
GOOGLE_CLIENT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id-here
```

### Important Notes:

- **GOOGLE_PRIVATE_KEY**: Must include the full private key with `\n` for newlines
- The private key from JSON file needs to have `\\n` replaced with actual newlines
- Wrap the entire key in quotes if it contains special characters

## Google Sheet Structure

Your Google Sheet should have the following columns in order:

| A | B | C | D | E |
|---|---|---|---|---|
| Timestamp | Guest Name | Attendance | Number of Guests | Source |

**Header Row (Row 1):**
- A1: Timestamp
- B1: Guest Name
- C1: Attendance
- D1: Number of Guests
- E1: Source

## Setup Steps

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing

2. **Enable Google Sheets API**
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

3. **Create Service Account**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Fill in details and create
   - Click on the service account > "Keys" tab
   - Click "Add Key" > "Create new key" > JSON
   - Download the JSON file

4. **Extract Credentials from JSON**
   - Open the downloaded JSON file
   - Copy `client_email` → `GOOGLE_CLIENT_EMAIL`
   - Copy `private_key` → `GOOGLE_PRIVATE_KEY` (keep the `\n` characters)
   - Note: In `.env.local`, you may need to replace `\\n` with `\n`

5. **Create Google Sheet**
   - Create a new Google Sheet
   - Add header row: Timestamp | Guest Name | Attendance | Number of Guests | Source
   - Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
   - Share the sheet with the service account email (from step 3)
   - Give "Editor" permissions
   - Copy Sheet ID → `GOOGLE_SHEET_ID`

6. **Add Environment Variables**
   - Create `.env.local` file in project root
   - Add all three variables as shown above

## Testing

After setup, test the integration:

1. Start the development server: `npm run dev`
2. Submit an RSVP through the website
3. Check your Google Sheet - a new row should appear

## Troubleshooting

- **"Missing required Google Sheets environment variables"**: Check that all three env variables are set
- **"Permission denied"**: Ensure the sheet is shared with the service account email
- **"Invalid credentials"**: Verify the private key format (newlines must be `\n`)
- **"Sheet not found"**: Verify the Sheet ID is correct
