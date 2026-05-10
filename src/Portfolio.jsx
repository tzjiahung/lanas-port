import React from 'react'
import VoxelAvatar from './VoxelAvatar.jsx'
import VoxelAvatarV2 from './VoxelAvatarV2.jsx'
import VoxelMarker from './VoxelMarker.jsx'
import PeachDawn from './Stars.jsx'
import { useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakSlider, TweakRadio, TweakSelect } from './TweaksPanel.jsx'

const TWEAK_DEFAULTS = {
  vignette: false,
  glow: false,
  twinkle: true,
  grain: false,
  heroStar: false,
  starDensity: 20,
  starSizeMix: 'small-medium',
  warmth: 56,
  depth: 42,
  lightness: 50,
  bottomFade: 100,
  cardPadding: 12,
  cardRadius: 8,
  cardGap: 12,
  cardHeaderHeight: 18,
  outerPadding: 8,
  avatarSize: 76,
  avatarVariant: 'v1',
  heroPaddingY: 24,
  heroGap: 24,
  heroIntroSize: 16,
  heroMaxWidth: 1740,
  heroAlign: 'center',
  fontMono: false,
  aboutGradient: 'sunset',
}

const ART_W_PORTFOLIO = 1440;

function ArrowOut() {
  return (
    <svg
      width="10" height="10" viewBox="0 0 10 10"
      style={{ display: 'inline-block', marginLeft: 2, verticalAlign: 'baseline' }}
      aria-hidden="true"
    >
      <path
        d="M2.5 7.5L7.5 2.5M7.5 2.5H3.5M7.5 2.5V6.5"
        stroke="currentColor" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round" fill="none"
      />
    </svg>
  );
}

function HeroSparkle({ size = 22, top, right, left, bottom, delay = 0 }) {
  const x = 9, y = 9, r = 7, pinch = 14 * 0.14;
  const d = [
    `M ${x} ${y - r}`,
    `C ${x + pinch} ${y - pinch} ${x + pinch} ${y - pinch} ${x + r} ${y}`,
    `C ${x + pinch} ${y + pinch} ${x + pinch} ${y + pinch} ${x} ${y + r}`,
    `C ${x - pinch} ${y + pinch} ${x - pinch} ${y + pinch} ${x - r} ${y}`,
    `C ${x - pinch} ${y - pinch} ${x - pinch} ${y - pinch} ${x} ${y - r}`,
    'Z'
  ].join(' ');
  const pos = { position: 'absolute' };
  if (top !== undefined && top !== null) pos.top = top;
  if (bottom !== undefined && bottom !== null) pos.bottom = bottom;
  if (right !== undefined && right !== null) pos.right = right;
  if (left !== undefined && left !== null) pos.left = left;
  return (
    <svg
      width={size} height={size} viewBox="0 0 18 18"
      style={{
        ...pos,
        pointerEvents: 'none',
        transformOrigin: '50% 50%',
        animation: `heroSparkleTwinkle 2.4s ease-in-out ${delay}s infinite`,
        filter: 'drop-shadow(0 0 5px rgba(185, 163, 214, 0.55))',
      }}
      aria-hidden="true"
    >
      <path d={d} fill="#b9a3d6" />
    </svg>
  );
}

function CopyPill({ label = 'Copy for AI', copiedLabel = 'Copied', getText, ariaLabel }) {
  const [state, setState] = React.useState('idle');
  const [hover, setHover] = React.useState(false);
  const timer = React.useRef(null);
  React.useEffect(() => () => clearTimeout(timer.current), []);

  async function onClick() {
    const text = typeof getText === 'function' ? getText() : '';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setState('copied');
    } catch (e) {
      setState('error');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState('idle'), 1000);
  }

  const isCopied = state === 'copied';
  const isError = state === 'error';
  const fg = isCopied ? '#3f7a4f' : isError ? '#a4422a' : hover ? 'rgba(58,46,58,0.95)' : 'rgba(58,46,58,0.55)';
  const captionLabel = isCopied ? copiedLabel : isError ? 'Copy Failed' : label;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={ariaLabel || label}
      style={{
        display: 'inline-flex', alignItems: 'baseline',
        fontFamily: 'inherit', fontSize: 11.5, fontWeight: 400,
        color: fg, background: 'transparent', border: 'none',
        padding: 0, margin: 0, cursor: 'pointer',
        transition: 'color 0.15s', userSelect: 'none', whiteSpace: 'nowrap',
        textDecoration: 'underline', textDecorationStyle: 'dotted',
        textDecorationColor: 'rgba(58,46,58,0.35)',
        textDecorationThickness: '1px', textUnderlineOffset: 3,
      }}
    >
      <span>{captionLabel}</span>
      <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 5, textDecoration: 'none', position: 'relative', top: 1 }}>
        {isCopied
          ? <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>
          : <svg width="11" height="11" viewBox="0 0 12 12"><rect x="3.5" y="3.5" width="6" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.1" fill="none" /><path d="M2 8V2.7C2 2.31 2.31 2 2.7 2H8" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinecap="round" /></svg>
        }
      </span>
    </button>
  );
}

