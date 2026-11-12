import React, { useState, useEffect, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Portfolio from './Portfolio.jsx'
import ShopBackNMA from './ShopBackNMA.jsx'
import OecFin from './OecFin.jsx'
import OecCompliance from './OecCompliance.jsx'
import OclockGreen from './OclockGreen.jsx'
import Fooma from './Fooma.jsx'
import Ucarer from './Ucarer.jsx'
import OecTypo from './OecTypo.jsx'
import HomeV2 from './HomeV2.jsx'
import './index.css'

const VIEW_TITLES = {
  'shopback-nma': 'ShopBack NMA — Lana Hung',
  'fitback': 'OEC Fin — Lana Hung',
  'oec-fin': 'OEC Compliance — Lana Hung',
  'oclock': "O'Clock Green — Lana Hung",
  'fooma': 'Fooma — Lana Hung',
  'ucarer': 'Ucarer Redesign — Lana Hung',
  'oec-typo': 'OEC Typography — Lana Hung',
  'home-v1': 'Tz-Jia (Lana) Hung — Portfolio',
  'portfolio': 'Tz-Jia (Lana) Hung — Portfolio',
}

function matchView(hash) {
  const path = hash.replace(/^#+\/*/, '').replace(/\/+$/, '').toLowerCase()
  if (path === 'shopback-nma') return 'shopback-nma'
  if (path === 'fitback') return 'fitback'
  if (path === 'oec-fin') return 'oec-fin'
  if (path === 'oclock') return 'oclock'
  if (path === 'fooma') return 'fooma'
  if (path === 'ucarer') return 'ucarer'
  if (path === 'oec-typo') return 'oec-typo'
  if (path === 'home-v1') return 'home-v1'   // previous home page, kept but not linked
  return 'portfolio'
}

function trackPageView(view) {
  if (typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_path: window.location.hash || '/',
    page_title: VIEW_TITLES[view] || document.title,
  })
}

function Root() {
  const [view, setView] = useState(() => matchView(window.location.hash))

  useEffect(() => {
    function onHash() {
      const newView = matchView(window.location.hash)
      setView(newView)
      trackPageView(newView)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Pages switch by hash without a reload, so the browser keeps the old scroll position.
  // Start each newly opened page at the top (before paint, so it never flashes mid-page).
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [view])

  if (view === 'shopback-nma') return <ShopBackNMA />
  if (view === 'fitback') return <OecFin />
  if (view === 'oec-fin') return <OecCompliance />
  if (view === 'oclock') return <OclockGreen />
  if (view === 'fooma') return <Fooma />
  if (view === 'ucarer') return <Ucarer />
  if (view === 'oec-typo') return <OecTypo />
  if (view === 'home-v1') return <Portfolio />
  return <HomeV2 />   // home page (also answers the old #/home-v2 address)
}

ReactDOM.createRoot(document.getElementById('portfolio-root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
