import { useState, useEffect, useRef } from 'react'
import VoxelAvatar from './VoxelAvatar.jsx'
import VoxelMarker from './VoxelMarker.jsx'

// ─── Shared primitives ───────────────────────────────────────

function ArrowOut() {
  return (
    <svg
      width="10" height="10" viewBox="0 0 10 10"
      style={{ display: 'inline-block', marginLeft: 2, verticalAlign: 'baseline' }}
      aria-hidden="true"
    >
      <path
        d="M2.5 7.5L7.5 2.5M7.5 2.5H3.5M7.5 2.5V6.5"
        stroke="currentColor" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
  )
}

function HeroSparkle({ size = 22, top, right, left, bottom, delay = 0 }) {
  const x = 9, y = 9, r = 7, pinch = 14 * 0.14
  const d = [
    `M ${x} ${y - r}`,
    `C ${x + pinch} ${y - pinch} ${x + pinch} ${y - pinch} ${x + r} ${y}`,
    `C ${x + pinch} ${y + pinch} ${x + pinch} ${y + pinch} ${x} ${y + r}`,
    `C ${x - pinch} ${y + pinch} ${x - pinch} ${y + pinch} ${x - r} ${y}`,
    `C ${x - pinch} ${y - pinch} ${x - pinch} ${y - pinch} ${x} ${y - r}`,
    'Z'
  ].join(' ')
  const pos = { position: 'absolute' }
  if (top != null)    pos.top    = top
  if (bottom != null) pos.bottom = bottom
  if (right != null)  pos.right  = right
  if (left != null)   pos.left   = left
  return (
    <svg
      width={size} height={size} viewBox="0 0 18 18"
      style={{
        ...pos,
        pointerEvents: 'none',
        transformOrigin: '50% 50%',
        animation: `heroSparkleTwinkle 2.4s ease-in-out ${delay}s infinite`,
        filter: 'drop-shadow(0 0 5px rgba(185, 163, 214, 0.55))',
      }}
      aria-hidden="true"
    >
      <path d={d} fill="#b9a3d6" />
    </svg>
  )
}

function CopyPill({ label = 'Copy for AI', copiedLabel = 'Copied', getText, ariaLabel }) {
  const [state, setState] = useState('idle')
  const [hover, setHover] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearTimeout(timer.current), [])

  async function onClick() {
    const text = typeof getText === 'function' ? getText() : ''
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.cssText = 'position:fixed;opacity:0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }
      setState('copied')
    } catch {
      setState('error')
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setState('idle'), 1500)
  }

  const isCopied = state === 'copied'
  const isError  = state === 'error'
  const fg = isCopied ? '#3f7a4f' : isError ? '#a4422a' : hover ? 'rgba(58,46,58,0.95)' : 'rgba(58,46,58,0.55)'
  const displayLabel = isCopied ? copiedLabel : isError ? 'Copy failed' : label

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={ariaLabel || label}
      style={{
        display: 'inline-flex', alignItems: 'baseline',
        fontFamily: 'inherit', fontSize: 11.5, fontWeight: 400,
        color: fg, background: 'transparent', border: 'none',
        padding: 0, margin: 0, cursor: 'pointer',
        transition: 'color 0.15s', userSelect: 'none', whiteSpace: 'nowrap',
        textDecoration: 'underline', textDecorationStyle: 'dotted',
        textDecorationColor: 'rgba(58,46,58,0.35)',
        textDecorationThickness: '1px', textUnderlineOffset: 3,
      }}
    >
      <span>{displayLabel}</span>
      <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 5, textDecoration: 'none', position: 'relative', top: 1 }}>
        {isCopied
          ? <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
          : <svg width="11" height="11" viewBox="0 0 12 12"><rect x="3.5" y="3.5" width="6" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.1" fill="none" /><path d="M2 8V2.7C2 2.31 2.31 2 2.7 2H8" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" /></svg>
        }
      </span>
    </button>
  )
}