function Card({ title, children, style, padding, radius, headerAction, titleColor, isMobile, headerHeight, noFade, markerKind }) {
  const cardStyle = {
    ...cardStyles.card,
    ...(padding != null ? { padding: `${padding}px ${padding + 2}px` } : null),
    ...(radius != null ? { borderRadius: radius } : null),
    ...(isMobile ? { height: 'auto', overflow: 'visible' } : null),
    ...style,
    ...(isMobile ? { height: 'auto', overflow: 'visible' } : null),
  };
  const titleStyle = titleColor ? { ...cardStyles.title, color: titleColor } : cardStyles.title;
  const headerStyle = headerHeight != null
    ? { ...cardStyles.header, minHeight: headerHeight, height: headerHeight }
    : cardStyles.header;
  const bodyStyle = isMobile
    ? { ...cardStyles.body, overflow: 'visible', maskImage: 'none', WebkitMaskImage: 'none', flex: 'none', paddingRight: 0, marginRight: 0 }
    : noFade
    ? { ...cardStyles.body, maskImage: 'none', WebkitMaskImage: 'none' }
    : cardStyles.body;
  return (
    <section style={{ ...cardStyle, opacity: '1' }}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          {markerKind && <VoxelMarker kind={markerKind} size={22} />}
          <h2 style={titleStyle}>{title}</h2>
        </div>
        {headerAction}
      </div>
      <div style={bodyStyle} className={isMobile ? '' : 'col-scroll'}>{children}</div>
    </section>
  );
}

const cardStyles = {
  card: {
    background: 'rgba(255,255,255,0.92)',
    border: '1px solid rgba(58,46,58,0.08)',
    borderRadius: 18,
    boxShadow: '0 12px 36px rgba(120,80,140,0.08)',
    padding: '24px 26px',
    display: 'flex', flexDirection: 'column',
    gap: 14, minHeight: 0,
  },
  header: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', gap: 8, minHeight: 22,
  },
  title: {
    margin: 0, fontSize: 12, fontWeight: 600,
    letterSpacing: '0.08em', textTransform: 'uppercase',
    color: 'rgba(58,46,58,0.55)',
  },
  body: {
    display: 'flex', flexDirection: 'column', gap: 14,
    flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden',
    maskImage: 'linear-gradient(to bottom, transparent 0, #000 12px, #000 calc(100% - 12px), transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, #000 12px, #000 calc(100% - 12px), transparent 100%)',
    paddingRight: 6, marginRight: -6,
  },
};

// ─── About column ─────────────────────────────────────────────

