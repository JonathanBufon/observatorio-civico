import React from 'react'
import type { TagCategory } from '../../data/reports'

interface Props {
  label: string
  category: TagCategory
}

const styles: Record<TagCategory, React.CSSProperties> = {
  economia: { borderColor: '#2a4a7a', color: '#6ea8e0', background: 'rgba(42,74,122,0.15)' },
  orcamento: { borderColor: '#7a5a1a', color: '#e8bc3a', background: 'rgba(212,160,23,0.12)' },
  judiciario: { borderColor: '#5a2a7a', color: '#b88ae0', background: 'rgba(90,42,122,0.12)' },
  legislativo: { borderColor: '#7a3a1a', color: '#e09060', background: 'rgba(122,58,26,0.12)' },
}

export default function MetaTag({ label, category }: Props) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.58rem',
        fontWeight: 600,
        padding: '2px 8px',
        borderRadius: '2px',
        border: '1px solid',
        ...styles[category],
      }}
    >
      {label}
    </span>
  )
}
