import React, { useEffect, useRef, useState } from 'react'
import './ShopBackNMA.css'

const CONTACT_LINKS = [
  { label: 'Resume',   href: 'https://drive.google.com/file/d/1RJ9YajZ4Arcvg7RzmP4fnIOglAN0m11H/view?usp=sharing' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tzjia-hung/' },
  { label: 'Medium',   href: 'https://medium.com/@lanahung' },
  { label: 'Email',    href: 'mailto:tzjia.hung@gmail.com' },
]

function CaseFooter() {
  return (
    <footer className="snma-footer">
      <div className="snma-footer-inner">
        <div className="snma-footer-changelog">
          <span className="snma-footer-clabel">CHANGELOG</span>
          <span>{__BUILD_TIME__}</span>
        </div>
        <div className="snma-footer-links">
          {CONTACT_LINKS.map((l, i) => (
            <React.Fragment key={l.label}>
              {i > 0 && <span className="snma-footer-dot">·</span>}
              <a
                href={l.href}
                target={l.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="snma-footer-link"
                onClick={(e) => {
                  if (l.href.startsWith('mailto:')) return
                  e.preventDefault()
                  const w = window.open(l.href, '_blank', 'noopener,noreferrer')
                  if (!w) window.top.location.href = l.href
                }}
              >
                {l.label}
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  )
}

const SECTIONS = [
  { id: 'overview',    label: 'Overview'    },
  { id: 'assumptions', label: 'Assumptions' },
  { id: 'goals',       label: 'Goals'       },
  { id: 'method',      label: 'Method'      },
  { id: 'impact',      label: 'Impact'      },
  { id: 'takeaways',   label: 'Takeaways'   },
]

function useScrollSpy() {
  const [active, setActive] = useState(SECTIONS[0].id)
  useEffect(() => {
    const ids = SECTIONS.map(s => s.id)
    function sync() {
      const y = window.scrollY + 140
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', sync, { passive: true })
    sync()
    return () => window.removeEventListener('scroll', sync)
  }, [])
  return active
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.snma-reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function RailNav({ active }) {
  return (
    <nav className="snma-rail" aria-label="Page sections">
      {SECTIONS.map(s => (
        <button
          key={s.id}
          className={`snma-rail-btn${active === s.id ? ' active' : ''}`}
          onClick={() => scrollTo(s.id)}
        >
          <span className="snma-rail-dot" />
          <span>{s.label}</span>
        </button>
      ))}
    </nav>
  )
}

function TopBar() {
  return (
    <header className="snma-topbar">
      <a href="/" className="snma-topbar-brand">
        <span className="snma-topbar-dot" />
        <span>Lana Hung</span>
      </a>
      <div className="snma-topbar-links">
        {SECTIONS.map(s => (
          <button key={s.id} className="snma-topbar-link" onClick={() => scrollTo(s.id)}>
            {s.label}
          </button>
        ))}
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="snma-hero" id="top">
      <span className="snma-blob" aria-hidden="true" />
      <span className="snma-blob b2" aria-hidden="true" />
      <div className="snma-wrap">
        <div className="snma-hero-label">
          LEAD UX RESEARCHER&nbsp;·&nbsp;SHIPPED&nbsp;·&nbsp;SHOPBACK
        </div>

        <h1>
          <span className="snma-underline">Mixed-methods</span>{' '}
          study to close ShopBack's new market{' '}
          <span className="snma-accent">activation gap</span>{' '}
          in the U.S. &amp; Germany.
        </h1>

        <dl className="snma-meta">
          <div><dt>Team</dt><dd>1 Researcher, 1 Designer, 1 PM</dd></div>
          <div><dt>Duration</dt><dd>Aug 2025 · 1 month</dd></div>
          <div><dt>Methods</dt><dd>Interviews · Survey · Behavioral data</dd></div>
          <div><dt>Tools</dt><dd>Lyssna · Amplitude · Metabase</dd></div>
        </dl>

        <div className="snma-stats">
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">+9.38<span className="sm">%</span></div>
            <div>
              <div className="snma-stat-lbl">Activation lift</div>
              <div className="snma-stat-desc">U.S. new user activation, post-launch</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">98<span className="sm">%</span></div>
            <div>
              <div className="snma-stat-lbl">Rated walkthrough helpful</div>
              <div className="snma-stat-desc">In-app rating after 7-step onboarding</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">8</div>
            <div>
              <div className="snma-stat-lbl">Moderated interviews</div>
              <div className="snma-stat-desc">U.S. participants · 45 min each</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">136</div>
            <div>
              <div className="snma-stat-lbl">Survey responses</div>
              <div className="snma-stat-desc">29 U.S. · 107 Germany</div>
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
          A cashback platform with a sign-up–to–activation gap.
        </h2>
        <div>
          <p className="snma-section-intro" style={{ marginBottom: 28, maxWidth: 'none' }}>
            Data revealed a critical issue in our newly launched markets, the{' '}
            <b>United States</b> and <b>Germany</b>. While a significant share of users
            signed up, <span className="hl-u">only <b>12%</b> activated within the first
            seven days</span> — where activation means starting to browse merchant stores
            or completing a first transaction. By comparison, established markets such as{' '}
            <b>Singapore</b> and <b>Australia</b> see activation rates around{' '}
            <span className="hl-u"><b>40%</b></span>.
          </p>
          <p className="snma-section-intro" style={{ color: 'var(--snma-fg-soft)', maxWidth: 'none' }}>
            This gap matters. In new market launches,{' '}
            <span className="hl-u">early activation is a key milestone in the product
            cycle</span> — it signals initial adoption and{' '}
            <span className="hl-u">sets the foundation for long-term conversion</span>{' '}
            and sustained product usage.
          </p>
        </div>
      </div>
    </section>
  )
}

const ASSUMPTIONS = [
  {
    n: '01',
    title: 'Lack of guided browsing',
    body: 'After signing up and landing on the home page, users may face an overload of information without a clear place to begin.',
    img: '/shopback-nma/assum1.avif',
    alt: 'Home page screenshot showing overwhelming information',
  },
  {
    n: '02',
    title: 'Merchants & deals relevance',
    body: "Users may fail to activate because, on landing, they don't see merchants or deals that match their usual spending habits.",
    img: '/shopback-nma/assum2.avif',
    alt: 'Popular stores grid showing unrelevant merchants',
  },
  {
    n: '03',
    title: 'Lack of instant reward',
    body: 'After spending time and effort to download and sign up, users may feel disappointed if no immediate incentive is provided.',
    img: '/shopback-nma/assum3.avif',
    alt: 'Home page with merchant promotions and campaign details',
  },
]

function Assumptions() {
  return (
    <section id="assumptions" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">02 — Assumptions</span>
        <h2 className="snma-section-title" style={{ maxWidth: 'none' }}>
          We began with three existing assumptions about the gap.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          The product team had early hypotheses about why new users stalled after sign-up.
          Before building anything, we wanted to know which of them (if any) actually held
          up — and what we were missing.
        </p>
        <div className="snma-assumptions">
          {ASSUMPTIONS.map(a => (
            <div key={a.n} className="snma-assumption snma-reveal">
              <span className="snma-assumption-tag">Assumption {a.n}</span>
              <div className="snma-assumption-n">{a.n}</div>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
              <div className="snma-imgslot">
                <img src={a.img} alt={a.alt} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Goals() {
  return (
    <section id="goals" className="snma-section alt">
      <div className="snma-wrap">
        <span className="snma-section-label">03 — Research goals</span>
        <div className="snma-goals">
          <div className="snma-goal snma-reveal">
            <div className="snma-goal-n">01</div>
            <h3>Explore first-time experience</h3>
            <p>Understand what actions users take immediately after signing up and landing on the home page.</p>
          </div>
          <div className="snma-goal snma-reveal">
            <div className="snma-goal-n">02</div>
            <h3>Identify onboarding barriers</h3>
            <p>Uncover obstacles users face between signing up and actually browsing merchants or making transactions.</p>
          </div>
          <div className="snma-goal snma-reveal">
            <div className="snma-goal-n">03</div>
            <h3>Understand drivers of attraction</h3>
            <p>Learn what motivates users to engage — which incentives to offer, which features to highlight.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

const TIMELINE = [
  { wk: 'Week 1', label: 'Scope, recruit, screener', active: true },
  { wk: 'Week 2', label: 'Interviews · daily recaps', active: true },
  { wk: 'Week 3', label: 'Survey launch · synthesis', active: true },
  { wk: 'Week 4', label: 'Findings · design directions', active: true },
  { wk: 'After',  label: 'Onboarding ships · A/B reads', active: false },
]

function Method() {
  return (
    <section id="method" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">04 — Methodology</span>
        <h2 className="snma-section-title">A mixed-methods approach.</h2>
        <p className="snma-section-intro" style={{ marginBottom: 56 }}>
          Qualitative-first, quantitative for validation. Interviews surfaced the texture of
          the experience; the survey confirmed which barriers were widespread.
        </p>

        <div className="snma-method-grid">
          <div className="snma-method-card a snma-reveal">
            <div className="snma-method-ic">I</div>
            <h3>
              User interviews{' '}
              <span style={{ color: 'var(--snma-fg-mute)', fontWeight: 400 }}>(U.S. only)</span>
            </h3>
            <p style={{ color: 'var(--snma-fg-soft)', margin: 0 }}>
              45-minute in-depth sessions to deeply uncover barriers that new-market users were
              running into. Mix of recently activated and non-activated users for contrast.
            </p>
            <div className="snma-method-meta">
              <span><b>8</b> Participants</span>
              <span><b>45</b> min each</span>
              <span><b>LA · SF · Philly</b></span>
            </div>
          </div>

          <div className="snma-method-card b snma-reveal">
            <div className="snma-method-ic">S</div>
            <h3>
              Quantitative survey{' '}
              <span style={{ color: 'var(--snma-fg-mute)', fontWeight: 400 }}>(U.S. + DE)</span>
            </h3>
            <p style={{ color: 'var(--snma-fg-soft)', margin: 0 }}>
              A 6-minute survey to validate which difficulties were most critical across a larger
              user base, and to compare U.S. vs. Germany response patterns.
            </p>
            <div className="snma-method-meta">
              <span><b>136</b> Responses</span>
              <span><b>6</b> min</span>
              <span><b>29 US · 107 DE</b></span>
            </div>
          </div>
        </div>

        <div className="snma-timeline">
          <h3>Research timeline · 1 month</h3>
          <div className="snma-timeline-track">
            {TIMELINE.map((step, i) => (
              <div key={i} className={`snma-tl-step${step.active ? ' active' : ''}`}>
                <div className="snma-tl-wk">{step.wk}</div>
                <div>{step.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Impact() {
  return (
    <section id="impact" className="snma-section alt">
      <div className="snma-wrap">
        <span className="snma-section-label">05 — Impact</span>
        <h2 className="snma-section-title" style={{ maxWidth: 'none' }}>
          Validated initial assumptions, uncovered user barriers.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          Launched an onboarding design and validated 2 ongoing design directions based on the findings.
        </p>

        <div className="snma-impact-grid">
          <div className="snma-impact-card snma-reveal">
            <div className="snma-impact-text">
              <span className="snma-impact-kind">New design — Shipped</span>
              <h3>7-Step onboarding walkthrough</h3>
              <p>
                Designed to guide first-time browsing and surface the most relevant merchants for
                new U.S. users. Post-launch data validated it:{' '}
                <b>98% of users rated the walkthrough as helpful.</b>
              </p>
              <div className="snma-post-impact">
                <b>+9.38%</b>&nbsp;activation lift&nbsp;·&nbsp;<b>98%</b>&nbsp;rated helpful
              </div>
            </div>
            <div className="snma-impact-img">
              <img src="/shopback-nma/onboarding.gif" alt="7-step onboarding walkthrough demo" loading="lazy" />
            </div>
          </div>

          <div className="snma-impact-card snma-reveal">
            <div className="snma-impact-text">
              <span className="snma-impact-kind">Validated direction</span>
              <h3>Extra rewards for non-activated users</h3>
              <p>
                Interviews showed users reacted most positively to clear, tangible reward prompts —
                "Earn $15" or "Earn $5 on your first browser extension purchase" — over vague
                cashback framing.
              </p>
              <div className="snma-post-impact">
                Direction handed off to growth team for A/B test.
              </div>
            </div>
            <div className="snma-impact-img no-bg">
              <img src="/shopback-nma/VDD1.webp" alt="Extra rewards prompt screen" loading="lazy" />
            </div>
          </div>

          <div className="snma-impact-card snma-reveal">
            <div className="snma-impact-text">
              <span className="snma-impact-kind">Validated business strategy</span>
              <h3>Support ACH transfers</h3>
              <p>
                PayPal as the sole withdrawal method created friction — many users couldn't easily
                recall their account credentials and abandoned the redemption flow. ACH was prioritized.
              </p>
              <div className="snma-post-impact">
                Roadmapped to finance &amp; payments squad.
              </div>
            </div>
            <div className="snma-impact-img no-bg">
              <img src="/shopback-nma/VBS.webp" alt="ACH transfer / payout flow" loading="lazy" />
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
        <span className="snma-section-label">06 — Takeaways</span>
        <h2 className="snma-section-title" style={{ maxWidth: 'none' }}>
          What I'd carry into the next study ✨
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          Three things this project taught me about doing fast, mixed-methods research in a
          market we know little about.
        </p>
        <div className="snma-takeaways">
          <div className="snma-takeaway snma-reveal">
            <h3><span>Alternative recruitment strategies</span></h3>
            <p>
              Non-activated users are hard to recruit. Prepare alternatives early — proxy user
              groups with similar behaviors, screener pre-quotas, and a richer incentive.
            </p>
          </div>
          <div className="snma-takeaway snma-reveal">
            <h3><span>Triangulate data</span></h3>
            <p>
              Combine interview insights with existing behavioral data to ensure findings are
              validated and assessed holistically. Numbers without stories mislead; stories
              without numbers mis-scale.
            </p>
          </div>
          <div className="snma-takeaway snma-reveal">
            <h3><span>Initiate early alignment</span></h3>
            <p>
              Daily interview recaps shared with PMs and designers enabled quicker iterations
              and helped the team process insights as they emerged, not at the end.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ShopBackNMA() {
  const active = useScrollSpy()
  useReveal()

  useEffect(() => {
    const prev = document.title
    document.title = 'Lana Hung — ShopBack New Market Activation'
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
    <div className="snma-root">
      <RailNav active={active} />
      <TopBar />
      <Hero />
      <Overview />
      <Assumptions />
      <Goals />
      <Method />
      <Impact />
      <Takeaways />
      <CaseFooter />
    </div>
  )
}
