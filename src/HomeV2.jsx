import React from 'react'
import VoxelMarker from './VoxelMarker.jsx'
import {
  trackEvent, ArrowOut, HeroSparkle, CaseStudy,
  WORKS, ARTICLES, articleStyles, CONTACT_LINKS, CHANGELOG_STAMP,
} from './Portfolio.jsx'

// New home page, built from Figma "home-page-v5" (node 263:6479).
// This is the home page. The previous home page (Portfolio.jsx) is kept at #/home-v1, unlinked.

const CONTENT_MAX = 1200
const MOBILE_BP = 760

// The design shows the first six case studies in a two-column grid.
// O'Clock and FooMa use widened copies of their covers (edges stretched outward in the image's own
// background colour) so their square images aren't cropped by the wider card.
const WIDE_COVERS = {
  'oclock-green': 'home-v2/covers/oclock-green.jpg',
  'fooma-omo': 'home-v2/covers/fooma.jpg',
}
const HOME_WORKS = WORKS.slice(0, 6).map((w) => (WIDE_COVERS[w.id] ? { ...w, cover: WIDE_COVERS[w.id] } : w))

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
  border: '1px solid rgba(58,46,58,0.08)',
  background: 'linear-gradient(135deg, #f2e5ef, #e8dbf2)',
}

function ArticleThumb({ url }) {
  const src = thumbFor(url)
  return (
    <div style={thumbStyle} aria-hidden="true">
      {src && <img src={src} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
    </div>
  )
}

const s = {
  page: {
    position: 'relative', minHeight: '100vh', overflowX: 'hidden',
    fontFamily: "'Lato', ui-sans-serif, system-ui, -apple-system, sans-serif",
    // The hero background image (959px tall) fades to white at its bottom edge, so the page is white
    // from there down. Stops are in px so the seam lines up at any page height (phones are much taller).
    background: 'linear-gradient(180deg, #f2e5ef 0px, #ffffff 959px, #fffffe 100%)',
  },
  heroBg: {
    position: 'absolute', top: 0, left: 0, width: '100%', height: 959,
    display: 'block', pointerEvents: 'none', userSelect: 'none',
  },
  content: { position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' },
  topBar: {
    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '10px 23px 8px',
  },
  name: { fontSize: 16, lineHeight: '25.6px', fontWeight: 700, letterSpacing: '-0.01em', color: '#5a2c52' },
  links: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, letterSpacing: '0.02em' },
  link: {
    color: 'rgba(58,46,58,0.7)', textDecoration: 'none', padding: '4px 8px', borderRadius: 6,
    transition: 'background 0.15s, color 0.15s',
  },
  dot: { color: 'rgba(58,46,58,0.3)' },
  main: { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: '0 8px' },
  hero: { width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0 24px' },
  intro: { margin: 0, maxWidth: 1576, fontSize: 16, lineHeight: '25.6px', fontWeight: 400, letterSpacing: '-0.01em', color: '#5a2c52', textAlign: 'center', textWrap: 'pretty' },
  introStrong: { fontWeight: 700, cursor: 'default' },
  roles: { width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center', paddingBottom: 4 },
  role: { position: 'relative', width: 230, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, paddingTop: 24 },
  roleImgBox: { width: 230, height: 181, overflow: 'hidden' },
  roleImg: { width: 230, height: 288, display: 'block' },
  roleLabel: {
    textAlign: 'center', borderRadius: 12, padding: '0 12px',
    fontSize: 16, lineHeight: '25.6px', fontWeight: 700, letterSpacing: '-0.01em', color: '#5a2c52',
    transition: 'background 0.2s',
  },
  folder: { width: '100%', maxWidth: CONTENT_MAX, display: 'flex', flexDirection: 'column' },
  tabs: { display: 'flex', alignItems: 'flex-end', gap: 4, minHeight: 18 },
  tab: {
    flex: '1 0 0', minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    padding: '8px 16px', margin: 0, cursor: 'pointer', fontFamily: 'inherit',
    border: '1px solid rgba(58,46,58,0.08)', borderBottom: 'none', borderRadius: '6px 6px 0 0',
    filter: 'drop-shadow(0 12px 18px rgba(120,80,140,0.08))',
  },
  tabLabel: { fontSize: 16, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#7d68a3' },
  panel: {
    // Sits above the unselected tab so that tab's shadow tucks under the white panel.
    position: 'relative', zIndex: 1,
    background: '#ffffff',
    border: '1px solid rgba(58,46,58,0.08)', borderTop: 'none', borderRadius: '0 0 8px 8px',
    boxShadow: '0 12px 36px rgba(120,80,140,0.08)', padding: 16,
  },
  workGrid: { display: 'grid', gap: 24 },
  footer: { width: '100%', display: 'flex', justifyContent: 'center', padding: '24px 23px' },
  changelog: { display: 'flex', alignItems: 'center', gap: 10 },
  changelogLabel: { fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: 'rgba(58,46,58,0.45)' },
  changelogStamp: { fontSize: 12, letterSpacing: '0.02em', color: 'rgba(58,46,58,0.7)' },
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
            onClick={() => trackEvent('click', { button_label: l.label, section: 'home-v2-header' })}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(180,140,210,0.14)'; e.currentTarget.style.color = 'rgba(58,46,58,0.95)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(58,46,58,0.7)' }}
          >
            {l.label}
          </a>
        </React.Fragment>
      ))}
    </nav>
  )
}

