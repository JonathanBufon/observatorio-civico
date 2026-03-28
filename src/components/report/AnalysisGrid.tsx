import React from 'react'
import { parseVocab } from '../../utils/parseVocab'
import type { Report } from '../../data/reports'

interface Props {
  analysis: Report['analysis']
  effectsLabel?: string
}

export default function AnalysisGrid({ analysis, effectsLabel = 'Efeitos Práticos' }: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '0.875rem',
        marginBottom: '1.75rem',
      }}
    >
      {/* Beneficiados */}
      <div
        style={{
          padding: '1rem 1.125rem',
          borderLeft: '3px solid #5a7d99',
          borderRadius: '0 4px 4px 0',
          background: 'rgba(90,125,153,0.1)',
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: '0.5rem', color: '#5a7d99' }}>
          Beneficiados
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {analysis.beneficiaries.items.map((item, i) => (
            <li key={i} style={{ fontSize: '0.84rem', color: '#a89e94', marginBottom: '0.6rem', lineHeight: 1.6 }}>
              {item.bold && <strong style={{ color: '#f5f0eb', fontWeight: 600 }}>{item.bold} </strong>}
              {parseVocab(item.text)}
            </li>
          ))}
        </ul>
      </div>

      {/* Efeitos Práticos */}
      <div
        style={{
          padding: '1rem 1.125rem',
          borderLeft: '3px solid #2a9d8f',
          borderRadius: '0 4px 4px 0',
          background: 'rgba(42,157,143,0.1)',
        }}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: '0.5rem', color: '#2a9d8f' }}>
          {effectsLabel}
        </div>
        {analysis.effects.paragraphs.map((p, i) => (
          <p key={i} style={{ fontSize: '0.84rem', color: '#a89e94', lineHeight: 1.65, marginTop: i > 0 ? '0.5rem' : 0 }}>
            {parseVocab(p)}
          </p>
        ))}
      </div>
    </div>
  )
}
