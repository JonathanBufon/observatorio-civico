import React from 'react'
import VocabTag from '../components/ui/VocabTag'

// Parses {{term|definition}} syntax and returns array of React nodes
export function parseVocab(text: string): React.ReactNode[] {
  const parts = text.split(/(\{\{[^}]+\}\})/g)
  return parts.map((part, i) => {
    const match = part.match(/^\{\{(.+?)\|(.+?)\}\}$/)
    if (match) {
      return <VocabTag key={i} term={match[1]} definition={match[2]} />
    }
    return part
  })
}
