# Quick Gmail Setup - Get Your App Password

## ⚠️ You need to generate a Gmail App Password first!

The `.env.local` file is created, but you need to add your Gmail App Password.

## Step 1: Enable 2-Step Verification (if not already enabled)

1. Go to: https://myaccount.google.com/security
2. Find "2-Step Verification" 
3. Enable it if not already enabled

## Step 2: Generate App Password

1. Go to: https://myaccount.google.com/apppasswords
   - Or: Google Account → Security → App passwords
2. Select app: **"Mail"**
3. Select device: **"Other (Custom name)"**
4. Type: **"Wedding RSVP"**
5. Click **"Generate"**
6. **Copy the 16-character password** (looks like: `abcd efgh ijkl mnop`)
   - ⚠️ **IMPORTANT**: Remove all spaces when copying!

## Step 3: Add to .env.local

1. Open `.env.local` in your project root
2. Find this line:
   ```
   GMAIL_APP_PASSWORD=YOUR_APP_PASSWORD_HERE
   ```
3. Replace `YOUR_APP_PASSWORD_HERE` with your 16-character password (NO SPACES)
4. Example:
   ```
   GMAIL_APP_PASSWORD=abcdefghijklmnop
   ```

## Step 4: Restart Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

## Step 5: Test Again

Visit: `http://localhost:3000/api/rsvp/test-email`

You should see:
```json
{
  "success": true,
  "message": "Test email sent successfully!",
  "recipient": "your-email@example.com"
}
```

## ✅ Done!

Now when someone submits an RSVP, you'll receive an email at **your-email@example.com**!
