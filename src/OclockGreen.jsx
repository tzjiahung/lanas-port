import React, { useEffect } from 'react'
import './ShopBackNMA.css'
import { useScrollSpy, useReveal, RailNav, TopBar, CaseFooter } from './CaseLayout.jsx'

const SECTIONS = [
  { id: 'overview',  label: 'Overview'  },
  { id: 'research',  label: 'Research'  },
  { id: 'design',    label: 'Design'    },
  { id: 'test',      label: 'Test'      },
  { id: 'takeaways', label: 'Takeaways' },
]

function Hero() {
  return (
    <section className="snma-hero" id="top">
      <span className="snma-blob" aria-hidden="true" />
      <span className="snma-blob b2" aria-hidden="true" />
      <div className="snma-wrap">
        <div className="snma-hero-label">
          UX RESEARCHER &amp; DESIGNER&nbsp;·&nbsp;SIDE PROJECT&nbsp;·&nbsp;O'CLOCK GREEN
        </div>

        <h1>
          A{' '}
          <span className="snma-underline">reusable cup</span>{' '}
          rental system to cut Taiwan's{' '}
          <span className="snma-accent">paper cup waste.</span>
        </h1>

        <dl className="snma-meta">
          <div><dt>Role</dt><dd>UX Researcher, UX/UI Designer</dd></div>
          <div><dt>Timeline</dt><dd>Nov – Dec 2023 · 1 month</dd></div>
          <div><dt>Tools</dt><dd>Figma · Miro</dd></div>
          <div><dt>Team</dt><dd>Matthew, Hannah, Shannon</dd></div>
        </dl>

        <div className="snma-stats">
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">4</div>
            <div>
              <div className="snma-stat-lbl">Team members</div>
              <div className="snma-stat-desc">Cross-functional side project team</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">8</div>
            <div>
              <div className="snma-stat-lbl">Usability test participants</div>
              <div className="snma-stat-desc">In-depth interviews + SUS</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">3</div>
            <div>
              <div className="snma-stat-lbl">Test methods</div>
              <div className="snma-stat-desc">Usability testing · Card sorting · SUS</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">78<span className="sm">/100</span></div>
            <div>
              <div className="snma-stat-lbl">SUS score</div>
              <div className="snma-stat-desc">System Usability Score · Grade B</div>
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
          A digital product born from Taiwan's plastic ban.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 28, maxWidth: 'none' }}>
          Taiwan changed its policy on single-use plastic cups in 2022 to reduce plastic waste.
          But many shops simply switched to <b>paper cups</b> — and customers kept using
          disposable containers out of habit and convenience.
        </p>
        <p className="snma-section-intro" style={{ marginBottom: 48, maxWidth: 'none', color: 'var(--snma-fg-soft)' }}>
          O'Clock is a <b>software + hardware</b> solution that emerged from the SDG wave.
          Together with three teammates, we designed a reusable cup rental system that lets
          customers borrow and return cups at in-store cabinets — entirely through LINE,
          Taiwan's most popular messaging platform, with no extra app to download.
        </p>

        <div style={{ background: 'var(--snma-card)', border: '1px solid rgba(26,26,26,0.12)', borderRadius: 'var(--snma-radius)', padding: 32 }}>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 20 }}>Research &amp; Design Process</p>
          <img src="/oclock/oprocess.png" alt="Research and Design Process overview diagram" loading="lazy" style={{ width: '100%', borderRadius: 'var(--snma-radius)' }} />
        </div>
      </div>
    </section>
  )
}

