import React, { useEffect } from 'react'
import './ShopBackNMA.css'
import { useScrollSpy, useReveal, RailNav, TopBar, CaseFooter } from './CaseLayout.jsx'

const SECTIONS = [
  { id: 'overview',  label: 'Overview'  },
  { id: 'problem',   label: 'Problem'   },
  { id: 'flow',      label: 'User Flow' },
  { id: 'design',    label: 'Design'    },
  { id: 'demo',      label: 'Demo'      },
  { id: 'takeaways', label: 'Takeaways' },
]

function Hero() {
  return (
    <section className="snma-hero" id="top">
      <span className="snma-blob" aria-hidden="true" />
      <span className="snma-blob b2" aria-hidden="true" />
      <div className="snma-wrap">
        <div className="snma-hero-label">
          LEAD UX DESIGNER&nbsp;·&nbsp;SHIPPED&nbsp;·&nbsp;OEC GROUP
        </div>

        <h1>
          0-to-1{' '}
          <span className="snma-underline">Compliance</span>{' '}
          module for OEC Group's{' '}
          <span className="snma-accent">internal ERP portal.</span>
        </h1>

        <dl className="snma-meta">
          <div><dt>Team</dt><dd>1 PM, 1 Designer, 2 Engineers</dd></div>
          <div><dt>Duration</dt><dd>Sep 2024 · 1 month</dd></div>
          <div><dt>Deliverables</dt><dd>IA · User Flow · Wireframe · Prototype</dd></div>
          <div><dt>Tools</dt><dd>Figma · Confluence · Jira</dd></div>
        </dl>

        <div className="snma-stats">
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">0→1</div>
            <div>
              <div className="snma-stat-lbl">Full design scope</div>
              <div className="snma-stat-desc">End-to-end module, no prior designs</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">4</div>
            <div>
              <div className="snma-stat-lbl">Design proposals</div>
              <div className="snma-stat-desc">Explored before landing on final</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">50<span className="sm">K</span></div>
            <div>
              <div className="snma-stat-lbl">OEC customers</div>
              <div className="snma-stat-desc">Across North America, Europe, Asia</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">1<span className="sm">mo</span></div>
            <div>
              <div className="snma-stat-lbl">End-to-end</div>
              <div className="snma-stat-desc">IA to shipped prototype</div>
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
          A freight forwarding giant going digital.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 28, maxWidth: 'none' }}>
          <b>OEC Group</b> is a leading NVOCC freight forwarding company with cargo volume consistently
          ranking <b>top 2 for Transpacific Trade</b>. The organization provides freight transportation,
          logistics, and information services to over <b>50,000 customers</b> across North America,
          Europe, Asia, South America, Australia, and the Middle East.
        </p>
        <p className="snma-section-intro" style={{ marginBottom: 48, maxWidth: 'none', color: 'var(--snma-fg-soft)' }}>
          Internal users — accounting managers and operations teams in Taipei and Shanghai —
          needed a dedicated module inside OEC's ERP portal to handle regulatory compliance.
          The goal: design it <b>from 0 to 1</b>.
        </p>

        <div style={{ background: 'var(--snma-card)', border: '1px solid rgba(26,26,26,0.12)', borderRadius: 'var(--snma-radius)', padding: 32 }}>
          <p className="snma-section-intro" style={{ maxWidth: 'none', marginBottom: 16 }}>
            The Compliance module allows users to <b>add new compliances</b>,{' '}
            <b>view previously added compliances</b>, and{' '}
            <b>send compliance data back to the main system</b>.
          </p>
          <p className="snma-section-intro" style={{ color: 'var(--snma-fg-soft)', maxWidth: 'none', margin: 0 }}>
            Users can efficiently locate shipping invoices to satisfy regulatory compliance requirements
            — replacing a slow, error-prone paper-based process.
          </p>
        </div>
      </div>
    </section>
  )
}

