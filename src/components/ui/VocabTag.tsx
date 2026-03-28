import React, { useState, useRef } from 'react'

interface Props {
  term: string
  definition: string
}

export default function VocabTag({ term, definition }: Props) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  return (
    <span
      ref={ref}
      className="relative inline-block"
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.84em',
          background: 'rgba(212,160,23,0.12)',
          borderBottom: '1.5px solid #d4a017',
          padding: '1px 4px',
          cursor: 'help',
          color: '#e8bc3a',
          transition: 'background 0.15s',
        }}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onClick={() => setVisible(v => !v)}
      >
        {term}
      </span>
      {visible && (
        <span className="vocab-tooltip">
          {definition}
        </span>
      )}
    </span>
  )
}
