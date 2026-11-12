import React, { useEffect, useState } from 'react'
import './ShopBackNMA.css'
import { useScrollSpy, scrollTo, RailNav, TopBar, CaseFooter, CaseCover } from './CaseLayout.jsx'

const SECTIONS = [
  { id: 'overview',    label: 'Overview'    },
  { id: 'hypotheses',  label: 'Hypotheses'  },
  { id: 'method',      label: 'Methodology' },
  { id: 'recommendations', label: 'Recommendations' },
  { id: 'impact',      label: 'Impact'      },
  { id: 'reflection',  label: 'Reflection'  },
]

function Hero() {
  return (
    <section className="snma-hero" id="top">
      <div className="snma-wrap">
        <h1>Mixed-methods study to close new market activation gap in the U.S. &amp; Germany</h1>

        <dl className="snma-meta">
          <div><dt>Team</dt><dd>1 Researcher, 1 Designer, 1 PM</dd></div>
          <div><dt>Duration</dt><dd>Aug 2025 · 1 month</dd></div>
          <div><dt>Methods</dt><dd>Interviews · Survey · Behavioral data</dd></div>
          <div><dt>Tools</dt><dd>Lyssna · Amplitude · Metabase</dd></div>
        </dl>
      </div>
    </section>
  )
}

const ACTIVATION = [
  { market: 'United States', rate: 10 },
  { market: 'Germany', rate: 20 },
]
const ACTIVATION_TARGET = 30
// Bar scale: the full bar area represents 37.5%, matching the Figma chart
const ACTIVATION_MAX = 37.5

