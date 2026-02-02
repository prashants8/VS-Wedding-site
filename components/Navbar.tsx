'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItem = { label: string; href: string }

export default function Navbar({ onRSVPClick }: { onRSVPClick: () => void }) {
  const pathname = usePathname()
  
  const items: NavItem[] = useMemo(
    () => [
      { label: 'HOME', href: '/' },
      { label: 'PHOTOS', href: '/#photos' },
      { label: 'EVENTS', href: '/#events' },
      { label: 'THINGS TO DO IN PRAYAGRAJ', href: '/things-to-do' },
      { label: 'CONTACT', href: '/contact' },
    ],
    []
  )

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 inset-x-0 z-40">
      <div
        className={`transition-all ${
          scrolled
            ? 'bg-white/85 backdrop-blur-md shadow-sm border-b border-black/5'
            : 'bg-white'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between gap-6">
          {/* Monogram / Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 min-w-[44px]"
            aria-label="Go to Home"
          >
            <span className="text-wedding-burgundy font-serif text-2xl tracking-tight">
              VS
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {items.map((item) => {
              const isActive = pathname === item.href || (item.href.startsWith('/#') && pathname === '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm tracking-[0.16em] font-medium transition-colors ${
                    isActive
                      ? 'text-wedding-burgundy'
                      : 'text-gray-700 hover:text-wedding-burgundy'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* RSVP button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onRSVPClick}
            className="ml-auto lg:ml-0 px-5 py-2.5 rounded-lg bg-wedding-rose text-wedding-burgundy border border-black/10 hover:bg-wedding-rose/80 transition-colors text-sm tracking-wide font-medium"
          >
            RSVP
          </motion.button>
        </div>
      </div>
    </div>
  )
}

