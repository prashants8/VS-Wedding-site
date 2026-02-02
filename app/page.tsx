'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import RSVPModal from '@/components/RSVPModal'
import Countdown from '@/components/Countdown'
import EventCard from '@/components/EventCard'
import Gallery from '@/components/Gallery'

export default function Home() {
  // Always show RSVP on page load. Modal will appear every refresh.
  const [showRSVP, setShowRSVP] = useState(true)
  const [activeEventsView, setActiveEventsView] = useState<'groom' | 'bride'>('bride')

  // Replace this image with uploaded wedding photos
  // Main couple photo for hero section
  const heroImage = '/images/couple/couple-main.jpeg'

  // Groom's Events
  const groomEvents = [
    {
      title: "Groom's Tilak",
      date: 'February 14, 2026',
      time: '08:00 PM',
      day: 'Saturday',
      location: 'Jamnipur Colony, Bhadohi, UP, near Ziya Heart Care Center',
      locationLink: 'https://maps.google.com/?q=Jamnipur+Colony+Bhadohi+UP+Ziya+Heart+Care+Center',
      description:
        'Traditional tilak ceremony for the groom with family blessings and celebrations.',
      imagePath: '/images/events/tilak.png',
    },
    {
      title: 'Haldi / Sangeet',
      date: 'February 18, 2026',
      time: '12:00 PM',
      day: 'Tuesday',
      location: 'Jamnipur Colony, Bhadohi, UP, near Ziya Heart Care Center',
      locationLink: 'https://maps.google.com/?q=Jamnipur+Colony+Bhadohi+UP+Ziya+Heart+Care+Center',
      description:
        'Combined Haldi and Sangeet celebration with music, dance, and traditional rituals.',
      imagePath: '/images/events/sangeet.png',
    },
    {
      title: 'Wedding',
      date: 'February 19, 2026',
      time: '08:00 PM',
      day: 'Thursday',
      location: 'Hotel Placid, Tagore Town, Prayagraj',
      locationLink: 'https://maps.google.com/?q=Hotel+Placid+Tagore+Town+Prayagraj',
      description:
        'The main wedding ceremony as we begin our journey together with blessings.',
      imagePath: '/images/events/wedding.png',
    },
  ]

  // Bride's Events
  const brideEvents = [
    {
      title: 'Mehendi',
      date: 'February 16, 2026',
      time: '06:00 PM',
      day: 'Monday',
      location: 'Sareen Cottage, Tagore Town',
      locationLink: 'https://maps.google.com/?q=Sareen+Cottage+Tagore+Town+Prayagraj',
      description:
        'Mehendi celebration filled with music, laughter, and beautiful henna designs.',
      imagePath: '/images/events/mehendi.png',
    },
    {
      title: 'Haldi',
      date: 'February 17, 2026',
      time: '12:00 PM',
      day: 'Tuesday',
      location: 'Sareen Cottage, Tagore Town',
      locationLink: 'https://maps.google.com/?q=Sareen+Cottage+Tagore+Town+Prayagraj',
      description:
        'Haldi ceremony with blessings, smiles, and joyful moments with family.',
      imagePath: '/images/events/haldi.png',
    },
    {
      title: 'Sangeet',
      date: 'February 17, 2026',
      time: '07:00 PM',
      day: 'Tuesday',
      location: 'Sareen Cottage, Tagore Town',
      locationLink: 'https://maps.google.com/?q=Sareen+Cottage+Tagore+Town+Prayagraj',
      description:
        'Sangeet night with dance, performances, and celebrations together.',
      imagePath: '/images/events/sangeet.png',
    },
    {
      title: 'Wedding',
      date: 'February 19, 2026',
      time: '08:00 PM',
      day: 'Thursday',
      location: 'Hotel Placid, Tagore Town, Prayagraj',
      locationLink: 'https://maps.google.com/?q=Hotel+Placid+Tagore+Town+Prayagraj',
      description:
        'The main wedding ceremony as we begin our journey together with blessings.',
      imagePath: '/images/events/wedding.png',
    },
  ]

  // Active events based on selected view
  const events = activeEventsView === 'groom' ? groomEvents : brideEvents

  // Gallery images - Replace these with uploaded wedding photos
  // All images must be easily replaceable without touching logic code
  // Save your favourite couple photos as:
  // - /public/images/gallery/gallery-1.jpeg
  // - /public/images/gallery/gallery-2.jpeg
  // - /public/images/gallery/gallery-3.jpeg
  // - /public/images/gallery/gallery-4.jpeg
  const galleryImages: string[] = [
    '/images/gallery/gallery-1.jpeg',
    '/images/gallery/gallery-2.jpeg',
    '/images/gallery/gallery-3.jpeg',
    '/images/gallery/gallery-4.jpeg',
  ]

  return (
    <main className="min-h-screen m-0 p-0">
      {/* RSVP Modal */}
      {showRSVP && <RSVPModal onClose={() => setShowRSVP(false)} events={[...groomEvents, ...brideEvents.filter(e => e.title !== 'Wedding')]} />}

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden m-0"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="Vatsal & Shreya"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"></div>
        </div>

        <div className="relative z-10 text-center px-4 pt-0 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-6 drop-shadow-2xl tracking-tight">
                Vatsal
              </h1>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-16 md:w-24 bg-wedding-gold"></div>
                <span className="text-wedding-gold text-2xl md:text-4xl font-serif">&</span>
                <div className="h-px w-16 md:w-24 bg-wedding-gold"></div>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 drop-shadow-2xl tracking-tight">
                Shreya
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-12"
            >
              <p className="text-xl md:text-2xl lg:text-3xl text-white/95 mb-4 font-light tracking-wide">
                With blessings of Lord Ganesha
              </p>
              <p className="text-lg md:text-xl text-white/90 font-light">
                February 19, 2026
              </p>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mb-12"
            >
              <Countdown targetDate="2026-02-19T20:00:00" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-white/90 text-base md:text-lg font-light"
            >
              <p>We joyfully invite you to celebrate our wedding in Prayagraj</p>
            </motion.div>

            {/* Hero CTAs (like rh2026 style) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35, duration: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
            >
              <button
                onClick={() => setShowRSVP(true)}
                className="px-7 py-3 rounded-lg bg-wedding-gold text-white font-medium tracking-wide hover:bg-wedding-gold/90 transition-colors"
              >
                RSVP
              </button>
              <a
                href="#events"
                className="px-7 py-3 rounded-lg bg-white/10 text-white border border-white/25 backdrop-blur-md font-medium tracking-wide hover:bg-white/15 transition-colors"
              >
                View Events
              </a>
              <a
                href="#photos"
                className="px-7 py-3 rounded-lg bg-white/10 text-white border border-white/25 backdrop-blur-md font-medium tracking-wide hover:bg-white/15 transition-colors"
              >
                View Photos
              </a>
              <a
                href="#contact"
                className="px-7 py-3 rounded-lg bg-white/10 text-white border border-white/25 backdrop-blur-md font-medium tracking-wide hover:bg-white/15 transition-colors"
              >
                Contact Us
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <svg
            className="w-6 h-6 text-white animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* Wedding Events Section */}
      <section id="events" className="py-20 md:py-32 px-4 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-wedding-burgundy mb-6">
              Wedding Events
            </h2>
            <div className="w-24 h-1 bg-wedding-gold mx-auto mb-8"></div>
            
            {/* Toggle Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setActiveEventsView('groom')}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  activeEventsView === 'groom'
                    ? 'bg-wedding-burgundy text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Groom's Events
              </button>
              <button
                onClick={() => setActiveEventsView('bride')}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  activeEventsView === 'bride'
                    ? 'bg-wedding-burgundy text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Bride's Events
              </button>
            </div>
            
            <p className="text-gray-600 text-lg">
              Join us for these special celebrations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {events.map((event, index) => (
              <EventCard
                key={`${activeEventsView}-${event.title}-${index}`}
                title={event.title}
                date={event.date}
                time={event.time}
                day={event.day}
                location={event.location}
                locationLink={event.locationLink}
                description={event.description}
                imagePath={event.imagePath}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="photos"
        className="py-20 md:py-32 px-4 bg-wedding-rose/30 scroll-mt-24"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-wedding-burgundy mb-6">
              Gallery
            </h2>
            <div className="w-24 h-1 bg-wedding-gold mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">
              Our precious moments together
            </p>
          </motion.div>

          <Gallery images={galleryImages} />
        </div>
      </section>


      {/* Venue Section */}
      <section id="venue" className="py-20 md:py-32 px-4 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-wedding-burgundy mb-6">
              Venue
            </h2>
            <div className="w-24 h-1 bg-wedding-gold mx-auto mb-8"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-serif text-wedding-burgundy mb-4">
                  Hotel Placid, Tagore Town
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p className="flex items-start">
                    <svg
                      className="w-5 h-5 mr-3 text-wedding-gold mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <a
                      href="https://maps.google.com/?q=Hotel+Placid+Tagore+Town+Prayagraj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-wedding-burgundy hover:text-wedding-gold hover:underline transition-colors"
                    >
                      <span>
                        Hotel Placid, Tagore Town
                        <br />
                        Prayagraj, Uttar Pradesh, India
                      </span>
                      <svg
                        className="w-4 h-4 inline-block ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </p>
                  <p className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3 text-wedding-gold flex-shrink-0"
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
                    <span>Please contact the family for any assistance with directions or stay.</span>
                  </p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Our beautiful venue is located in the heart of the city, with
                easy access and ample parking. We look forward to welcoming you
                to this special celebration.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Update this Google Maps embed URL with your venue location */}
              {/* Get embed URL from: https://www.google.com/maps -> Share -> Embed a map */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841321875!2d-73.98811768459398!3d40.75889597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 px-4 bg-wedding-cream scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-wedding-burgundy mb-6">
              Contact Us
            </h2>
            <div className="w-24 h-1 bg-wedding-gold mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">
              Reach out to us for any queries or assistance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Bride's Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-serif text-wedding-burgundy mb-4 text-center">
                Bride's Side
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-serif text-wedding-burgundy mb-1">
                    Prashant Mishra
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">Bride's Father</p>
                  <a
                    href="tel:+917007088622"
                    className="text-wedding-burgundy hover:text-wedding-gold transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>7007088622</span>
                  </a>
                </div>
                <div>
                  <h4 className="text-lg font-serif text-wedding-burgundy mb-1">
                    Aryan Mishra
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">Bride's Brother</p>
                  <a
                    href="tel:+919555807660"
                    className="text-wedding-burgundy hover:text-wedding-gold transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>9555807660</span>
                  </a>
                </div>
                <div>
                  <h4 className="text-lg font-serif text-wedding-burgundy mb-1">
                    Anshul Mishra
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">Bride's Brother</p>
                  <a
                    href="tel:+918948677962"
                    className="text-wedding-burgundy hover:text-wedding-gold transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>8948677962</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Groom's Side */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-serif text-wedding-burgundy mb-4 text-center">
                Groom's Side
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-serif text-wedding-burgundy mb-1">
                    Dr. Surendra Kumar Mishra
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">Groom's Father</p>
                  <a
                    href="tel:+919415204117"
                    className="text-wedding-burgundy hover:text-wedding-gold transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>9415204117</span>
                  </a>
                </div>
                <div>
                  <h4 className="text-lg font-serif text-wedding-burgundy mb-1">
                    Abhishek Mishra
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">Groom's Brother</p>
                  <a
                    href="tel:+916392012377"
                    className="text-wedding-burgundy hover:text-wedding-gold transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>6392012377</span>
                  </a>
                </div>
                <div>
                  <h4 className="text-lg font-serif text-wedding-burgundy mb-1">
                    Prashant Shukla
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">Groom's Brother</p>
                  <a
                    href="tel:+918780703741"
                    className="text-wedding-burgundy hover:text-wedding-gold transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>8780703741</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-wedding-burgundy text-white rounded-lg hover:bg-wedding-burgundy/90 transition-colors font-medium"
            >
              View Full Contact Details
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-wedding-burgundy text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-6">
              Thank You
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Your presence at our wedding would mean the world to us. We are
              grateful for your love, support, and friendship as we embark on
              this beautiful journey together.
            </p>
            <div className="w-24 h-1 bg-wedding-gold mx-auto mb-8"></div>
            <p className="text-white/80">
              With love,
              <br />
              <span className="text-xl font-serif mt-2 block">
                Vatsal & Shreya
              </span>
            </p>
          </motion.div>
        </div>
      </footer>
    </main>
  )
}