function Overview() {
  return (
    <section id="overview" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">Overview</span>
        <h2 className="snma-section-title">
          A cashback platform with a sign-up–to–activation gap
        </h2>
        <div>
          <p className="snma-section-intro" style={{ marginBottom: 28, maxWidth: 'none' }}>
            Data revealed a critical issue in our newly launched markets, the{' '}
            <b>United States</b> and <b>Germany</b>. While a significant share of users
            signed up, <b>only about 10% in the U.S. and 20% in Germany activated within
            the first seven days</b>, where activation means starting to browse merchant
            stores or completing a first transaction. That's well below our internal
            benchmarks, and short of the <b>30%+</b> target.
          </p>
          <p className="snma-section-intro" style={{ color: 'var(--snma-fg-soft)', maxWidth: 'none' }}>
            This gap matters. In new market launches,{' '}
            <b>early activation is a key milestone in the product
            cycle</b>. It signals initial adoption and{' '}
            <b>sets the foundation for long-term conversion</b>{' '}
            and sustained product usage.
          </p>
        </div>
        <figure className="snma-chart">
          <div className="snma-chart-plot">
            {ACTIVATION.map(d => (
              <div key={d.market} className="snma-chart-row">
                <span className="snma-chart-lbl">{d.market}</span>
                <div className="snma-chart-track">
                  <div
                    className="snma-chart-bar"
                    style={{ width: `${(d.rate / ACTIVATION_MAX) * 100}%` }}
                    title={`${d.market}: ~${d.rate}% activated within 7 days`}
                  />
                  <span className="snma-chart-val">~{d.rate}%</span>
                </div>
              </div>
            ))}
            <div
              className="snma-chart-target"
              style={{ left: `calc(var(--plot-l) + var(--lbl-w) + (100% - var(--plot-l) - var(--lbl-w)) * ${ACTIVATION_TARGET / ACTIVATION_MAX})` }}
            >
              <span>Target {ACTIVATION_TARGET}%+</span>
            </div>
          </div>
          <figcaption className="snma-chart-title">
            First-7-day activation rate, new users
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

const ASSUMPTIONS = [
  {
    n: 1,
    title: 'Too much on screen, nowhere to start',
    body: 'New users land on a busy home page right after sign-up, with no clear first step. Many leave before browsing a single store.',
    img: '/shopback-nma/assum1.avif',
    alt: 'Home page screenshot showing overwhelming information',
  },
  {
    n: 2,
    title: "Stores that don't feel relevant",
    body: "The first merchants and deals users see don't match how they usually shop, so ShopBack doesn't look useful to them yet.",
    img: '/shopback-nma/assum2.avif',
    alt: 'Popular stores grid showing unrelevant merchants',
  },
  {
    n: 3,
    title: 'Nothing in return for signing up',
    body: 'Users put in the effort to download the app and sign up, then get no reward right away. The payoff feels too far off to act on.',
    img: '/shopback-nma/assum3.avif',
    alt: 'Home page with merchant promotions and campaign details',
  },
]

const RESEARCH_GOALS = [
  {
    title: 'Identify onboarding barriers',
    tint: 'peach',
    body: 'Uncover obstacles users face between signing up and actually browsing merchants or making transactions.',
  },
  {
    title: 'Understand drivers of attraction',
    tint: 'pink',
    body: 'Learn what motivates users to engage, which incentives to offer, which features to highlight.',
  },
  {
    title: 'Understand drivers of first transaction',
    tint: 'butter',
    body: 'Learn what moves a new user from browsing to their first Cashback purchase.',
  },
]

// Small HTML vignettes of the product moment behind each research goal
function GoalVisual({ index }) {
  if (index === 0) {
    return (
      <div className="snma-gv-phone">
        <img src="/shopback-nma/home-uhs.png" alt="" loading="lazy" />
      </div>
    )
  }
  if (index === 1) {
    return (
      <div className="snma-gv-phone">
        <img className="zoom" src="/shopback-nma/home-uhs.png" alt="" loading="lazy" />
      </div>
    )
  }
  return (
    <div className="snma-gv-phone">
      <img className="zoom-gift" src="/shopback-nma/home-uhs-gift.png" alt="" loading="lazy" />
    </div>
  )
}

function Assumptions() {
  return (
    <section id="hypotheses" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">Hypotheses</span>
        <h2 className="snma-section-title">
          Before talking to users, we had three hypotheses
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 32, maxWidth: 'none' }}>
          The product team had three hypotheses about why new users stalled after sign-up.
          Before building anything, we set out to test which ones really held up, and what
          we were missing.
        </p>
        <div className="snma-assumptions">
          {ASSUMPTIONS.map(a => (
            <div key={a.n} className="snma-assumption">
              <h3>Hypothesis {a.n}: {a.title}</h3>
              <p>{a.body}</p>
              <div className="snma-imgslot">
                <img src={a.img} alt={a.alt} loading="lazy" />
              </div>
            </div>
          ))}
        </div>

        <h3 className="snma-subtitle">What we needed to learn</h3>
        <ol className="snma-goal-list">
          {RESEARCH_GOALS.map(g => (
            <li key={g.title}>
              <h4>{g.title}</h4>
              <p>{g.body}</p>
            </li>
          ))}
        </ol>
        <div className="snma-goal-tiles">
          {RESEARCH_GOALS.map((g, i) => (
            <div key={g.title} className={`snma-goal-visual ${g.tint}`} aria-hidden="true">
              <GoalVisual index={i} />
            </div>
          ))}
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
        <span className="snma-section-label">Methodology</span>
        <h2 className="snma-section-title">A mixed-methods approach</h2>
        <p className="snma-section-intro" style={{ marginBottom: 56 }}>
          Qualitative-first, quantitative for validation. Interviews surfaced the texture of
          the experience; the survey confirmed which barriers were widespread.
        </p>

        <div className="snma-method-block">
          <h3>
            User interviews{' '}
            <span className="snma-method-scope">(U.S. only)</span>
          </h3>
          <p>
            45-minute in-depth sessions to deeply uncover the barriers new-market users were
            running into, with a mix of recently activated and non-activated users for contrast.
            We had 8 participants, 45 minutes each, located in LA, SF, and Philadelphia.
          </p>
          <div className="snma-showcase snma-method-showcase">
            <img
              className="snma-showcase-wide"
              src="/shopback-nma/interview.jpg"
              alt="A remote user interview, with the participant's face covered by an illustration"
              loading="lazy"
            />
          </div>
        </div>

        <div className="snma-method-block">
          <h3>
            Quantitative survey{' '}
            <span className="snma-method-scope">(U.S. + DE)</span>
          </h3>
          <p>
            A 6-minute survey to validate which difficulties were most critical across a larger
            user base, and to compare U.S. vs. Germany response patterns. We received 136
            responses, 29 from the U.S. and 107 from Germany.
          </p>
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

function Solution() {
  return (
    <section id="recommendations" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">Recommendations</span>
        <h2 className="snma-section-title">
          Suggested 3 design directions
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 32, maxWidth: 'none' }}>
          Onboarding walkthroughs, extra rewards, and ACH transfers. The onboarding walkthrough and reward incentive were launched within a week, and the other shipped within two weeks.
        </p>

        <div className="snma-impact-grid snma-reco-grid">
          <div className="snma-impact-card">
            <div className="snma-impact-text">
              <h3>7-Step onboarding walkthrough</h3>
              <p>
                Designed to guide first-time browsing and surface the most relevant merchants for
                new U.S. users.
              </p>
            </div>
            <div className="snma-showcase">
              <img className="snma-phone-clip" src="/shopback-nma/onboarding.gif" alt="7-step onboarding walkthrough demo" loading="lazy" />
            </div>
          </div>

          <div className="snma-impact-card">
            <div className="snma-impact-text">
              <h3>Extra rewards for non-activated users</h3>
              <p>
                Interviews showed users reacted most positively to clear, tangible reward prompts,
                such as "Earn $15" or "Earn $5 on your first browser extension purchase", over vague
                cashback framing. The direction was handed off to the growth team for A/B testing.
              </p>
            </div>
            <div className="snma-showcase">
              <img src="/shopback-nma/VDD1.webp" alt="Extra rewards prompt screen" loading="lazy" />
            </div>
          </div>

          <div className="snma-impact-card">
            <div className="snma-impact-text">
              <h3>Support ACH transfers</h3>
              <p>
                PayPal as the sole withdrawal method created friction. Many users couldn't easily
                recall their account credentials and abandoned the redemption flow. ACH was prioritized
                and roadmapped to the finance &amp; payments squad.
              </p>
            </div>
            <div className="snma-showcase">
              <img src="/shopback-nma/VBS.webp" alt="ACH transfer / payout flow" loading="lazy" />
            </div>
          </div>

          <div className="snma-impact-card">
            <div className="snma-impact-text">
              <h3>A TL;DR for the working team on Slack</h3>
              <p>
                Posted a summary of the findings and recommendations, with the full report and the
                rationale behind each one. Also invited anyone interested to a walkthrough, so the
                team could dig into the insights together.
              </p>
            </div>
            <div className="snma-showcase">
              <img className="snma-showcase-wide" src="/shopback-nma/slack-tldr.webp" alt="Slack message sharing the research summary and recommendations with the team" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Impact: activation before and after the onboarding launch. The bars grow from the
// pre-launch rates to the post-launch rates whenever the chart scrolls into view: the original
// bar stays put and the lift grows out of its end in a lighter pink.
const LIFT = [
  { market: 'United States', before: 10, after: 19.38, label: '19.4' },
  { market: 'Germany', before: 20, after: 22, label: '22' },
]

function LiftChart() {
  const ref = React.useRef(null)
  // 'start' = original bars, shown instantly (no transition); 'grown' = lift animates in
  const [phase, setPhase] = useState('start')
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { setPhase('grown'); return }
    let timers = []
    const clear = () => { timers.forEach(clearTimeout); timers = [] }
    // jump back to the original bars (never animate backwards), hold, then grow again
    const play = () => {
      setPhase('start')
      timers.push(setTimeout(() => setPhase('grown'), 800))
      timers.push(setTimeout(play, 5800))
    }
    const io = new IntersectionObserver(([e]) => {
      clear()
      if (e.isIntersecting) play()
      else setPhase('start')
    }, { threshold: 0.5 })
    io.observe(el)
    return () => { io.disconnect(); clear() }
  }, [])
  const grown = phase === 'grown'
  return (
    <figure ref={ref} className={`snma-chart snma-impact-fig${grown ? ' grown' : ''}`}>
      <div className="snma-chart-plot">
        {LIFT.map(d => (
          <div key={d.market} className="snma-chart-row">
            <span className="snma-chart-lbl">{d.market}</span>
            <div className="snma-chart-track">
              <div
                className="snma-chart-bar"
                style={{ width: `${(d.before / ACTIVATION_MAX) * 100}%` }}
                title={`${d.market}: ~${d.before}% before launch`}
              />
              <div
                className="snma-chart-bar snma-chart-grow"
                style={{ width: grown ? `calc(${((d.after - d.before) / ACTIVATION_MAX) * 100}% + 4px)` : 0 }}
                title={`${d.market}: ~${d.label}% after launch`}
              />
              <span className="snma-chart-val">~{grown ? d.label : d.before}%</span>
            </div>
          </div>
        ))}
      </div>
    </figure>
  )
}

