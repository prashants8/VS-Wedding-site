'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar onRSVPClick={() => {}} />
      
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-wedding-burgundy mb-6 font-light tracking-tight">
              Contact Us
            </h1>
            <div className="w-20 h-0.5 bg-wedding-gold mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg md:text-xl font-light mt-6">
              Reach out to us for any queries or assistance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Bride's Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-wedding-cream p-8 rounded-2xl"
            >
              <h2 className="text-3xl md:text-4xl font-serif text-wedding-burgundy mb-6 text-center">
                Bride's Side
              </h2>
              <div className="space-y-6">
                <div className="border-b border-wedding-gold/30 pb-4">
                  <h3 className="text-xl font-serif text-wedding-burgundy mb-2">
                    Prashant Mishra
                  </h3>
                  <p className="text-gray-600 mb-2">Bride's Father</p>
                  <a
                    href="tel:+917007088622"
                    className="text-wedding-burgundy hover:text-wedding-gold transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>7007088622</span>
                  </a>
                </div>

                <div className="border-b border-wedding-gold/30 pb-4">
                  <h3 className="text-xl font-serif text-wedding-burgundy mb-2">
                    Aryan Mishra
                  </h3>
                  <p className="text-gray-600 mb-2">Bride's Brother</p>
                  <a
                    href="tel:+919555807660"
                    className="text-wedding-burgundy hover:text-wedding-gold transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>9555807660</span>
                  </a>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-wedding-burgundy mb-2">
                    Anshul Mishra
                  </h3>
                  <p className="text-gray-600 mb-2">Bride's Brother</p>
                  <a
                    href="tel:+918948677962"
                    className="text-wedding-burgundy hover:text-wedding-gold transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>8948677962</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Groom's Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="bg-wedding-cream p-8 rounded-2xl"
            >
              <h2 className="text-3xl md:text-4xl font-serif text-wedding-burgundy mb-6 text-center">
                Groom's Side
              </h2>
              <div className="space-y-6">
                <div className="border-b border-wedding-gold/30 pb-4">
                  <h3 className="text-xl font-serif text-wedding-burgundy mb-2">
                    Dr. Surendra Kumar Mishra
                  </h3>
                  <p className="text-gray-600 mb-2">Groom's Father</p>
                  <a
                    href="tel:+919415204117"
                    className="text-wedding-burgundy hover:text-wedding-gold transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>9415204117</span>
                  </a>
                </div>

                <div className="border-b border-wedding-gold/30 pb-4">
                  <h3 className="text-xl font-serif text-wedding-burgundy mb-2">
                    Abhishek Mishra
                  </h3>
                  <p className="text-gray-600 mb-2">Groom's Brother</p>
                  <a
                    href="tel:+916392012377"
                    className="text-wedding-burgundy hover:text-wedding-gold transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>6392012377</span>
                  </a>
                </div>

                <div>
                  <h3 className="text-xl font-serif text-wedding-burgundy mb-2">
                    Prashant Shukla
                  </h3>
                  <p className="text-gray-600 mb-2">Groom's Brother</p>
                  <a
                    href="tel:+918780703741"
                    className="text-wedding-burgundy hover:text-wedding-gold transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>8780703741</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-wedding-burgundy text-white rounded-lg hover:bg-wedding-burgundy/90 transition-colors font-medium"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