function Problem() {
  return (
    <section id="problem" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">02 — Problem</span>
        <h2 className="snma-section-title" style={{ maxWidth: 'none' }}>
          Paper-based compliance creates real operational pain.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          Before this module, accounting managers had no digital system to retrieve and manage
          shipping invoices for compliance. The manual process was slow, fragmented, and error-prone.
        </p>

        <div className="snma-goals">
          <div className="snma-goal snma-reveal">
            <div className="snma-goal-n">01</div>
            <h3>Hard to locate invoices</h3>
            <p>Accounting managers had no centralized place to retrieve shipping invoices required for regulatory compliance — documents were scattered across paper records.</p>
          </div>
          <div className="snma-goal snma-reveal">
            <div className="snma-goal-n">02</div>
            <h3>Time-consuming process</h3>
            <p>Manually searching for and cross-referencing invoice records consumed significant time, slowing down compliance reporting cycles.</p>
          </div>
          <div className="snma-goal snma-reveal">
            <div className="snma-goal-n">03</div>
            <h3>High human error risk</h3>
            <p>Without a digital system, manual data entry and document handling increased the likelihood of errors that could affect compliance accuracy.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Flow() {
  return (
    <section id="flow" className="snma-section alt">
      <div className="snma-wrap">
        <span className="snma-section-label">03 — User Flow</span>
        <h2 className="snma-section-title">Adding a compliance in 4 steps.</h2>
        <p className="snma-section-intro" style={{ marginBottom: 56 }}>
          The core interaction centers on adding a new compliance record — a four-action
          sequence that lets users query, filter, select, and confirm the right invoices.
        </p>

        <div className="snma-method-grid">
          <div className="snma-method-card a snma-reveal">
            <div className="snma-method-ic">1</div>
            <h3>Enter inquiries</h3>
            <p style={{ color: 'var(--snma-fg-soft)', margin: 0 }}>
              User inputs query parameters — shipment details, date ranges, or reference numbers —
              to narrow down which invoices are relevant for the compliance requirement.
            </p>
          </div>
          <div className="snma-method-card b snma-reveal">
            <div className="snma-method-ic">2</div>
            <h3>Filter invoices</h3>
            <p style={{ color: 'var(--snma-fg-soft)', margin: 0 }}>
              The system surfaces matching invoices. Users apply additional filters to refine
              results before moving to selection.
            </p>
          </div>
          <div className="snma-method-card a snma-reveal">
            <div className="snma-method-ic">3</div>
            <h3>Select invoices</h3>
            <p style={{ color: 'var(--snma-fg-soft)', margin: 0 }}>
              Users select the relevant invoices from the filtered list to attach to the
              new compliance record.
            </p>
          </div>
          <div className="snma-method-card b snma-reveal">
            <div className="snma-method-ic">4</div>
            <h3>Confirm selections</h3>
            <p style={{ color: 'var(--snma-fg-soft)', margin: 0 }}>
              A final review step before the compliance data is saved and sent back to
              the main ERP system.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 12 }}>
            User flow diagram
          </p>
          <img src="/oec-fin/o1.webp" alt="Full user flow — add compliance, view compliances, send to system" loading="lazy" style={{ width: '100%', borderRadius: 'var(--snma-radius)' }} />
        </div>
      </div>
    </section>
  )
}

const PROPOSALS = [
  {
    tag: 'Proposal A',
    title: 'CTA below empty state',
    body: 'Display a call-to-action button beneath the empty state on the compliance list page.',
    caveat: 'Inquiry options only become visible after the user clicks the button — extra step, lower discoverability.',
    accepted: false,
    img: '/oec-fin/o2.webp',
    alt: 'Proposal A — CTA below empty state mockup',
  },
  {
    tag: 'Proposal B',
    title: 'Inquiries within Invoice section',
    body: 'Place the inquiry input fields directly inside the Invoice section card.',
    caveat: 'Card-in-card component structure creates visual complexity and an awkward nesting hierarchy.',
    accepted: false,
    img: '/oec-fin/o3.webp',
    alt: 'Proposal B — card-in-card mockup',
  },
  {
    tag: 'Proposal C',
    title: 'Transfer component',
    body: 'Use a transfer/shuttle component to let users move invoices from available to selected.',
    caveat: 'Layout limitations prevent users from viewing all required invoice columns simultaneously.',
    accepted: false,
    img: '/oec-fin/o4.webp',
    alt: 'Proposal C — transfer component mockup',
  },
  {
    tag: 'Proposal D — Final',
    title: 'Upfront query with inline filtering',
    body: 'Enable users to enter query parameters upfront, with filtering applied directly inside a dialog — all columns visible, no nesting issues.',
    caveat: null,
    accepted: true,
    img: '/oec-fin/o5.webp',
    alt: 'Proposal D — direct inquiries with dialog mockup',
  },
]

