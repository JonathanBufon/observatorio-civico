import React from 'react'
import { parseVocab } from '../../utils/parseVocab'
import type { Report } from '../../data/reports'

interface Props {
  smokeScreen: Report['smokeScreen']
}

export default function SmokeScreen({ smokeScreen }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        background: 'rgba(139,26,26,0.08)',
        border: '1px solid rgba(192,57,43,0.2)',
        borderRadius: '5px',
        padding: '1.25rem 1.125rem 1.125rem',
        marginBottom: '1.75rem',
      }}
    >
      {/* Badge */}
      <span
        style={{
          position: 'absolute',
          top: '-9px',
          left: '14px',
          background: '#c0392b',
          color: '#fff',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.52rem',
          fontWeight: 700,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.08em',
          padding: '2px 9px',
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Cortina de Fumaça
      </span>

      {smokeScreen.title && (
        <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f5f0eb', margin: '0.25rem 0 0.375rem' }}>
          {smokeScreen.title}
        </h4>
      )}

      {smokeScreen.description && (
        <p style={{ fontSize: '0.84rem', color: '#a89e94', lineHeight: 1.65 }}>
          {parseVocab(smokeScreen.description)}
        </p>
      )}

      {smokeScreen.evidence && smokeScreen.evidence.length > 0 && (
        <ul style={{ marginTop: '0.5rem', listStyle: 'none', padding: 0 }}>
          {smokeScreen.evidence.map((ev, i) => (
            <li
              key={i}
              style={{
                fontSize: '0.82rem',
                color: '#a89e94',
                padding: '0.4rem 0 0.4rem 0.875rem',
                borderLeft: '2px solid rgba(192,57,43,0.35)',
                marginBottom: '0.25rem',
                lineHeight: 1.6,
              }}
            >
              <strong style={{ color: '#f5f0eb', fontWeight: 600 }}>{ev.label} </strong>
              {parseVocab(ev.text)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
