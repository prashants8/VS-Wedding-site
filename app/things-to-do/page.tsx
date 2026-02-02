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
              Things to Do in Prayagraj
            </h1>
            <div className="w-20 h-0.5 bg-wedding-gold mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg md:text-xl font-light mt-6">
              Explore the beautiful city of Prayagraj during your visit
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
                Triveni Sangam
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The sacred confluence of three rivers - Ganga, Yamuna, and the mythical Saraswati. 
                A must-visit spiritual site where pilgrims gather for holy dips.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Best time to visit:</strong> Early morning or evening
              </p>
            </div>

            <div className="bg-wedding-cream p-8 rounded-2xl">
              <h3 className="text-2xl font-serif text-wedding-burgundy mb-4">
                Allahabad Fort
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
                Khusro Bagh
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                A beautiful walled garden containing the tombs of Prince Khusro, Shah Begum, and other 
                Mughal royalty. A peaceful retreat with stunning Mughal architecture.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Timings:</strong> Sunrise to Sunset
              </p>
            </div>

            <div className="bg-wedding-cream p-8 rounded-2xl">
              <h3 className="text-2xl font-serif text-wedding-burgundy mb-4">
                Anand Bhavan
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The ancestral home of the Nehru family, now a museum showcasing India's freedom struggle. 
                A place of historical significance and architectural beauty.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Timings:</strong> 9:30 AM - 5:00 PM (Closed on Mondays)
              </p>
            </div>

            <div className="bg-wedding-cream p-8 rounded-2xl">
              <h3 className="text-2xl font-serif text-wedding-burgundy mb-4">
                All Saints Cathedral
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Also known as Patthar Girja, this stunning Gothic-style cathedral is one of the most 
                beautiful churches in India, built in the 19th century.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Timings:</strong> 7:00 AM - 6:00 PM
              </p>
            </div>

            <div className="bg-wedding-cream p-8 rounded-2xl">
              <h3 className="text-2xl font-serif text-wedding-burgundy mb-4">
                Chandrashekhar Azad Park
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                A large public park perfect for evening walks and relaxation. Named after the freedom 
                fighter Chandrashekhar Azad, who made the ultimate sacrifice here.
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
