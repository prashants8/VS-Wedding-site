# Alternative Email Setup (If Gmail App Passwords Don't Work)

If you can't use Gmail App Passwords, here's an easier alternative using **Resend** (free tier available).

## Option 1: Use Resend (Recommended - Easier)

### Step 1: Sign Up for Resend
1. Go to: **https://resend.com**
2. Sign up with your email (free account)
3. Verify your email

### Step 2: Get API Key
1. Go to Resend Dashboard
2. Click **"API Keys"**
3. Click **"Create API Key"**
4. Name it: "Wedding RSVP"
5. Copy the API key (starts with `re_...`)

### Step 3: Update .env.local

Replace the Gmail section with:

```env
# Resend Email Configuration (Alternative to Gmail)
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
RSVP_NOTIFICATION_EMAIL=vatsal.mishra7794@gmail.com
```

### Step 4: Update Email Code

I'll need to switch the email code back to Resend. Let me know if you want to use this option!

---

## Option 2: Try Gmail OAuth (More Complex)

If you really want to use Gmail, we can set up OAuth2, but it's more complex and requires:
- Google Cloud Console setup
- OAuth2 credentials
- Token refresh logic

**Recommendation**: Use Resend (Option 1) - it's much simpler!
