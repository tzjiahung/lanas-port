import { useState, useEffect } from 'react'
import PeachDawn from './Stars.jsx'
import { Hero, AboutCol, WorksCol, ArticlesCol, StatusBar } from './Portfolio.jsx'

export default function App() {
  const [vp, setVp] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  })

  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const isMobile = vp.w < 760

  return (
    <>
      {/* Fixed background */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <PeachDawn w={vp.w} h={vp.h} />
      </div>

      {/* Content */}
      <main style={isMobile ? {
        position: 'relative', zIndex: 1,
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
      } : {
        position: 'relative', zIndex: 1,
        height: '100vh', display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <Hero isMobile={isMobile} />

        <div style={{
          flex: isMobile ? '0 0 auto' : 1,
          minHeight: 0,
          margin: '0 auto',
          width: '100%',
          maxWidth: 1440,
          padding: isMobile ? '8px 16px 16px' : '12px 12px 12px',
        }}>
          <div style={isMobile ? {
            display: 'flex', flexDirection: 'column', gap: 16,
          } : {
            display: 'grid', gridTemplateColumns: '1fr 2fr 1fr',
            gap: 12, height: '100%', minHeight: 0,
          }}>
            <AboutCol isMobile={isMobile} />
            <WorksCol isMobile={isMobile} />
            <ArticlesCol isMobile={isMobile} />
          </div>
        </div>

        <StatusBar isMobile={isMobile} />
      </main>
    </>
  )
}
