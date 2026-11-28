import React, { useEffect } from 'react'
import './ShopBackNMA.css'
import { useScrollSpy, RailNav, TopBar, CaseFooter, CaseCover, CaseMeta } from './CaseLayout.jsx'

const SECTIONS = [
  { id: 'overview',   label: 'Overview'   },
  { id: 'problem',    label: 'Problem',   sub: true },
  { id: 'role',       label: 'My Role',   sub: true },
  // Design groups the section below it.
  { id: 'design',     label: 'Design'     },
  { id: 'guidelines', label: 'Font Guidelines', sub: true },
  { id: 'impact',     label: 'Impact'     },
  { id: 'reflection', label: 'Reflection' },
]

// Same image frame as OEC Compliance (gradient image plus a separate grain tile), in this page's deeper blues.
const framedImg = { width: '100%', height: 'auto', display: 'block', borderRadius: 12, boxShadow: '0 12px 32px rgba(20, 40, 90, 0.18)' }
// For cut-out images with see-through areas: the shadow follows the shapes, not the image's box.
const cutoutImg = { width: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0 12px 32px rgba(20, 40, 90, 0.18))' }

function Hero() {
  return (
    <section className="snma-hero" id="top">
      <div className="snma-wrap">
        <h1>
          Rebuilding OEC Portal's{' '}
          Typography{' '}
          System
        </h1>
      </div>
    </section>
  )
}

// Project info (team, timeline, tools), shown below the title.
function Meta() {
  return (
    <CaseMeta>
      <dl className="snma-meta">
        <div><dt>My Role</dt><dd>UI/UX Designer</dd></div>
        <div><dt>Timeline</dt><dd>Apr 2024 · 1 month</dd></div>
        <div><dt>Scope</dt><dd>Typography System · Spacing</dd></div>
        <div><dt>Tools</dt><dd>Figma</dd></div>
      </dl>
    </CaseMeta>
  )
}

function Overview() {
  return (
    <section id="overview" className="snma-section" style={{ paddingBottom: 0 }}>
      <div className="snma-wrap">
        <span className="snma-section-label">Overview</span>
        <h2 className="snma-section-title">
          A B2B portal where hierarchy is everything
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 0, maxWidth: 'none' }}>
          The <b>OEC Portal</b> is a B2B product that lets customers track shipment status and talk with
          OEC's customer service team. In a data-dense enterprise interface, <b>finding information quickly
          is the top priority</b>, which makes a clear typographic hierarchy critical.
        </p>
      </div>
    </section>
  )
}

function Problem() {
  return (
    <section id="problem" className="snma-section" style={{ paddingTop: 72, paddingBottom: 0 }}>
      <div className="snma-wrap">
        <span className="snma-section-label">Problem</span>
        <h2 className="snma-section-title">
          The type hierarchy wasn't clear enough
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 24, maxWidth: 'none' }}>
          The existing typography confused users, slowed designers down, and made the product look less polished.
        </p>
        <ol className="snma-goal-list" style={{ marginBottom: 0 }}>
          <li>
            <h4>Page titles and section titles looked alike</h4>
            <p>The size difference was too small, so users couldn't tell a page title from a section title while scanning.</p>
          </li>
          <li>
            <h4>Labels blended into content</h4>
            <p>Field labels and their values looked the same, which made dense forms and tables hard to read.</p>
          </li>
          <li>
            <h4>No rules for picking a font size</h4>
            <p>Designers chose type case by case, so every new feature added more inconsistency.</p>
          </li>
        </ol>
        <div className="oec-demo oectypo-frame" style={{ marginTop: 40 }}>
          <img src="/oec-typo/problem-screen.png" width={907} height={669} alt="The OEC Portal account page before the redesign, annotated with the three problems: page and section titles can't be distinguished, labels and content can't be differentiated, and it's hard to decide which font size to use" loading="lazy" style={framedImg} />
        </div>
      </div>
    </section>
  )
}

function MyRole() {
  return (
    <section id="role" className="snma-section" style={{ paddingTop: 72 }}>
      <div className="snma-wrap">
        <span className="snma-section-label">My Role</span>
        <h2 className="snma-section-title">
          Redesigning the portal's typography system
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 0, maxWidth: 'none' }}>
          I redesigned the typography system and adjusted spacing to improve visual hierarchy, readability
          and consistency across the whole portal, then wrote a font guideline for the design team.
        </p>
      </div>
    </section>
  )
}

