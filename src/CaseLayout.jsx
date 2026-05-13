// Shared layout primitives for all case study pages
import React, { useEffect, useState } from 'react'

function trackEvent(name, params) {
  if (typeof window.gtag === 'function') window.gtag('event', name, params)
}

export const CONTACT_LINKS = [
  { label: 'Resume',   href: 'https://drive.google.com/file/d/1RJ9YajZ4Arcvg7RzmP4fnIOglAN0m11H/view?usp=sharing' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tzjia-hung/' },
  { label: 'Medium',   href: 'https://medium.com/@lanahung' },
  { label: 'Email',    href: 'mailto:tzjia.hung@gmail.com' },
]

export function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function useScrollSpy(sections) {
  const [active, setActive] = useState(sections[0]?.id)
  useEffect(() => {
    function sync() {
      const y = window.scrollY + 140
      let current = sections[0]?.id
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.offsetTop <= y) current = s.id
      }
      setActive(current)
    }
    window.addEventListener('scroll', sync, { passive: true })
    sync()
    return () => window.removeEventListener('scroll', sync)
  }, [sections])
  return active
}

export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.snma-reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export function RailNav({ sections, active }) {
  return (
    <nav className="snma-rail" aria-label="Page sections">
      <a
        href="/"
        className="snma-rail-back"
        onClick={(e) => { e.preventDefault(); trackEvent('click', { button_label: 'Back to home', section: 'rail_nav' }); window.location.replace('/') }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to home
      </a>
      <div className="snma-rail-divider" />
      {sections.map(s => (
        <button
          key={s.id}
          className={`snma-rail-btn${active === s.id ? ' active' : ''}`}
          onClick={() => { trackEvent('click', { button_label: s.label, section: 'rail_nav' }); scrollTo(s.id); }}
        >
          <span className="snma-rail-dot" />
          <span>{s.label}</span>
        </button>
      ))}
    </nav>
  )
}

export function TopBar({ sections }) {
  return (
    <header className="snma-topbar">
      <a
        href="/"
        className="snma-topbar-brand"
        onClick={(e) => { e.preventDefault(); trackEvent('click', { button_label: 'Lana Hung', section: 'topbar' }); window.location.replace('/') }}
      >
        <span className="snma-topbar-dot" />
        <span>Lana Hung</span>
      </a>
      <div className="snma-topbar-links">
        {sections.map(s => (
          <button key={s.id} className="snma-topbar-link" onClick={() => { trackEvent('click', { button_label: s.label, section: 'topbar' }); scrollTo(s.id); }}>
            {s.label}
          </button>
        ))}
      </div>
    </header>
  )
}

export function CaseFooter() {
  return (
    <footer className="snma-footer">
      <div className="snma-footer-inner">
        <div className="snma-footer-changelog">
          <span className="snma-footer-clabel">CHANGELOG</span>
          <span>{__BUILD_TIME__}</span>
        </div>
        <div className="snma-footer-links">
          {CONTACT_LINKS.map((l, i) => (
            <React.Fragment key={l.label}>
              {i > 0 && <span className="snma-footer-dot">·</span>}
              <a
                href={l.href}
                target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="snma-footer-link"
                onClick={(e) => {
                  trackEvent('click', { button_label: l.label, section: 'footer' })
                  if (l.href.startsWith('mailto:')) return
                  e.preventDefault()
                  const w = window.open(l.href, '_blank', 'noopener,noreferrer')
                  if (!w) window.top.location.href = l.href
                }}
              >
                {l.label}
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  )
}

export function ImgPlaceholder({ label, height = 240, style }) {
  return (
    <div style={{
      background: 'rgba(26,26,26,0.06)',
      borderRadius: 10,
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 11,
      fontFamily: 'var(--snma-mono)',
      color: 'rgba(26,26,26,0.32)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      border: '1.5px dashed rgba(26,26,26,0.14)',
      ...style,
    }}>
      {label}
    </div>
  )
}