function AboutBlock({ heading, marker, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {marker && <VoxelMarker kind={marker} size={26} />}
        <h3 style={{ margin: 0, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(58,46,58,0.55)', textWrap: 'pretty' }}>
          {heading}
        </h3>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(58,46,58,0.85)', textWrap: 'pretty' }}>
        {children}
      </div>
    </div>
  );
}

const ABOUT_GRADIENTS = {
  lilac:  { bg: 'linear-gradient(160deg, #ece0ef 0%, #f6ecf0 45%, #fbf4ee 100%)', border: '1px solid rgba(155, 120, 170, 0.22)', shadow: '0 1px 0 rgba(255,255,255,0.7) inset, 0 8px 28px -12px rgba(155,120,170,0.18)' },
  peach:  { bg: 'linear-gradient(160deg, #fbe4d8 0%, #faeee4 50%, #fbf6ef 100%)', border: '1px solid rgba(200, 140, 110, 0.22)', shadow: '0 1px 0 rgba(255,255,255,0.7) inset, 0 8px 28px -12px rgba(200,140,110,0.18)' },
  sunset: { bg: 'linear-gradient(180deg, #e8d8ec 0%, #f0d4e2 25%, #f7dde6 45%, #ffffff 80%)', border: '1px solid rgba(190, 130, 150, 0.28)', shadow: '0 1px 0 rgba(255,255,255,0.75) inset, 0 10px 32px -14px rgba(190,130,150,0.28)' },
  mint:   { bg: 'linear-gradient(160deg, #e0ece5 0%, #eef1ea 50%, #f7f1ea 100%)', border: '1px solid rgba(120, 160, 140, 0.22)', shadow: '0 1px 0 rgba(255,255,255,0.7) inset, 0 8px 28px -12px rgba(120,160,140,0.18)' },
  cream:  { bg: 'linear-gradient(160deg, #faf2e8 0%, #f8ece4 100%)', border: '1px solid rgba(180, 150, 120, 0.22)', shadow: '0 1px 0 rgba(255,255,255,0.7) inset, 0 8px 24px -12px rgba(180,150,120,0.16)' },
  none:   { bg: 'rgba(255,255,255,0.92)', border: '1px solid rgba(58, 46, 58, 0.08)', shadow: 'none' },
};

function buildAboutMarkdown() {
  return [
    `# Tz-Jia (Lana) Hung — About`,
    `Source: portfolio`,
    ``,
    `Hi, I'm Tz-Jia (Lana) Hung, an incoming HCDE student at the University of Washington.`,
    ``,
    `## Intro`,
    `Lana is an **AI-first product maker** and **collaborator** who proactively explores new technologies, shares what she learns with her team, and puts those tools to work solving complex UX problems.`,
    ``,
    `## How I work`,
    `**A designer who can do design, research, and PM work.** A person who can sketch the flow, run the study that questions it, and write the spec that ships it. **Generalist by intent, not by accident.**`,
    ``,
    `## What I value`,
    `> Empathize, listen, deep dive. Put myself in users' shoes, create the room where people feel safe to say what they actually think — then dig until the real problem surfaces.`,
    ``,
    `## What I'm looking for`,
    `Summer 2027 UX design roles on teams where designers, researchers, and PMs fuel each other and build as one!`,
    ``,
    `## Toolkit`,
    `- Design — Claude · Figma · Miro`,
    `- Research — Survicate · Lyssna · Dovetail · Metaview`,
    `- Data — SQL · Python · R · Amplitude · Metabase · Hotjar · GA4 · Excel`,
    `- AI / Build — Claude · Cursor · n8n · Replit`,
    ``,
    `## Awards & Talks`,
    `- Group Winner & Best Presenter — HCI Student Hackathon (Jul 2022)`,
    `- Workshop Host — Cathay FH design workshop (2022)`,
    `- Third Place & Semi-finalist — Atona Case Competition, 75 teams (2020)`,
    ``,
    `## Outside of work`,
    `- LEGO — every Friday evening`,
    `- Volleyball & marathons — since high school`,
    `- Scuba diving — Spain, Malta, Taiwan`,
    ``,
  ].join('\n');
}

function AboutCol({ padding, radius, isMobile, headerHeight, gradient, avatarVariant }) {
  const g = ABOUT_GRADIENTS[gradient] || ABOUT_GRADIENTS.lilac;
  return (
    <Card
      title="About"
      padding={padding} radius={radius}
      style={{ ...cardCol, background: g.bg, border: g.border, boxShadow: g.shadow }}
      titleColor="#7d68a3"
      isMobile={isMobile}
      headerHeight={headerHeight}
      noFade
      markerKind="intro"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ position: 'relative', display: 'inline-flex', marginTop: 24, marginRight: 32 }}>
            <style>{`
              @keyframes avatarFloatAbout {
                0%, 100% { transform: translateY(-2px); }
                50%      { transform: translateY(2px); }
              }
            `}</style>
            <div style={{ animation: 'avatarFloatAbout 3.6s ease-in-out infinite', willChange: 'transform' }}>
              {(() => {
                const Avatar = avatarVariant === 'v2' ? VoxelAvatarV2 : VoxelAvatar;
                return <Avatar size={198} />;
              })()}
            </div>
            <HeroSparkle size={45} top={-1} right={-13} />
            <HeroSparkle size={26} bottom={-4} left={-9} delay={1.2} />
          </div>
        </div>
        <div style={{ marginTop: -2 }}>
          <AboutBlock heading={null} marker={null}>
            <p style={{ margin: 0 }}>
              <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em', color: '#5a2c52' }}>Lana Hung</span> is an{' '}
              <strong style={{ color: '#2a1e2e', fontWeight: 600 }}>AI-first product maker</strong>{' '}
              who can do{' '}
              <strong style={{ color: '#2a1e2e', fontWeight: 600 }}>design, research, and PM work</strong>.
            </p>
          </AboutBlock>
        </div>
      </div>
    </Card>
  );
}

