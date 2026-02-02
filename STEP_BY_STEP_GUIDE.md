# Step-by-Step Google Sheets Setup Guide

Follow these steps in order. Take your time and complete each step before moving to the next.

---

## STEP 1: Create Google Cloud Project

1. **Open your web browser** and go to: https://console.cloud.google.com/

2. **Sign in** with your Google account (the one you want to use for this project)

3. **Click the project dropdown** at the top of the page (it may say "Select a project" or show a project name)

4. **Click "New Project"** button

5. **Fill in the project details:**
   - Project name: `Wedding RSVP` (or any name you prefer)
   - Leave Organization as default
   - Click **"Create"**

6. **Wait for the project to be created** (usually takes 10-20 seconds)

7. **Select your new project** from the dropdown at the top

✅ **Checkpoint**: You should see your project name at the top of the page

---

## STEP 2: Enable Google Sheets API

1. **In the Google Cloud Console**, look at the left sidebar menu

2. **Click on "APIs & Services"** (you may need to click the ☰ menu icon first)

3. **Click "Library"** in the left menu

4. **In the search box**, type: `Google Sheets API`

5. **Click on "Google Sheets API"** from the results

6. **Click the blue "Enable" button**

7. **Wait for it to enable** (usually instant)

✅ **Checkpoint**: You should see "API enabled" message

---

## STEP 3: Create Service Account

1. **Still in Google Cloud Console**, go to **"APIs & Services"** > **"Credentials"** (in the left menu)

2. **At the top of the page**, click **"Create Credentials"** button

3. **Click "Service Account"** from the dropdown

4. **Fill in the service account details:**
   - Service account name: `wedding-rsvp-service`
   - Service account ID: (auto-filled, you can leave it)
   - Description: `Service account for wedding RSVP submissions`
   - Click **"Create and Continue"**

5. **On the next screen** (Grant this service account access to project):
   - You can skip this step
   - Click **"Continue"**

6. **On the next screen** (Grant users access):
   - You can skip this step too
   - Click **"Done"**

✅ **Checkpoint**: You should see your service account in the list

---

## STEP 4: Create Service Account Key (Download JSON)

1. **In the Credentials page**, find your service account in the list
   - It should be named: `wedding-rsvp-service@your-project-id.iam.gserviceaccount.com`

2. **Click on the service account email** (the blue link)

3. **Click the "Keys" tab** at the top

4. **Click "Add Key"** button

5. **Click "Create new key"**

6. **Select "JSON"** format (should be selected by default)

7. **Click "Create"**

8. **A JSON file will download automatically** to your Downloads folder
   - File name will be something like: `your-project-id-xxxxx.json`
   - **Keep this file safe!** You'll need it in the next step

✅ **Checkpoint**: You should have a JSON file downloaded

---

## STEP 5: Extract Credentials from JSON File

1. **Open the downloaded JSON file** in a text editor (Notepad, VS Code, etc.)

2. **Find these three values in the file:**

   ```json
   {
     "client_email": "wedding-rsvp-service@your-project.iam.gserviceaccount.com",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...very long key...\n-----END PRIVATE KEY-----\n",
     ...
   }
   ```

3. **Copy the `client_email` value** - you'll need this for `GOOGLE_CLIENT_EMAIL`

4. **Copy the `private_key` value** - you'll need this for `GOOGLE_PRIVATE_KEY`
   - Make sure to copy the ENTIRE key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
   - Keep the `\n` characters in the key

5. **Save these values somewhere temporarily** (a text file or note)

✅ **Checkpoint**: You have copied both `client_email` and `private_key`

---

## STEP 6: Create Google Sheet

1. **Open a new browser tab** and go to: https://sheets.google.com/

2. **Click "Blank"** to create a new spreadsheet

3. **In Row 1, add these headers** (one per column):

   | A | B | C | D | E |
   |---|---|---|---|---|
   | Timestamp | Guest Name | Attendance | Number of Guests | Source |

   **How to add headers:**
   - Click cell A1, type: `Timestamp`
   - Click cell B1, type: `Guest Name`
   - Click cell C1, type: `Attendance`
   - Click cell D1, type: `Number of Guests`
   - Click cell E1, type: `Source`

4. **(Optional) Format Row 1:**
   - Select Row 1 (click the "1" on the left)
   - Click the "B" button to make it bold
   - Or use the menu: Format > Bold

