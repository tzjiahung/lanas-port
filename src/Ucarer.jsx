import React, { useEffect } from 'react'
import './ShopBackNMA.css'
import { useScrollSpy, useReveal, RailNav, TopBar, CaseFooter } from './CaseLayout.jsx'

const SECTIONS = [
  { id: 'overview',  label: 'Overview'  },
  { id: 'research',  label: 'Research'  },
  { id: 'ideate',    label: 'Ideate'    },
  { id: 'prototype', label: 'Prototype' },
  { id: 'takeaways', label: 'Takeaways' },
]

function Hero() {
  return (
    <section className="snma-hero" id="top">
      <span className="snma-blob" aria-hidden="true" />
      <span className="snma-blob b2" aria-hidden="true" />
      <div className="snma-wrap">
        <div className="snma-hero-label">
          UI/UX DESIGNER&nbsp;·&nbsp;SCHOOL PROJECT&nbsp;·&nbsp;UCARER
        </div>

        <h1>
          Redesigning{' '}
          <span className="snma-underline">Ucarer</span>{' '}
          to boost activation and{' '}
          <span className="snma-accent">simplify care-finding.</span>
        </h1>

        <dl className="snma-meta">
          <div><dt>Role</dt><dd>UI/UX Designer</dd></div>
          <div><dt>Timeline</dt><dd>Sep – Dec 2022 · 4 months</dd></div>
          <div><dt>Tools</dt><dd>Figma · Miro</dd></div>
          <div><dt>Team</dt><dd>Lin Ying, Yi Jia, Tsai Tzung</dd></div>
        </dl>

        <div className="snma-stats">
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">4</div>
            <div>
              <div className="snma-stat-lbl">Months</div>
              <div className="snma-stat-desc">End-to-end redesign timeline</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">95<span className="sm">%</span></div>
            <div>
              <div className="snma-stat-lbl">Prefer new version</div>
              <div className="snma-stat-desc">Workshop participants · new IA &amp; UI</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">Top 3</div>
            <div>
              <div className="snma-stat-lbl">Workshop ranking</div>
              <div className="snma-stat-desc">Best IA &amp; new user interface</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">4</div>
            <div>
              <div className="snma-stat-lbl">Team members</div>
              <div className="snma-stat-desc">School project collaboration</div>
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
          A caregiving platform with too much friction.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 28, maxWidth: 'none' }}>
          <b>Ucarer</b> connects caregivers with individuals in need of personalized care
          services — elderly care, childcare, pet care, and more. Users can manage appointments,
          search for caregivers, and browse care-related articles and videos in one app.
        </p>
        <p className="snma-section-intro" style={{ marginBottom: 48, maxWidth: 'none', color: 'var(--snma-fg-soft)' }}>
          This school project, in collaboration with Ucarer, set two goals: <b>boost monthly
          activated users (MAU)</b> and <b>enhance the overall experience</b>. To get there,
          we ran interviews and rebuilt the information architecture and user interface from
          the ground up.
        </p>

        <div style={{ background: 'var(--snma-card)', border: '1px solid rgba(26,26,26,0.12)', borderRadius: 'var(--snma-radius)', padding: 32 }}>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 20 }}>Research &amp; Design Process</p>
          <img src="/ucarer/uprocess.png" alt="Research and Design process overview" loading="lazy" style={{ width: '100%', borderRadius: 'var(--snma-radius)' }} />
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
          Walk through first. Interview after.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          Before talking to users, we walked through the product ourselves to identify
          friction points and draft a sharper interview script.
        </p>

        {/* Research Goals */}
        <div className="snma-goals" style={{ marginBottom: 56 }}>
          <div className="snma-goal snma-reveal">
            <div className="snma-goal-n">01</div>
            <h3>Identify UX friction</h3>
            <p>Find and address any issues that hinder the user experience during interactions with the product.</p>
          </div>
          <div className="snma-goal snma-reveal">
            <div className="snma-goal-n">02</div>
            <h3>Increase MAU</h3>
            <p>Understand what barriers prevent users from activating monthly and find design opportunities to remove them.</p>
          </div>
        </div>

        {/* Walkthroughs */}
        <div style={{ marginBottom: 48 }}>
          <span className="snma-section-label" style={{ fontSize: 11 }}>Walkthroughs</span>
          <p className="snma-section-intro" style={{ marginTop: 12, marginBottom: 32, maxWidth: 'none', color: 'var(--snma-fg-soft)' }}>
            We extracted the most-used and most important functions in the app for usability
            walkthroughs. This gave us a comprehensive picture of the product before approaching
            real users.
          </p>
          <img src="/ucarer/uwalkthrough.jpg" alt="Walkthrough screenshots — existing app flows" loading="lazy" style={{ width: '100%', borderRadius: 'var(--snma-radius)' }} />
        </div>

        {/* Interviews */}
        <div style={{ marginBottom: 56 }}>
          <span className="snma-section-label" style={{ fontSize: 11 }}>User Interviews</span>
          <p className="snma-section-intro" style={{ marginTop: 12, marginBottom: 32, maxWidth: 'none', color: 'var(--snma-fg-soft)' }}>
            Recruiting criteria: people with experience finding caregivers for elderly, family,
            or friends; 30+ years old to match the app's core user age group.
          </p>
          <div className="snma-impact-card snma-reveal" style={{ gridTemplateColumns: '1fr', marginBottom: 0 }}>
            <div className="snma-impact-text">
              <span className="snma-impact-kind">Interview Analysis — Affinity Diagram</span>
              <h3>Complicated info and unintuitive flows were the core pain</h3>
              <p>
                We analyzed qualitative results using an affinity diagram to cluster themes
                across all participants.
              </p>
            </div>
            <img src="/ucarer/uaffinity.png" alt="Interview affinity diagram" loading="lazy" style={{ width: '100%', borderRadius: 10, marginTop: 8 }} />
          </div>
        </div>

        {/* Insights */}
        <div style={{ background: 'var(--snma-card)', border: '1px solid rgba(26,26,26,0.12)', borderRadius: 'var(--snma-radius)', padding: 32 }}>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 24 }}>
            Research Insights → Define
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 28 }}>
            {[
              { n: '01', title: 'Information overload', text: 'The app provided too much information at once, making it hard for users to identify what was relevant to their immediate task.' },
              { n: '02', title: 'Unintuitive user flows', text: 'Navigation paths were confusing — users frequently lost their way during booking and appointment management flows.' },
              { n: '03', title: 'IA needs a rebuild', text: 'The underlying information architecture needed a complete overhaul: rebuild the IA, then refine the user flow.' },
            ].map(i => (
              <div key={i.n} style={{ borderTop: '2px solid rgba(26,26,26,0.12)', paddingTop: 20 }}>
                <div style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, color: 'var(--snma-fg-mute)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 8 }}>Insight {i.n}</div>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{i.title}</div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--snma-fg-soft)', margin: 0 }}>{i.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Ideate() {
  return (
    <section id="ideate" className="snma-section alt">
      <div className="snma-wrap">
        <span className="snma-section-label">03 — Ideate</span>
        <h2 className="snma-section-title" style={{ maxWidth: 'none' }}>
          Rebuild the architecture. Then draw the screens.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          Restructured the app's five tabs — Home, Long-term Subscription, News, My Order,
          My Account — so every function sits where users expect it.
        </p>

        {/* IA */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 12 }}>
            Information Architecture
          </p>
          <p style={{ color: 'var(--snma-fg-soft)', fontSize: 14.5, marginBottom: 24 }}>
            Remaining tabs: Home · Long-term Subscription · News · My Order · My Account.
            Users can navigate through tabs and quickly find the functions they need.
          </p>
          <img src="/ucarer/uinfoarch.png" alt="Rebuilt information architecture" loading="lazy" style={{ width: '100%', borderRadius: 'var(--snma-radius)' }} />
        </div>

        {/* Wireframe */}
        <div>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 12 }}>
            Wireframe
          </p>
          <p style={{ color: 'var(--snma-fg-soft)', fontSize: 14.5, marginBottom: 24 }}>
            Low-fidelity wireframes for all tabs and pages, based on the updated IA —
            before any visual styles were applied.
          </p>
          <img src="/ucarer/uwireframe.png" alt="Wireframes — all tabs and pages" loading="lazy" style={{ width: '100%', borderRadius: 'var(--snma-radius)' }} />
        </div>
      </div>
    </section>
  )
}

