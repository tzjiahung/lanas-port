import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Portfolio from './Portfolio.jsx'
import ShopBackNMA from './ShopBackNMA.jsx'
import OecFin from './OecFin.jsx'
import OecCompliance from './OecCompliance.jsx'
import OclockGreen from './OclockGreen.jsx'
import Fooma from './Fooma.jsx'
import Ucarer from './Ucarer.jsx'
import OecTypo from './OecTypo.jsx'
import './index.css'

const VIEW_TITLES = {
  'shopback-nma': 'ShopBack NMA — Lana Hung',
  'fitback': 'OEC Fin — Lana Hung',
  'oec-fin': 'OEC Compliance — Lana Hung',
  'oclock': "O'Clock Green — Lana Hung",
  'fooma': 'Fooma — Lana Hung',
  'ucarer': 'Ucarer Redesign — Lana Hung',
  'oec-typo': 'OEC Typography — Lana Hung',
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

  if (view === 'shopback-nma') return <ShopBackNMA />
  if (view === 'fitback') return <OecFin />
  if (view === 'oec-fin') return <OecCompliance />
  if (view === 'oclock') return <OclockGreen />
  if (view === 'fooma') return <Fooma />
  if (view === 'ucarer') return <Ucarer />
  if (view === 'oec-typo') return <OecTypo />
  return <Portfolio />
}

ReactDOM.createRoot(document.getElementById('portfolio-root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
