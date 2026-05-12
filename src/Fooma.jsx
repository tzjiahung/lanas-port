import React, { useEffect } from 'react'
import './ShopBackNMA.css'
import { useScrollSpy, useReveal, RailNav, TopBar, CaseFooter } from './CaseLayout.jsx'

const SECTIONS = [
  { id: 'overview',  label: 'Overview'  },
  { id: 'research',  label: 'Research'  },
  { id: 'design',    label: 'Design'    },
  { id: 'feedback',  label: 'Feedback'  },
  { id: 'takeaways', label: 'Takeaways' },
]

function Hero() {
  return (
    <section className="snma-hero" id="top">
      <span className="snma-blob" aria-hidden="true" />
      <span className="snma-blob b2" aria-hidden="true" />
      <div className="snma-wrap">
        <div className="snma-hero-label">
          UX RESEARCHER &amp; DESIGNER&nbsp;·&nbsp;SIDE PROJECT&nbsp;·&nbsp;FOOMA
        </div>

        <h1>
          A{' '}
          <span className="snma-underline">food waste</span>{' '}
          solution that turns your fridge into a{' '}
          <span className="snma-accent">smart reminder.</span>
        </h1>

        <dl className="snma-meta">
          <div><dt>Role</dt><dd>UX Researcher, UX/UI Designer</dd></div>
          <div><dt>Timeline</dt><dd>Aug 2023 · 1 month</dd></div>
          <div><dt>Tools</dt><dd>Figma · FigJam</dd></div>
          <div><dt>Team</dt><dd>Jun, Hsuan, Renchu, Yichen, Jimmy, Yao</dd></div>
        </dl>

        <div className="snma-stats">
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">7</div>
            <div>
              <div className="snma-stat-lbl">Interview participants</div>
              <div className="snma-stat-desc">In-depth interviews on food habits</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">90<span className="sm">%</span></div>
            <div>
              <div className="snma-stat-lbl">Willing to buy</div>
              <div className="snma-stat-desc">Workshop participants · rated efficient</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">#1</div>
            <div>
              <div className="snma-stat-lbl">Most popular design</div>
              <div className="snma-stat-desc">Won the workshop award</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">7</div>
            <div>
              <div className="snma-stat-lbl">Team members</div>
              <div className="snma-stat-desc">Cross-functional workshop team</div>
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
          Tackling food waste through software and hardware.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 28, maxWidth: 'none' }}>
          According to the EU project "FUSIONS," food waste stems from a{' '}
          <b>lack of awareness</b> and <b>unplanned shopping behavior</b> among consumers.
          One of the UN's Sustainable Development Goals calls for responsible consumption
          and production — making food waste a globally recognized issue.
        </p>
        <p className="snma-section-intro" style={{ marginBottom: 48, maxWidth: 'none', color: 'var(--snma-fg-soft)' }}>
          FooMa is a <b>software + hardware</b> solution combining a scanning device inside
          your refrigerator with a <b>LINE chatbot</b> — Taiwan's most popular messaging
          platform. The goal: encourage responsibility in food purchasing and raise awareness
          about valuing food, with no extra app required.
        </p>

        <div style={{ background: 'var(--snma-card)', border: '1px solid rgba(26,26,26,0.12)', borderRadius: 'var(--snma-radius)', padding: 32 }}>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 20 }}>Research &amp; Design Process</p>
          <img src="/fooma/mprocess.png" alt="Research and Design process overview" loading="lazy" style={{ width: '100%', borderRadius: 'var(--snma-radius)' }} />
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
          Why do people waste food — and what habits drive it?
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          Two research phases: desk research to map the problem space, then 7 in-depth
          interviews to understand real behavioral patterns.
        </p>

        {/* Research Goals */}
        <div className="snma-goals" style={{ marginBottom: 56 }}>
          <div className="snma-goal snma-reveal">
            <div className="snma-goal-n">01</div>
            <h3>Address food waste</h3>
            <p>Understand the root causes of food waste and find design opportunities to reduce it while raising customer awareness.</p>
          </div>
          <div className="snma-goal snma-reveal">
            <div className="snma-goal-n">02</div>
            <h3>Cultivate planned shopping</h3>
            <p>Identify what prevents people from planning grocery trips and design tools that build better habits over time.</p>
          </div>
        </div>

        {/* Table Research */}
        <div style={{ marginBottom: 56 }}>
          <span className="snma-section-label" style={{ fontSize: 11 }}>Research 1 — Table Research &amp; Brainstorming</span>
          <p className="snma-section-intro" style={{ marginTop: 12, marginBottom: 32, maxWidth: 'none', color: 'var(--snma-fg-soft)' }}>
            The team noted all known reasons for food waste — from policy research, personal
            experience, and family observations. We used FigJam to gather and affinity-map
            all the notes.
          </p>
          <img src="/fooma/workshop.jpg" alt="Table research and brainstorming workshop" loading="lazy" style={{ width: '100%', borderRadius: 'var(--snma-radius)' }} />
        </div>

        {/* Interview */}
        <div style={{ marginBottom: 56 }}>
          <span className="snma-section-label" style={{ fontSize: 11 }}>Research 2 — User Interviews · 7 participants</span>
          <p className="snma-section-intro" style={{ marginTop: 12, marginBottom: 32, maxWidth: 'none', color: 'var(--snma-fg-soft)' }}>
            Recruiting criteria: people who occasionally discard food, or who purchase food
            for their families. The 5-section script covered living situation, food
            purchasing philosophy, expiration date attitudes, past food-waste experiences,
            and efforts to reduce waste.
          </p>

          <div className="snma-impact-grid">
            <div className="snma-impact-card snma-reveal" style={{ gridTemplateColumns: '1fr' }}>
              <div className="snma-impact-text">
                <span className="snma-impact-kind">Interview Analysis</span>
                <h3>Affinity diagram + Persona + Customer Journey Map</h3>
                <p>We used an affinity diagram to analyze qualitative results from all 7 participants, then built a persona and mapped the customer journey to pinpoint the moments where food waste occurs.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 8 }}>
                <img src="/fooma/msffinity.jpg" alt="Interview affinity diagram" loading="lazy" style={{ width: '100%', borderRadius: 10 }} />
                <img src="/fooma/mpersona.png" alt="Persona" loading="lazy" style={{ width: '100%', borderRadius: 10 }} />
                <img src="/fooma/mcjm.png" alt="Customer journey map" loading="lazy" style={{ width: '100%', borderRadius: 10 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div style={{ background: 'var(--snma-card)', border: '1px solid rgba(26,26,26,0.12)', borderRadius: 'var(--snma-radius)', padding: 32 }}>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 24 }}>
            Key Insights
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {[
              { n: '01', text: "People don't check what's left in the refrigerator before going grocery shopping — leading to duplicate purchases and overcrowding." },
              { n: '02', text: 'Attractive product displays and discounts trigger impulse buying, resulting in more food than they can store or consume in time.' },
              { n: '03', text: 'After purchasing, people often forget to eat food before it expires — especially items stored out of sight at the back of the fridge.' },
            ].map(i => (
              <div key={i.n} style={{ borderTop: '2px solid rgba(26,26,26,0.12)', paddingTop: 20 }}>
                <div style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, color: 'var(--snma-fg-mute)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 10 }}>Insight {i.n}</div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--snma-fg-soft)', margin: 0 }}>{i.text}</p>
              </div>
            ))}
          </div>
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
          A fridge scanner and a LINE chatbot — no new app needed.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          Three core features: check what's in the fridge, check expiration dates, and
          receive timely reminders — all through a simple LINE message.
        </p>

        {/* Service Map */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 12 }}>
            Service Map
          </p>
          <p style={{ color: 'var(--snma-fg-soft)', fontSize: 14.5, marginBottom: 24 }}>
            By refining the customer journey map and adding both software and hardware services,
            we mapped how FooMa interacts with users at every touchpoint.
          </p>
          <img src="/fooma/mrcjm.png" alt="Service map — hardware and software interaction" loading="lazy" style={{ width: '100%', borderRadius: 'var(--snma-radius)' }} />
        </div>

        {/* Hardware */}
        <div className="snma-impact-grid" style={{ marginBottom: 48 }}>
          <div className="snma-impact-card snma-reveal" style={{ gridTemplateColumns: '1fr' }}>
            <div className="snma-impact-text">
              <span className="snma-impact-kind">Hardware — FooMa Scanning Device</span>
              <h3>Hangs inside your fridge. Scans before you store.</h3>
              <p>
                The FooMa device is hung inside the refrigerator. Users scan food products
                before placing them inside. The device automatically tracks items and
                <b> changes color or size</b> to signal storage status and upcoming expiration dates.
              </p>
            </div>
            <img src="/fooma/mhard.png" alt="FooMa hardware scanning device" loading="lazy" style={{ width: '100%', borderRadius: 10, marginTop: 8 }} />
          </div>
        </div>

        {/* Software */}
        <div>
          <span className="snma-section-label" style={{ fontSize: 11 }}>Software — LINE Chatbot</span>

          <div style={{ marginTop: 32, marginBottom: 40 }}>
            <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 12 }}>
              Wireframe
            </p>
            <img src="/fooma/mwireframe.png" alt="Wireframes — LINE chatbot flows" loading="lazy" style={{ width: '100%', borderRadius: 'var(--snma-radius)' }} />
          </div>

          <div style={{ marginBottom: 40, background: 'var(--snma-card)', border: '1px solid rgba(26,26,26,0.12)', borderRadius: 'var(--snma-radius)', padding: 32 }}>
            <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 16 }}>
              Visual Identity
            </p>
            <p style={{ color: 'var(--snma-fg-soft)', fontSize: 14.5, marginBottom: 24 }}>
              Pink as the primary color, yellow as the secondary. Warm and approachable —
              designed to attract users and create positive feelings during everyday interactions.
            </p>
            <img src="/fooma/mvisual.png" alt="Color scheme, typography, component styles" loading="lazy" style={{ width: '100%', borderRadius: 'var(--snma-radius)' }} />
          </div>

          <div>
            <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 12 }}>
              Prototype — 3 key appearances
            </p>
            <p style={{ color: 'var(--snma-fg-soft)', fontSize: 14.5, marginBottom: 24 }}>
              Welcome message → check storage → check expiration date.
            </p>
            <img src="/fooma/mprototype.png" alt="High-fidelity prototype — welcome, check storage, expiration date" loading="lazy" style={{ width: '100%', borderRadius: 'var(--snma-radius)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Feedback() {
  return (
    <section id="feedback" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">04 — Feedback</span>
        <h2 className="snma-section-title" style={{ maxWidth: 'none' }}>
          Most popular design. 90% willing to buy.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          At the end of the workshop, participants evaluated all teams' solutions.
        </p>

        <div className="snma-impact-grid">
          <div className="snma-impact-card snma-reveal" style={{ gridTemplateColumns: '1fr' }}>
            <div className="snma-impact-text">
              <span className="snma-impact-kind">Workshop Result</span>
              <h3>Over 90% of participants willing to buy FooMa</h3>
              <p>
                Participants rated FooMa as efficient and said they would purchase the product.
                The combination of hardware (scanning device) and software (LINE chatbot) resonated
                as a seamless, practical solution to a daily problem.
              </p>
              <div className="snma-post-impact">
                🏆&nbsp;<b>Most Popular Design</b>&nbsp;— won the workshop award among all competing teams.
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
    <section id="takeaways" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">05 — Takeaways</span>
        <h2 className="snma-section-title" style={{ maxWidth: 'none' }}>
          What I'd carry into the next sprint ✨
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          Two lessons from completing a full research and design cycle in two weeks.
        </p>
        <div className="snma-takeaways" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="snma-takeaway snma-reveal">
            <h3><span>Collaboration is the key to team success</span></h3>
            <p>
              Over two weeks, the team grew close, shared thoughts freely, distributed
              tasks smoothly, and supported each other. I learned that genuine collaboration —
              not just coordination — is what makes a product great.
            </p>
          </div>
          <div className="snma-takeaway snma-reveal">
            <h3><span>Hardware has a cost dimension</span></h3>
            <p>
              Designing a software + hardware product means cost and material selection become
              design constraints too. In the next iteration, I'd bring in hardware feasibility
              earlier to make sure the solution is actually buildable at scale.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Fooma() {
  const active = useScrollSpy(SECTIONS)
  useReveal()

  useEffect(() => {
    const prev = document.title
    document.title = 'Lana Hung — FooMa Food Waste Solution'
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
    <div className="snma-root fooma-root">
      <RailNav sections={SECTIONS} active={active} />
      <TopBar sections={SECTIONS} />
      <Hero />
      <Overview />
      <Research />
      <Design />
      <Feedback />
      <Takeaways />
      <CaseFooter />
    </div>
  )
}
