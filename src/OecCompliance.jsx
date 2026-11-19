import React, { useEffect } from 'react'
import './ShopBackNMA.css'
import { useScrollSpy, RailNav, TopBar, CaseFooter, CaseCover, CaseMeta } from './CaseLayout.jsx'

const SECTIONS = [
  { id: 'overview',  label: 'Overview'  },
  { id: 'problem',   label: 'Problem',  sub: true },
  // Design groups the three sections below it.
  { id: 'design',    label: 'Design'    },
  { id: 'flow',      label: 'User flow', sub: true },
  { id: 'proposals', label: 'Exploration', sub: true },
  { id: 'demo',      label: 'Demo',     sub: true },
  { id: 'impact',    label: 'Impact'    },
  { id: 'reflection', label: 'Reflection' },
]

function Hero() {
  return (
    <section className="snma-hero" id="top">
      <div className="snma-wrap">
        <h1>0 → 1 Finance Compliance Module for a Logistics Company</h1>
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
        <div><dt>Team</dt><dd>1 PM, 1 Designer, 2 Engineers</dd></div>
        <div><dt>Duration</dt><dd>Sep 2024 · 1 month</dd></div>
        <div><dt>Tools</dt><dd>Figma · Confluence · Jira</dd></div>
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
          Moving a global logistics company's finance workflow online
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 0, maxWidth: 'none' }}>
          <b>OEC Group</b> is a leading NVOCC freight forwarding company with cargo volume consistently
          ranking <b>top 2 for Trans-Pacific Trade</b>. Our organization provides freight transportation,
          logistics, and information services to over <b>50,000 customers</b> across North America,
          Europe, Asia, South America, Australia, and the Middle East.
        </p>
        <img src="/oec-fin/offices-map.jpg" width={2400} height={1350} alt="World map of OEC Group offices in Seattle, New York, Mexico City, Shanghai, Shenzhen, Taipei and Singapore" loading="lazy" style={{ width: '100%', height: 'auto', marginTop: 40, borderRadius: 'var(--snma-radius)', display: 'block' }} />
      </div>
    </section>
  )
}

function Problem() {
  return (
    <section id="problem" className="snma-section" style={{ paddingTop: 72 }}>
      <div className="snma-wrap">
        <span className="snma-section-label">Problem</span>
        <h2 className="snma-section-title">
          Paper-based compliance creates real operational pain
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          Accounting managers and operations teams had no digital system to
          retrieve and manage shipping invoices for compliance. The manual process was slow, fragmented,
          and error-prone, so we needed a dedicated module inside OEC's finance portal, designed <b>from 0 to 1</b>.
        </p>

        <div className="snma-goals">
          <div className="snma-goal">
            <div className="snma-goal-n">01</div>
            <h3>Hard to locate invoices</h3>
            <p>Accounting managers had no centralized place to retrieve shipping invoices required for regulatory compliance — documents were scattered across paper records.</p>
          </div>
          <div className="snma-goal">
            <div className="snma-goal-n">02</div>
            <h3>Time-consuming process</h3>
            <p>Manually searching for and cross-referencing invoice records consumed significant time, slowing down compliance reporting cycles.</p>
          </div>
          <div className="snma-goal">
            <div className="snma-goal-n">03</div>
            <h3>High human error risk</h3>
            <p>Without a digital system, manual data entry and document handling increased the likelihood of errors that could affect compliance accuracy.</p>
          </div>
        </div>

      </div>
    </section>
  )
}

function DesignGoals() {
  return (
    <section id="design" className="snma-section" style={{ paddingBottom: 0 }}>
      <div className="snma-wrap">
        <span className="snma-section-label">Design</span>
        <h2 className="snma-section-title" style={{ marginBottom: 24 }}>What we needed to design</h2>
        <ol className="snma-goal-list" style={{ marginBottom: 0 }}>
          <li>
            <h4>Add new compliances</h4>
            <p>Help users quickly find the right shipping invoices and file a compliance, replacing the slow, error-prone paper process.</p>
          </li>
          <li>
            <h4>View previously added compliances</h4>
            <p>Keep every past compliance in one place, so users can check what was already filed.</p>
          </li>
          <li>
            <h4>Send compliance data back to the main system</h4>
            <p>Push finished compliance data to the ERP, so records stay in sync without re-entering them by hand.</p>
          </li>
        </ol>
      </div>
    </section>
  )
}

