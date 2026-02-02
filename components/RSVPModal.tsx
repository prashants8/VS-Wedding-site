'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateICSForAllEvents, downloadICS, Event } from '@/utils/calendar'

interface RSVPModalProps {
  onClose: () => void
  events?: Event[]
}

export default function RSVPModal({ onClose, events = [] }: RSVPModalProps) {
  const [name, setName] = useState('')
  const [guests, setGuests] = useState(1)
  const [status, setStatus] = useState<'yes' | 'no' | null>(null)
  const [addToCalendar, setAddToCalendar] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!status) return

    setIsSubmitting(true)

    const rsvpData = {
      status,
      name: name || 'Anonymous',
      guests: status === 'yes' ? guests : 0,
      timestamp: new Date().toISOString(),
    }

    try {
      // Save to localStorage
      localStorage.setItem('rsvp_status', JSON.stringify(rsvpData))

      // Send to API
      await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rsvpData),
      })

      // Download calendar file if checkbox is checked
      if (addToCalendar && events.length > 0) {
        const icsContent = generateICSForAllEvents(events)
        downloadICS(icsContent, 'wedding-events.ics')
      }

      // Close modal with animation
      setTimeout(() => {
        onClose()
      }, 500)
    } catch (error) {
      console.error('Error submitting RSVP:', error)
      // Still close modal even if API fails
      setTimeout(() => {
        onClose()
      }, 500)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={(e) => e.target === e.currentTarget && status && handleSubmit()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-wedding-rose/30 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-wedding-gold/20 rounded-full -ml-12 -mb-12"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-serif text-center mb-2 text-wedding-burgundy">
              RSVP
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Please let us know if you'll be joining us
            </p>

            <div className="space-y-4">
              {/* Name input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-transparent outline-none"
                  placeholder="Enter your name"
                />
              </div>

              {/* Guest count - only show if attending */}
              {status === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-wedding-gold focus:border-transparent outline-none"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}

              {/* Action buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStatus('yes')}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                    status === 'yes'
                      ? 'bg-wedding-gold text-white shadow-lg scale-105'
                      : 'bg-wedding-rose text-wedding-burgundy hover:bg-wedding-rose/80'
                  }`}
                >
                  Yes, I will attend
                </button>
                <button
                  onClick={() => setStatus('no')}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
                    status === 'no'
                      ? 'bg-gray-700 text-white shadow-lg scale-105'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Sorry, can't make it
                </button>
              </div>

              {/* Calendar checkbox - only show if attending and events are available */}
              {status === 'yes' && events.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-2"
                >
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={addToCalendar}
                      onChange={(e) => setAddToCalendar(e.target.checked)}
                      className="w-5 h-5 text-wedding-gold border-gray-300 rounded focus:ring-wedding-gold focus:ring-2 cursor-pointer"
                    />
                    <div className="ml-3 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-wedding-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        Add all events to my calendar
                      </span>
                    </div>
                  </label>
                  
                  {/* Stay Connected info box */}
                  {addToCalendar && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <h4 className="text-sm font-semibold text-blue-900 mb-1">
                        Stay Connected
                      </h4>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        From ceremonies to celebrations, receive timely updates and reminders for our special days.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Submit button */}
              {status && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-wedding-burgundy text-white rounded-lg font-medium hover:bg-wedding-burgundy/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
