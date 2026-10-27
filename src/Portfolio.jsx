import React from 'react'
import VoxelAvatar from './VoxelAvatar.jsx'
import VoxelAvatarV2 from './VoxelAvatarV2.jsx'
import VoxelMarker from './VoxelMarker.jsx'
import PeachDawn from './Stars.jsx'
import { useTweaks, TweaksPanel, TweakSection, TweakToggle, TweakSlider, TweakRadio, TweakSelect } from './TweaksPanel.jsx'

function trackEvent(name, params) {
  if (typeof window.gtag === 'function') window.gtag('event', name, params)
}

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

function HeroSparkle({ size = 22, top, right, left, bottom, delay = 0, color = '#b9a3d6' }) {
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
      <path d={d} fill={color} />
    </svg>
  );
}

function CopyPill({ label = 'Copy for AI', copiedLabel = 'Copied', getText, ariaLabel, trackLabel }) {
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
      trackEvent('click', { button_label: `Copy Links for AI — ${trackLabel}` });
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
  const scrolledRef = React.useRef(false);
  function handleScroll() {
    if (scrolledRef.current) return;
    scrolledRef.current = true;
    trackEvent('scroll', { card: title });
  }

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
      {(title || headerAction) && (
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
            {markerKind && <VoxelMarker kind={markerKind} size={22} />}
            {title && <h2 style={titleStyle}>{title}</h2>}
          </div>
          {headerAction}
        </div>
      )}
      <div style={bodyStyle} className={isMobile ? '' : 'col-scroll'} onScroll={isMobile ? undefined : handleScroll}>{children}</div>
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
              <strong style={{ color: '#2a1e2e', fontWeight: 600 }}>AI-native UX designer</strong>{' '}
              who designs, researches, and ships with measurable wins across{' '}
              <strong style={{ color: '#2a1e2e', fontWeight: 600 }}>multi-market platforms</strong>.
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
    url: '#/shopback-nma',
    desc: 'Uncovering root causes of post-signup barriers through a mixed-methods study; findings informed a 7-step onboarding redesign.',
    cover: 'case-covers/shopback.jpg',
    tags: ['Research', 'Shipped'],
    tagColor: '#b46fae',
    accent: ['#d8c0dc', '#f0c8d4'],
  },
  {
    id: 'oec-finance',
    title: 'OEC Group Finance Module Design',
    role: 'UX Design · Shipped',
    year: '2024',
    url: '#/oec-fin',
    desc: 'Led 0-to-1 Compliance module design, including report create, edit, and display states.',
    cover: 'case-covers/oec-compliance.jpg',
    tags: ['Design', 'Shipped'],
    tagColor: '#3d6fd8',
    accent: ['#f6c9b4', '#f8d8b8'],
  },
  {
    id: 'oec-typography',
    title: 'OEC Group Typography System Redesign',
    role: 'UX Design · Shipped',
    year: '2024',
    url: '#/oec-typo',
    desc: '',
    cover: 'case-covers/oec-typography.jpg',
    tags: ['Design', 'Shipped'],
    tagColor: '#3d6fd8',
    accent: ['#f6c9b4', '#e8d4c0'],
  },
  {
    id: 'cathay-fitback',
    title: 'Cathay FitBack Exploratory Research',
    role: 'UX Research · Handed Over',
    year: '2023',
    url: '#/fitback',
    desc: 'Identified the importance of social features in promoting health awareness and how to design social networking features in the FitBack app.',
    cover: 'case-covers/cathay-fh.avif',
    tags: ['Research', 'Handed over'],
    tagColor: '#2e7d6b',
    accent: ['#f0c8d4', '#f6c9b4'],
  },
  {
    id: 'oclock-green',
    title: "O'Clock Green App Design",
    role: 'UX Design · Side Project',
    year: '2023',
    url: '#/oclock',
    desc: '',
    cover: 'case-covers/oclock-green.png',
    tags: ['Design', 'Side project'],
    tagColor: '#2a9d8f',
    accent: ['#c9e4c4', '#e0eccd'],
  },
  {
    id: 'fooma-omo',
    title: 'FooMa OMO Food Waste Design',
    role: 'UX Design · Hackathon',
    year: '2023',
    url: '#/fooma',
    desc: '',
    cover: 'case-covers/fooma.png',
    tags: ['Design', 'Hackathon'],
    tagColor: '#d9606a',
    accent: ['#f8d8b8', '#f0e0a8'],
  },
  {
    id: 'ucarer-redesign',
    title: 'Ucarer App Redesign',
    role: 'UX Design · Handed Over',
    year: '2023',
    url: '#/ucarer',
    desc: '',
    cover: 'case-covers/ucarer.png',
    tags: ['Design', 'Side project'],
    tagColor: '#3a9a2e',
    accent: ['#c8d8e8', '#d8c0dc'],
  },
];