5. **Name your sheet:**
   - Click "Untitled spreadsheet" at the top
   - Type: `Wedding RSVPs` (or any name you prefer)
   - Press Enter

✅ **Checkpoint**: Your sheet has headers in Row 1

---

## STEP 7: Get Sheet ID from URL

1. **Look at your browser's address bar** - the URL should look like:
   ```
   https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7/edit
   ```

2. **Find the long string** between `/d/` and `/edit`
   - In the example above, it's: `1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7`
   - This is your Sheet ID

3. **Copy this Sheet ID** - you'll need it for `GOOGLE_SHEET_ID`

✅ **Checkpoint**: You have copied the Sheet ID from the URL

---

## STEP 8: Share Sheet with Service Account

1. **In your Google Sheet**, click the **"Share"** button (top right, blue button)

2. **In the "Add people and groups" field**, paste your **service account email**
   - This is the `client_email` you copied in Step 5
   - It looks like: `wedding-rsvp-service@your-project.iam.gserviceaccount.com`

3. **Click the dropdown next to the email** and select **"Editor"** (not Viewer)

4. **IMPORTANT**: Uncheck the box that says "Notify people" (service accounts don't need notifications)

5. **Click "Share"** button

6. **You may see a warning** about sharing with a service account - click "Share anyway" or "OK"

✅ **Checkpoint**: The sheet is shared with your service account email

---

## STEP 9: Create .env.local File

1. **Go back to your project folder** in your code editor (VS Code, etc.)

2. **Look for the file** `.env.local.template` in the root folder
   - If you don't see it, create a new file called `.env.local`

3. **Open `.env.local`** (create it if it doesn't exist)

4. **Add these three lines**, replacing with YOUR values:

   ```env
   GOOGLE_CLIENT_EMAIL=wedding-rsvp-service@your-project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour full private key here\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEET_ID=your-sheet-id-from-step-7
   ```

   **Important notes:**
   - Replace `wedding-rsvp-service@your-project.iam.gserviceaccount.com` with YOUR `client_email` from Step 5
   - Replace `Your full private key here` with YOUR `private_key` from Step 5
   - Keep the quotes around `GOOGLE_PRIVATE_KEY`
   - Keep the `\n` characters in the private key (don't replace them)
   - Replace `your-sheet-id-from-step-7` with YOUR Sheet ID from Step 7

5. **Save the file**

✅ **Checkpoint**: You have a `.env.local` file with all three variables filled in

---

## STEP 10: Validate Your Setup

1. **Open your terminal/command prompt** in the project folder

2. **Run the validation command:**
   ```bash
   npm run validate-env
   ```

3. **Check the output:**
   - ✅ All green checkmarks = Success!
   - ❌ Red X marks = Something needs to be fixed

4. **If there are errors**, go back and check:
   - Did you copy all three values correctly?
   - Are the quotes in the right place?
   - Did you include the full private key?

✅ **Checkpoint**: Validation passes with all green checkmarks

---

## STEP 11: Test the Integration

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser** and go to: http://localhost:3000

3. **The RSVP modal should appear** automatically

4. **Fill out the RSVP form:**
   - Enter your name (or test name)
   - Click "Yes, I will attend"
   - Select number of guests
   - (Optional) Check "Add all events to my calendar"
   - Click "Submit RSVP"

5. **Check your Google Sheet:**
   - Go back to your Google Sheet tab
   - Refresh the page (F5 or Ctrl+R)
   - **You should see a new row** with your RSVP data!

✅ **Checkpoint**: A new row appears in your Google Sheet with the RSVP data

---

## 🎉 Congratulations!

Your Google Sheets integration is now working! Every RSVP submission will automatically appear in your Google Sheet.

---

## Troubleshooting

### If validation fails:
- Check that `.env.local` exists in the project root
- Verify all three variables are set
- Make sure there are no extra spaces
- Check that quotes are correct

### If RSVP doesn't appear in sheet:
- Check the server console for errors
- Verify the sheet is shared with the service account email
- Make sure the Sheet ID is correct
- Check that the sheet has the correct headers

### If you get "Permission denied":
- Go back to Step 8 and verify the sheet is shared
- Make sure you selected "Editor" permission
- Check that the service account email is correct

---

## Need Help?

If you're stuck at any step:
1. Re-read the step carefully
2. Check the troubleshooting section above
3. Verify you completed all previous steps
4. Check the detailed guide: `scripts/setup-google-sheets.md`
