import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Portfolio from './Portfolio.jsx'
import ShopBackNMA from './ShopBackNMA.jsx'
import './index.css'

function matchView(hash) {
  const path = hash.replace(/^#\/?/, '').replace(/\/$/, '')
  if (path === 'shopback-nma') return 'shopback-nma'
  return 'portfolio'
}

function Root() {
  const [view, setView] = useState(() => matchView(window.location.hash))

  useEffect(() => {
    function onHash() { setView(matchView(window.location.hash)) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return view === 'shopback-nma' ? <ShopBackNMA /> : <Portfolio />
}

ReactDOM.createRoot(document.getElementById('portfolio-root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
