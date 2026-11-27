import React from 'react'
import { trackClick } from './analytics.js'
import { createPortal } from 'react-dom'
import {
  ArrowOut, HeroSparkle, CaseStudy,
  WORKS, ARTICLES, articleStyles, CONTACT_LINKS, CHANGELOG_STAMP,
} from './Portfolio.jsx'

// New home page, built from Figma "home-page-v5" (node 263:6479).
// This is the home page. The previous home page (Portfolio.jsx) is kept at #/home-v1, unlinked.

const CONTENT_MAX = 1200
const MOBILE_BP = 760

// The home page shows the first four case studies (ShopBack, OEC Finance, OEC Typography and
// Cathay FitBack) in a two-column grid.
const HOME_WORKS = WORKS.slice(0, 4)

// The new page's resume link (the original home page keeps its own).
const RESUME_URL = 'https://drive.google.com/file/d/11qNajkcb8YeLHNBtIWcNRtafqfvkVFt8/view?usp=sharing'
const HOME_LINKS = CONTACT_LINKS.map((l) => (l.label === 'Resume' ? { ...l, href: RESUME_URL } : l))

// Article thumbnails, taken from each post's lead image on Medium (keyed by the post's ID at the end of its URL).
// Posts without an entry show a soft placeholder.
const ARTICLE_THUMBS = {
  '2668908b3cd1': 'article-thumbs/ux-research-agent.jpg',
  '0b4df664a15f': 'article-thumbs/qual-synthesis-ai.jpg',
  '915eab17fdcd': 'article-thumbs/hci-masters.jpg',
  'a44cf881261d': 'article-thumbs/sb-pay-onboarding.jpg',
  '526a9dd102d6': 'article-thumbs/segmenting-users.jpg',
  'f44e3a56a105': 'article-thumbs/xmrit-metrics.jpg',
  'bdc337310696': 'article-thumbs/postgresql-survey.jpg',
  '2d2bd6254637': 'article-thumbs/f-test.jpg',
  '05b51a3b3be7': 'article-thumbs/design-background.jpg',
  '35784812e25c': 'article-thumbs/metaverse-workshop.jpg',
  'a7d4b01277fe': 'article-thumbs/cathay-review-2.jpg',
  'c7d6bb9701a9': 'article-thumbs/cathay-review-1.jpg',
  'a59cea43a668': 'article-thumbs/acer-pm-intern.jpg',
}
const thumbFor = (url) => ARTICLE_THUMBS[url.split('-').pop()]

const thumbStyle = {
  width: 120, aspectRatio: '3 / 2', flexShrink: 0, borderRadius: 6, overflow: 'hidden',
  border: '1px solid rgba(32,44,60,0.08)',
  background: 'linear-gradient(135deg, #eff6fc, #deecf9)',
}

