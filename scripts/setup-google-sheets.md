# Step-by-Step Google Sheets Setup

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown (top left)
3. Click "New Project"
4. Enter project name: "Wedding RSVP" (or your choice)
5. Click "Create"
6. Wait for project creation, then select it

## Step 2: Enable Google Sheets API

1. In Google Cloud Console, go to **"APIs & Services"** > **"Library"**
2. Search for **"Google Sheets API"**
3. Click on it and click **"Enable"**
4. Wait for activation (usually instant)

## Step 3: Create Service Account

1. Go to **"APIs & Services"** > **"Credentials"**
2. Click **"Create Credentials"** > **"Service Account"**
3. Fill in:
   - **Service account name**: `wedding-rsvp-service`
   - **Service account ID**: (auto-generated, or customize)
   - **Description**: "Service account for wedding RSVP submissions"
4. Click **"Create and Continue"**
5. Skip "Grant this service account access to project" (click **"Continue"**)
6. Skip "Grant users access" (click **"Done"**)

## Step 4: Create Service Account Key

1. In the Credentials page, find your service account
2. Click on the service account email
3. Go to **"Keys"** tab
4. Click **"Add Key"** > **"Create new key"**
5. Select **"JSON"** format
6. Click **"Create"**
7. A JSON file will download automatically

## Step 5: Extract Credentials from JSON

Open the downloaded JSON file. It looks like this:

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "wedding-rsvp-service@your-project.iam.gserviceaccount.com",
  ...
}
```

**Copy these values:**
- `client_email` → `GOOGLE_CLIENT_EMAIL`
- `private_key` → `GOOGLE_PRIVATE_KEY` (keep the `\n` characters)

## Step 6: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Click **"Blank"** to create a new sheet
3. In Row 1, add these headers (one per column):
   - **A1**: `Timestamp`
   - **B1**: `Guest Name`
   - **C1**: `Attendance`
   - **D1**: `Number of Guests`
   - **E1**: `Source`
4. Optionally format Row 1 as bold/header style
5. Name your sheet (e.g., "Wedding RSVPs")

## Step 7: Get Sheet ID

1. Look at your Google Sheet URL:
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID_HERE]/edit
   ```
2. Copy the `SHEET_ID_HERE` part
3. This is your `GOOGLE_SHEET_ID`

## Step 8: Share Sheet with Service Account

1. In your Google Sheet, click **"Share"** button (top right)
2. In the "Add people and groups" field, paste your **service account email** (from Step 5)
3. Set permission to **"Editor"**
4. **Uncheck** "Notify people" (service accounts don't need notifications)
5. Click **"Share"**

## Step 9: Set Environment Variables

1. Copy `.env.local.template` to `.env.local`:
   ```bash
   cp .env.local.template .env.local
   ```
2. Open `.env.local` in a text editor
3. Fill in the three values:
   ```env
   GOOGLE_CLIENT_EMAIL=wedding-rsvp-service@your-project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour full key here\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEET_ID=your-sheet-id-here
   ```

**Important Notes:**
- Keep the quotes around `GOOGLE_PRIVATE_KEY`
- The private key should have `\n` for newlines (not `\\n`)
- If your key has `\\n`, replace them with `\n`

## Step 10: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Open the website and submit an RSVP
3. Check your Google Sheet - a new row should appear!

## Troubleshooting

### "Missing required Google Sheets environment variables"
- Check that `.env.local` exists in the project root
- Verify all three variables are set
- Restart the dev server after adding env variables

### "Permission denied" or "The caller does not have permission"
- Ensure the sheet is shared with the service account email
- Check that the service account has "Editor" permissions

### "Invalid credentials"
- Verify the private key format (must have `\n` not `\\n`)
- Check that the client email matches the service account email
- Ensure the private key includes the full key with BEGIN/END markers

### "Sheet not found"
- Verify the Sheet ID is correct (from the URL)
- Check that the sheet exists and is accessible

### No data appearing in sheet
- Check server console for errors
- Verify the sheet has the correct header row
- Ensure the sheet is shared with the service account
