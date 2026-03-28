import React from 'react'
import Header from './Header'
import Footer from './Footer'
import BigBrotherTV from '../bigbrother/BigBrotherTV'

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <BigBrotherTV />
      <Header />
      <main
        style={{
          flex: 1,
          maxWidth: '740px',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 4vw, 2.25rem) clamp(1rem, 3vw, 1.5rem) 3rem',
          width: '100%',
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  )
}