function Design() {
  return (
    <section id="design" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">04 — Design proposals</span>
        <h2 className="snma-section-title" style={{ maxWidth: 'none' }}>
          Four proposals. One clear winner.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          The core design challenge was the invoice selection step — how should users enter
          query criteria and select invoices without losing context or introducing unnecessary complexity?
        </p>

        <div className="snma-impact-grid">
          {PROPOSALS.map((p) => (
            <div key={p.tag} className="snma-impact-card snma-reveal" style={{ gridTemplateColumns: '1fr' }}>
              <div className="snma-impact-text">
                <span className="snma-impact-kind">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                {p.caveat && (
                  <div className="snma-post-impact" style={{ background: 'rgba(26,26,26,0.04)', color: 'var(--snma-fg-soft)' }}>
                    ⚠️&nbsp;{p.caveat}
                  </div>
                )}
                {p.accepted && (
                  <div className="snma-post-impact">
                    ✓&nbsp;<b>Selected</b>&nbsp;— balances query discoverability with full invoice visibility.
                  </div>
                )}
              </div>
              <img src={p.img} alt={p.alt} loading="lazy" style={{ width: '100%', borderRadius: 10, marginTop: 8 }} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

function Demo() {
  return (
    <section id="demo" className="snma-section alt">
      <div className="snma-wrap">
        <span className="snma-section-label">05 — Demo</span>
        <h2 className="snma-section-title" style={{ maxWidth: 'none' }}>
          Prototype walkthrough.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 40, maxWidth: 'none' }}>
          End-to-end flow of the shipped Compliance module — from creating a new compliance record to sending data back to the main system.
        </p>
        <video
          src="/oec-fin/o6.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', borderRadius: 'var(--snma-radius)', display: 'block' }}
        />
      </div>
    </section>
  )
}

function Takeaways() {
  return (
    <section id="takeaways" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">06 — Takeaways</span>
        <h2 className="snma-section-title" style={{ maxWidth: 'none' }}>
          What I'd carry into the next design sprint ✨
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          Two things this project taught me about 0-to-1 design in an enterprise context.
        </p>
        <div className="snma-takeaways" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="snma-takeaway snma-reveal">
            <h3><span>Explore before committing</span></h3>
            <p>
              Running four distinct proposals — even knowing some wouldn't work — gave the team
              a shared language for trade-offs. Showing why proposals A, B, and C failed made
              it much easier for stakeholders to trust proposal D.
            </p>
          </div>
          <div className="snma-takeaway snma-reveal">
            <h3><span>Enterprise constraints shape design</span></h3>
            <p>
              Component libraries, existing ERP patterns, and column visibility requirements
              were non-negotiable. The best design was the one that worked within those constraints —
              not the most elegant in isolation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function OecCompliance() {
  const active = useScrollSpy(SECTIONS)
  useReveal()

  useEffect(() => {
    const prev = document.title
    document.title = 'Lana Hung — OEC ERP Compliance Module'
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
    <div className="snma-root oec-root">
      <RailNav sections={SECTIONS} active={active} />
      <TopBar sections={SECTIONS} />
      <Hero />
      <Overview />
      <Problem />
      <Flow />
      <Design />
      <Demo />
      <Takeaways />
      <CaseFooter />
    </div>
  )
}
