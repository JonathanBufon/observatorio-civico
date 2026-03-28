import React from 'react'
import MetaTag from '../ui/MetaTag'
import AnalysisGrid from './AnalysisGrid'
import SmokeScreen from './SmokeScreen'
import Confrontation from './Confrontation'
import PublicProfile from './PublicProfile'
import VideoReference from './VideoReference'
import { parseVocab } from '../../utils/parseVocab'
import type { Report } from '../../data/reports'

interface Props {
  report: Report
  isLast?: boolean
}

export default function ReportCard({ report, isLast }: Props) {
  return (
    <article
      style={{
        paddingBottom: isLast ? 0 : '2.75rem',
        marginBottom: isLast ? '1.5rem' : '2.75rem',
        borderBottom: isLast ? 'none' : '1px solid #2a2424',
      }}
    >
      {/* Meta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' as const }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#6e6460' }}>{report.id}</span>
        {report.tags.map((tag, i) => (
          <MetaTag key={i} label={tag.label} category={tag.category} />
        ))}
        {report.featured && (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              fontWeight: 700,
              color: '#0e0c0c',
              background: '#d4a017',
              padding: '2px 8px',
              borderRadius: '2px',
              marginLeft: 'auto',
            }}
          >
            Destaque
          </span>
        )}
      </div>

      {/* Sources */}
      {report.sources && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.58rem',
            color: '#6e6460',
            marginBottom: '1.25rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid #2a2424',
          }}
        >
          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0, opacity: 0.5 }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Fontes: {report.sources.join(' · ')}
        </div>
      )}

      {/* Title */}
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.35rem, 3vw, 1.75rem)',
          fontWeight: 900,
          lineHeight: 1.2,
          color: '#f5f0eb',
          marginBottom: '0.625rem',
        }}
      >
        {report.title}
      </h2>

      {/* Lead */}
      <p
        style={{
          fontSize: 'clamp(0.88rem, 1.5vw, 0.95rem)',
          color: '#a89e94',
          lineHeight: 1.75,
          marginBottom: '1.75rem',
        }}
      >
        {parseVocab(report.lead)}
      </p>

      {/* Analysis Grid */}
      <AnalysisGrid
        analysis={report.analysis}
        effectsLabel={report.id === '#2024-FIM-02' || report.id === '#2024-FIM-03' ? 'Significado Real' : 'Efeitos Práticos'}
      />

      {/* Smoke Screen */}
      <SmokeScreen smokeScreen={report.smokeScreen} />

      {/* Confrontation */}
      {report.confrontation && (
        <Confrontation official={report.confrontation.official} reality={report.confrontation.reality} />
      )}

      {/* Public Profiles */}
      <PublicProfile profiles={report.profiles} />

      {/* Video Reference */}
      {report.videoRef && (
        <VideoReference title={report.videoRef.title} description={report.videoRef.description} />
      )}
    </article>
  )
}
