import React, { useEffect } from 'react'
import './ShopBackNMA.css'
import { useScrollSpy, useReveal, RailNav, TopBar, CaseFooter, ImgPlaceholder } from './CaseLayout.jsx'

const SECTIONS = [
  { id: 'overview',   label: 'Overview'   },
  { id: 'goals',      label: 'Goals'      },
  { id: 'process',    label: 'Process'    },
  { id: 'survey',     label: 'Survey'     },
  { id: 'impact',     label: 'Impact'     },
  { id: 'takeaways',  label: 'Takeaways'  },
]

function Hero() {
  return (
    <section className="snma-hero" id="top">
      <span className="snma-blob" aria-hidden="true" />
      <span className="snma-blob b2" aria-hidden="true" />
      <div className="snma-wrap">
        <div className="snma-hero-label">
          LEAD UX RESEARCHER&nbsp;·&nbsp;CATHAY FINANCIAL HOLDINGS
        </div>

        <h1>
          Cathay{' '}
          <span className="snma-underline">FitBack</span>{' '}
          Exploratory{' '}
          <span className="snma-accent">Research</span>
        </h1>

        <p className="snma-hero-subtitle">
          Applied the Stages of Change Theory to explain how social support strengthens motivation across different exercise habit stages; validated its applicability through 356 survey responses with balanced quotas across habit stages.
        </p>

        <dl className="snma-meta">
          <div><dt>Role</dt><dd>Lead UX Researcher</dd></div>
          <div><dt>Duration</dt><dd>Jul–Dec 2023 · 5 months</dd></div>
          <div><dt>Methodology</dt><dd>Survey Research · Correlation Analysis</dd></div>
          <div><dt>Tools</dt><dd>Google Sheets · Google Form</dd></div>
        </dl>

        <div className="snma-stats">
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">356</div>
            <div>
              <div className="snma-stat-lbl">Survey responses</div>
              <div className="snma-stat-desc">Valid responses · mostly aged 20–30</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">77<span className="sm">%</span></div>
            <div>
              <div className="snma-stat-lbl">Top motivator</div>
              <div className="snma-stat-desc">Personal goals, ranked #1</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">5</div>
            <div>
              <div className="snma-stat-lbl">Behavior stages</div>
              <div className="snma-stat-desc">Stages of Change Model mapped</div>
            </div>
          </div>
          <div className="snma-stat snma-reveal">
            <div className="snma-stat-n">4</div>
            <div>
              <div className="snma-stat-lbl">Research methods</div>
              <div className="snma-stat-desc">Lit review · Audit · Survey · Expert</div>
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
          A health &amp; fitness feature inside an insurance app.
        </h2>

        <p className="snma-section-intro" style={{ marginBottom: 28, maxWidth: 'none' }}>
          <b>FitBack</b> is an app function that helps Cathay Insurance users monitor their health and fitness performance and encourages them to work out more. Through fitness tasks, users accumulate points to redeem discounts from partner merchants or obtain waivers for policies.
        </p>
        <p className="snma-section-intro" style={{ marginBottom: 48, maxWidth: 'none' }}>
          Since 2018, Cathay Life Insurance has incorporated this health &amp; fitness feature in its insurance app — empowering policyholders not only to purchase insurance, but to actively <b>promote personal well-being and physical fitness.</b>
        </p>

        <div style={{ background: 'var(--snma-card)', border: '1px solid rgba(26,26,26,0.12)', borderRadius: 'var(--snma-radius)', padding: 32 }}>
          <p className="snma-section-intro" style={{ maxWidth: 'none', marginBottom: 20 }}>
            More and more health &amp; fitness applications are integrating social networking features — such as <b>Strava</b> and <b>Nike Run Club.</b> Since FitBack lives inside an insurance app, the team wasn't sure whether to follow suit.
          </p>
          <p className="snma-section-intro" style={{ color: 'var(--snma-fg-soft)', maxWidth: 'none', margin: 0 }}>
            This research asked: <span className="hl-u">are social features able to promote health awareness and encourage people to work out more?</span> And if so, <span className="hl-u">how should they be designed for FitBack?</span>
          </p>
        </div>
      </div>
    </section>
  )
}

