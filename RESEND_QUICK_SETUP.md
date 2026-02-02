# Resend Email Setup - Super Easy! 🚀

I've switched your email to **Resend** - it's much easier than Gmail App Passwords!

## Step 1: Sign Up for Resend (Free)

1. Go to: **https://resend.com**
2. Click **"Sign Up"** (free account)
3. Sign up with your email
4. Verify your email address

## Step 2: Get Your API Key

1. After signing in, go to **"API Keys"** in the dashboard
2. Click **"Create API Key"**
3. Name it: **"Wedding RSVP"**
4. Click **"Create"**
5. **Copy the API key** (starts with `re_...`)
   - ⚠️ Copy it now - you won't see it again!

## Step 3: Add to .env.local

1. Open `.env.local` in your project folder
2. Find this line:
   ```
   RESEND_API_KEY=YOUR_RESEND_API_KEY_HERE
   ```
3. Replace `YOUR_RESEND_API_KEY_HERE` with your actual API key

Example:
```env
RESEND_API_KEY=re_AbCdEfGhIjKlMnOpQrStUvWxYz
RSVP_NOTIFICATION_EMAIL=vatsal.mishra7794@gmail.com
RESEND_FROM_EMAIL=Wedding RSVP <onboarding@resend.dev>
```

## Step 4: Restart Server

```bash
# Stop server (Ctrl+C)
npm run dev
```

## Step 5: Test It!

Visit: `http://localhost:3000/api/rsvp/test-email`

You should see:
```json
{
  "success": true,
  "message": "Test email sent successfully!",
  "recipient": "vatsal.mishra7794@gmail.com"
}
```

Then check your email inbox! 📧

## ✅ That's It!

Much easier than Gmail App Passwords! Resend is free for up to 3,000 emails/month.

---

**Need help?** The API key should look like: `re_1234567890abcdef...`
