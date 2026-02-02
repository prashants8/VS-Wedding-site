/**
 * Validation script for Google Sheets environment variables
 * Run with: node scripts/validate-env.js
 */

require('dotenv').config({ path: '.env.local' })

const requiredVars = [
  'GOOGLE_CLIENT_EMAIL',
  'GOOGLE_PRIVATE_KEY',
  'GOOGLE_SHEET_ID',
]

console.log('🔍 Validating Google Sheets environment variables...\n')

let allValid = true

requiredVars.forEach((varName) => {
  const value = process.env[varName]
  
  if (!value) {
    console.error(`❌ ${varName}: Missing`)
    allValid = false
  } else {
    // Validate specific formats
    if (varName === 'GOOGLE_CLIENT_EMAIL') {
      if (!value.includes('@') || !value.includes('.iam.gserviceaccount.com')) {
        console.error(`❌ ${varName}: Invalid format (should be service account email)`)
        allValid = false
      } else {
        console.log(`✅ ${varName}: Set`)
      }
    } else if (varName === 'GOOGLE_PRIVATE_KEY') {
      if (!value.includes('BEGIN PRIVATE KEY') || !value.includes('END PRIVATE KEY')) {
        console.error(`❌ ${varName}: Invalid format (should include BEGIN/END markers)`)
        allValid = false
      } else if (value.includes('\\\\n')) {
        console.warn(`⚠️  ${varName}: Contains \\\\n - should be \\n`)
      } else {
        console.log(`✅ ${varName}: Set`)
      }
    } else if (varName === 'GOOGLE_SHEET_ID') {
      if (value.length < 10) {
        console.error(`❌ ${varName}: Too short (likely invalid)`)
        allValid = false
      } else {
        console.log(`✅ ${varName}: Set`)
      }
    } else {
      console.log(`✅ ${varName}: Set`)
    }
  }
})

console.log('')

if (allValid) {
  console.log('✅ All environment variables are set correctly!')
  console.log('💡 Next: Start your dev server and test an RSVP submission')
} else {
  console.error('❌ Some environment variables are missing or invalid')
  console.log('💡 Check .env.local file and follow the setup guide')
  process.exit(1)
}