function Impact() {
  return (
    <section id="impact" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">Impact</span>
        <h2 className="snma-section-title">
          Shaped onboarding and rewards for new markets
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 32, maxWidth: 'none' }}>
          Mixed-methods research guided how new users in the U.S. and Germany are onboarded and rewarded.
        </p>
        <div className="snma-impact-rows">
          <div className="snma-impact-row">
            <div className="snma-impact-row-text">
              <h3>+9.38% Activation lift</h3>
              <p>U.S. first-7-day activation rate increased post-launch.</p>
            </div>
            <LiftChart />
          </div>
          <div className="snma-impact-row">
            <div className="snma-impact-row-text">
              <h3>98% Rated helpful (among 1k users)</h3>
              <p>In-app rating after 7-step onboarding.</p>
            </div>
            <figure className="snma-chart snma-impact-fig">
              <div className="snma-allset" aria-hidden="true">
                <img src="/shopback-nma/all-set.webp" alt="" loading="lazy" />
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

const REFLECTIONS = [
  {
    title: 'Prepare alternative recruitment strategies earlier',
    body: 'We learned that recruiting non-activated users is challenging since they\u2019re already not engaging with our product. Looking back, I would have explored alternative recruitment strategies sooner, like reaching out to friends and family or offering better incentives to boost participation.',
  },
  {
    title: 'Spend more time digging into behavioral data to triangulate findings',
    body: 'It would be better to combine interview insights with not just survey results, but also existing behavioral data. This would have helped us back up qualitative insights with actual numbers, and better understand how widespread certain behaviors really are.',
  },
  {
    title: 'Align with stakeholders earlier',
    body: 'I would share brief recaps with PMs and designers after each day of user interviews, along with regular updates on survey progress, to help the team build a shared understanding of emerging insights to iterate earlier, rather than waiting until the research is complete.',
  },
]

function Takeaways() {
  return (
    <section id="reflection" className="snma-section snma-section-end">
      <div className="snma-wrap">
        <span className="snma-section-label">Reflection</span>
        <h2 className="snma-section-title snma-reflection-title">What I'd carry into the next study</h2>
        <ol className="snma-goal-list snma-reflection-list">
          {REFLECTIONS.map(r => (
            <li key={r.title}>
              <h4>{r.title}</h4>
              <p>{r.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default function ShopBackNMA() {
  const active = useScrollSpy(SECTIONS)

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
      <RailNav sections={SECTIONS} active={active} />
      <TopBar sections={SECTIONS} />
      <Hero />
      <CaseCover src="/case-covers/shopback-nma-thumbnail.webp" alt="ShopBack New Market Activation" uncropped />
      <Overview />
      <Assumptions />
      <Method />
      <Solution />
      <Impact />
      <Takeaways />
      <CaseFooter />
    </div>
  )
}
