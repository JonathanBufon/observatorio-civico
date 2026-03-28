import React from 'react'

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0e0c0c',
        marginTop: 'auto',
        borderTop: '1px solid #2a2424',
      }}
    >
      <div
        style={{
          maxWidth: '740px',
          margin: '0 auto',
          padding: '2.5rem clamp(1rem, 3vw, 1.5rem) 1.5rem',
        }}
      >
        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2rem',
            marginBottom: '1.5rem',
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <h3
              style={{
                fontFamily: 'var(--font-mono)',
                color: '#f5f0eb',
                fontSize: '0.8rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase' as const,
              }}
            >
              Observatório Cívico
            </h3>
            <p style={{ fontSize: '0.75rem', lineHeight: 1.6, color: '#6e6460', maxWidth: '280px', marginBottom: '0.75rem' }}>
              Plataforma independente dedicada a filtrar a narrativa política e expor a mecânica de poder através de dados e históricos factuais.
            </p>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' as const }}>
              {['Sem Viés', 'Sem Ads', 'Open Source'].map(tag => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.5rem',
                    textTransform: 'uppercase' as const,
                    padding: '2px 6px',
                    border: '1px solid #2a2424',
                    color: '#6e6460',
                    borderRadius: '2px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Mapa do Site */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                color: '#a89e94',
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.04em',
                marginBottom: '0.625rem',
                paddingBottom: '0.375rem',
                borderBottom: '1px solid #2a2424',
              }}
            >
              Mapa do Site
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Relatórios Nacionais', 'Fiscalização Estadual', 'Câmaras Municipais', 'Geopolítica Global'].map(item => (
                <li key={item} style={{ marginBottom: '0.375rem' }}>
                  <a
                    href="#"
                    style={{ fontSize: '0.72rem', color: '#6e6460', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#e8bc3a')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#6e6460')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Dados */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-mono)',
                color: '#a89e94',
                fontSize: '0.65rem',
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.04em',
                marginBottom: '0.625rem',
                paddingBottom: '0.375rem',
                borderBottom: '1px solid #2a2424',
              }}
            >
              Legal &amp; Dados
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Metodologia de Análise', 'Fontes de Dados (API)', 'Termos de Uso', 'Política de Privacidade'].map(item => (
                <li key={item} style={{ marginBottom: '0.375rem' }}>
                  <a
                    href="#"
                    style={{ fontSize: '0.72rem', color: '#6e6460', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#e8bc3a')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#6e6460')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div
          style={{
            borderTop: '1px solid #2a2424',
            paddingTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap' as const,
            gap: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.52rem',
            color: '#6e6460',
          }}
        >
          <span>© 2025 Observatório Cívico</span>
          <span>Dados de exemplo · Gerado por I.A. sob supervisão humana</span>
        </div>
      </div>
      {/* Bottom gradient line */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg, #8b1a1a 0%, #d4a017 50%, #8b1a1a 100%)' }} />
    </footer>
  )
}
