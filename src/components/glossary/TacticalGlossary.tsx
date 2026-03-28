import React from 'react'
import { glossaryItems } from '../../data/glossary'

export default function TacticalGlossary() {
  return (
    <aside
      style={{
        background: '#161313',
        border: '1px solid #2a2424',
        padding: '1.5rem',
        borderRadius: '6px',
        marginTop: '0.5rem',
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          fontWeight: 700,
          color: '#e8bc3a',
          letterSpacing: '0.06em',
          marginBottom: '1rem',
          paddingBottom: '0.625rem',
          borderBottom: '1px solid #2a2424',
        }}
      >
        GLOSSÁRIO TÁTICO
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1rem',
        }}
      >
        {glossaryItems.map((item, i) => (
          <div key={i}>
            <strong style={{ color: '#f5f0eb', fontSize: '0.8rem', display: 'block', marginBottom: '2px' }}>
              {item.term}
            </strong>
            <p style={{ fontSize: '0.75rem', color: '#6e6460', lineHeight: 1.55 }}>
              {item.definition}
            </p>
          </div>
        ))}
      </div>
    </aside>
  )
}
