import React from 'react'

interface Props {
  title: string
  description: string
}

export default function VideoReference({ title, description }: Props) {
  return (
    <div style={{ borderTop: '1px solid #2a2424', paddingTop: '1.125rem' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: '0.625rem', color: '#6e6460' }}>
        Referência de Contexto
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.875rem',
          background: '#1c1818',
          border: '1px solid #2a2424',
          padding: '0.875rem 1rem',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'border-color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = '#c0392b')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = '#2a2424')}
      >
        <div
          style={{
            flexShrink: 0,
            width: '36px',
            height: '36px',
            background: '#c0392b',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#fff' }}>
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <div>
          <strong style={{ fontSize: '0.82rem', display: 'block', marginBottom: '1px', color: '#f5f0eb' }}>{title}</strong>
          <span style={{ fontSize: '0.72rem', color: '#6e6460', lineHeight: 1.4 }}>{description}</span>
        </div>
      </div>
    </div>
  )
}