function ArticleThumb({ url }) {
  const src = thumbFor(url)
  return (
    <div style={thumbStyle} aria-hidden="true">
      {src && <img src={src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
    </div>
  )
}

// Frosted blur behind the glass switcher and panel
const GLASS_BLUR = 'blur(8px) saturate(130%)'

const s = {
  page: {
    position: 'relative', minHeight: '100vh', overflowX: 'hidden',
    fontFamily: "'Lato', ui-sans-serif, system-ui, -apple-system, sans-serif",
    // The hero background image (959px tall) fades to white at its bottom edge, so the page is white
    // from there down. Stops are in px so the seam lines up at any page height (phones are much taller).
    background: 'linear-gradient(180deg, #eff6fc 0px, #ffffff 959px, #fffffe 100%)',
  },
  heroBg: {
    position: 'absolute', top: 0, left: 0, width: '100%', height: 959,
    display: 'block', pointerEvents: 'none', userSelect: 'none',
  },
  sparkleLayer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, pointerEvents: 'none' },
  content: { position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' },
  topBar: {
    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 24px 8px', // Header padding from Figma node 416:5809
  },
  name: { fontSize: 20, lineHeight: '25.6px', fontWeight: 700, letterSpacing: '0em', color: '#004578' },
  links: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 16, letterSpacing: '0em' },
  link: {
    color: 'rgba(32,44,60,0.7)', textDecoration: 'none', padding: '4px 8px', borderRadius: 6,
    transition: 'background 0.15s, color 0.15s',
  },
  dot: { color: 'rgba(32,44,60,0.3)' },
  main: { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: '0 8px' },
  // Nav to intro: 8 (top bar) + 48 here. Intro to tabs: 24 (main gap). Figma node 451:1250.
  hero: { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 0 0' },
  intro: { margin: 0, maxWidth: 1576, fontFamily: "'Libertinus Sans', 'Lato', ui-sans-serif, system-ui, sans-serif", fontSize: 24, lineHeight: '32px', fontWeight: 400, letterSpacing: '0em', color: '#004578', textAlign: 'center', textWrap: 'pretty' },
  // Centred pill switcher above a see-through panel (Figma node 453:2457)
  // 28px under the switcher matches how the 24px gap above it looks: the intro's 32px line height
  // adds about 4px of empty space under its last line.
  folder: { width: '100%', maxWidth: CONTENT_MAX, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 },
  // Switcher padding and colours from Figma node 453:2450. The glass look (frosted fill, lit rim,
  // thin side edges, soft lift) follows the iOS tab bar in Figma node 458:3088.
  tabs: {
    position: 'relative', display: 'flex', gap: 4, padding: '6px 8px', borderRadius: 999,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.36) 100%)',
    backdropFilter: GLASS_BLUR, WebkitBackdropFilter: GLASS_BLUR,
    boxShadow: [
      'inset 0 1px 0.5px rgba(255,255,255,0.5)',      // light catching the top edge
      'inset 0 -1px 0.5px rgba(255,255,255,0.2)',    // softer bounce on the bottom edge
      '1.25px 0 0 -0.75px rgba(0,69,120,0.08)',     // thin rims on the left and right ends
      '-1.25px 0 0 -0.75px rgba(0,69,120,0.08)',
      '0 0 0 0.5px rgba(0,69,120,0.06)',            // hairline outline
      '0 6px 12px rgba(0,69,120,0.03)',             // lift
    ].join(', '),
  },
  // Bright ring that fades around the edge, brightest top left and bottom right, like light through glass
  // Shared by the switcher and the panel below it.
  glassSheen: {
    position: 'absolute', inset: 0, borderRadius: 'inherit', padding: 1, pointerEvents: 'none',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0.05) 65%, rgba(255,255,255,0.3) 100%)',
    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor',
    mask: 'linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)',
  },
  // The selected pill slides between tabs with a slight overshoot, so it settles like a drop of liquid
  tabsThumb: {
    position: 'absolute', top: 6, bottom: 6, left: 0, borderRadius: 999, pointerEvents: 'none',
    background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.9) 100%)',
    boxShadow: 'inset 0 -1px 1px rgba(0,69,120,0.03), 0 1px 4px rgba(0,69,120,0.06), 0 0 0 0.5px rgba(0,69,120,0.04)',
    transition: 'transform 0.5s cubic-bezier(0.3, 1.1, 0.5, 1), width 0.5s cubic-bezier(0.3, 1.1, 0.5, 1)',
  },
  tab: {
    position: 'relative', zIndex: 1,
    padding: '10px 24px', margin: 0, border: 'none', borderRadius: 24, cursor: 'pointer', background: 'transparent',
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Lato', sans-serif", fontSize: 16, lineHeight: '16px', fontWeight: 600,
    transition: 'color 0.2s',
  },
  panel: {
    position: 'relative', alignSelf: 'stretch',
    // More solid white at the top, where the blue page background is strongest, fading toward the bottom
    background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.4) 100%)',
    backdropFilter: GLASS_BLUR, WebkitBackdropFilter: GLASS_BLUR,
    border: '1px solid rgba(32,44,60,0.08)', borderTop: 'none', borderRadius: 8,
    // Same glass edges as the switcher: lit top, soft bottom, faint side rims, then the lift
    boxShadow: [
      'inset 0 1px 0.5px rgba(255,255,255,0.5)',
      'inset 0 -1px 0.5px rgba(255,255,255,0.2)',
      '1.25px 0 0 -0.75px rgba(0,69,120,0.08)',
      '-1.25px 0 0 -0.75px rgba(0,69,120,0.08)',
      '0 12px 36px rgba(0,69,120,0.08)',
    ].join(', '),
    padding: 16,
  },
  workGrid: { display: 'grid', gap: 24 },
  footer: { width: '100%', display: 'flex', justifyContent: 'center', padding: '24px' },
  changelog: { display: 'flex', alignItems: 'center', gap: 10 },
  changelogLabel: { fontSize: 10, fontWeight: 600, letterSpacing: '0em', color: 'rgba(32,44,60,0.45)' },
  changelogStamp: { fontSize: 12, letterSpacing: '0em', color: 'rgba(32,44,60,0.7)' },
}

