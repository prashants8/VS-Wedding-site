export interface Event {
  title: string
  date: string
  time: string
  location: string
  description: string
}

/**
 * Generates an ICS (iCalendar) file content for a single event
 */
function generateICSForEvent(event: Event): string {
  // Parse date and time
  const eventDate = new Date(`${event.date} ${event.time}`)
  const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000) // 2 hours duration

  // Format dates in ICS format (YYYYMMDDTHHMMSS)
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  const startDateStr = formatDate(eventDate)
  const endDateStr = formatDate(endDate)
  const createdDateStr = formatDate(new Date())

  // Escape special characters in text fields
  const escapeText = (text: string): string => {
    return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
  }

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${Date.now()}-${Math.random().toString(36).substr(2, 9)}@wedding-invitation`,
    `DTSTAMP:${createdDateStr}`,
    `DTSTART:${startDateStr}`,
    `DTEND:${endDateStr}`,
    `SUMMARY:${escapeText(event.title)}`,
    `DESCRIPTION:${escapeText(event.description)}`,
    `LOCATION:${escapeText(event.location)}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  return icsContent
}

/**
 * Generates a combined ICS file for all events
 */
export function generateICSForAllEvents(events: Event[]): string {
  const formatDate = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  const createdDateStr = formatDate(new Date())
  const escapeText = (text: string): string => {
    return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
  }

  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ]

  events.forEach((event, index) => {
    // Parse date and time - handle formats like "March 15, 2025" and "10:00 AM"
    let eventDate: Date
    try {
      // Try parsing the date string directly
      eventDate = new Date(`${event.date} ${event.time}`)
      // If invalid, try alternative parsing
      if (isNaN(eventDate.getTime())) {
        // Fallback: try parsing with different format
        const dateParts = event.date.match(/(\w+)\s+(\d+),\s+(\d+)/)
        if (dateParts) {
          const [, month, day, year] = dateParts
          const monthMap: { [key: string]: string } = {
            January: '01', February: '02', March: '03', April: '04',
            May: '05', June: '06', July: '07', August: '08',
            September: '09', October: '10', November: '11', December: '12'
          }
          const monthNum = monthMap[month] || '01'
          const time24 = event.time.includes('PM') && !event.time.includes('12:')
            ? (parseInt(event.time.split(':')[0]) + 12).toString().padStart(2, '0') + ':' + event.time.split(':')[1].replace(/[^\d]/g, '')
            : event.time.replace(/[^\d:]/g, '')
          eventDate = new Date(`${year}-${monthNum}-${day.padStart(2, '0')}T${time24}:00`)
        }
      }
    } catch (e) {
      // If all parsing fails, use current date as fallback
      eventDate = new Date()
    }
    
    const endDate = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000) // 2 hours duration

    const startDateStr = formatDate(eventDate)
    const endDateStr = formatDate(endDate)

    icsContent.push(
      'BEGIN:VEVENT',
      `UID:${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}-${event.title.replace(/\s/g, '')}@wedding-invitation`,
      `DTSTAMP:${createdDateStr}`,
      `DTSTART:${startDateStr}`,
      `DTEND:${endDateStr}`,
      `SUMMARY:${escapeText(event.title)}`,
      `DESCRIPTION:${escapeText(event.description)}`,
      `LOCATION:${escapeText(event.location)}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'END:VEVENT'
    )
  })

  icsContent.push('END:VCALENDAR')

  return icsContent.join('\r\n')
}

/**
 * Downloads an ICS file
 */
export function downloadICS(icsContent: string, filename: string = 'wedding-events.ics'): void {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}
