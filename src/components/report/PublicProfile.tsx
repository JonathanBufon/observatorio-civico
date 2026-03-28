import React from 'react'
import { parseVocab } from '../../utils/parseVocab'
import type { PublicProfile as ProfileType } from '../../data/reports'

interface Props {
  profiles: ProfileType[]
}

export default function PublicProfile({ profiles }: Props) {
  const isSingle = profiles.length === 1

  return (
    <div style={{ borderTop: '1px solid #2a2424', paddingTop: '1.25rem', marginBottom: '1.25rem' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: '0.5rem', color: '#6e6460' }}>
        Raio-X {profiles.length === 1 ? 'do Agente Público' : 'dos Agentes Públicos'}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isSingle ? '1fr' : 'repeat(auto-fit, minmax(240px, 1fr))',
          maxWidth: isSingle ? '440px' : undefined,
          gap: '1rem',
          marginTop: '0.625rem',
        }}
      >
        {profiles.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.75rem' }}>
            <div
              style={{
                flexShrink: 0,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#1c1818',
                border: '1px solid #2a2424',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                fontSize: '0.65rem',
                color: '#6e6460',
              }}
            >
              {p.initials}
            </div>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f5f0eb' }}>{p.name}</h4>
              <p style={{ fontSize: '0.65rem', color: '#6e6460', marginBottom: '0.3rem' }}>{p.role}</p>
              <p
                style={{
                  fontSize: '0.78rem',
                  color: '#a89e94',
                  lineHeight: 1.55,
                  background: '#1c1818',
                  border: '1px solid #2a2424',
                  padding: '0.5rem 0.625rem',
                  borderRadius: '4px',
                }}
              >
                {parseVocab(p.bio)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