function useIsMobile() {
  const [w, setW] = React.useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1440))
  React.useEffect(() => {
    const onResize = () => setW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return w < MOBILE_BP
}

function ContactLinks({ isMobile }) {
  return (
    <nav aria-label="Contact" style={{ ...s.links, flexWrap: isMobile ? 'wrap' : 'nowrap', justifyContent: isMobile ? 'flex-start' : 'flex-end' }}>
      {HOME_LINKS.map((l, i) => (
        <React.Fragment key={l.label}>
          {i > 0 && <span aria-hidden="true" style={s.dot}>·</span>}
          <a
            href={l.href}
            target={l.href.startsWith('mailto:') ? undefined : '_top'}
            style={s.link}
            onClick={() => trackClick(l.label, 'home_header')}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,120,212,0.10)'; e.currentTarget.style.color = 'rgba(32,44,60,0.95)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(32,44,60,0.7)' }}
          >
            {l.label}
          </a>
        </React.Fragment>
      ))}
    </nav>
  )
}

// Sparkles scattered over the background of the first fold only. They scroll away with the page.
// Positions are percentages of the first screen's height and width, kept mostly toward the edges so they sit behind empty space.
const BG_SPARKLES = [
  { size: 42, top: '14%', left: '6%',  delay: 0 },
  { size: 26, top: '34%', left: '13%', delay: 1.2 },
  { size: 34, top: '9%',  left: '88%', delay: 0.6 },
  { size: 22, top: '42%', left: '93%', delay: 1.8 },
  { size: 26, top: '62%', left: '3%',  delay: 0.9 },
  { size: 22, top: '88%', left: '9%',  delay: 1.5 },
]

function BackgroundSparkles() {
  return (
    <div aria-hidden="true" style={s.sparkleLayer}>
      {BG_SPARKLES.map((p, i) => <HeroSparkle key={i} {...p} color="#71afe5" glow="rgba(113, 175, 229, 0.55)" />)}
    </div>
  )
}

function Hero() {
  return (
    <section style={s.hero}>
      <p style={s.intro}>
        Product designer with 3+ years of experience designing <b>AI, E-commerce, B2B</b>, and <b>Fintech</b> products.<br />
        Currently studying Human Centered Design &amp; Engineering @ UW in Seattle.
      </p>
    </section>
  )
}

const HOME_TABS = [
  { id: 'work', label: 'Work' },
  { id: 'article', label: 'Article' },
  { id: 'about', label: 'About' },
]