function Goals() {
  return (
    <section id="goals" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">02 — Project goals</span>
        <div className="snma-goals">
          <div className="snma-goal snma-reveal">
            <div className="snma-goal-n">01</div>
            <h3>Understand importance of social features</h3>
            <p>Understand the importance of social features in promoting health awareness and encouraging exercise.</p>
          </div>
          <div className="snma-goal snma-reveal">
            <div className="snma-goal-n">02</div>
            <h3>Determine FitBack's suitability</h3>
            <p>Determine whether FitBack is a suitable product context for incorporating social networking features.</p>
          </div>
          <div className="snma-goal snma-reveal">
            <div className="snma-goal-n">03</div>
            <h3>How to design social features</h3>
            <p>If social features are warranted, identify how to design them effectively within the FitBack context.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process" className="snma-section alt">
      <div className="snma-wrap">
        <span className="snma-section-label">03 — Research process</span>
        <h2 className="snma-section-title">A four-method research approach.</h2>
        <p className="snma-section-intro" style={{ marginBottom: 56 }}>
          Each method built on the last — from theory, to competitive context, to existing system, to firsthand user data.
        </p>

        <div className="snma-method-grid">
          <div className="snma-method-card a snma-reveal">
            <div className="snma-method-ic">L</div>
            <h3>Literature Review</h3>
            <p style={{ color: 'var(--snma-fg-soft)', margin: 0 }}>
              Explored the impacts of social networking on health and exercise. Found the <b>Five Stages of Behavior Change Model</b> — three of its ten habit-building strategies are social-networking-related.
            </p>
            <div className="snma-method-meta">
              <span><b>Key finding:</b> Social ways apply at specific behavior stages</span>
            </div>
          </div>

          <div className="snma-method-card b snma-reveal">
            <div className="snma-method-ic">C</div>
            <h3>Comparative Audit</h3>
            <p style={{ color: 'var(--snma-fg-soft)', margin: 0 }}>
              Audited social features across direct competitors (BAM App / Nan Shan Life) and non-direct comparators (Nike Run Club, Garmin Connect, iOS Health).
            </p>
            <div className="snma-method-meta">
              <span><b>Most common:</b> Feed · Leaderboard · Group creating</span>
            </div>
          </div>

          <div className="snma-method-card a snma-reveal">
            <div className="snma-method-ic">E</div>
            <h3>Expert Audit</h3>
            <p style={{ color: 'var(--snma-fg-soft)', margin: 0 }}>
              Reviewed FitBack's existing system — leaderboard and group creation features already existed. The team was focusing on group task functions to drive user invitations.
            </p>
            <div className="snma-method-meta">
              <span><b>Current focus:</b> Group tasks to attract friends</span>
            </div>
          </div>

          <div className="snma-method-card b snma-reveal">
            <div className="snma-method-ic">S</div>
            <h3>Questionnaire Survey</h3>
            <p style={{ color: 'var(--snma-fg-soft)', margin: 0 }}>
              Distributed via Facebook health &amp; fitness groups and Instagram to collect firsthand data on user motivations, club participation, and app usage patterns.
            </p>
            <div className="snma-method-meta">
              <span><b>356</b> valid responses</span>
              <span><b>20–30</b> yrs dominant</span>
            </div>
          </div>
        </div>

        {/* Five Stages model diagram placeholder */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 12 }}>
            Five Stages of Behavior Change Model
          </p>
          <ImgPlaceholder label="Five Stages of Behavior Change Model diagram" height={280} />
        </div>

        <div style={{ background: 'var(--snma-card)', border: '1px solid rgba(26,26,26,0.12)', borderRadius: 'var(--snma-radius)', padding: 32 }}>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--snma-fg-mute)', marginBottom: 12 }}>Competitive audit matrix</p>
          <ImgPlaceholder label="Comparative audit matrix — BAM, Nike Run Club, Garmin, iOS Health" height={240} />
        </div>
      </div>
    </section>
  )
}

