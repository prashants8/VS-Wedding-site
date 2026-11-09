'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function ThingsToDoPage() {
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
              Things to Do Nearby
            </h1>
            <div className="w-20 h-0.5 bg-wedding-gold mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg md:text-xl font-light mt-6">
              Explore the area during your visit
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            <div className="bg-wedding-cream p-8 rounded-2xl">
              <h3 className="text-2xl font-serif text-wedding-burgundy mb-4">
                Attraction •••••
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Destination details are masked in this reference copy.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Best time to visit:</strong> Early morning or evening
              </p>
            </div>

            <div className="bg-wedding-cream p-8 rounded-2xl">
              <h3 className="text-2xl font-serif text-wedding-burgundy mb-4">
                Attraction •••••
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                A magnificent fort built by Emperor Akbar in 1583. Home to the famous Patalpuri Temple 
                and the Akshaya Vat (immortal banyan tree).
              </p>
              <p className="text-sm text-gray-600">
                <strong>Timings:</strong> 7:00 AM - 6:00 PM
              </p>
            </div>

            <div className="bg-wedding-cream p-8 rounded-2xl">
              <h3 className="text-2xl font-serif text-wedding-burgundy mb-4">
                Attraction •••••
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Destination details are masked in this reference copy.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Timings:</strong> Sunrise to Sunset
              </p>
            </div>

            <div className="bg-wedding-cream p-8 rounded-2xl">
              <h3 className="text-2xl font-serif text-wedding-burgundy mb-4">
                Attraction •••••
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Destination details are masked in this reference copy.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Timings:</strong> 9:30 AM - 5:00 PM (Closed on Mondays)
              </p>
            </div>

            <div className="bg-wedding-cream p-8 rounded-2xl">
              <h3 className="text-2xl font-serif text-wedding-burgundy mb-4">
                Attraction •••••
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Destination details are masked in this reference copy.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Timings:</strong> 7:00 AM - 6:00 PM
              </p>
            </div>

            <div className="bg-wedding-cream p-8 rounded-2xl">
              <h3 className="text-2xl font-serif text-wedding-burgundy mb-4">
                Attraction •••••
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Destination details are masked in this reference copy.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Best time to visit:</strong> Early morning or evening
              </p>
            </div>
          </motion.div>

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