// Glass segment control. One white pill sits under the selected tab and slides to the next one.
function GlassTabs({ value, onSelect }) {
  const btns = React.useRef({})
  const [thumb, setThumb] = React.useState(null)

  React.useLayoutEffect(() => {
    function measure() {
      const el = btns.current[value]
      if (el) setThumb({ x: el.offsetLeft, w: el.offsetWidth })
    }
    measure()
    // Tab widths change once the web fonts load, and on resize
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [value])

  return (
    <div role="tablist" aria-label="Work and articles" style={s.tabs}>
      {thumb && <span aria-hidden="true" style={{ ...s.tabsThumb, width: thumb.w, transform: `translateX(${thumb.x}px)` }} />}
      {HOME_TABS.map(({ id, label }) => {
        const active = id === value
        return (
          <button
            key={id} ref={(el) => { btns.current[id] = el }}
            type="button" role="tab" id={`home-v2-tab-${id}`} aria-selected={active} aria-controls={`home-v2-panel-${id}`}
            onClick={() => onSelect(id)}
            style={{ ...s.tab, color: active ? '#004578' : 'rgba(0,69,120,0.8)' }}
          >
            {label}
          </button>
        )
      })}
      <span aria-hidden="true" style={s.glassSheen} />
    </div>
  )
}

// Article label (Research, Design or Other), a smaller take on the tags on the work cards.
// Design uses the OEC card's blue; the others stay lilac.
const articleTag = { display: 'inline-block', marginRight: 8, padding: '1px 8px', borderRadius: 4, background: 'rgba(0,120,212,0.12)', color: '#0078d4', fontSize: 11, fontWeight: 600, lineHeight: 1.5 }
const ARTICLE_TAG_COLORS = { Design: { background: 'rgba(61,111,216,0.12)', color: '#3d6fd8' } }

function ArticleList() {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {ARTICLES.map((a, i) => (
        <li key={a.url}>
          <a
            href={a.url}
            target="_top"
            style={articleStyles.link}
            onClick={() => trackClick(a.title, 'home_articles', { link_url: a.url })}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,120,212,0.06)'
              const arr = e.currentTarget.querySelector('[data-arr]')
              if (arr) arr.style.transform = 'translateX(2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              const arr = e.currentTarget.querySelector('[data-arr]')
              if (arr) arr.style.transform = 'translateX(0)'
            }}
          >
            <span style={{ ...articleStyles.num, fontFamily: 'inherit', color: 'rgba(0,69,120,0.55)' }}>{String(i + 1).padStart(2, '0')}</span>
            <ArticleThumb url={a.url} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0, flex: 1 }}>
              <span style={{ ...articleStyles.title, fontSize: 16, fontWeight: 600 }}>{a.title}</span>
              <span style={{ ...articleStyles.meta, fontSize: 14, color: 'rgba(0,0,0,0.5)' }}>
                {a.tag && <span style={{ ...articleTag, ...ARTICLE_TAG_COLORS[a.tag] }}>{a.tag}</span>}
                {a.date}
                {a.readMin != null && (
                  <React.Fragment>
                    <span style={{ ...articleStyles.metaDot, color: 'inherit' }}>·</span>
                    {a.readMin} min read
                  </React.Fragment>
                )}
              </span>
            </div>
            <span data-arr style={articleStyles.arrow}><ArrowOut /></span>
          </a>
        </li>
      ))}
    </ul>
  )
}

// About tab, built from Figma "home-page-about-v6" (node 354:4068).
// Each photo is 214px tall on desktop: square photos are 214px wide, wide ones fill their column at 4:3.
// `crop` repeats the framing set in Figma for photos that aren't simply centred.
const ABOUT_DIR = 'home-v2/about/'
const DESIGN_PHOTOS = [
  { src: 'amazon-conflux.jpg', caption: 'Building design product @ Amazon Conflux 2026', crop: { left: '-3.62%', top: '-10.56%', width: '114.7%', height: '114.7%' } },
  { src: 'seattle-ux-event.jpg', caption: 'Attending UX design events @ Seattle', square: true },
  { src: 'shopback-offsite.jpg', caption: 'Launching research agent @ ShopBack SG Offsite', crop: { left: '-34.73%', top: '-15%', width: '148.23%', height: '123.53%' } },
  { src: 'hci-hackathon.jpg', caption: 'Presenting our product @ TW HCI Hackathon', square: true, crop: { left: '-17.94%', top: '-0.06%', width: '151.94%', height: '100%' } },
]
const LIFE_PHOTOS = [
  { src: 'europe.jpg', caption: 'Traveling @ Europe', square: true, crop: { left: '-27.26%', top: '-11.72%', width: '148%', height: '116.59%' } },
  { src: 'scuba-diving.jpg', caption: 'Scuba diving @ Canary Islands, Spain' },
  { src: 'lego.jpg', caption: 'Playing lego with family and friends', square: true },
  { src: 'volleyball.jpg', caption: 'Playing volleyball with college friends' },
]