function Survey() {
  return (
    <section id="survey" className="snma-section">
      <div className="snma-wrap">
        <span className="snma-section-label">04 — Questionnaire survey</span>
        <h2 className="snma-section-title">356 responses. Real users, real motivations.</h2>
        <p className="snma-section-intro" style={{ marginBottom: 56 }}>
          The survey was structured into four sections: exercise habits, motivating methods, health &amp; fitness club experiences, and app experiences. Distributed externally via social channels due to limited internal access as an intern.
        </p>

        {/* Key stat highlight */}
        <div className="snma-impact-headline" style={{ marginBottom: 40 }}>
          <span>Top motivators to exercise: </span>
          <span className="snma-impact-hl">personal goals (77%)</span>
          {', '}
          positive emotions (61%), and friends' compliments (37%). Two of the top three are self-related — not social.
        </div>

        <div className="snma-impact-grid">
          {/* Motivators chart */}
          <div className="snma-impact-card snma-reveal">
            <div className="snma-impact-text">
              <span className="snma-impact-kind">Finding 01 — Motivation</span>
              <h3>Self-related factors dominate</h3>
              <p>
                Personal goals (77%) and positive emotions (61%) ranked highest. Friends' compliments (37%) was the only social factor in the top three — third place. This suggests social features alone won't drive exercise adoption.
              </p>
              <div className="snma-post-impact">
                <b>77%</b>&nbsp;personal goals&nbsp;·&nbsp;<b>61%</b>&nbsp;positive emotions&nbsp;·&nbsp;<b>37%</b>&nbsp;social
              </div>
            </div>
            <div className="snma-impact-img">
              <ImgPlaceholder label="Bar chart — top motivators to exercise" height="100%" style={{ minHeight: 180 }} />
            </div>
          </div>

          {/* Club participation chart */}
          <div className="snma-impact-card snma-reveal">
            <div className="snma-impact-text">
              <span className="snma-impact-kind">Finding 02 — Club participation</span>
              <h3>Stage 5 users participate most in clubs</h3>
              <p>
                Cross-analysis showed that participants at Stage 5 (exercising regularly for 6+ months) had the highest club participation rate — and rated clubs most helpful for motivation (4.4/5). Club engagement is positively correlated with exercise frequency.
              </p>
              <div className="snma-post-impact">
                Stage 5 helpfulness rating: <b>4.4 / 5</b>
              </div>
            </div>
            <div className="snma-impact-img">
              <ImgPlaceholder label="Cross-analysis chart — behavior stage vs club participation" height="100%" style={{ minHeight: 180 }} />
            </div>
          </div>

          {/* App usage chart */}
          <div className="snma-impact-card snma-reveal">
            <div className="snma-impact-text">
              <span className="snma-impact-kind">Finding 03 — App usage &amp; feature preference</span>
              <h3>"Feed" is the most preferred social function</h3>
              <p>
                Stage 5 users also use health &amp; fitness apps the most (4.1/5 helpfulness). Among the three prevalent social functions audited — feed, leaderboard, group creating — users preferred <b>Feed</b> most: sharing posts and interacting with friends.
              </p>
              <div className="snma-post-impact">
                Stage 5 app helpfulness: <b>4.1 / 5</b>&nbsp;·&nbsp;Top social feature: <b>Feed</b>
              </div>
            </div>
            <div className="snma-impact-img">
              <ImgPlaceholder label="Chart — app usage by stage + preferred social features" height="100%" style={{ minHeight: 180 }} />
            </div>
          </div>
        </div>

        {/* Survey insights summary */}
        <div style={{ marginTop: 40, background: 'var(--snma-card)', border: '1px solid rgba(26,26,26,0.12)', borderRadius: 'var(--snma-radius)', padding: 32 }}>
          <p style={{ fontFamily: 'var(--snma-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--snma-fg-mute)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ display: 'inline-block', width: 32, height: 1, background: 'currentColor' }} />
            Key insights
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {[
              { n: '01', text: 'Users in different behavior stages have very different opinions on what motivates them — knowing which stage our users are at is critical before designing.' },
              { n: '02', text: 'Although social factors aren\'t the top motivator, they still appear in the top three. The concept can be applied in design, just not as the primary driver.' },
              { n: '03', text: 'Of prevalent social functions, "Feed" is most preferred. If FitBack adds social features, starting with a feed-style interaction is the strongest bet.' },
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

function Impact() {
  return (
    <section id="impact" className="snma-section alt">
      <div className="snma-wrap">
        <span className="snma-section-label">05 — Impact</span>
        <h2 className="snma-section-title" style={{ maxWidth: 'none' }}>
          Research shifted the roadmap before a single line was designed.
        </h2>
        <p className="snma-section-intro" style={{ marginBottom: 56, maxWidth: 'none' }}>
          Before this research, the product team planned to develop social networking functions immediately — without supporting evidence. The findings changed that.
        </p>

        <div className="snma-impact-grid">
          <div className="snma-impact-card snma-reveal">
            <div className="snma-impact-text">
              <span className="snma-impact-kind">Revised development timeline</span>
              <h3>Social features deprioritized — for now</h3>
              <p>
                Data showed self-related motivators dominate over social ones. The team mildly postponed the social networking feature timeline and shifted focus to self-improvement flows that better align with what users actually need.
              </p>
              <div className="snma-post-impact">
                <b>PM:</b> "This is an important research for our team. We would like to conduct the research on our internal users."
              </div>
            </div>
            <div className="snma-impact-img">
              <ImgPlaceholder label="Revised product roadmap / timeline" height="100%" style={{ minHeight: 180 }} />
            </div>
          </div>

          <div className="snma-impact-card snma-reveal">
            <div className="snma-impact-text">
              <span className="snma-impact-kind">Design direction clarified</span>
              <h3>PM &amp; designer alignment on social feature priority</h3>
              <p>
                The designer on the team noted: "Based on this research, we could let PMs know that social networking functions may not be necessary at this moment. We could focus on designing other functions."
              </p>
              <div className="snma-post-impact">
                Enabled the team to confidently redirect design effort to higher-impact features.
              </div>
            </div>
            <div className="snma-impact-img no-bg">
              <ImgPlaceholder label="Designer / PM feedback quote visual" height="100%" style={{ minHeight: 180 }} />
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
          Two things this project taught me about doing exploratory research as an intern with limited resources.
        </p>
        <div className="snma-takeaways" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="snma-takeaway snma-reveal">
            <h3><span>Don't be afraid to discard previous content</span></h3>
            <p>
              I presented three versions and discussed each with my mentor — none were clear enough. Mentors and colleagues offered perspectives I'd missed. Iteration isn't failure; it's the process. Being willing to restart is a research skill, not a weakness.
            </p>
          </div>
          <div className="snma-takeaway snma-reveal">
            <h3><span>Don't let limited resources restrict you</span></h3>
            <p>
              Without access to internal FitBack users, I surveyed external users instead. The insights were still valuable — PMs gave positive feedback and were willing to replicate the study internally. Constraints push creativity; work with what you have.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function OecFin() {
  const active = useScrollSpy(SECTIONS)
  useReveal()

  useEffect(() => {
    const prev = document.title
    document.title = 'Lana Hung — Cathay FitBack Exploratory Research'
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
      <Overview />
      <Goals />
      <Process />
      <Survey />
      <Impact />
      <Takeaways />
      <CaseFooter />
    </div>
  )
}