function Research() {
  return (
    <section id="research" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">02 — Research</span>
        <h2 className="snma-section-title" style={{ maxWidth: 'none' }}>
          Understanding why people don't bring reusable cups.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          We started with secondary research to understand the policy landscape, then used
          the STP method to identify our target users before mapping their journey.
        </p>

        {/* Table Research */}
        <div style={{ marginBottom: 56 }}>
          <span className="snma-section-label" style={{ fontSize: 11 }}>Table Research</span>
          <div className="snma-impact-grid" style={{ marginTop: 20 }}>
            <div className="snma-impact-card snma-reveal" style={{ gridTemplateColumns: '1fr' }}>
              <div className="snma-impact-text">
                <span className="snma-impact-kind">Policy context</span>
                <h3>Incentives exist — but don't work</h3>
                <p>
                  Taipei City implemented a complete ban on single-use plastic cups.
                  Convenience stores offer a 5 NTD discount for customers who bring reusable cups.
                  Yet despite these incentives, most people still perceive bringing a reusable cup
                  as <b>"troublesome"</b> or <b>"inconvenient."</b>
                </p>
                <div className="snma-post-impact">
                  Current market solutions — wider cup variety, recyclable cups — have failed to
                  significantly increase willingness to use eco-friendly containers.
                </div>
              </div>
              <img src="/oclock/otable.png" alt="Table research — policy landscape and market solutions" loading="lazy" style={{ width: '100%', borderRadius: 10, marginTop: 8 }} />
            </div>
          </div>
        </div>

        {/* Target Users */}
        <div style={{ marginBottom: 56 }}>
          <span className="snma-section-label" style={{ fontSize: 11 }}>Target Users — STP Method</span>
          <p className="snma-section-intro" style={{ marginTop: 12, marginBottom: 32, maxWidth: 'none', color: 'var(--snma-fg-soft)' }}>
            Businesses affected by the single-use plastic ban include: chain beverage shops,
            coffee shops, fast food restaurants, and supermarkets. We used STP (Segmentation,
            Targeting, Positioning) to narrow our focus.
          </p>
          <img src="/oclock/ostp.png" alt="STP method — segmentation, targeting, positioning diagram" loading="lazy" style={{ width: '100%', borderRadius: 'var(--snma-radius)' }} />
        </div>

        {/* Customer Journey Map */}
        <div>
          <span className="snma-section-label" style={{ fontSize: 11 }}>Customer Journey Map</span>
          <p className="snma-section-intro" style={{ marginTop: 12, marginBottom: 32, maxWidth: 'none', color: 'var(--snma-fg-soft)' }}>
            We mapped the end-to-end experience to surface pain points and opportunities
            across the beverage purchase journey.
          </p>
          <img src="/oclock/ocjm.png" alt="Customer journey map" loading="lazy" style={{ width: '100%', borderRadius: 'var(--snma-radius)' }} />
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
          Rent a cup. Order coffee. Return. All on LINE.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          We focused on the software side — a LINE Official Account that handles the full
          rental and ordering flow, so users never need to download another app.
        </p>

        {/* Design Goals */}
        <div className="snma-goals" style={{ marginBottom: 56 }}>
          <div className="snma-goal snma-reveal">
            <div className="snma-goal-n">01</div>
            <h3>Eliminate carrying reusable cups</h3>
            <p>Customers shouldn't need to remember to bring their own cup — the cabinet at the store provides one.</p>
          </div>
          <div className="snma-goal snma-reveal">
            <div className="snma-goal-n">02</div>
            <h3>Improve purchase efficiency</h3>
            <p>Streamline the making and purchasing of coffee by combining ordering and cup rental into one flow.</p>
          </div>
          <div className="snma-goal snma-reveal">
            <div className="snma-goal-n">03</div>
            <h3>No new app needed</h3>
            <p>Build entirely within LINE — Taiwan's most used platform — to minimise onboarding friction.</p>
          </div>
        </div>

        {/* User Flow */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 12 }}>
            User Flow
          </p>
          <p style={{ color: 'var(--snma-fg-soft)', fontSize: 14.5, marginBottom: 24 }}>
            The flow covers renting a cabinet, ordering coffee, and the store employee's order-receiving flow.
          </p>
          <img src="/oclock/ouserflow.png" alt="User flow — customer renting cabinet, ordering coffee, store employee flow" loading="lazy" style={{ width: '100%', borderRadius: 'var(--snma-radius)' }} />
        </div>

        {/* Wireframe */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 12 }}>
            Wireframe
          </p>
          <img src="/oclock/owireframe.png" alt="Wireframes" loading="lazy" style={{ width: '100%', borderRadius: 'var(--snma-radius)' }} />
        </div>

        {/* Visual Identity */}
        <div style={{ marginBottom: 48, background: 'var(--snma-card)', border: '1px solid rgba(26,26,26,0.12)', borderRadius: 'var(--snma-radius)', padding: 32 }}>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 16 }}>
            Visual Identity
          </p>
          <p style={{ color: 'var(--snma-fg-soft)', fontSize: 14.5, marginBottom: 24 }}>
            Green as the primary color — representing sustainability. Orange as the secondary —
            representing warmth and the color of coffee. The combination is inviting and signals
            eco-friendliness without feeling austere.
          </p>
          <img src="/oclock/odesignsys.png" alt="Color scheme, typography, button styles and component library" loading="lazy" style={{ width: '100%', borderRadius: 'var(--snma-radius)' }} />
        </div>

        {/* Prototype */}
        <div>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 12 }}>
            Prototype — 5 key screens
          </p>
          <p style={{ color: 'var(--snma-fg-soft)', fontSize: 14.5, marginBottom: 24 }}>
            Select store → select date → select cabinet → choose coffee → collect order.
          </p>
          <img src="/oclock/oproto.png" alt="High-fidelity prototype — 5 main screens" loading="lazy" style={{ width: '100%', borderRadius: 'var(--snma-radius)' }} />
        </div>
      </div>
    </section>
  )
}

