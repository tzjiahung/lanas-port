// Shared layout primitives for all case study pages
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

function trackEvent(name, params) {
  if (typeof window.gtag === 'function') window.gtag('event', name, params)
}

export const CONTACT_LINKS = [
  { label: 'Resume',   href: 'https://drive.google.com/file/d/11qNajkcb8YeLHNBtIWcNRtafqfvkVFt8/view?usp=sharing' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tzjia-hung/' },
  { label: 'GitHub',   href: 'https://github.com/tzjiahung' },
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

export function CaseCover({ src, alt, uncropped, width, height }) {
  return (
    <section className={uncropped ? 'snma-cover uncropped' : 'snma-cover'}>
      <div className="snma-wrap">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={uncropped && width && height ? { aspectRatio: `${width} / ${height}` } : undefined}
        />
      </div>
    </section>
  )
}

// Project info grid, placed below the title.
export function CaseMeta({ children }) {
  return (
    <section className="snma-case-meta">
      <div className="snma-wrap">{children}</div>
    </section>
  )
}

export function RailNav({ sections, active }) {
  // One dot slides along a fixed vertical line to the active item; labels never move.
  // Sections with `sub: true` are indented by label only.
  const listRef = useRef(null)
  const [dotY, setDotY] = useState(null)

  useLayoutEffect(() => {
    if (!listRef.current) return
    const update = () => {
      const btn = listRef.current?.querySelector(`[data-id="${active}"]`)
      if (btn) setDotY(btn.offsetTop + btn.offsetHeight / 2)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [active])

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
      <div className="snma-rail-list" ref={listRef}>
        {dotY !== null && (
          <span className="snma-rail-indicator" style={{ transform: `translateY(${dotY}px)` }} aria-hidden="true" />
        )}
        {sections.map(s => (
          <button
            key={s.id}
            data-id={s.id}
            className={`snma-rail-btn${s.sub ? ' snma-rail-btn--sub' : ''}${active === s.id ? ' active' : ''}`}
            onClick={() => { trackEvent('click', { button_label: s.label, section: 'rail_nav' }); scrollTo(s.id); }}
          >
            <span className="snma-rail-dot" />
            <span className="snma-rail-label">{s.label}</span>
          </button>
        ))}
      </div>
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