function buildWorksMarkdown() {
  const header = `# Tz-Jia (Lana) Hung — Selected Work\nSource: portfolio · ${WORKS.length} case studies\n\n`;
  const body = WORKS.map((w) => `## ${w.title}\n*${w.role} · ${w.year}*\n\n${w.desc}\n`).join('\n');
  return header + body;
}

function CaseStudy({ title, role, year, desc, cover, url, tags, tagColor, compact, imgHeight, fill }) {
  const [hover, setHover] = React.useState(false);
  const Tag = url ? 'a' : 'article';
  const isInternal = url && url.startsWith('#/');
  const linkProps = url
    ? {
        href: url,
        onClick: (e) => {
          e.preventDefault();
          trackEvent('click', { button_label: title, section: 'work' });
          if (isInternal) {
            window.location.hash = url.slice(1);
          } else {
            window.location.href = url;
          }
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
        {tags && tags.length > 0 && (
          <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {tags.map((t) => (
              <span key={t} style={{ padding: '4px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.92)', color: tagColor || '#7d68a3', fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>{t}</span>
            ))}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#2a1e2e', letterSpacing: '-0.01em' }}>{title}</h3>
          <span style={{ fontSize: 12, color: 'rgba(58,46,58,0.55)' }}>· {year}</span>
        </div>
      </div>
    </Tag>
  );
}

// Playground pieces sit on the dot-grid canvas like frames on a FigJam board and can be dragged
// around it. `x`/`y` is the starting spot (px from the canvas's top-left), `rotate` a slight tilt.
const PLAYGROUND = [
  { id: 'whatsapp-countdown', label: 'WhatsApp countdown', video: 'playground-covers/whatsapp-countdown.mp4', poster: 'playground-covers/whatsapp-countdown.jpg', x: 24, y: 24, rotate: -6, frame: '#e1f8e7', frameBorder: 'rgba(37,211,102,0.25)' },
];

function PlaygroundPiece({ label, video, poster, x, y, rotate, frame, frameBorder, canvasRef }) {
  const [pos, setPos] = React.useState({ x, y });
  const [dragging, setDragging] = React.useState(false);
  const drag = React.useRef(null); // pointer offset from the piece's corner while dragging

  function onPointerDown(e) {
    if (e.button !== 0) return;
    e.preventDefault(); // no native image/video drag or text selection
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
    setDragging(true);
  }
  function onPointerMove(e) {
    if (!drag.current) return;
    // Keep the piece on the canvas.
    const canvas = canvasRef.current;
    const maxX = Math.max(0, canvas.clientWidth - e.currentTarget.offsetWidth);
    const maxY = Math.max(0, canvas.clientHeight - e.currentTarget.offsetHeight);
    setPos({
      x: Math.min(Math.max(e.clientX - drag.current.dx, 0), maxX),
      y: Math.min(Math.max(e.clientY - drag.current.dy, 0), maxY),
    });
  }
  function onPointerUp() {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
    trackEvent('click', { button_label: `Playground piece moved: ${label}`, section: 'work' });
  }

  return (
    <div
      onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
      style={{
        position: 'absolute', left: pos.x, top: pos.y, zIndex: dragging ? 2 : 1,
        width: 'min(100%, 300px)', padding: 12, boxSizing: 'border-box',
        background: frame, borderRadius: 16, border: `1px solid ${frameBorder}`,
        transform: `rotate(${rotate}deg) scale(${dragging ? 1.03 : 1})`,
        boxShadow: dragging
          ? '0 2px 4px rgba(58,46,58,0.08), 0 22px 40px -14px rgba(91,74,138,0.38)'
          : '0 1px 2px rgba(58,46,58,0.06), 0 10px 24px -12px rgba(91,74,138,0.26)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        cursor: dragging ? 'grabbing' : 'grab', touchAction: 'none', userSelect: 'none',
      }}
    >
      <video
        src={video} poster={poster} autoPlay muted loop playsInline aria-label={label}
        style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', display: 'block', borderRadius: 8, pointerEvents: 'none' }}
      />
    </div>
  );
}

const FOLDER_FRONT_TOP = 36; // tab height; the card body starts here
const FOLDER_BACK_BG = '#f6f1fb';
// Until Playground has content, clicking its tab shows a "Coming soon!" tooltip instead of switching.
const PLAYGROUND_ENABLED = true;
const FOLDER_STROKE = 2; // gradient stroke width of the Playground folder
// FigJam-style dot grid for the Playground canvas, drawn over FOLDER_BACK_BG.
const PLAYGROUND_DOT_GRID = 'radial-gradient(circle, rgba(155,125,210,0.4) 0.6px, transparent 1px) 0 0 / 20px 20px';
// The Playground stroke circles around the tab and card: --pg-angle is animated by .pg-stroke-spin
// (index.css) on their shared wrapper, so both stay in step.
// Lavender-to-pink glow behind the Playground tab. It orbits with the stroke: the pink glow
// follows the stroke's light-pink highlight (180° into the conic gradient), lavender sits opposite.
const FOLDER_GLOW = [
  'calc(sin(var(--pg-angle)) * -8px) calc(cos(var(--pg-angle)) * 4px) 10px rgba(239,143,201,0.45)',
  'calc(sin(var(--pg-angle)) * 8px) calc(cos(var(--pg-angle)) * -4px) 10px rgba(185,155,230,0.45)',
].join(', ');
// The tab and card centre the conic on the same point (`at`, measured from each one's top-right
// corner) so the stroke's colour runs on unbroken where the tab meets the card.
const folderSpinGradient = (at) => `conic-gradient(from var(--pg-angle) at ${at}, #b99be6, #ef8fc9, #f7c6e3, #ef8fc9, #b99be6)`;
// Keeps the tab's glow from spilling down onto the card below it.
const FOLDER_TAB_CLIP = 'inset(-24px -24px 0 -24px)';
// Soft shade along an inactive tab's bottom edge, as if the card in front casts onto it.
const FOLDER_TAB_SHADE = 'inset 0 -10px 8px -8px rgba(91,74,138,0.22)';
// The plain white tabs along the folder's left edge; Playground sits on its own at the right.
const FOLDER_FRONT_TABS = [
  { id: 'work', label: 'Work' },
  { id: 'fintech', label: 'Fintech' },
];
const FINTECH_IDS = ['oec-finance', 'cathay-fitback'];
const FINTECH_WORKS = WORKS.filter(w => FINTECH_IDS.includes(w.id));
const WORK_TAB_WORKS = WORKS.filter(w => !FINTECH_IDS.includes(w.id));
const TAB_TRACK_LABEL = { work: 'Work tab', fintech: 'Fintech tab', playground: 'Playground tab' };

function FolderTabs({ active, onChange, radius, strokeCenter }) {
  const tabLabel = { fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1 };
  const tabBtn = { fontFamily: 'inherit', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, margin: 0 };
  const r = Math.max(radius ?? 8, 8);
  const [soonPos, setSoonPos] = React.useState(null); // tooltip anchor, relative to the right tab area
  const soonVisible = soonPos != null;
  const soonTimer = React.useRef(null);
  const areaRef = React.useRef(null);
  React.useEffect(() => () => clearTimeout(soonTimer.current), []);
  function onPlaygroundClick(e) {
    if (PLAYGROUND_ENABLED) { onChange('playground'); return; }
    trackEvent('click', { button_label: 'Playground tab (coming soon)', section: 'work' });
    const area = areaRef.current.getBoundingClientRect();
    const tabRect = e.currentTarget.getBoundingClientRect();
    // Show the tooltip where the pointer clicked; keyboard presses (detail 0) anchor under the tab.
    const x = e.detail === 0 ? tabRect.left + tabRect.width / 2 : e.clientX;
    const y = e.detail === 0 ? tabRect.bottom : e.clientY;
    const halfTip = 52; // keep the tooltip from spilling past the card's right edge
    setSoonPos({ x: Math.min(x - area.left, area.width - halfTip), arrowX: x - area.left, y: y - area.top });
    clearTimeout(soonTimer.current);
    soonTimer.current = setTimeout(() => setSoonPos(null), 1000);
  }
  return (
    <div role="tablist" aria-label="Work, fintech and playground" style={{ display: 'flex', alignItems: 'flex-end', height: FOLDER_FRONT_TOP, flexShrink: 0, position: 'relative' }}>
      {FOLDER_FRONT_TABS.map(({ id, label }) => (
        <button
          key={id}
          type="button" role="tab" aria-selected={active === id}
          onClick={() => onChange(id)}
          style={{
            ...tabBtn,
            position: 'relative', zIndex: active === id ? 2 : 0, alignSelf: 'flex-start',
            // The active tab overlaps the card's top border so the two read as one folder.
            height: active === id ? FOLDER_FRONT_TOP + 1 : FOLDER_FRONT_TOP,
            marginBottom: active === id ? -1 : 0,
            padding: '0 16px',
            background: 'rgba(255,255,255,0.92)',
            border: '1px solid rgba(58,46,58,0.08)', borderBottom: 'none',
            borderRadius: `${r + 2}px ${r + 2}px 0 0`,
            boxShadow: active === id ? 'none' : FOLDER_TAB_SHADE,
            color: '#5b4a8a',
          }}
        >
          <VoxelMarker kind={id} size={18} />
          <span style={tabLabel}>{label}</span>
        </button>
      ))}
      <div ref={areaRef} style={{ flex: 1, alignSelf: 'stretch', position: 'relative' }}>
        <button
          type="button" role="tab" aria-selected={active === 'playground'}
          onClick={onPlaygroundClick}
          style={{
            ...tabBtn,
            position: 'absolute', top: 0, right: 0, zIndex: active === 'playground' ? 2 : 0,
            height: active === 'playground' ? FOLDER_FRONT_TOP + FOLDER_STROKE : FOLDER_FRONT_TOP,
            padding: '0 18px',
            borderStyle: 'solid', borderColor: 'transparent', borderWidth: `${FOLDER_STROKE}px ${FOLDER_STROKE}px 0 ${FOLDER_STROKE}px`,
            borderRadius: `${r + 2}px ${r + 2}px 0 0`,
            background: `linear-gradient(${FOLDER_BACK_BG}, ${FOLDER_BACK_BG}) padding-box, ${folderSpinGradient(strokeCenter ? `right ${strokeCenter.x}px top ${strokeCenter.y + FOLDER_FRONT_TOP}px` : 'center')} border-box`,
            boxShadow: active === 'playground' ? FOLDER_GLOW : `${FOLDER_TAB_SHADE}, ${FOLDER_GLOW}`,
            clipPath: active === 'playground' ? FOLDER_TAB_CLIP : 'none',
            color: '#5b4a8a',
          }}
        >
          <VoxelMarker kind="playground" size={18} />
          <span style={{ ...tabLabel, letterSpacing: '0.14em' }}>Playground</span>
          <HeroSparkle size={12} top={-6} right={-7} color="#f2a65a" />
          <HeroSparkle size={8} top={-5} right={58} color="#a993e6" delay={1.2} />
        </button>
        {soonVisible && (
          <div role="status" style={{
            position: 'absolute', top: soonPos.y + 14, left: soonPos.x, transform: 'translateX(-50%)', zIndex: 3,
            padding: '6px 10px', borderRadius: 8,
            background: '#fff', color: '#5b4a8a',
            border: '1px solid rgba(91,74,138,0.15)',
            fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
            boxShadow: '0 6px 18px rgba(91,74,138,0.16)',
            pointerEvents: 'none',
          }}>
            <span aria-hidden="true" style={{ position: 'absolute', top: -5, left: `calc(50% + ${soonPos.arrowX - soonPos.x}px - 4px)`, width: 8, height: 8, background: '#fff', borderTop: '1px solid rgba(91,74,138,0.15)', borderLeft: '1px solid rgba(91,74,138,0.15)', transform: 'rotate(45deg)' }} />
            Coming soon!
          </div>
        )}
      </div>
    </div>
  );
}

// Hidden for now — flip to true to bring back the work card's "Copy links to clipboard".
const SHOW_WORK_COPY_LINK = false;

function WorksCol({ padding, radius, isMobile, headerHeight }) {
  const [tab, setTab] = React.useState('work');
  const action = SHOW_WORK_COPY_LINK ? (
    <CopyPill
      label="Copy links to clipboard"
      copiedLabel="Copied"
      ariaLabel="Copy all work case studies as Markdown for an AI assistant"
      getText={buildWorksMarkdown}
      trackLabel="work"
    />
  ) : null;

  const top = WORK_TAB_WORKS.slice(0, 2);
  const third = WORK_TAB_WORKS.slice(2, 5);

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
  }, [isMobile, tab]);

  // Centre of the card below the tabs, from its top-right corner: the shared centre of the Playground stroke.
  const folderRef = React.useRef(null);
  const [strokeCenter, setStrokeCenter] = React.useState(null);
  React.useEffect(() => {
    const el = folderRef.current;
    if (!el) return;
    const measure = () => setStrokeCenter({ x: el.offsetWidth / 2, y: (el.offsetHeight - FOLDER_FRONT_TOP) / 2 });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const canvasRef = React.useRef(null); // the Playground canvas that pieces are dragged around

  function selectTab(next) {
    if (next === tab) return;
    trackEvent('click', { button_label: TAB_TRACK_LABEL[next], section: 'work' });
    setTab(next);
  }

  const r = radius ?? 8;
  const playgroundBody = {
    border: `${FOLDER_STROKE}px solid transparent`,
    background: `${PLAYGROUND_DOT_GRID} padding-box, linear-gradient(${FOLDER_BACK_BG}, ${FOLDER_BACK_BG}) padding-box, ${folderSpinGradient(strokeCenter ? `right ${strokeCenter.x}px top ${strokeCenter.y}px` : 'center')} border-box`,
    boxShadow: FOLDER_GLOW,
  };
  return (
    <div ref={folderRef} className="pg-stroke-spin" style={{ ...(isMobile ? null : cardCol), display: 'flex', flexDirection: 'column', overflow: 'visible' }}>
      <FolderTabs active={tab} onChange={selectTab} radius={radius} strokeCenter={strokeCenter} />
      <Card padding={padding} radius={radius} style={{ ...cardCol, flex: 1, height: 'auto', position: 'relative', zIndex: 1, borderTopLeftRadius: tab === 'work' ? 0 : r + 2, borderTopRightRadius: tab === 'playground' ? 0 : r + 2, ...(tab === 'playground' ? playgroundBody : null) }} headerAction={action} isMobile={isMobile} headerHeight={headerHeight} noFade>
        {tab === 'work' ? (
          <div role="tabpanel" aria-label="Work" style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 20 : 24, minHeight: 0 }}>
            <div ref={topRowRef} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 20 }}>
              {top.map((w, i) => <CaseStudy key={`top-${w.id}-${i}`} {...w} />)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: isMobile ? 16 : 20 }}>
              {third.map((w, i) => <CaseStudy key={`row3-${w.id}-${i}`} {...w} compact imgHeight={compactImgH} />)}
            </div>
          </div>
        ) : tab === 'fintech' ? (
          <div role="tabpanel" aria-label="Fintech" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 20, alignContent: 'start', minHeight: 0 }}>
            {FINTECH_WORKS.map(w => <CaseStudy key={`fintech-${w.id}`} {...w} />)}
          </div>
        ) : (
          <div ref={canvasRef} role="tabpanel" aria-label="Playground" style={{ flex: 1, minHeight: 380, position: 'relative' }}>
            {PLAYGROUND.map(p => <PlaygroundPiece key={p.id} {...p} canvasRef={canvasRef} />)}
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── Articles column ──────────────────────────────────────────

const ARTICLES = [
  { title: 'Building a UX Research Agent for Slack with n8n, GitLab CI, and Claude', date: 'Aug 2026', readMin: 8, url: 'https://medium.com/@LanaHung/building-a-ux-research-agent-for-slack-with-n8n-gitlab-ci-and-claude-2668908b3cd1' },
  { title: 'How we transformed qualitative synthesize with AI: ChatGPT, NotebookLM, Claude Code', date: 'Jun 2026', readMin: 7, url: 'https://medium.com/@LanaHung/how-we-transformed-qualitative-synthesize-with-ai-chatgpt-notebooklm-claude-code-0b4df664a15f' },
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
      label="Copy links to clipboard"
      copiedLabel="Copied"
      ariaLabel="Copy all article links as Markdown for an AI assistant"
      getText={buildArticlesMarkdown}
      trackLabel="articles"
    />
  );
  return (
    <Card title="Articles" padding={padding} radius={radius} style={cardCol} headerAction={action} titleColor="#7d68a3" isMobile={isMobile} headerHeight={headerHeight} noFade markerKind="toolbox">
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ARTICLES.map((a, i) => (
          <li key={i}>
            <a
              href={a.url}
              target="_top"
              style={{ ...articleStyles.link, padding: '2px 0px' }}
              onClick={() => trackEvent('click', { button_label: a.title, section: 'articles' })}
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
  { label: 'Resume',   href: 'https://drive.google.com/file/d/1St1aakqtpUVyR-E1CtBUKJpMCmvh23jH/view?usp=sharing' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tzjia-hung/' },
  { label: 'GitHub',   href: 'https://github.com/tzjiahung' },
  { label: 'Medium',   href: 'https://medium.com/@lanahung' },
  { label: 'Email',    href: 'mailto:tzjia.hung@gmail.com' },
];

function StatusBar({ isMobile, inset }) {
  const wrap = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: `10px ${inset}px 8px`, fontSize: 12, color: 'rgba(58,46,58,0.6)',
    fontFamily: '"JetBrains Mono", "SF Mono", ui-monospace, monospace',
    letterSpacing: '0.02em', flexShrink: 0,
  };
  const mobileWrap = isMobile ? { flexDirection: 'column', alignItems: 'flex-start', gap: 8, padding: `20px ${inset}px 12px` } : null;
  return (
    <div style={{ ...wrap, ...mobileWrap }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: 'rgba(58,46,58,0.45)' }}>CHANGELOG</span>
        <span style={{ color: 'rgba(58,46,58,0.7)' }}>{CHANGELOG_STAMP}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: isMobile ? 'wrap' : 'nowrap', justifyContent: isMobile ? 'flex-start' : 'flex-end', margin: isMobile ? '0 0 0 -8px' : 0 }}>
        {CONTACT_LINKS.map((l, i) => (
          <React.Fragment key={l.label}>
            {i > 0 && <span style={{ color: 'rgba(58,46,58,0.3)' }}>·</span>}
            <a
              href={l.href}
              target={l.href.startsWith('mailto:') ? undefined : '_top'}
              style={{ color: 'rgba(58,46,58,0.7)', textDecoration: 'none', padding: '4px 8px', borderRadius: 6, transition: 'background 0.15s, color 0.15s' }}
              onClick={(e) => {
                trackEvent('click', { button_label: l.label, section: 'footer' });
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
        {/* Inset matches card text: outer padding + 1px card border + card horizontal padding */}
        <StatusBar isMobile={isMobile} inset={(isMobile ? 16 : t.outerPadding) + 1 + t.cardPadding + 2} />
        <div style={{
          ...gridStyles.outer,
          ...(isMobile ? gridStyles.outerMobile : null),
          padding: isMobile ? '0 16px 12px' : `0 ${t.outerPadding}px 16px`,
        }}>
          {isMobile ? (
            <div style={{ ...gridStyles.gridMobile, gap: Math.max(12, t.cardGap) }}>
              <AboutCol padding={t.cardPadding} radius={t.cardRadius} isMobile headerHeight={t.cardHeaderHeight} gradient={t.aboutGradient} avatarVariant={t.avatarVariant} />
              <WorksCol padding={t.cardPadding} radius={t.cardRadius} isMobile headerHeight={t.cardHeaderHeight} />
              <ArticlesCol padding={t.cardPadding} radius={t.cardRadius} isMobile headerHeight={t.cardHeaderHeight} />
              <TalksCol padding={t.cardPadding} radius={t.cardRadius} isMobile headerHeight={t.cardHeaderHeight} />
            </div>
          ) : (
            <div style={{ ...gridStyles.grid, gap: t.cardGap }}>
              <div style={{
                display: 'grid',
                gridTemplateRows: '2fr 1fr 1fr',
                gap: t.cardGap,
                minHeight: 0, minWidth: 0, overflow: 'hidden',
              }}>
                <AboutCol padding={t.cardPadding} radius={t.cardRadius} isMobile={false} headerHeight={t.cardHeaderHeight} gradient={t.aboutGradient} avatarVariant={t.avatarVariant} />
                <ArticlesCol padding={t.cardPadding} radius={t.cardRadius} isMobile={false} headerHeight={t.cardHeaderHeight} />
                <TalksCol padding={t.cardPadding} radius={t.cardRadius} isMobile={false} headerHeight={t.cardHeaderHeight} />
              </div>
              <WorksCol padding={t.cardPadding} radius={t.cardRadius} isMobile={false} headerHeight={t.cardHeaderHeight} />
            </div>
          )}
        </div>
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