// ─── Works column ─────────────────────────────────────────────

const WORKS = [
  {
    id: 'shopback-activation',
    title: 'ShopBack New Market Activation',
    role: 'UX Research · Shipped',
    year: '2025',
    url: 'https://lanahung.com/shopback-nma',
    desc: 'Uncovering root causes of post-signup barriers through a mixed-methods study; findings informed a 7-step onboarding redesign.',
    cover: 'case-covers/shopback.png',
    accent: ['#d8c0dc', '#f0c8d4'],
  },
  {
    id: 'oec-finance',
    title: 'OEC Group Finance Module Design',
    role: 'UX Design · Shipped',
    year: '2024',
    url: 'https://lanahung.com/oec-fin',
    desc: 'Led 0-to-1 Compliance module design, including report create, edit, and display states.',
    cover: 'case-covers/oec-compliance.png',
    accent: ['#f6c9b4', '#f8d8b8'],
  },
  {
    id: 'oec-typography',
    title: 'OEC Group Typography System Redesign',
    role: 'UX Design · Shipped',
    year: '2024',
    url: 'https://lanahung.com/oec-typo',
    desc: '',
    cover: 'case-covers/oec-typography.png',
    accent: ['#f6c9b4', '#e8d4c0'],
  },
  {
    id: 'cathay-fitback',
    title: 'Cathay FitBack Exploratory Research',
    role: 'UX Research · Handed Over',
    year: '2023',
    url: 'https://lanahung.com/fitback',
    desc: 'Identified the importance of social features in promoting health awareness and how to design social networking features in the FitBack app.',
    cover: 'case-covers/cathay-fh.avif',
    accent: ['#f0c8d4', '#f6c9b4'],
  },
  {
    id: 'oclock-green',
    title: "O'Clock Green App Design",
    role: 'UX Design · Side Project',
    year: '2023',
    url: 'https://lanahung.com/oclock',
    desc: '',
    cover: 'case-covers/oclock-green.png',
    accent: ['#c9e4c4', '#e0eccd'],
  },
  {
    id: 'fooma-omo',
    title: 'FooMa OMO Food Waste Design',
    role: 'UX Design · Hackathon',
    year: '2023',
    url: 'https://lanahung.com/fooma',
    desc: '',
    cover: 'case-covers/fooma.png',
    accent: ['#f8d8b8', '#f0e0a8'],
  },
  {
    id: 'ucarer-redesign',
    title: 'Ucarer App Redesign',
    role: 'UX Design · Handed Over',
    year: '2023',
    url: 'https://lanahung.com/ucarer',
    desc: '',
    cover: 'case-covers/ucarer.png',
    accent: ['#c8d8e8', '#d8c0dc'],
  },
];

function buildWorksMarkdown() {
  const header = `# Tz-Jia (Lana) Hung — Selected Work\nSource: portfolio · ${WORKS.length} case studies\n\n`;
  const body = WORKS.map((w) => `## ${w.title}\n*${w.role} · ${w.year}*\n\n${w.desc}\n`).join('\n');
  return header + body;
}

function CaseStudy({ title, role, year, desc, cover, url, compact, imgHeight, fill }) {
  const [hover, setHover] = React.useState(false);
  const Tag = url ? 'a' : 'article';
  const linkProps = url
    ? {
        href: url,
        target: '_blank',
        rel: 'noopener noreferrer',
        onClick: (e) => {
          e.preventDefault();
          const w = window.open(url, '_blank', 'noopener,noreferrer');
          if (!w) window.top.location.href = url;
        },
      }
    : {};
  return (
    <Tag
      {...linkProps}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12, cursor: 'pointer', textDecoration: 'none', color: 'inherit', minHeight: 0, overflow: 'hidden' }}
    >
      <div style={{
        ...(fill ? { flex: '1 1 0', minHeight: 0 } : imgHeight ? { height: imgHeight } : { aspectRatio: compact ? '1 / 1' : '3 / 2' }),
        borderRadius: 8,
        background: 'rgba(255,255,255,0.55)',
        border: '1px solid rgba(58,46,58,0.08)',
        position: 'relative', overflow: 'hidden',
        transition: 'transform 0.4s cubic-bezier(.2,.7,.3,1)',
        transform: hover ? 'scale(1.03)' : 'scale(1)',
      }}>
        {cover
          ? <img src={cover} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(58,46,58,0.32)', fontWeight: 500 }}>
              {role.split(' · ')[1] || 'Case study'}
            </div>
        }
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#2a1e2e', letterSpacing: '-0.01em' }}>{title}</h3>
          <span style={{ fontSize: 12, color: 'rgba(58,46,58,0.55)' }}>{role} · {year}</span>
        </div>
      </div>
    </Tag>
  );
}