function Test() {
  return (
    <section id="test" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">04 — Test</span>
        <h2 className="snma-section-title" style={{ maxWidth: 'none' }}>
          Three methods. One honest picture.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          We combined usability testing, card sorting, and SUS scoring to triangulate
          how customers experienced the product.
        </p>

        <div className="snma-impact-grid">
          {/* Usability Testing */}
          <div className="snma-impact-card snma-reveal" style={{ gridTemplateColumns: '1fr' }}>
            <div className="snma-impact-text">
              <span className="snma-impact-kind">Usability Testing · 8 participants</span>
              <h3>3 scenarios, 3 tasks, affinity diagram</h3>
              <p>
                The test script was structured around 3 scenarios and 3 tasks, combined with
                UI-related questions. We analyzed qualitative results using an affinity diagram
                and organized main problems onto a quadrant chart.
              </p>
              <div className="snma-post-impact">
                Key issues mapped to a priority quadrant for iteration planning.
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 8 }}>
              <img src="/oclock/oaffinity.jpg" alt="Affinity diagram" loading="lazy" style={{ width: '100%', borderRadius: 10 }} />
              <img src="/oclock/otestingresults.png" alt="Problem quadrant chart" loading="lazy" style={{ width: '100%', borderRadius: 10 }} />
            </div>
          </div>

          {/* Card Sorting */}
          <div className="snma-impact-card snma-reveal" style={{ gridTemplateColumns: '1fr' }}>
            <div className="snma-impact-text">
              <span className="snma-impact-kind">Card Sorting · 16 adjectives</span>
              <h3>Effective, innovative, easy — top 3 picks</h3>
              <p>
                Each participant chose 3 words from 16 adjectives (positive and negative) to
                describe their experience. <b>Effective</b>, <b>innovative</b>, and{' '}
                <b>easy</b> were the most chosen — all positive. But a small number chose
                "unpredictable" and "ineffective," pointing to friction in the user flow that
                we planned to refine in the next iteration.
              </p>
            </div>
            <img src="/oclock/ocardresults.png" alt="Card sorting results" loading="lazy" style={{ width: '100%', borderRadius: 10, marginTop: 8 }} />
          </div>

          {/* SUS */}
          <div className="snma-impact-card snma-reveal" style={{ gridTemplateColumns: '1fr' }}>
            <div className="snma-impact-text">
              <span className="snma-impact-kind">System Usability Score</span>
              <h3>78 / 100 — Grade B, room to reach A</h3>
              <p>
                The SUS result scored 78 out of 100, placing us in grade B. We identified the
                gap to grade A as driven by the "unpredictable" interactions flagged in card
                sorting — primarily in the user flow handoff between renting a cup and ordering coffee.
              </p>
              <div className="snma-post-impact">
                Next iteration: refine user flow to reduce unpredictable steps.
              </div>
            </div>
            <img src="/oclock/osus.png" alt="SUS score breakdown" loading="lazy" style={{ width: '100%', borderRadius: 10, marginTop: 8 }} />
          </div>
        </div>

        {/* Mentor Feedback */}
        <div style={{ marginTop: 48, background: 'var(--snma-card)', border: '1px solid rgba(26,26,26,0.12)', borderRadius: 'var(--snma-radius)', padding: 32 }}>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 24 }}>
            Workshop Mentor Feedback
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <div style={{ borderTop: '2px solid var(--snma-accent1)', paddingTop: 20 }}>
              <div style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, color: 'var(--snma-accent1)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 10 }}>Strengths</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--snma-fg-soft)', margin: 0 }}>
                "A potential product incorporating both online and offline elements — a seamless,
                convenient solution. Problem statement is clear and market analysis helps readers
                understand the research."
              </p>
            </div>
            <div style={{ borderTop: '2px solid rgba(26,26,26,0.16)', paddingTop: 20 }}>
              <div style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, color: 'var(--snma-fg-mute)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 10 }}>Suggestions</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--snma-fg-soft)', margin: 0 }}>
                "Think more specifically about what kind of users would want this — the persona
                could be clearer. Consider also interviewing coffee shop employees to understand
                if there would be any disturbance to their workflow."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Takeaways() {
  return (
    <section id="takeaways" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">05 — Takeaways</span>
        <h2 className="snma-section-title" style={{ maxWidth: 'none' }}>
          What I'd carry into the next sprint ✨
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          Two reflections from completing a full end-to-end case study in under two weeks.
        </p>
        <div className="snma-takeaways" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="snma-takeaway snma-reveal">
            <h3><span>Design and deliver under time pressure</span></h3>
            <p>
              My teammates and I had nearly two weeks to complete this end-to-end case study.
              We collaborated and divided work according to individual strengths — and shipped.
              Constraints sharpen decision-making.
            </p>
          </div>
          <div className="snma-takeaway snma-reveal">
            <h3><span>Interview both sides of the product</span></h3>
            <p>
              We only tested with customers (B2C). In hindsight, interviewing coffee shop
              employees (B2B) would have surfaced operational concerns earlier — and made
              our persona and problem statement sharper.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function OclockGreen() {
  const active = useScrollSpy(SECTIONS)
  useReveal()

  useEffect(() => {
    const prev = document.title
    document.title = "Lana Hung — O'Clock Green App Design"
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
    <div className="snma-root oclock-root">
      <RailNav sections={SECTIONS} active={active} />
      <TopBar sections={SECTIONS} />
      <Hero />
      <Overview />
      <Research />
      <Design />
      <Test />
      <Takeaways />
      <CaseFooter />
    </div>
  )
}