// Hero roles, from Figma node 254:90. Each one pairs a phrase in the intro with an avatar.
// Hovering the phrase or the avatar plays that avatar's GIF and highlights its label; otherwise it shows a still frame.
// Sparkles: `big` sits at the avatar's top right, `small` at its bottom left.
const ROLES = [
  { id: 'ai',        label: 'AI Experience Designer', still: 'home-v2/avatars/ai.png',        gif: 'home-v2/avatars/ai.gif',        big: true,  small: true },
  { id: 'ecommerce', label: 'E-commerce Designer',    still: 'home-v2/avatars/ecommerce.png', gif: 'home-v2/avatars/ecommerce.gif', big: false, small: true },
  { id: 'b2b',       label: 'B2B System Designer',    still: 'home-v2/avatars/b2b.png',       gif: 'home-v2/avatars/b2b.gif',       big: false, small: true },
  { id: 'fintech',   label: 'Fintech Designer',       still: 'home-v2/avatars/fintech.png',   gif: 'home-v2/avatars/fintech.gif',   big: true,  small: false },
  { id: 'research',  label: 'Design Researcher',      still: 'home-v2/avatars/research.png',  gif: 'home-v2/avatars/research.gif',  big: true,  small: true },
]

function RolePhrase({ role, active, onActive, children }) {
  return (
    <strong
      style={s.introStrong}
      onMouseEnter={() => onActive(role)}
      onMouseLeave={() => onActive(null)}
    >
      {children}
    </strong>
  )
}

// True while at least half of `ref`'s element is on screen. Only watches when `enabled`.
function useInView(ref, enabled) {
  const [inView, setInView] = React.useState(false)
  React.useEffect(() => {
    const el = ref.current
    if (!enabled || !el || typeof IntersectionObserver === 'undefined') { setInView(false); return }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, enabled])
  return inView
}