function WorksCol({ padding, radius, isMobile, headerHeight }) {
  const action = (
    <CopyPill
      label="Copy Links"
      copiedLabel="Copied"
      ariaLabel="Copy all work case studies as Markdown for an AI assistant"
      getText={buildWorksMarkdown}
    />
  );

  const top = WORKS.slice(0, 2);
  const bottom = WORKS.slice(2, 4);
  const third = WORKS.slice(4, 7);

  const topRowRef = React.useRef(null);
  const [compactImgH, setCompactImgH] = React.useState(null);
  React.useEffect(() => {
    if (isMobile || !topRowRef.current) { setCompactImgH(null); return; }
    const gap = 20;
    const compute = () => {
      const w = topRowRef.current?.offsetWidth || 0;
      const topW = (w - gap) / 2;
      const topH = topW * 2 / 3;
      setCompactImgH(topH);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(topRowRef.current);
    return () => ro.disconnect();
  }, [isMobile]);

  return (
    <Card title="Work" padding={padding} radius={radius} style={cardCol} headerAction={action} titleColor="#7d68a3" isMobile={isMobile} headerHeight={headerHeight} noFade markerKind="work">
      <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 20 : 24, minHeight: 0 }}>
        <div ref={topRowRef} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 20 }}>
          {top.map((w, i) => <CaseStudy key={`top-${w.id}-${i}`} {...w} />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: isMobile ? 16 : 20 }}>
          {bottom.map((w, i) => <CaseStudy key={`bot-${w.id}-${i}`} {...w} compact imgHeight={compactImgH} />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: isMobile ? 16 : 20 }}>
          {third.map((w, i) => <CaseStudy key={`row3-${w.id}-${i}`} {...w} compact imgHeight={compactImgH} />)}
        </div>
      </div>
    </Card>
  );
}

// ─── Articles column ──────────────────────────────────────────

const ARTICLES = [
  { title: 'Applying to HCI Masters in the Age of AI (Fall 2026)', date: 'Apr 2026', readMin: 11, url: 'https://medium.com/@LanaHung/applying-to-hci-masters-in-the-age-of-ai-fall-2026-915eab17fdcd' },
  { title: 'Assessing the Need for SB Pay Onboarding Using SQL and GSheets', date: 'Apr 2026', readMin: 7, url: 'https://medium.com/@LanaHung/assessing-the-need-for-sb-pay-onboarding-using-sql-and-gsheets-a44cf881261d' },
  { title: 'Segmenting Users by Defining User Properties from Behavioral Data', date: 'Sep 2025', readMin: 6, url: 'https://medium.com/@LanaHung/segmenting-users-by-defining-user-properties-from-behavior-data-526a9dd102d6' },
  { title: 'Defining and Evaluating Metrics with Xmrit Charts for the Withdrawal Experience', date: 'Aug 2025', readMin: 8, url: 'https://medium.com/@LanaHung/defining-and-evaluating-metrics-along-with-xmrit-charts-for-withdrawal-experience-f44e3a56a105' },
  { title: 'Using PostgreSQL to Segment Users and Solve In-App Survey Trigger Point Problem', date: 'Aug 2025', readMin: 7, url: 'https://medium.com/@LanaHung/using-postgresql-to-solve-an-in-app-survey-trigger-point-problem-bdc337310696' },
  { title: 'Using ClaudeAI and Python to Run an F-Test in UX Research', date: 'Aug 2025', readMin: 6, url: 'https://medium.com/@LanaHung/using-claudeai-and-python-to-run-an-f-test-in-ux-research-2d2bd6254637' },
  { title: 'Leveraging a Design Background to Conduct Better UX Research', date: 'Jan 2025', readMin: 5, url: 'https://medium.com/@LanaHung/connecting-the-dots-leveraging-a-design-background-to-conduct-better-ux-research-05b51a3b3be7' },
  { title: 'Holding a Metaverse Product Design Workshop', date: 'Jul 2023', readMin: 6, url: 'https://medium.com/@LanaHung/2022-holding-a-metaverse-product-design-workshop-35784812e25c' },
  { title: 'Cathay Financial Holdings UX/UI Design Internship Review (2/2)', date: 'May 2023', readMin: 9, url: 'https://medium.com/@LanaHung/2022-cathay-financial-holdings-ux-ui-design-internship-review-2-2-a7d4b01277fe' },
  { title: 'Cathay Financial Holdings UX/UI Design Internship Review (1/2)', date: 'May 2023', readMin: 8, url: 'https://medium.com/@LanaHung/2022-cathay-financial-holdings-ux-ui-design-internship-review-1-2-c7d6bb9701a9' },
  { title: 'Acer PM Summer Intern Application Review', date: 'Jan 2023', readMin: 8, url: 'https://medium.com/@LanaHung/2022-acer-pm-summer-intern-application-review-a59cea43a668' },
];

