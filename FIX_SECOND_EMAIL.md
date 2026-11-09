# Fix Second Email - another-email@example.com

## The Problem
Resend's test domain (`onboarding@resend.dev`) only allows sending to the account owner's email (your-email@example.com).

## Solution Options

### Option 1: Verify Domain in Resend (Recommended - Permanent Fix)

1. Go to: **https://resend.com/domains**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `yourdomain.com` or use a subdomain)
4. Follow DNS verification steps:
   - Add TXT record to your domain's DNS
   - Wait for verification (usually a few minutes)
5. Once verified, update `.env.local`:
   ```env
   RESEND_FROM_EMAIL=Wedding RSVP <noreply@yourdomain.com>
   ```
6. Restart server - both emails will work!

### Option 2: Add Second Email to Resend Account (Quick Fix)

1. Go to: **https://resend.com/settings**
2. Look for **"Team"** or **"Email Addresses"** section
3. Add `another-email@example.com` as a team member or verified email
4. This might allow it to receive test emails

### Option 3: Use Email Forwarding (Temporary)

If you can't verify a domain right now, you can:
1. Set up email forwarding in Gmail
2. Forward emails from your-email@example.com to another-email@example.com
3. This way both will receive notifications

## Quick Test

After implementing any solution, test at:
```
http://localhost:3000/api/rsvp/test-email
```

Both emails should receive the notification!