// Phones and other touch screens can't hover, so there each avatar plays while it's in view instead.
function useAutoPlay(isMobile) {
  const [noHover, setNoHover] = React.useState(() => typeof window !== 'undefined' && window.matchMedia?.('(hover: none)').matches)
  React.useEffect(() => {
    const mq = window.matchMedia?.('(hover: none)')
    if (!mq) return
    const onChange = () => setNoHover(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isMobile || noHover
}

function RoleAvatar({ role, active: hovered, onActive, autoPlay }) {
  const ref = React.useRef(null)
  const inView = useInView(ref, autoPlay)
  const active = hovered || inView
  return (
    <div ref={ref} style={s.role} onMouseEnter={() => onActive(role.id)} onMouseLeave={() => onActive(null)}>
      <div style={s.roleImgBox}>
        {/* Swapping in the GIF on hover starts it from the first frame; swapping back stops it. */}
        <img
          key={active ? 'gif' : 'still'}
          src={active ? role.gif : role.still}
          alt=""
          aria-hidden="true"
          style={s.roleImg}
        />
      </div>
      {role.big && <HeroSparkle size={42} top={25} left={168} />}
      {role.small && <HeroSparkle size={26} top={200} left={-9} delay={1.2} />}
      <span style={{ ...s.roleLabel, background: active ? '#ffffff' : 'transparent' }}>{role.label}</span>
    </div>
  )
}

function Hero({ isMobile }) {
  const [active, setActive] = React.useState(null)
  const autoPlay = useAutoPlay(isMobile)
  const phrase = (id, text) => (
    <RolePhrase role={id} active={active === id} onActive={setActive}>{text}</RolePhrase>
  )
  return (
    <section style={s.hero}>
      <p style={s.intro}>
        An AI-first product designer with 3+ years of experience designing {phrase('ai', 'AI')},{' '}
        {phrase('ecommerce', 'E-commerce')}, {phrase('b2b', 'B2B')}, and {phrase('fintech', 'Fintech products')}.<br />
        Currently studying {phrase('research', 'Human Centered Design & Engineering')} @ UW in Seattle.
      </p>
      <div style={{ ...s.roles, gap: isMobile ? 16 : 32 }}>
        {ROLES.map((role) => <RoleAvatar key={role.id} role={role} active={active === role.id} onActive={setActive} autoPlay={autoPlay} />)}
      </div>
    </section>
  )
}

function Tab({ id, label, active, onSelect }) {
  return (
    <button
      type="button" role="tab" id={`home-v2-tab-${id}`} aria-selected={active} aria-controls={`home-v2-panel-${id}`}
      onClick={() => onSelect(id)}
      style={{
        ...s.tab,
        background: active ? '#ffffff' : '#f7f7f7',
        // The selected tab joins the white panel below it: no shadow, and it covers the seam.
        ...(active ? { filter: 'none', position: 'relative', zIndex: 2, marginBottom: -1, paddingBottom: 9 } : null),
      }}
    >
      <VoxelMarker kind="work" size={22} />
      <span style={s.tabLabel}>{label}</span>
    </button>
  )
}

function ArticleList() {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {ARTICLES.map((a, i) => (
        <li key={a.url}>
          <a
            href={a.url}
            target="_top"
            style={articleStyles.link}
            onClick={() => trackEvent('click', { button_label: a.title, section: 'home-v2-articles' })}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(180,140,210,0.08)'
              const arr = e.currentTarget.querySelector('[data-arr]')
              if (arr) arr.style.transform = 'translateX(2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              const arr = e.currentTarget.querySelector('[data-arr]')
              if (arr) arr.style.transform = 'translateX(0)'
            }}
          >
            <span style={{ ...articleStyles.num, fontFamily: 'inherit' }}>{String(i + 1).padStart(2, '0')}</span>
            <ArticleThumb url={a.url} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0, flex: 1 }}>
              <span style={{ ...articleStyles.title, fontSize: 14, fontWeight: 600 }}>{a.title}</span>
              <span style={articleStyles.meta}>
                {a.date}
                {a.readMin != null && (
                  <React.Fragment>
                    <span style={articleStyles.metaDot}>·</span>
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

export default function HomeV2() {
  const isMobile = useIsMobile()
  const [tab, setTab] = React.useState('work')

  function selectTab(next) {
    if (next === tab) return
    trackEvent('click', { button_label: next === 'work' ? 'Work tab' : 'Article tab', section: 'home-v2' })
    setTab(next)
  }

  return (
    <div style={s.page}>
      <img src="home-v2/hero-bg.svg" alt="" aria-hidden="true" style={s.heroBg} />
      <div style={s.content}>
        <header style={{ ...s.topBar, flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'flex-start' : 'center', gap: isMobile ? 8 : 0 }}>
          <span style={s.name}>Lana Hung</span>
          <ContactLinks isMobile={isMobile} />
        </header>

        <main style={s.main}>
          <Hero isMobile={isMobile} />

          <div style={s.folder}>
            <div role="tablist" aria-label="Work and articles" style={s.tabs}>
              <Tab id="work" label="Work" active={tab === 'work'} onSelect={selectTab} />
              <Tab id="article" label="Article" active={tab === 'article'} onSelect={selectTab} />
            </div>
            <section role="tabpanel" id={`home-v2-panel-${tab}`} aria-labelledby={`home-v2-tab-${tab}`} style={s.panel}>
              {tab === 'work' ? (
                <div style={{ ...s.workGrid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
                  {HOME_WORKS.map((w) => <CaseStudy key={w.id} {...w} aspectRatio="760 / 487" hoverZoom={false} />)}
                </div>
              ) : (
                <ArticleList />
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