function Prototype() {
  return (
    <section id="prototype" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">04 — Prototype</span>
        <h2 className="snma-section-title" style={{ maxWidth: 'none' }}>
          Visual design applied. Color palette retained.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          We retained the original Ucarer color palette to maintain brand continuity,
          then applied visual styles across every screen of the redesigned flows.
        </p>

        <div className="snma-impact-grid">
          <div className="snma-impact-card snma-reveal" style={{ gridTemplateColumns: '1fr' }}>
            <div className="snma-impact-text">
              <span className="snma-impact-kind">High-fidelity prototype</span>
              <h3>All tabs redesigned with the new IA</h3>
              <p>
                From caregiver search and booking to appointment management and news —
                every screen was rebuilt on top of the updated information architecture
                and user flow.
              </p>
            </div>
            <img src="/ucarer/uproto.jpg" alt="High-fidelity prototype screens" loading="lazy" style={{ width: '100%', borderRadius: 10, marginTop: 8 }} />
          </div>

          <div className="snma-impact-card snma-reveal" style={{ gridTemplateColumns: '1fr' }}>
            <div className="snma-impact-text">
              <span className="snma-impact-kind">Service Map</span>
              <h3>End-to-end service interactions mapped</h3>
              <p>
                Refined the service map to show how software flows and user touchpoints
                connect across the entire care-finding experience.
              </p>
            </div>
            <img src="/ucarer/ufeedback.jpeg" alt="Service map" loading="lazy" style={{ width: '100%', borderRadius: 10, marginTop: 8 }} />
          </div>
        </div>

        {/* Feedback */}
        <div style={{ marginTop: 48, background: 'var(--snma-card)', border: '1px solid rgba(26,26,26,0.12)', borderRadius: 'var(--snma-radius)', padding: 32 }}>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 24 }}>
            Workshop Feedback
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            <div style={{ borderTop: '2px solid var(--snma-accent1)', paddingTop: 20 }}>
              <div style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, color: 'var(--snma-accent1)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 10 }}>Result</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--snma-fg-soft)', margin: 0 }}>
                Over <b>95% of participants preferred the new version</b> over the previous app.
                They agreed with the new IA and said the updated structure made the booking
                process much easier to understand. The team <b>earned top 3</b> in the workshop.
              </p>
            </div>
            <div style={{ borderTop: '2px solid rgba(26,26,26,0.16)', paddingTop: 20 }}>
              <div style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, color: 'var(--snma-fg-mute)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 10 }}>What resonated</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--snma-fg-soft)', margin: 0 }}>
                "Most of them think with the new structure, it is easier to understand
                the booking process." The well-structured IA was the most cited reason
                for preferring the redesign.
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
          What I'd carry into the next project ✨
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          Two reflections from my first end-to-end UI/UX design project.
        </p>
        <div className="snma-takeaways" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="snma-takeaway snma-reveal">
            <h3><span>This is where my interest in research began</span></h3>
            <p>
              Walking through every phase — interviewing, structuring, wireframing,
              prototyping — I found myself most energized during the research process.
              This project sparked the curiosity that led me toward UX research as
              my primary focus.
            </p>
          </div>
          <div className="snma-takeaway snma-reveal">
            <h3><span>Talk to actual users, not proxies</span></h3>
            <p>
              We didn't interview real Ucarer users before or after designing. If we had,
              we'd have built on actual pain points instead of inferred ones — and validated
              whether the redesign solved the right problems.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Ucarer() {
  const active = useScrollSpy(SECTIONS)
  useReveal()

  useEffect(() => {
    const prev = document.title
    document.title = 'Lana Hung — Ucarer App Redesign'
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
    <div className="snma-root ucarer-root">
      <RailNav sections={SECTIONS} active={active} />
      <TopBar sections={SECTIONS} />
      <Hero />
      <Overview />
      <Research />
      <Ideate />
      <Prototype />
      <Takeaways />
      <CaseFooter />
    </div>
  )
}