function Design() {
  return (
    <section id="design" className="snma-section" style={{ paddingBottom: 0 }}>
      <div className="snma-wrap">
        <span className="snma-section-label">Design</span>
        <h2 className="snma-section-title">
          Two levers: spacing and type scale
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 0, maxWidth: 'none' }}>
          To stay in line with industry standards for data-dense B2B products, I referenced Jira's and
          Flexport's type systems before defining our own.
        </p>
        <p className="snma-section-intro" style={{ marginTop: 16, marginBottom: 0, maxWidth: 'none' }}>
          The biggest change was doubling the space between the page title and the section title,
          from <b>16px to 32px</b>, so the hierarchy has room to breathe. I also refined type sizes and
          weights so labels stand apart from content.
        </p>
        <div className="oec-demo oectypo-frame" style={{ marginTop: 40 }}>
          <img src="/oec-typo/design-screens.png" width={881} height={666} alt="Before and after of the account page: page title to section title spacing goes from 16px to 32px, and title, section and label font sizes drop to 20px, 16px and 12px" loading="lazy" style={cutoutImg} />
        </div>
      </div>
    </section>
  )
}

function Guidelines() {
  return (
    <section id="guidelines" className="snma-section" style={{ paddingTop: 72 }}>
      <div className="snma-wrap">
        <span className="snma-section-label">Font Guidelines</span>
        <h2 className="snma-section-title">
          One rulebook for every type decision
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 0, maxWidth: 'none' }}>
          I wrote a font guideline for every designer on the team, spelling out which type style to use
          where, so no one has to guess.
        </p>
        <div className="oec-demo oectypo-frame" style={{ marginTop: 40 }}>
          <img src="/oec-typo/guideline-card.png" width={888} height={561} alt="Font guideline general rules: Title, Label and Body styles in L, M and S sizes, each with where to use it" loading="lazy" style={cutoutImg} />
        </div>
      </div>
    </section>
  )
}

function Impact() {
  return (
    <section id="impact" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">Impact</span>
        <h2 className="snma-section-title">
          A clearer portal, and one rulebook for the team
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 32, maxWidth: 'none' }}>
          The new type scale and spacing made every portal screen easier to scan, and the guideline kept new features consistent.
        </p>
        <div className="snma-impact-rows">
          <div className="snma-impact-row">
            <div className="snma-impact-row-text">
              <h3>Clearer hierarchy on every screen</h3>
              <p>Users can tell page titles from section titles, and labels from content, at a glance.</p>
            </div>
          </div>
          <div className="snma-impact-row">
            <div className="snma-impact-row-text">
              <h3>One style guide for the whole team</h3>
              <p>Designers pick type from a shared set of rules, so new features stay consistent with less back and forth.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Takeaways() {
  return (
    <section id="reflection" className="snma-section snma-section-end">
      <div className="snma-wrap">
        <span className="snma-section-label">Reflection</span>
        <h2 className="snma-section-title snma-reflection-title">What I'd carry into the next system project</h2>
        <ol className="snma-goal-list snma-reflection-list">
          <li>
            <h4>Small details shape the whole experience</h4>
            <p>Typography and padding are often overlooked, but once clear rules are established, they create harmonious, polished interfaces at scale. The impact of a 16px spacing change was visible across every single screen.</p>
          </li>
          <li>
            <h4>Align with developers early</h4>
            <p>Initial misunderstandings with front-end developers slowed the process. Understanding each other's constraints early on led to a mutually agreeable solution and reminded me that design systems are a collaboration, not a hand-off.</p>
          </li>
        </ol>
      </div>
    </section>
  )
}

export default function OecTypo() {
  const active = useScrollSpy(SECTIONS)

  useEffect(() => {
    const prev = document.title
    document.title = 'OEC Typography System'
    const prevBg = document.body.style.background
    const prevColor = document.body.style.color
    document.body.style.background = '#FFFFFF'
    document.body.style.color = '#1A1A1A'
    document.documentElement.style.scrollBehavior = 'smooth'
    document.documentElement.style.scrollPaddingTop = '80px'
    return () => {
      document.title = prev
      document.body.style.background = prevBg
      document.body.style.color = prevColor
      document.documentElement.style.scrollBehavior = ''
      document.documentElement.style.scrollPaddingTop = ''
    }
  }, [])

  return (
    <div className="snma-root oectypo-root">
      <RailNav sections={SECTIONS} active={active} />
      <TopBar sections={SECTIONS} />
      <CaseCover src="/case-covers/oec-typography-thumbnail.webp" width={1280} height={853} alt="OEC Group Typography System Redesign" uncropped />
      <Hero />
      <Meta />
      <Overview />
      <Problem />
      <MyRole />
      <Design />
      <Guidelines />
      <Impact />
      <Takeaways />
      <CaseFooter />
    </div>
  )
}
