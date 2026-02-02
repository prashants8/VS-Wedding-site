import { google } from 'googleapis'

/**
 * Initialize Google Sheets API client using service account
 */
export function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  const sheetId = process.env.GOOGLE_SHEET_ID

  if (!clientEmail || !privateKey || !sheetId) {
    throw new Error('Missing required Google Sheets environment variables')
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  return {
    sheets: google.sheets({ version: 'v4', auth }),
    sheetId,
  }
}

/**
 * Append a new row to the Google Sheet
 */
export async function appendRSVPToSheet(data: {
  timestamp: string
  name: string
  attendance: string
  guests: number
  source: string
}): Promise<void> {
  try {
    const { sheets, sheetId } = getSheetsClient()

    const values = [
      [
        data.timestamp,
        data.name,
        data.attendance,
        data.guests,
        data.source,
      ],
    ]

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values,
      },
    })
  } catch (error) {
    console.error('Error appending to Google Sheet:', error)
    throw error
  }
}
