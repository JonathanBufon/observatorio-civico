import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

const TV_W = 76
const TV_H = 90
const MARGIN = 20

function getSlots() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const feedLeft = (vw - 740) / 2
  const feedRight = feedLeft + 740
  const leftX = Math.max(MARGIN, feedLeft - TV_W - 30)
  const rightX = Math.min(vw - TV_W - MARGIN, feedRight + 30)

  return [
    { x: leftX, y: 80 },
    { x: rightX, y: 80 },
    { x: leftX, y: vh * 0.4 },
    { x: rightX, y: vh * 0.4 },
    { x: leftX, y: vh - TV_H - 100 },
    { x: rightX, y: vh - TV_H - 100 },
    { x: leftX, y: vh * 0.2 },
    { x: rightX, y: vh * 0.2 },
    { x: leftX, y: vh * 0.65 },
    { x: rightX, y: vh * 0.65 },
  ]
}

export default function BigBrotherTV() {
  const isWide = useMediaQuery('(min-width: 1100px)')
  const [pos, setPos] = useState({ x: 0, y: 80 })
  const [hidden, setHidden] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [popping, setPopping] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)
  const [irisOffset, setIrisOffset] = useState({ x: 0, y: 0 })

  const currentSlotRef = useRef(1)
  const isMovingRef = useRef(false)
  const isCaughtRef = useRef(false)
  const eyeRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>(0)

  // Initialize position
  useEffect(() => {
    if (!isWide) return
    const slots = getSlots()
    const s = slots[currentSlotRef.current]
    setPos({ x: s.x, y: s.y })
  }, [isWide])

  // Resize handler
  useEffect(() => {
    const onResize = () => {
      if (!isCaughtRef.current) {
        const slots = getSlots()
        const s = slots[currentSlotRef.current]
        setPos({ x: s.x, y: s.y })
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Eye tracking
  useEffect(() => {
    if (!isWide) return
    const onMove = (e: MouseEvent) => {
      if (isCaughtRef.current || !eyeRef.current) return
      cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => {
        if (!eyeRef.current) return
        const rect = eyeRef.current.getBoundingClientRect()
        const ecx = rect.left + rect.width / 2
        const ecy = rect.top + rect.height / 2
        const dx = e.clientX - ecx
        const dy = e.clientY - ecy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const max = 4
        const f = Math.min(dist / 200, 1)
        setIrisOffset({
          x: (dx / (dist || 1)) * max * f,
          y: (dy / (dist || 1)) * max * f,
        })
      })
    }
    document.addEventListener('mousemove', onMove)
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frameRef.current)
    }
  }, [isWide])

  // Random blink
  useEffect(() => {
    if (!isWide) return
    let timeout: ReturnType<typeof setTimeout>
    const doBlink = () => {
      if (!isCaughtRef.current) {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 130)
      }
      timeout = setTimeout(doBlink, 2500 + Math.random() * 4000)
    }
    timeout = setTimeout(doBlink, 2000)
    return () => clearTimeout(timeout)
  }, [isWide])

  const pickNewSlot = useCallback(() => {
    const slots = getSlots()
    let next: number
    do {
      next = Math.floor(Math.random() * slots.length)
    } while (next === currentSlotRef.current)
    currentSlotRef.current = next
    return next
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (isCaughtRef.current || isMovingRef.current) return
    isMovingRef.current = true
    setIsBlinking(true)
    setTimeout(() => setIsBlinking(false), 100)

    const next = pickNewSlot()
    const slots = getSlots()
    setAnimating(true)
    setPos({ x: slots[next].x, y: slots[next].y })
    setTimeout(() => {
      isMovingRef.current = false
      setAnimating(false)
    }, 500)
  }, [pickNewSlot])

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (isCaughtRef.current) return
    e.stopPropagation()
    isCaughtRef.current = true
    setHidden(true)

    setTimeout(() => {
      isCaughtRef.current = false
      const next = pickNewSlot()
      const slots = getSlots()
      setPos({ x: slots[next].x, y: slots[next].y })
      setHidden(false)
      setPopping(true)
      setTimeout(() => setPopping(false), 600)
    }, 10000)
  }, [pickNewSlot])

  if (!isWide) return null

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      style={{
        position: 'fixed',
        zIndex: 9999,
        width: `${TV_W}px`,
        cursor: 'pointer',
        userSelect: 'none',
        filter: 'drop-shadow(0 3px 12px rgba(0,0,0,0.6))',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transition: animating
          ? 'top 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)'
          : 'none',
        opacity: hidden ? 0 : 1,
        transform: hidden
          ? 'translateY(-200px) scale(0.3)'
          : popping
          ? undefined
          : 'translateY(0) scale(1)',
        animation: popping ? 'tvPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : undefined,
        pointerEvents: hidden ? 'none' : undefined,
      }}
    >
      {/* Antenna */}
      <div
        className="tv-antenna"
        style={{
          position: 'absolute',
          top: '-12px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '30px',
          height: '13px',
        }}
      />

      {/* TV Body */}
      <div
        style={{
          background: '#2a2422',
          borderRadius: '7px',
          padding: '5px',
          border: '1.5px solid #3d3533',
          position: 'relative',
        }}
      >
        {/* Screen */}
        <div
          className="tv-screen-flicker"
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '4/3',
            background: 'radial-gradient(ellipse at center, #0a0808 0%, #000 100%)',
            borderRadius: '4px',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          {/* Scanlines */}
          <div className="tv-scanlines" />

          {/* Static noise */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 8,
              opacity: 0.04,
              pointerEvents: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '64px',
            }}
          />

          {/* Red glow overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(139,26,26,0.06) 0%, transparent 70%)',
              zIndex: 5,
              pointerEvents: 'none',
            }}
          />

          {/* Eye */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}>
            <div
              ref={eyeRef}
              className={isBlinking ? 'eye-blinking' : ''}
              style={{ position: 'relative', width: '32px', height: '19px' }}
            >
              {/* Eye outer */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(ellipse, #d4cdc4 0%, #b0a898 60%, #8a8278 100%)',
                  borderRadius: '50%',
                  clipPath: 'ellipse(50% 50% at 50% 50%)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 0 8px rgba(139,26,26,0.4), 0 0 20px rgba(139,26,26,0.15)',
                }}
              >
                {/* Veins */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                  <div style={{ position: 'absolute', width: '14px', height: '1px', top: '35%', left: '1px', transform: 'rotate(-15deg)', background: 'rgba(139,26,26,0.25)', borderRadius: '50%' }} />
                  <div style={{ position: 'absolute', width: '12px', height: '1px', bottom: '30%', right: '2px', transform: 'rotate(10deg)', background: 'rgba(139,26,26,0.25)', borderRadius: '50%' }} />
                </div>

                {/* Iris */}
                <div
                  style={{
                    position: 'absolute',
                    width: '12px',
                    height: '12px',
                    top: '50%',
                    left: '50%',
                    transform: `translate(calc(-50% + ${irisOffset.x}px), calc(-50% + ${irisOffset.y}px))`,
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #8b1a1a 0%, #5c1010 50%, #2d0808 100%)',
                    transition: 'transform 0.08s ease-out',
                    boxShadow: 'inset 0 0 3px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* Pupil */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '5px',
                      height: '5px',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      borderRadius: '50%',
                      background: '#000',
                    }}
                  >
                    <div style={{ position: 'absolute', width: '2px', height: '2px', top: '1px', left: '1px', borderRadius: '50%', background: 'rgba(255,255,255,0.6)' }} />
                  </div>
                </div>
              </div>

              {/* Eyelids */}
              <div className="eye-lid-top" />
              <div className="eye-lid-bottom" />
            </div>
          </div>
        </div>

        {/* LED indicator */}
        <div
          className="tv-indicator-pulse"
          style={{
            position: 'absolute',
            bottom: '3px',
            right: '7px',
            width: '2.5px',
            height: '2.5px',
            background: '#c0392b',
            borderRadius: '50%',
            boxShadow: '0 0 4px rgba(192,57,43,0.6)',
            zIndex: 2,
          }}
        />
      </div>

      {/* Stand */}
      <div
        style={{
          width: '22px',
          height: '3px',
          background: '#2a2422',
          border: '1px solid #3d3533',
          borderTop: 'none',
          margin: '0 auto',
          borderRadius: '0 0 3px 3px',
        }}
      />
    </div>
  )
}