function Card({ title, children, headerAction, isMobile }) {
  const cardStyle = {
    background: 'rgba(255,255,255,0.92)',
    border: '1px solid rgba(58,46,58,0.08)',
    borderRadius: 6,
    boxShadow: '0 12px 36px rgba(120,80,140,0.08)',
    padding: '12px 14px',
    display: 'flex', flexDirection: 'column', gap: 14,
    minHeight: 0,
    ...(isMobile ? {} : { height: '100%', overflow: 'hidden' }),
  }
  const bodyStyle = isMobile
    ? { display: 'flex', flexDirection: 'column', gap: 14 }
    : {
        display: 'flex', flexDirection: 'column', gap: 14,
        flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden',
        maskImage: 'linear-gradient(to bottom, transparent 0, #000 12px, #000 calc(100% - 12px), transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, #000 12px, #000 calc(100% - 12px), transparent 100%)',
        paddingRight: 6, marginRight: -6,
      }
  return (
    <section style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, minHeight: 22 }}>
        <h2 style={{ margin: 0, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7d68a3' }}>
          {title}
        </h2>
        {headerAction}
      </div>
      <div style={bodyStyle} className={isMobile ? '' : 'col-scroll'}>{children}</div>
    </section>
  )
}

// ─── Hero ────────────────────────────────────────────────────

export function Hero({ isMobile }) {
  return (
    <div style={{ flexShrink: 0 }}>
      <header style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'center',
        gap: isMobile ? 16 : 12,
        padding: isMobile ? '20px 16px 8px' : '24px 24px 14px',
        maxWidth: 1740, margin: '0 auto',
        ...(isMobile ? { flexDirection: 'column', textAlign: 'center' } : {}),
      }}>
        <div style={{ position: 'relative', flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ animation: 'avatarFloat 3.6s ease-in-out infinite', willChange: 'transform' }}>
            <VoxelAvatar size={76} />
          </div>
          <HeroSparkle size={22} top={-6} right={-8} delay={0} />
          <HeroSparkle size={12} bottom={-2} left={-4} delay={1.2} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0, maxWidth: 1080 }}>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: '#3a2e3a', fontWeight: 400 }}>
            Hi, I'm <strong style={{ fontWeight: 600, color: '#2a1e2e' }}>Tz-Jia (Lana) Hung</strong>,
            an incoming HCDE student at the University of Washington.
          </p>
          <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.6, color: 'rgba(58,46,58,0.75)' }}>
            <span style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
              color: '#7a3f6e', background: 'rgba(255,255,255,0.55)',
              padding: '2px 8px', borderRadius: 999,
              border: '0.5px solid rgba(122,63,110,0.15)', marginRight: 4,
            }}>Current</span>{' '}
            UX Researcher at{' '}
            <a href="https://www.shopback.sg/" target="_blank" rel="noopener noreferrer"
              style={{ color: '#5a2c52', textDecoration: 'underline', textDecorationColor: 'rgba(90,44,82,0.35)', textUnderlineOffset: 3, fontWeight: 500 }}>
              ShopBack <ArrowOut />
            </a>
            <span style={{ margin: '0 8px', color: 'rgba(58,46,58,0.35)' }}>·</span>
            Prev. UX designer at{' '}
            <a href="https://www.oecgroup.com/" target="_blank" rel="noopener noreferrer"
              style={{ color: '#5a2c52', textDecoration: 'underline', textDecorationColor: 'rgba(90,44,82,0.35)', textUnderlineOffset: 3, fontWeight: 500 }}>
              OEC Group <ArrowOut />
            </a>
            <span style={{ margin: '0 8px', color: 'rgba(58,46,58,0.35)' }}>·</span>
            Prev. UX design intern at{' '}
            <a href="https://www.cathayholdings.com/holdings/eng/home" target="_blank" rel="noopener noreferrer"
              style={{ color: '#5a2c52', textDecoration: 'underline', textDecorationColor: 'rgba(90,44,82,0.35)', textUnderlineOffset: 3, fontWeight: 500 }}>
              Cathay Financial Holdings <ArrowOut />
            </a>
          </p>
        </div>

        {!isMobile && (
          <div style={{ position: 'relative', flexShrink: 0, width: 50, alignSelf: 'stretch' }}>
            <HeroSparkle size={20} top={-4} right={-6} delay={0.6} />
            <HeroSparkle size={11} top={18} right={16} delay={1.8} />
          </div>
        )}
      </header>
    </div>
  )
}

