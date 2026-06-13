'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { Icon } from './Icon'

const LINKS = [
  { href: '/writing', label: 'Writing' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/signals', label: 'Signals' },
  { href: '/about', label: 'About' },
]

interface NavProps {
  logoText: string
  subscribeUrl: string
}

export function Nav({ logoText, subscribeUrl }: NavProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Render the logo with an amber final dot.
  const dotIndex = logoText.lastIndexOf('.')
  const head = dotIndex >= 0 ? logoText.slice(0, dotIndex) : logoText
  const tail = dotIndex >= 0 ? logoText.slice(dotIndex) : ''

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          {head}
          <span className="dot">{tail}</span>
        </Link>

        <nav className={`nav-links${open ? ' open' : ''}`}>
          {LINKS.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + '/')
            return (
              <Link
                key={l.href}
                href={l.href}
                className={active ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        <div className="nav-cta">
          <a
            className="btn btn-dark"
            href={subscribeUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
          >
            Subscribe
          </a>
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name="menu" size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
