import React, { useEffect } from 'react'
import './ShopBackNMA.css'
import { useScrollSpy, useReveal, RailNav, TopBar, CaseFooter } from './CaseLayout.jsx'

const SECTIONS = [
  { id: 'overview',  label: 'Overview'  },
  { id: 'problem',   label: 'Problem'   },
  { id: 'design',    label: 'Design'    },
  { id: 'impact',    label: 'Impact'    },
  { id: 'takeaways', label: 'Takeaways' },
]

function Hero() {
  return (
    <section className="snma-hero" id="top">
      <span className="snma-blob" aria-hidden="true" />
      <span className="snma-blob b2" aria-hidden="true" />
      <div className="snma-wrap">
        <div className="snma-hero-label">
          UI/UX DESIGNER&nbsp;·&nbsp;PERSONAL PROJECT&nbsp;·&nbsp;OEC GROUP
        </div>

        <h1>
          Rebuilding OEC Portal's{' '}
          <span className="snma-underline">typography</span>{' '}
          system for{' '}
          <span className="snma-accent">clarity and consistency.</span>
        </h1>

        <dl className="snma-meta">
          <div><dt>Role</dt><dd>UI/UX Designer</dd></div>
          <div><dt>Timeline</dt><dd>Apr 2024 · 1 month</dd></div>
          <div><dt>Type</dt><dd>Personal Project</dd></div>
          <div><dt>Tools</dt><dd>Figma</dd></div>
        </dl>

        <div className="snma-stats">
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">3</div>
            <div>
              <div className="snma-stat-lbl">Problems addressed</div>
              <div className="snma-stat-desc">Hierarchy · labels · designer guidance</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">2</div>
            <div>
              <div className="snma-stat-lbl">Design references</div>
              <div className="snma-stat-desc">Jira · Flexport</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">16→32</div>
            <div>
              <div className="snma-stat-lbl">Padding (px)</div>
              <div className="snma-stat-desc">Page title to section title spacing</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">1</div>
            <div>
              <div className="snma-stat-lbl">Style guide created</div>
              <div className="snma-stat-desc">For designers across the team</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Overview() {
  return (
    <section id="overview" className="snma-section alt">
      <div className="snma-wrap">
        <span className="snma-section-label">01 — Overview</span>
        <h2 className="snma-section-title">
          A B2B portal where hierarchy is everything.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 28, maxWidth: 'none' }}>
          The <b>OEC Portal</b> is a B2B product that allows customers to track shipment
          status and communicate with OEC's customer service team. In a data-dense enterprise
          interface, <b>finding information quickly is the top priority</b> — making a clear
          typographic hierarchy critical.
        </p>
        <p className="snma-section-intro" style={{ marginBottom: 48, maxWidth: 'none', color: 'var(--snma-fg-soft)' }}>
          The existing hierarchy wasn't clear enough, leading to user confusion and usability
          issues. I took this on as a personal project: redesign the typography system and
          adjust paddings to improve visual hierarchy, readability, and consistency across
          the entire portal.
        </p>

        <div style={{ background: 'var(--snma-card)', border: '1px solid rgba(26,26,26,0.12)', borderRadius: 'var(--snma-radius)', padding: 32 }}>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 20 }}>Design Process</p>
          <img src="/oec-typo/design-process.png" alt="Design process overview" style={{ width: '100%', borderRadius: 'var(--snma-radius)', display: 'block' }} />
        </div>
      </div>
    </section>
  )
}

function Problem() {
  return (
    <section id="problem" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">02 — Problem Statement</span>
        <h2 className="snma-section-title" style={{ maxWidth: 'none' }}>
          Three layers of confusion in one interface.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          The typography issues affected users, designers, and the product's overall
          visual credibility.
        </p>

        <div className="snma-goals">
          <div className="snma-goal snma-reveal">
            <div className="snma-goal-n">01</div>
            <h3>Page title vs. section title</h3>
            <p>Users struggled to distinguish between page-level titles and section-level titles — the visual difference was too subtle to guide scanning.</p>
          </div>
          <div className="snma-goal snma-reveal">
            <div className="snma-goal-n">02</div>
            <h3>Label marks vs. text content</h3>
            <p>Users found it difficult to differentiate label marks from body text content, causing confusion when reading dense data tables and forms.</p>
          </div>
          <div className="snma-goal snma-reveal">
            <div className="snma-goal-n">03</div>
            <h3>No guidelines for designers</h3>
            <p>Without clear font-picking rules, designers made inconsistent choices across screens — compounding the hierarchy problem at every new feature.</p>
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <img src="/oec-typo/problem-statement.png" alt="Before — existing typography problems annotated" style={{ width: '100%', borderRadius: 'var(--snma-radius)', display: 'block' }} />
        </div>
      </div>
    </section>
  )
}