// ─── About column ─────────────────────────────────────────────

function AboutBlock({ heading, marker, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {marker && <VoxelMarker kind={marker} size={26} />}
        <h3 style={{ margin: 0, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(58,46,58,0.55)' }}>
          {heading}
        </h3>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(58,46,58,0.85)' }}>
        {children}
      </div>
    </div>
  )
}

function buildAboutMarkdown() {
  return [
    `# Tz-Jia (Lana) Hung — About`,
    `Source: portfolio`,
    ``,
    `Hi, I'm Tz-Jia (Lana) Hung, an incoming HCDE student at the University of Washington.`,
    ``,
    `## Intro`,
    `Lana is an **AI-first product maker** and **collaborator** who proactively explores new technologies, shares what she learns with her team, and puts those tools to work solving complex UX problems.`,
    ``,
    `## How I work`,
    `**A designer who can do design, research, and PM work.** A person who can sketch the flow, run the study that questions it, and write the spec that ships it. **Generalist by intent, not by accident.**`,
    ``,
    `## What I value`,
    `> Empathize, listen, deep dive. Put myself in users' shoes, create the room where people feel safe to say what they actually think — then dig until the real problem surfaces.`,
    ``,
    `## What I'm looking for`,
    `Summer 2027 UX design roles on teams where designers, researchers, and PMs fuel each other and build as one!`,
    ``,
    `## Toolkit`,
    `- Design — Claude · Figma · Miro`,
    `- Research — Survicate · Lyssna · Dovetail · Metaview`,
    `- Data — SQL · Python · R · Amplitude · Metabase · Hotjar · GA4 · Excel`,
    `- AI / Build — Claude · Cursor · n8n · Replit`,
    ``,
    `## Awards & Talks`,
    `- Group Winner & Best Presenter — HCI Student Hackathon (Jul 2022)`,
    `- Workshop Host — Cathay FH design workshop (2022)`,
    `- Third Place & Semi-finalist — Atona Case Competition, 75 teams (2020)`,
    ``,
    `## Outside of work`,
    `- LEGO — every Friday evening`,
    `- Volleyball & marathons — since high school`,
    `- Scuba diving — Spain, Malta, Taiwan`,
    ``,
  ].join('\n')
}

export function AboutCol({ isMobile }) {
  return (
    <Card
      title="About"
      isMobile={isMobile}
      headerAction={
        <CopyPill
          label="Copy for AI"
          copiedLabel="Copied context"
          ariaLabel="Copy About section as Markdown for an AI assistant"
          getText={buildAboutMarkdown}
        />
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <AboutBlock heading="Intro" marker="intro">
          <p style={{ margin: 0 }}>
            Lana is an{' '}
            <strong style={{ color: '#2a1e2e', fontWeight: 600 }}>AI-first product maker</strong>{' '}
            and{' '}
            <strong style={{ color: '#2a1e2e', fontWeight: 600 }}>collaborator</strong>{' '}
            who proactively explores new technologies, shares what she learns
            with her team, and puts those tools to work solving complex UX problems.
          </p>
        </AboutBlock>

        <AboutBlock heading="How I work" marker="work">
          <p style={{ margin: 0 }}>
            <strong style={{ color: '#2a1e2e', fontWeight: 600 }}>A designer who can do design, research, and PM work.</strong>{' '}
            A person who can sketch the flow, run the study that questions it,
            and write the spec that ships it.{' '}
            <strong style={{ color: '#2a1e2e', fontWeight: 600 }}>Generalist by intent, not by accident.</strong>
          </p>
        </AboutBlock>

        <AboutBlock heading="What I value" marker="heart">
          <blockquote style={{
            margin: 0, padding: '4px 0 4px 14px',
            borderLeft: '2px solid rgba(122,63,110,0.35)',
            fontStyle: 'italic', color: 'rgba(58,46,58,0.9)',
            fontSize: 13.5, lineHeight: 1.55,
          }}>
            Empathize, listen, deep dive. Put myself in users' shoes,
            create the room where people feel safe to say what they
            actually think — then dig until the real problem surfaces.
          </blockquote>
        </AboutBlock>

        <AboutBlock heading="What I'm looking for" marker="target">
          <div style={{
            background: 'rgba(180,140,210,0.14)',
            border: '0.5px solid rgba(122,63,110,0.18)',
            borderRadius: 10, padding: '10px 12px',
            fontSize: 12.5, lineHeight: 1.55, color: 'rgba(58,46,58,0.9)',
          }}>
            <strong style={{ color: '#5a2c52', fontWeight: 600 }}>Summer 2027 UX design roles</strong>{' '}
            on teams where designers, researchers, and PMs fuel each other and build as one!
          </div>
        </AboutBlock>

        <AboutBlock heading="Toolkit" marker="toolbox">
          <ul style={{ listStyle: 'disc', margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 5, fontSize: 12.5, lineHeight: 1.55, color: 'rgba(58,46,58,0.85)' }}>
            <li>Design — Claude · Figma · Miro</li>
            <li>Research — Survicate · Lyssna · Dovetail · Metaview</li>
            <li>Data — SQL · Python · R · Amplitude · Metabase · Hotjar · GA4 · Excel</li>
            <li>AI / Build — Claude · Cursor · n8n · Replit</li>
          </ul>
        </AboutBlock>

        <AboutBlock heading="Awards & Talks" marker="trophy">
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li>
              <div style={{ fontSize: 13, color: '#2a1e2e', fontWeight: 600, lineHeight: 1.4 }}>Group Winner &amp; Best Presenter</div>
              <div style={{ fontSize: 12, color: 'rgba(58,46,58,0.7)', lineHeight: 1.5 }}>HCI Student Hackathon · Jul 2022</div>
            </li>
            <li>
              <div style={{ fontSize: 13, color: '#2a1e2e', fontWeight: 600, lineHeight: 1.4 }}>Workshop Host</div>
              <div style={{ fontSize: 12, color: 'rgba(58,46,58,0.7)', lineHeight: 1.5 }}>Cathay FH design workshop · 2022</div>
            </li>
            <li>
              <div style={{ fontSize: 13, color: '#2a1e2e', fontWeight: 600, lineHeight: 1.4 }}>Third Place &amp; Semi-finalist</div>
              <div style={{ fontSize: 12, color: 'rgba(58,46,58,0.7)', lineHeight: 1.5 }}>Atona Case Competition (75 teams) · 2020</div>
            </li>
          </ul>
        </AboutBlock>

        <AboutBlock heading="Outside of work" marker="lego">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 13, lineHeight: 1.55, color: 'rgba(58,46,58,0.85)' }}>
            <div>LEGO — every Friday evening</div>
            <div>Volleyball &amp; marathons — since high school</div>
            <div>Scuba diving — Spain, Malta, Taiwan</div>
          </div>
        </AboutBlock>
      </div>
    </Card>
  )
}

// ─── Works column ─────────────────────────────────────────────

const WORKS = [
  {
    id: 'shopback-activation',
    title: 'ShopBack New Market Activation Research',
    role: 'UX Research · ShopBack',
    year: '2025',
    url: 'https://lanahung.framer.website/shopback-nma',
    desc: 'Uncovering root causes of post-signup barriers through a mixed-methods study; findings informed a 7-step onboarding redesign.',
    cover: 'case-covers/shopback.avif',
  },
  {
    id: 'cathay-fitback',
    title: 'Cathay Financial Holdings FitBack Research',
    role: 'UX Research · Cathay FH',
    year: '2024',
    url: 'https://lanahung.framer.website/fitback',
    desc: 'Identified the importance of social features in promoting health awareness and how to design social networking features in the FitBack app.',
    cover: 'case-covers/cathay-fh.avif',
  },
  {
    id: 'oec-finance',
    title: 'OEC Group Finance Module Design',
    role: 'UX Design · OEC Group',
    year: '2023',
    url: 'https://lanahung.framer.website/oec-compliance',
    desc: 'Led 0-to-1 Compliance module design, including report create, edit, and display states.',
    cover: 'case-covers/oec.avif',
  },
]

function buildWorksMarkdown() {
  const header = `# Tz-Jia (Lana) Hung — Selected Work\nSource: portfolio · ${WORKS.length} case studies\n\n`
  const body = WORKS.map((w) => `## ${w.title}\n*${w.role} · ${w.year}*\n\n${w.desc}\n`).join('\n')
  return header + body
}

function CaseStudy({ title, role, year, desc, cover, url }) {
  const [hover, setHover] = useState(false)
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: 12, textDecoration: 'none', color: 'inherit' }}
    >
      <div style={{
        aspectRatio: '16 / 9',
        borderRadius: 12,
        background: 'rgba(255,255,255,0.55)',
        border: '1px solid rgba(58,46,58,0.08)',
        overflow: 'hidden',
        transition: 'transform 0.4s cubic-bezier(.2,.7,.3,1), box-shadow 0.3s',
        transform: hover ? 'scale(1.012)' : 'scale(1)',
        boxShadow: hover ? '0 18px 40px rgba(120,80,140,0.12)' : '0 4px 14px rgba(120,80,140,0.06)',
      }}>
        {cover
          ? <img src={cover} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(58,46,58,0.32)', fontWeight: 500 }}>
              {role.split(' · ')[1] || 'Case study'}
            </div>
        }
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#2a1e2e', letterSpacing: '-0.01em' }}>{title}</h3>
          <span style={{ fontSize: 12, color: 'rgba(58,46,58,0.55)' }}>{role} · {year}</span>
        </div>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: 'rgba(58,46,58,0.78)' }}>{desc}</p>
      </div>
    </a>
  )
}