function buildArticlesMarkdown() {
  const header = `# Tz-Jia (Lana) Hung — Writing\nSource: portfolio · ${ARTICLES.length} articles on Medium (@LanaHung)\n\n`;
  const body = ARTICLES.map((a) => {
    const meta = a.readMin != null ? `${a.date} · ${a.readMin} min read` : a.date;
    return `- [${a.title}](${a.url}) — ${meta}`;
  }).join('\n');
  return header + body + '\n';
}

const articleStyles = {
  link: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '10px 12px', borderRadius: 10, textDecoration: 'none', color: 'inherit', transition: 'background 0.15s' },
  title: { fontSize: 13.5, color: '#2a1e2e', fontWeight: 500, lineHeight: 1.4, textWrap: 'balance' },
  meta: { fontSize: 11.5, color: 'rgba(58,46,58,0.55)' },
  num: { fontSize: 11, fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace', color: 'rgba(122,63,110,0.55)', fontVariantNumeric: 'tabular-nums', flexShrink: 0, paddingTop: 2, minWidth: 18 },
  metaDot: { margin: '0 6px', color: 'rgba(58,46,58,0.35)' },
  arrow: { color: 'rgba(58,46,58,0.45)', transition: 'transform 0.18s', flexShrink: 0 },
};

function ArticlesCol({ padding, radius, isMobile, headerHeight }) {
  const action = (
    <CopyPill
      label="Copy Links"
      copiedLabel="Copied"
      ariaLabel="Copy all article links as Markdown for an AI assistant"
      getText={buildArticlesMarkdown}
    />
  );
  return (
    <Card title="Articles" padding={padding} radius={radius} style={cardCol} headerAction={action} titleColor="#7d68a3" isMobile={isMobile} headerHeight={headerHeight} noFade markerKind="toolbox">
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ARTICLES.map((a, i) => (
          <li key={i}>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...articleStyles.link, padding: '2px 0px' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.55)';
                const arr = e.currentTarget.querySelector('[data-arr]');
                if (arr) arr.style.transform = 'translateX(2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                const arr = e.currentTarget.querySelector('[data-arr]');
                if (arr) arr.style.transform = 'translateX(0)';
              }}
            >
              <span style={articleStyles.num}>{String(i + 1).padStart(2, '0')}</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0, flex: 1 }}>
                <span style={{ ...articleStyles.title, fontSize: '12px' }}>{a.title}</span>
                <span style={articleStyles.meta}>
                  {a.date}
                  {a.readMin != null && (
                    <React.Fragment>
                      <span style={articleStyles.metaDot}>·</span>
                      {a.readMin} min read
                    </React.Fragment>
                  )}
                </span>
              </div>
              <span data-arr style={articleStyles.arrow}><ArrowOut /></span>
            </a>
          </li>
        ))}
      </ul>
    </Card>
  );
}

// ─── Talks column ─────────────────────────────────────────────

