'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface EventCardProps {
  title: string
  date: string
  time: string
  day?: string
  location: string
  locationLink?: string
  description: string
  imagePath: string
  index: number
}

export default function EventCard({
  title,
  date,
  time,
  day,
  location,
  locationLink,
  description,
  imagePath,
  index,
}: EventCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-wedding-rose to-wedding-gold/30">
        {!imageError ? (
          <Image
            src={imagePath}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              console.error('Image load error:', imagePath, e)
              setImageError(true)
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white/80">
              <svg
                className="w-16 h-16 mx-auto mb-2 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm">Image will appear here</p>
              <p className="text-xs mt-1 opacity-75">Add: {imagePath}</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl md:text-3xl font-serif text-white mb-1">
            {title}
          </h3>
          <p className="text-white/90 text-sm md:text-base">
            {date} {day && `(${day})`}
          </p>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm md:text-base">{time}</span>
          </div>
          <div className="flex items-center text-gray-600">
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {locationLink ? (
              <a
                href={locationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base text-wedding-burgundy hover:text-wedding-gold hover:underline transition-colors flex items-center gap-1"
              >
                <span>{location}</span>
                <svg
                  className="w-4 h-4"
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
            ) : (
              <span className="text-sm md:text-base">{location}</span>
            )}
          </div>
        </div>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