export function WorksCol({ isMobile }) {
  return (
    <Card
      title="Work"
      isMobile={isMobile}
      headerAction={
        <CopyPill
          label="Copy for AI"
          copiedLabel="Copied links"
          ariaLabel="Copy all work case studies as Markdown for an AI assistant"
          getText={buildWorksMarkdown}
        />
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {WORKS.map((w) => <CaseStudy key={w.id} {...w} />)}
      </div>
    </Card>
  )
}

// ─── Articles column ──────────────────────────────────────────

const ARTICLES = [
  { title: 'Applying to HCI Masters in the Age of AI (Fall 2026)', date: 'Apr 2026', readMin: 11, url: 'https://medium.com/@LanaHung/applying-to-hci-masters-in-the-age-of-ai-fall-2026-915eab17fdcd' },
  { title: 'Assessing the Need for SB Pay Onboarding Using SQL and GSheets', date: 'Apr 2026', readMin: 7, url: 'https://medium.com/@LanaHung/assessing-the-need-for-sb-pay-onboarding-using-sql-and-gsheets-a44cf881261d' },
  { title: 'Segmenting Users by Defining User Properties from Behavioral Data', date: 'Sep 2025', readMin: 6, url: 'https://medium.com/@LanaHung/segmenting-users-by-defining-user-properties-from-behavior-data-526a9dd102d6' },
  { title: 'Defining and Evaluating Metrics with Xmrit Charts for the Withdrawal Experience', date: 'Aug 2025', readMin: 8, url: 'https://medium.com/@LanaHung/defining-and-evaluating-metrics-along-with-xmrit-charts-for-withdrawal-experience-f44e3a56a105' },
  { title: 'Using PostgreSQL to Segment Users and Solve In-App Survey Trigger Point Problem', date: 'Aug 2025', readMin: 7, url: 'https://medium.com/@LanaHung/using-postgresql-to-solve-an-in-app-survey-trigger-point-problem-bdc337310696' },
  { title: 'Using ClaudeAI and Python to Run an F-Test in UX Research', date: 'Aug 2025', readMin: 6, url: 'https://medium.com/@LanaHung/using-claudeai-and-python-to-run-an-f-test-in-ux-research-2d2bd6254637' },
  { title: 'Leveraging a Design Background to Conduct Better UX Research', date: 'Jan 2025', readMin: 5, url: 'https://medium.com/@LanaHung/connecting-the-dots-leveraging-a-design-background-to-conduct-better-ux-research-05b51a3b3be7' },
  { title: 'Holding a Metaverse Product Design Workshop', date: 'Jul 2023', readMin: 6, url: 'https://medium.com/@LanaHung/2022-holding-a-metaverse-product-design-workshop-35784812e25c' },
  { title: 'Cathay Financial Holdings UX/UI Design Internship Review (2/2)', date: 'May 2023', readMin: 9, url: 'https://medium.com/@LanaHung/2022-cathay-financial-holdings-ux-ui-design-internship-review-2-2-a7d4b01277fe' },
  { title: 'Cathay Financial Holdings UX/UI Design Internship Review (1/2)', date: 'May 2023', readMin: 8, url: 'https://medium.com/@LanaHung/2022-cathay-financial-holdings-ux-ui-design-internship-review-1-2-c7d6bb9701a9' },
  { title: 'Acer PM Summer Intern Application Review', date: 'Jan 2023', readMin: 8, url: 'https://medium.com/@LanaHung/2022-acer-pm-summer-intern-application-review-a59cea43a668' },
]

function buildArticlesMarkdown() {
  const header = `# Tz-Jia (Lana) Hung — Writing\nSource: portfolio · ${ARTICLES.length} articles on Medium (@LanaHung)\n\n`
  const body = ARTICLES.map((a) => `- [${a.title}](${a.url}) — ${a.date} · ${a.readMin} min read`).join('\n')
  return header + body + '\n'
}

export function ArticlesCol({ isMobile }) {
  return (
    <Card
      title="Article"
      isMobile={isMobile}
      headerAction={
        <CopyPill
          copiedLabel="Copied links"
          ariaLabel="Copy all article links as Markdown for an AI assistant"
          getText={buildArticlesMarkdown}
        />
      }
    >
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {ARTICLES.map((a, i) => (
          <li key={i}>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '10px 12px', borderRadius: 10, textDecoration: 'none', color: 'inherit', transition: 'background 0.15s' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.55)'
                const arr = e.currentTarget.querySelector('[data-arr]')
                if (arr) arr.style.transform = 'translateX(2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                const arr = e.currentTarget.querySelector('[data-arr]')
                if (arr) arr.style.transform = 'translateX(0)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
                <span style={{ fontSize: 13.5, color: '#2a1e2e', fontWeight: 500, lineHeight: 1.4 }}>{a.title}</span>
                <span style={{ fontSize: 11.5, color: 'rgba(58,46,58,0.55)' }}>
                  {a.date}
                  {a.readMin != null && (
                    <><span style={{ margin: '0 6px', color: 'rgba(58,46,58,0.35)' }}>·</span>{a.readMin} min read</>
                  )}
                </span>
              </div>
              <span data-arr style={{ color: 'rgba(58,46,58,0.45)', transition: 'transform 0.18s', flexShrink: 0 }}>
                <ArrowOut />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Card>
  )
}

// ─── Status bar ───────────────────────────────────────────────

const CHANGELOG_STAMP = __BUILD_TIME__

const CONTACT_LINKS = [
  { label: 'Resume',   href: 'https://drive.google.com/file/d/1RJ9YajZ4Arcvg7RzmP4fnIOglAN0m11H/view?usp=sharing' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tzjia-hung/' },
  { label: 'Medium',   href: 'https://medium.com/@lanahung' },
  { label: 'Email',    href: 'mailto:tzjia.hung@gmail.com' },
]

export function StatusBar({ isMobile }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: isMobile ? '12px 16px 18px' : '8px 32px',
      fontSize: 12, color: 'rgba(58,46,58,0.6)',
      fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, monospace',
      letterSpacing: '0.02em', flexShrink: 0,
      ...(isMobile ? { flexDirection: 'column', alignItems: 'flex-start', gap: 8 } : {}),
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: 'rgba(58,46,58,0.45)' }}>CHANGELOG</span>
        <span style={{ color: 'rgba(58,46,58,0.7)' }}>{CHANGELOG_STAMP}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
        {CONTACT_LINKS.map((l, i) => (
          <span key={l.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {i > 0 && <span style={{ color: 'rgba(58,46,58,0.3)' }}>·</span>}
            <a
              href={l.href}
              target={l.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{ color: 'rgba(58,46,58,0.7)', textDecoration: 'none', padding: '4px 8px', borderRadius: 6, transition: 'background 0.15s, color 0.15s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(180,140,210,0.14)'; e.currentTarget.style.color = 'rgba(58,46,58,0.95)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(58,46,58,0.7)' }}
            >
              {l.label}
            </a>
          </span>
        ))}
      </div>
    </div>
  )
}