function TalksCol({ padding, radius, isMobile, headerHeight }) {
  return (
    <Card title="Awards & Talks" padding={padding} radius={radius} style={cardCol} titleColor="#7d68a3" isMobile={isMobile} headerHeight={headerHeight} noFade markerKind="trophy">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <li>
            <div style={{ fontSize: 12, color: '#2a1e2e', fontWeight: 500, lineHeight: 1.4 }}>Group Winner &amp; Best Presenter</div>
            <div style={{ fontSize: 11.5, color: 'rgba(58,46,58,0.55)' }}>HCI Student Hackathon · Jul 2022</div>
          </li>
          <li>
            <div style={{ fontSize: 12, color: '#2a1e2e', fontWeight: 500, lineHeight: 1.4 }}>Metaverse Workshop Host</div>
            <div style={{ fontSize: 11.5, color: 'rgba(58,46,58,0.55)' }}>Cathay FH design workshop · 2022</div>
          </li>
          <li>
            <div style={{ fontSize: 12, color: '#2a1e2e', fontWeight: 500, lineHeight: 1.4 }}>Third Place &amp; Semi-finalist</div>
            <div style={{ fontSize: 11.5, color: 'rgba(58,46,58,0.55)' }}>Atona Case Competition (75 teams) · 2020</div>
          </li>
        </ul>
      </div>
    </Card>
  );
}

// ─── Status bar ───────────────────────────────────────────────

const CHANGELOG_STAMP = __BUILD_TIME__