const about = {
  // paddingTop + the tab panel's own 16px padding = 32px above the portrait, matching the gaps between sections.
  // paddingInline lines every section up with the portrait's left edge (16px in), mirrored on the right.
  panel: { display: 'flex', flexDirection: 'column', gap: 32, paddingTop: 16, paddingInline: 16 },
  section: { display: 'flex', flexDirection: 'column', gap: 8 },
  heading: { ...articleStyles.title, margin: 0, fontSize: 14, fontWeight: 600 },
  portrait: { width: 214, height: 214, borderRadius: 6, objectFit: 'cover', display: 'block' },
  notes: { width: '100%', height: 'auto', borderRadius: 6, display: 'block' },
  notesButton: { display: 'block', width: '100%', padding: 0, margin: 0, border: 'none', background: 'none', cursor: 'zoom-in' },
  lightbox: {
    position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', cursor: 'zoom-out',
  },
  // White padding around the image: the notes image is cropped tight at the top, so without it the tallest note
  // looks cut off when enlarged.
  lightboxImg: {
    maxWidth: '100%', maxHeight: '100%', boxSizing: 'border-box', padding: 24, background: '#ffffff',
    borderRadius: 8, boxShadow: '0 12px 36px rgba(0,69,120,0.12)', display: 'block',
  },
  // Phones: the image keeps a readable height and scrolls sideways instead of shrinking to the screen width.
  lightboxMobile: { justifyContent: 'flex-start', overflowX: 'auto', padding: '24px 16px' },
  lightboxImgMobile: { maxWidth: 'none', height: 'min(70vh, 408px)', width: 'auto', flexShrink: 0 },
  row: { display: 'grid', gap: 8 },
  photo: { margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 0 },
  frame: { position: 'relative', borderRadius: 6, overflow: 'hidden', maxWidth: '100%' },
  caption: { ...articleStyles.meta, fontSize: 12, textAlign: 'center' },
  journey: { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 6 },
  journeyLine: { fontSize: 14, lineHeight: 'normal', color: articleStyles.meta.color },
}

// "My Design Journey..." lines, from Figma node 359:4673 (copy edited for grammar).
const JOURNEY = [
  '2026 Product Designer at ShopBack, designing membership and identity edge-case flows for deactivated users.',
  '2024 UX Researcher at ShopBack, researching e-commerce products and AI experiences.',
  '2023 Product Designer at OEC Group, designing a B2B logistics platform and finance modules.',
  '2022 UX/UI Design Intern at Cathay Financial Holdings, designing social features to boost engagement in health and fitness.',
]

function AboutPhoto({ src, caption, square, crop }) {
  const frame = square ? { width: 214, aspectRatio: '1 / 1' } : { width: '100%', aspectRatio: '240 / 180' }
  const img = crop
    ? { position: 'absolute', maxWidth: 'none', ...crop }
    : { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }
  return (
    <figure style={about.photo}>
      <div style={{ ...about.frame, ...frame }}>
        <img src={ABOUT_DIR + src} alt={caption} loading="lazy" style={{ ...img, display: 'block' }} />
      </div>
      <figcaption style={about.caption}>{caption}</figcaption>
    </figure>
  )
}

