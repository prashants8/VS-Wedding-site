# Google Sheets Setup - Quick Start

## ✅ Setup Checklist

Follow these steps in order:

- [ ] **Step 1**: Create Google Cloud Project
- [ ] **Step 2**: Enable Google Sheets API
- [ ] **Step 3**: Create Service Account
- [ ] **Step 4**: Download Service Account JSON key
- [ ] **Step 5**: Create Google Sheet with headers
- [ ] **Step 6**: Share sheet with service account email
- [ ] **Step 7**: Create `.env.local` file with credentials
- [ ] **Step 8**: Validate setup with `npm run validate-env`
- [ ] **Step 9**: Test with `npm run dev` and submit RSVP

## 📋 Quick Reference

### 1. Google Cloud Console
- URL: https://console.cloud.google.com/
- Enable: Google Sheets API
- Create: Service Account
- Download: JSON key file

### 2. Google Sheet
- Create new sheet
- Add headers in Row 1: `Timestamp | Guest Name | Attendance | Number of Guests | Source`
- Get Sheet ID from URL
- Share with service account email (Editor permission)

### 3. Environment Variables
Create `.env.local` in project root:

```env
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-sheet-id-here
```

### 4. Validate & Test

```bash
# Validate environment variables
npm run validate-env

# Start development server
npm run dev

# Test: Submit an RSVP and check your Google Sheet
```

## 📚 Detailed Guides

- **Step-by-step instructions**: See `scripts/setup-google-sheets.md`
- **General setup guide**: See `GOOGLE_SHEETS_SETUP.md`

## 🔍 Common Issues

| Issue | Solution |
|-------|----------|
| "Missing environment variables" | Check `.env.local` exists and has all 3 variables |
| "Permission denied" | Share sheet with service account email |
| "Invalid credentials" | Check private key format (use `\n` not `\\n`) |
| "Sheet not found" | Verify Sheet ID from URL is correct |

## 🎯 What You Need

1. **Service Account Email**: From JSON file → `client_email`
2. **Private Key**: From JSON file → `private_key` (keep `\n`)
3. **Sheet ID**: From Google Sheet URL → the long string between `/d/` and `/edit`

---

**Need help?** Check the detailed guides or review the troubleshooting section.
