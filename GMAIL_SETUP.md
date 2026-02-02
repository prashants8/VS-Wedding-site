# Gmail Email Setup Guide

This guide will help you set up Gmail to send RSVP notification emails to **vatsal.mishra7794@gmail.com**.

## Step 1: Enable 2-Step Verification

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Sign in with your Gmail account
3. Under "Signing in to Google", find **"2-Step Verification"**
4. Click **"Get started"** and follow the setup process
5. Complete the verification (you'll need your phone)

⚠️ **Important**: You MUST enable 2-Step Verification to use App Passwords

## Step 2: Generate App Password

1. Go back to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", find **"App passwords"**
   - If you don't see it, make sure 2-Step Verification is enabled
3. Click **"App passwords"**
4. You may need to sign in again
5. Select app: **"Mail"**
6. Select device: **"Other (Custom name)"**
7. Type: **"Wedding RSVP"**
8. Click **"Generate"**
9. **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)
   - ⚠️ **Save this password** - you won't see it again!

## Step 3: Add Environment Variables

1. Open `.env.local` in your project root
2. Add these variables:

```env
# Gmail Configuration
GMAIL_USER=vatsal.mishra7794@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password-here
RSVP_NOTIFICATION_EMAIL=vatsal.mishra7794@gmail.com
```

**Replace:**
- `GMAIL_USER` → Your Gmail address (vatsal.mishra7794@gmail.com)
- `GMAIL_APP_PASSWORD` → The 16-character app password from Step 2 (remove spaces)
- `RSVP_NOTIFICATION_EMAIL` → Where to send notifications (vatsal.mishra7794@gmail.com)

**Example:**
```env
GMAIL_USER=vatsal.mishra7794@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
RSVP_NOTIFICATION_EMAIL=vatsal.mishra7794@gmail.com
```

## Step 4: Restart Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

## Step 5: Test It!

1. Go to your website
2. Submit an RSVP
3. Check **vatsal.mishra7794@gmail.com** inbox
4. You should receive a beautiful HTML email with RSVP details! 🎉

## Troubleshooting

### "Invalid login" or "Authentication failed"
- ✅ Make sure you're using **App Password** (not your regular Gmail password)
- ✅ Remove spaces from the app password
- ✅ Verify 2-Step Verification is enabled
- ✅ Check that GMAIL_USER matches the account that generated the app password

### "Email not sending"
- ✅ Check server console for error messages
- ✅ Verify all environment variables are set
- ✅ Make sure `.env.local` is in the project root
- ✅ Restart server after adding environment variables

### "Less secure app access" error
- ✅ This shouldn't happen with App Passwords
- ✅ If it does, make sure you're using App Password, not regular password

## Security Notes

- ✅ **App Passwords are secure** - they're separate from your main password
- ✅ You can revoke app passwords anytime from Google Account settings
- ✅ Each app password is unique and can be deleted independently
- ✅ Never commit `.env.local` to Git (it's already in `.gitignore`)

## What You'll Receive

When someone submits an RSVP, you'll get an email with:
- ✅ Guest Name
- ✅ Attendance (Yes/No)
- ✅ Number of Guests (if Yes)
- ✅ Submission Timestamp
- ✅ Beautiful HTML formatting

## Next Steps

- ✅ Test with a real RSVP submission
- ✅ Check spam folder if email doesn't arrive
- ✅ Verify email formatting looks good
- ✅ Set up email filters in Gmail if needed
