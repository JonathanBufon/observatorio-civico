import React from 'react'

export default function Header() {
  return (
    <header
      style={{
        background: '#0e0c0c',
        borderBottom: '1px solid #2a2424',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '740px',
          margin: '0 auto',
          padding: 'clamp(0.75rem, 2vw, 1.1rem) clamp(1rem, 3vw, 1.5rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          <svg
            width="28"
            height="28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ color: '#d4a017', filter: 'drop-shadow(0 0 6px rgba(212,160,23,0.3))', flexShrink: 0 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.7rem, 2vw, 0.82rem)',
                fontWeight: 700,
                color: '#f5f0eb',
                letterSpacing: '0.06em',
                textTransform: 'uppercase' as const,
              }}
            >
              Observatório Cívico
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.52rem',
                color: '#c0392b',
                letterSpacing: '0.14em',
                textTransform: 'uppercase' as const,
              }}
            >
              Transparência Radical
            </span>
          </div>
        </div>

        {/* Badges — hidden on mobile */}
        <div
          style={{ display: 'flex', gap: '5px' }}
          className="header-badges"
        >
          {['Sem Viés', 'Sem Ads', 'Open Source'].map(badge => (
            <span
              key={badge}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.04em',
                padding: '3px 7px',
                border: '1px solid #2a2424',
                color: '#6e6460',
                borderRadius: '2px',
              }}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
