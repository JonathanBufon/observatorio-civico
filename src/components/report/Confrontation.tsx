import React from 'react'

interface Props {
  official: string
  reality: string
}

export default function Confrontation({ official, reality }: Props) {
  return (
    <div
      style={{
        background: '#1c1818',
        border: '1px solid #2a2424',
        borderRadius: '5px',
        padding: '1.125rem',
        marginBottom: '1.75rem',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: '0.5rem', color: '#6e6460' }}>
        Confronto: Discurso Oficial vs. Realidade
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '0.75rem',
          marginTop: '0.5rem',
        }}
      >
        <div style={{ background: '#161313', padding: '0.875rem', borderRadius: '4px', border: '1px solid #2a2424' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#6e6460', marginBottom: '0.25rem', display: 'block' }}>
            Discurso Oficial
          </span>
          <p style={{ fontSize: '0.82rem', color: '#a89e94', lineHeight: 1.6 }}>{official}</p>
        </div>
        <div style={{ background: '#161313', padding: '0.875rem', borderRadius: '4px', border: '1px solid #2a2424' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#e74c3c', marginBottom: '0.25rem', display: 'block' }}>
            Contradito (Realidade)
          </span>
          <p style={{ fontSize: '0.82rem', color: '#a89e94', lineHeight: 1.6 }}>{reality}</p>
        </div>
      </div>
    </div>
  )
}