// Click to enlarge: opens over the page on a translucent white backdrop; click anywhere or press Esc to close.
function ZoomableImage({ src, alt }) {
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(false)
  React.useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])
  return (
    <React.Fragment>
      <button type="button" aria-label={`Enlarge: ${alt}`} style={about.notesButton} onClick={() => setOpen(true)}>
        <img src={src} alt={alt} loading="lazy" style={about.notes} />
      </button>
      {/* Rendered on <body> so it sits above the tabs, which stack above the panel. */}
      {open && createPortal(
        <div role="dialog" aria-modal="true" aria-label={alt} style={{ ...about.lightbox, ...(isMobile ? about.lightboxMobile : null) }} onClick={() => setOpen(false)}>
          <img src={src} alt={alt} style={{ ...about.lightboxImg, ...(isMobile ? about.lightboxImgMobile : null) }} />
        </div>,
        document.body,
      )}
    </React.Fragment>
  )
}

function AboutSection({ title, children }) {
  return (
    <section style={about.section}>
      <h3 style={about.heading}>{title}</h3>
      {children}
    </section>
  )
}

function AboutPanel({ isMobile }) {
  const row = { ...about.row, gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)' }
  return (
    <div style={about.panel}>
      <img src={ABOUT_DIR + 'portrait.jpg'} alt="Lana Hung" style={about.portrait} />
      <AboutSection title="My Design Journey...">
        <ul style={about.journey}>
          {JOURNEY.map((line) => <li key={line} style={about.journeyLine}>{line}</li>)}
        </ul>
      </AboutSection>
      <AboutSection title="When It Comes to Design, I Love...">
        <div style={row}>{DESIGN_PHOTOS.map((p) => <AboutPhoto key={p.src} {...p} />)}</div>
      </AboutSection>
      <AboutSection title="From My Colleagues, I Received...">
        <ZoomableImage src={ABOUT_DIR + 'colleague-notes.jpg'} alt="Thank-you notes from colleagues at ShopBack" />
      </AboutSection>
      <AboutSection title="Outside of Work, I Love...">
        <div style={row}>{LIFE_PHOTOS.map((p) => <AboutPhoto key={p.src} {...p} />)}</div>
      </AboutSection>
    </div>
  )
}

export default function HomeV2() {
  const isMobile = useIsMobile()
  const [tab, setTab] = React.useState('work')

  // The site-wide page colour (index.css) is pink, and it shows when the page is pulled past its top
  // edge. Match it to the top of the blue page while the home page is open.
  React.useEffect(() => {
    const html = document.documentElement
    const prev = [html.style.background, document.body.style.background]
    html.style.background = document.body.style.background = '#eff6fc'
    return () => { [html.style.background, document.body.style.background] = prev }
  }, [])

  function selectTab(next) {
    if (next === tab) return
    trackClick(`${next}_tab`, 'home_tabs')
    setTab(next)
  }

  return (
    <div style={s.page}>
      <img src="home-v2/hero-bg-blue.svg" alt="" aria-hidden="true" style={s.heroBg} />
      <BackgroundSparkles />
      <div style={s.content}>
        <header style={{ ...s.topBar, flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 8 : 0 }}>
          <span style={s.name}>Lana Hung</span>
          <ContactLinks isMobile={isMobile} />
        </header>

        <main style={s.main}>
          <Hero />

          <div style={s.folder}>
            <GlassTabs value={tab} onSelect={selectTab} />
            <section role="tabpanel" id={`home-v2-panel-${tab}`} aria-labelledby={`home-v2-tab-${tab}`} style={s.panel}>
              <span aria-hidden="true" style={s.glassSheen} />
              {tab === 'work' ? (
                <div style={{ ...s.workGrid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
                  {HOME_WORKS.map((w) => <CaseStudy key={w.id} {...w} aspectRatio="760 / 487" hoverZoom={false} titleSize={16} />)}
                </div>
              ) : tab === 'article' ? (
                <ArticleList />
              ) : (
                <AboutPanel isMobile={isMobile} />
              )}
            </section>
          </div>
        </main>

        <footer style={s.footer}>
          <div style={s.changelog}>
            <span style={s.changelogLabel}>CHANGELOG</span>
            <span style={s.changelogStamp}>{CHANGELOG_STAMP}</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