const CONTACT_LINKS = [
  { label: 'Resume',   href: 'https://drive.google.com/file/d/1RJ9YajZ4Arcvg7RzmP4fnIOglAN0m11H/view?usp=sharing' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tzjia-hung/' },
  { label: 'Medium',   href: 'https://medium.com/@lanahung' },
  { label: 'Email',    href: 'mailto:tzjia.hung@gmail.com' },
];

function StatusBar({ isMobile }) {
  const wrap = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '8px 32px', fontSize: 12, color: 'rgba(58,46,58,0.6)',
    fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, monospace',
    letterSpacing: '0.02em', flexShrink: 0,
  };
  const mobileWrap = isMobile ? { flexDirection: 'column', alignItems: 'flex-start', gap: 8, padding: '12px 16px 18px' } : null;
  return (
    <div style={{ ...wrap, ...mobileWrap }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: 'rgba(58,46,58,0.45)' }}>CHANGELOG</span>
        <span style={{ color: 'rgba(58,46,58,0.7)' }}>{CHANGELOG_STAMP}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: isMobile ? 'wrap' : 'nowrap', justifyContent: isMobile ? 'flex-start' : 'flex-end' }}>
        {CONTACT_LINKS.map((l, i) => (
          <React.Fragment key={l.label}>
            {i > 0 && <span style={{ color: 'rgba(58,46,58,0.3)' }}>·</span>}
            <a
              href={l.href}
              target={l.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{ color: 'rgba(58,46,58,0.7)', textDecoration: 'none', padding: '4px 8px', borderRadius: 6, transition: 'background 0.15s, color 0.15s' }}
              onClick={(e) => {
                if (l.href.startsWith('mailto:')) return;
                e.preventDefault();
                const w = window.open(l.href, '_blank', 'noopener,noreferrer');
                if (!w) window.top.location.href = l.href;
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(180,140,210,0.14)'; e.currentTarget.style.color = 'rgba(58,46,58,0.95)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(58,46,58,0.7)'; }}
            >
              {l.label}
            </a>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ─── Layout constants ─────────────────────────────────────────

const cardCol = { height: '100%', minHeight: 0, overflow: 'hidden' };

const mainStyles = {
  wrap: { position: 'relative', zIndex: 1, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  wrapMobile: { position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' },
};

const gridStyles = {
  outer: { flex: 1, minHeight: 0, margin: '0 auto', width: '100%', maxWidth: 'none' },
  outerMobile: { flex: '0 0 auto', minHeight: 0 },
  grid: { display: 'grid', gridTemplateColumns: '380px minmax(0, 1fr)', gap: 24, height: '100%', minHeight: 0 },
  gridMobile: { display: 'flex', flexDirection: 'column', gap: 16 },
};

// ─── App ─────────────────────────────────────────────────────

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [vp, setVp] = React.useState({
    w: typeof window !== 'undefined' ? window.innerWidth : 1440,
    h: typeof window !== 'undefined' ? window.innerHeight : 900,
  });
  React.useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  React.useEffect(() => {
    document.body.classList.toggle('font-mono', !!t.fontMono);
  }, [t.fontMono]);

  const isMobile = vp.w < 760;

  return (
    <React.Fragment>
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <PeachDawn w={vp.w} h={vp.h} t={t} />
      </div>

      <main style={isMobile ? mainStyles.wrapMobile : mainStyles.wrap}>
        <div style={{
          ...gridStyles.outer,
          ...(isMobile ? gridStyles.outerMobile : null),
          padding: isMobile ? '12px 16px 12px' : `16px ${t.outerPadding}px 8px`,
        }}>
          <div style={{
            ...(isMobile ? gridStyles.gridMobile : gridStyles.grid),
            gap: isMobile ? Math.max(12, t.cardGap) : t.cardGap,
          }}>
            <div style={{
              display: 'grid',
              gridTemplateRows: isMobile ? 'auto auto auto' : '2fr 1fr 1fr',
              gap: isMobile ? Math.max(12, t.cardGap) : t.cardGap,
              minHeight: 0, minWidth: 0, overflow: 'hidden',
            }}>
              <AboutCol padding={t.cardPadding} radius={t.cardRadius} isMobile={isMobile} headerHeight={t.cardHeaderHeight} gradient={t.aboutGradient} avatarVariant={t.avatarVariant} />
              <ArticlesCol padding={t.cardPadding} radius={t.cardRadius} isMobile={isMobile} headerHeight={t.cardHeaderHeight} />
              <TalksCol padding={t.cardPadding} radius={t.cardRadius} isMobile={isMobile} headerHeight={t.cardHeaderHeight} />
            </div>
            <WorksCol padding={t.cardPadding} radius={t.cardRadius} isMobile={isMobile} headerHeight={t.cardHeaderHeight} />
          </div>
        </div>
        <StatusBar isMobile={isMobile} />
      </main>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Typography" />
        <TweakToggle label="Mono font (JetBrains)" value={t.fontMono} onChange={(v) => setTweak('fontMono', v)} />

        <TweakSection label="Container" />
        <TweakSlider label="Card padding" value={t.cardPadding} min={8} max={64} step={1} unit="px" onChange={(v) => setTweak('cardPadding', v)} />
        <TweakSlider label="Card radius" value={t.cardRadius} min={0} max={48} step={1} unit="px" onChange={(v) => setTweak('cardRadius', v)} />
        <TweakSlider label="Card gap" value={t.cardGap} min={0} max={64} step={1} unit="px" onChange={(v) => setTweak('cardGap', v)} />
        <TweakSlider label="Card title row height" value={t.cardHeaderHeight ?? 22} min={16} max={80} step={1} unit="px" onChange={(v) => setTweak('cardHeaderHeight', v)} />
        <TweakSlider label="Outer padding" value={t.outerPadding} min={0} max={160} step={4} unit="px" onChange={(v) => setTweak('outerPadding', v)} />
        <TweakSelect label="About card bg" value={t.aboutGradient} options={['lilac', 'peach', 'sunset', 'mint', 'cream', 'none']} onChange={(v) => setTweak('aboutGradient', v)} />
        <TweakRadio label="Avatar" value={t.avatarVariant} options={[{ value: 'v1', label: 'V1' }, { value: 'v2', label: 'V2' }]} onChange={(v) => setTweak('avatarVariant', v)} />

        <TweakSection label="Background" />
        <TweakSlider label="Lightness" value={t.lightness} min={0} max={100} step={1} unit="%" onChange={(v) => setTweak('lightness', v)} />
        <TweakSlider label="Bottom fade" value={t.bottomFade ?? 0} min={0} max={100} step={1} unit="%" onChange={(v) => setTweak('bottomFade', v)} />
        <TweakSlider label="Warmth" value={t.warmth} min={0} max={100} step={1} unit="%" onChange={(v) => setTweak('warmth', v)} />
        <TweakSlider label="Depth" value={t.depth} min={0} max={100} step={1} unit="%" onChange={(v) => setTweak('depth', v)} />
        <TweakSlider label="Star density" value={t.starDensity} min={20} max={300} step={10} onChange={(v) => setTweak('starDensity', v)} />

        <TweakSection label="Bg extras" />
        <TweakToggle label="Vignette" value={t.vignette} onChange={(v) => setTweak('vignette', v)} />
        <TweakToggle label="Glow" value={t.glow} onChange={(v) => setTweak('glow', v)} />
        <TweakToggle label="Twinkle" value={t.twinkle} onChange={(v) => setTweak('twinkle', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

export default App
