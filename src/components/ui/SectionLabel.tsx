import React from 'react'

interface Props {
  children: React.ReactNode
  color?: string
}

export default function SectionLabel({ children, color = '#6e6460' }: Props) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        fontWeight: 700,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.06em',
        marginBottom: '0.5rem',
        color,
      }}
    >
      {children}
    </div>
  )
}
