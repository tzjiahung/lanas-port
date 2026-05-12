import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Portfolio from './Portfolio.jsx'
import ShopBackNMA from './ShopBackNMA.jsx'
import './index.css'

function Root() {
  const [view, setView] = useState(() =>
    window.location.hash === '#/shopback-nma' ? 'shopback-nma' : 'portfolio'
  )

  useEffect(() => {
    function onHash() {
      setView(window.location.hash === '#/shopback-nma' ? 'shopback-nma' : 'portfolio')
    }
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