function Design() {
  return (
    <section id="design" className="snma-section alt">
      <div className="snma-wrap">
        <span className="snma-section-label">03 — Design</span>
        <h2 className="snma-section-title" style={{ maxWidth: 'none' }}>
          Referenced Jira and Flexport. Then built the rules.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          To stay aligned with design trends and industry standards for B2B data-dense
          products, I referenced Jira and Flexport's typographic systems before defining
          our own.
        </p>

        {/* Adjustments */}
        <div className="snma-impact-grid" style={{ marginBottom: 48 }}>
          <div className="snma-impact-card snma-reveal" style={{ gridTemplateColumns: '1fr' }}>
            <div className="snma-impact-text">
              <span className="snma-impact-kind">Key adjustments</span>
              <h3>Spacing and scale — two levers</h3>
              <p>
                The most impactful change was increasing padding between page title and section
                title from <b>16px → 32px</b>, giving the hierarchy room to breathe. Type scale
                and weight distinctions were also refined to make label marks clearly
                distinguishable from body content.
              </p>
              <div className="snma-post-impact">
                Padding between page title &amp; section title: <b>16px → 32px</b>
              </div>
            </div>
            <img src="/oec-typo/design.png" alt="Before / after — typography spacing adjustments" style={{ width: '100%', borderRadius: 'var(--snma-radius)', display: 'block' }} />
          </div>
        </div>

        {/* Guidelines */}
        <div>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 12 }}>
            Font Guidelines
          </p>
          <p style={{ color: 'var(--snma-fg-soft)', fontSize: 14.5, marginBottom: 24 }}>
            Established a font guideline for all designers on the team — specifying which
            type style to use in each context, removing ambiguity from every design decision.
          </p>
          <img src="/oec-typo/guideline.png" alt="Typography style guide — font scales, weights, usage rules" style={{ width: '100%', borderRadius: 'var(--snma-radius)', display: 'block' }} />
        </div>
      </div>
    </section>
  )
}

function Impact() {
  return (
    <section id="impact" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">04 — Impact</span>
        <h2 className="snma-section-title" style={{ maxWidth: 'none' }}>
          Clear hierarchy. Appealing visuals. Guided usage.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          The redesign elevated visual clarity and usability across the entire portal —
          and gave the team a shared framework to maintain consistency going forward.
        </p>

        <div className="snma-impact-grid">
          <div className="snma-impact-card snma-reveal" style={{ gridTemplateColumns: '1fr' }}>
            <div className="snma-impact-text">
              <span className="snma-impact-kind">Product outcome</span>
              <h3>Refreshed experience for users</h3>
              <p>
                The clearer typographic hierarchy reduced confusion when scanning the portal.
                Users could now distinguish page titles from section titles and labels from
                content at a glance — significantly improving the B2B reading experience.
              </p>
              <div className="snma-post-impact">
                Visual clarity and usability <b>significantly elevated</b> post-redesign.
              </div>
            </div>
          </div>

          <div className="snma-impact-card snma-reveal" style={{ gridTemplateColumns: '1fr' }}>
            <div className="snma-impact-text">
              <span className="snma-impact-kind">Team outcome</span>
              <h3>Style guide minimizes design effort</h3>
              <p>
                The added style guide gave the design team a clear usage framework,
                reducing the back-and-forth over font choices and ensuring new features
                inherit the same visual consistency from day one.
              </p>
              <div className="snma-post-impact">
                Fewer design decisions needed per feature — consistency maintained by default.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Takeaways() {
  return (
    <section id="takeaways" className="snma-section alt">
      <div className="snma-wrap">
        <span className="snma-section-label">05 — Takeaways</span>
        <h2 className="snma-section-title" style={{ maxWidth: 'none' }}>
          What I'd carry into the next system project ✨
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          Two things this project reinforced about design systems work.
        </p>
        <div className="snma-takeaways" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="snma-takeaway snma-reveal">
            <h3><span>Small details shape the whole experience</span></h3>
            <p>
              Typography and padding are often overlooked — but once clear rules are
              established, they create harmonious, polished interfaces at scale. The
              impact of a 16px spacing change was visible across every single screen.
            </p>
          </div>
          <div className="snma-takeaway snma-reveal">
            <h3><span>Align with developers early</span></h3>
            <p>
              Initial misunderstandings with front-end developers slowed the process.
              Understanding each other's constraints early on led to a mutually agreeable
              solution — and reminded me that design systems are a collaboration, not a
              hand-off.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function OecTypo() {
  const active = useScrollSpy(SECTIONS)
  useReveal()

  useEffect(() => {
    const prev = document.title
    document.title = 'Lana Hung — OEC Portal Typography System Redesign'
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
      <Hero />
      <Overview />
      <Problem />
      <Design />
      <Impact />
      <Takeaways />
      <CaseFooter />
    </div>
  )
}