function Flow() {
  return (
    <section id="flow" className="snma-section" style={{ paddingTop: 72, paddingBottom: 0 }}>
      <div className="snma-wrap">
        <span className="snma-section-label">User Flow</span>
        <h2 className="snma-section-title">Adding a compliance in 4 steps</h2>
        <p className="snma-section-intro" style={{ marginBottom: 56 }}>
          The core interaction centers on adding a new compliance record — a four-action
          sequence that lets users query, filter, select, and confirm the right invoices.
        </p>

        <div className="snma-method-grid">
          <div className="snma-method-card a">
            <div className="snma-method-ic">1</div>
            <h3>Enter inquiries</h3>
            <p style={{ color: 'var(--snma-fg-soft)', margin: 0 }}>
              User inputs query parameters — shipment details, date ranges, or reference numbers —
              to narrow down which invoices are relevant for the compliance requirement.
            </p>
          </div>
          <div className="snma-method-card b">
            <div className="snma-method-ic">2</div>
            <h3>Filter invoices</h3>
            <p style={{ color: 'var(--snma-fg-soft)', margin: 0 }}>
              The system surfaces matching invoices. Users apply additional filters to refine
              results before moving to selection.
            </p>
          </div>
          <div className="snma-method-card a">
            <div className="snma-method-ic">3</div>
            <h3>Select invoices</h3>
            <p style={{ color: 'var(--snma-fg-soft)', margin: 0 }}>
              Users select the relevant invoices from the filtered list to attach to the
              new compliance record.
            </p>
          </div>
          <div className="snma-method-card b">
            <div className="snma-method-ic">4</div>
            <h3>Confirm selections</h3>
            <p style={{ color: 'var(--snma-fg-soft)', margin: 0 }}>
              A final review step before the compliance data is saved and sent back to
              the main ERP system.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0em', color: 'var(--snma-fg-mute)', marginBottom: 12 }}>
            User flow diagram
          </p>
          {/* Grey frame matching the screen designs below (their #DCDCDC background is baked into the images), with extra padding so the diagram sits smaller */}
          <div style={{ background: '#DCDCDC', padding: '5%', borderRadius: 10 }}>
            <img src="/oec-fin/o1.webp" alt="Full user flow — add compliance, view compliances, send to system" loading="lazy" width={1159} height={647} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

const PROPOSALS = [
  {
    tag: 'Exploration A',
    title: 'CTA below empty state',
    body: 'Display a call-to-action button beneath the empty state on the compliance list page.',
    caveat: 'Inquiry options only become visible after the user clicks the button — extra step, lower discoverability.',
    accepted: false,
    img: '/oec-fin/o2.webp',
    w: 4096, h: 2206,
    alt: 'Exploration A — CTA below empty state mockup',
  },
  {
    tag: 'Exploration B',
    title: 'Inquiries within Invoice section',
    body: 'Place the inquiry input fields directly inside the Invoice section card.',
    caveat: 'Card-in-card component structure creates visual complexity and an awkward nesting hierarchy.',
    accepted: false,
    img: '/oec-fin/o3.webp',
    w: 3840, h: 2752,
    alt: 'Exploration B — card-in-card mockup',
  },
  {
    tag: 'Exploration C',
    title: 'Transfer component',
    body: 'Use a transfer/shuttle component to let users move invoices from available to selected.',
    caveat: 'Layout limitations prevent users from viewing all required invoice columns simultaneously.',
    accepted: false,
    img: '/oec-fin/o4.webp',
    w: 4096, h: 1775,
    alt: 'Exploration C — transfer component mockup',
  },
  {
    tag: 'Exploration D',
    title: 'Upfront query with inline filtering',
    body: 'Enable users to enter query parameters upfront, with filtering applied directly inside a dialog — all columns visible, no nesting issues.',
    caveat: null,
    accepted: true,
    img: '/oec-fin/o5.webp',
    w: 4096, h: 1365,
    alt: 'Exploration D — direct inquiries with dialog mockup',
  },
]

function Design() {
  return (
    <section id="proposals" className="snma-section" style={{ paddingTop: 72, paddingBottom: 0 }}>
      <div className="snma-wrap">
        <span className="snma-section-label">Exploration</span>
        <h2 className="snma-section-title">
          Four explorations for the invoice selection step
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 32, maxWidth: 'none' }}>
          The core design challenge was the invoice selection step — how should users enter
          query criteria and select invoices without losing context or introducing unnecessary complexity?
        </p>

        <div className="snma-impact-grid" style={{ gap: 48 }}>
          {PROPOSALS.map((p) => (
            <div key={p.tag} className="snma-impact-card" style={{ gridTemplateColumns: '1fr', padding: 0 }}>
              <div className="snma-impact-text">
                <h3>{p.tag}: {p.title}</h3>
                <p>
                  {p.body}
                  {p.caveat && (
                    <>
                      <br />
                      ⚠️&nbsp;{p.caveat}
                    </>
                  )}
                </p>
                {p.accepted && (
                  <div className="snma-post-impact">
                    ✓&nbsp;<b>Selected</b>&nbsp;— balances query discoverability with full invoice visibility.
                  </div>
                )}
              </div>
              <img src={p.img} alt={p.alt} loading="lazy" width={p.w} height={p.h} style={{ width: '100%', height: 'auto', borderRadius: 10, marginTop: 8 }} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

function Demo() {
  return (
    <section id="demo" className="snma-section" style={{ paddingTop: 72 }}>
      <div className="snma-wrap">
        <span className="snma-section-label">Demo</span>
        <h2 className="snma-section-title">
          Prototype walkthrough
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 40, maxWidth: 'none' }}>
          End-to-end flow of the shipped Compliance module — from creating a new compliance record to sending data back to the main system.
        </p>
        {/* Gradient backdrop; the video's baked-in black device frame (8px sides/top, 11px bottom,
            camera notch at x 892–1145, y 8–54 of 2034×1330) is cropped away and the notch is
            painted over with the browser bar colour. */}
        <div className="oec-demo">
          <div className="oec-demo-screen">
            <video src="/oec-fin/o6.mp4" width={2034} height={1330} autoPlay loop muted playsInline />
            <span className="oec-demo-notch" aria-hidden="true" />
          </div>
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
        <div className="snma-stats">
          <div className="snma-stat">
            <div className="snma-stat-n">0→1</div>
            <div>
              <div className="snma-stat-lbl">Full design scope</div>
              <div className="snma-stat-desc">End-to-end module, no prior designs</div>
            </div>
          </div>
          <div className="snma-stat">
            <div className="snma-stat-n">4</div>
            <div>
              <div className="snma-stat-lbl">Design explorations</div>
              <div className="snma-stat-desc">Explored before landing on final</div>
            </div>
          </div>
          <div className="snma-stat">
            <div className="snma-stat-n">50<span className="sm">K</span></div>
            <div>
              <div className="snma-stat-lbl">OEC customers</div>
              <div className="snma-stat-desc">Across North America, Europe, Asia</div>
            </div>
          </div>
          <div className="snma-stat">
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

function Takeaways() {
  return (
    <section id="reflection" className="snma-section snma-section-end">
      <div className="snma-wrap">
        <span className="snma-section-label">Reflection</span>
        <h2 className="snma-section-title snma-reflection-title">What I'd carry into the next design sprint</h2>
        <ol className="snma-goal-list snma-reflection-list">
          <li>
            <h4>Explore before committing</h4>
            <p>Running four distinct explorations, even knowing some wouldn't work, gave the team a shared language for trade-offs. Showing why explorations A, B, and C failed made it much easier for stakeholders to trust exploration D.</p>
          </li>
          <li>
            <h4>Enterprise constraints shape design</h4>
            <p>Component libraries, existing ERP patterns, and column visibility requirements were non-negotiable. The best design was the one that worked within those constraints, not the most elegant in isolation.</p>
          </li>
        </ol>
      </div>
    </section>
  )
}

export default function OecCompliance() {
  const active = useScrollSpy(SECTIONS)

  useEffect(() => {
    const prev = document.title
    document.title = 'Lana Hung — OEC Finance Compliance Module'
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
      <CaseCover src="/case-covers/oec-compliance-thumbnail.webp" width={960} height={640} alt="OEC Group Finance Module Design" uncropped />
      <Hero />
      <Meta />
      <Overview />
      <Problem />
      <DesignGoals />
      <Flow />
      <Design />
      <Demo />
      <Impact />
      <Takeaways />
      <CaseFooter />
    </div>
  )
}
