# Wedding Invitation Website

A premium wedding invitation website built with Next.js 14, React, Tailwind CSS, and Framer Motion.

## Images Required from User

Before deploying, please upload the following images:

### Required Images:
- **Couple main photo** → `/public/images/couple/couple-main.jpg`
  - Used in hero section background
  - Recommended: 1920x1080px or larger

### Optional Images:
- **Bride photo** → `/public/images/couple/bride.jpg`
- **Groom photo** → `/public/images/couple/groom.jpg`
- **Gallery photos** → `/public/images/gallery/gallery-1.jpg`, `gallery-2.jpg`, etc.
  - Multiple photos supported
  - Add as many as needed
- **Event images** → `/public/images/events/`
  - `haldi.jpg` - Haldi ceremony
  - `mehndi.jpg` - Mehndi ceremony
  - `wedding.jpg` - Wedding ceremony
  - `reception.jpg` - Reception

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Upload your images to the `/public/images/` folders as described above.

3. Update the wedding details in `app/page.tsx`:
   - Couple names
   - Wedding date
   - Event dates and times
   - Venue address
   - Google Maps embed URL

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- ✅ RSVP Modal (mandatory on first visit)
- ✅ Google Sheets integration (automatic RSVP storage)
- ✅ Calendar integration (add events to calendar)
- ✅ Hero section with countdown timer
- ✅ Our Story section
- ✅ Wedding Events (Haldi, Mehndi, Wedding, Reception)
- ✅ Photo Gallery with lightbox
- ✅ Venue section with Google Maps
- ✅ Responsive mobile-first design
- ✅ Smooth animations with Framer Motion
- ✅ Image optimization with Next.js Image component

## RSVP API & Google Sheets Integration

The RSVP form automatically saves all submissions to a Google Sheet.

### Setup Google Sheets (Required)

1. **Quick Start**: See `QUICK_START.md` for a checklist
2. **Detailed Guide**: See `scripts/setup-google-sheets.md` for step-by-step instructions
3. **General Info**: See `GOOGLE_SHEETS_SETUP.md` for technical details

**Quick Setup:**
1. Create Google Cloud project and enable Sheets API
2. Create service account and download JSON key
3. Create Google Sheet with headers: `Timestamp | Guest Name | Attendance | Number of Guests | Source`
4. Share sheet with service account email
5. Create `.env.local` with credentials:
   ```env
   GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEET_ID=your-sheet-id
   ```
6. Validate setup: `npm run validate-env`
7. Test: Submit an RSVP and check your Google Sheet

All RSVP data is automatically saved to your Google Sheet in real-time.

## Project Structure

```
/public
  /images
    /couple      # Main couple photos
    /gallery     # Gallery photos
    /events      # Event photos

/app
  /api/rsvp     # RSVP API endpoint
  page.tsx      # Main page
  layout.tsx    # Root layout
  globals.css   # Global styles

/components
  RSVPModal.tsx    # RSVP modal component
  Countdown.tsx    # Countdown timer
  EventCard.tsx    # Event card component
  Gallery.tsx      # Gallery with lightbox

/utils
  googleSheets.ts  # Google Sheets API integration
  calendar.ts      # Calendar file generation
```

## Customization

All images are easily replaceable without touching code. Simply replace files in `/public/images/` folders with the same names.

Update text content, dates, and venue information in `app/page.tsx`.

## Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
