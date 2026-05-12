import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Portfolio from './Portfolio.jsx'
import ShopBackNMA from './ShopBackNMA.jsx'
import OecFin from './OecFin.jsx'
import OecCompliance from './OecCompliance.jsx'
import './index.css'

function matchView(hash) {
  const path = hash.replace(/^#+\/*/, '').replace(/\/+$/, '').toLowerCase()
  if (path === 'shopback-nma') return 'shopback-nma'
  if (path === 'fitback') return 'fitback'
  if (path === 'oec-fin') return 'oec-fin'
  return 'portfolio'
}

function Root() {
  const [view, setView] = useState(() => matchView(window.location.hash))

  useEffect(() => {
    function onHash() { setView(matchView(window.location.hash)) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (view === 'shopback-nma') return <ShopBackNMA />
  if (view === 'fitback') return <OecFin />
  if (view === 'oec-fin') return <OecCompliance />
  return <Portfolio />
}

ReactDOM.createRoot(document.getElementById('portfolio-root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
