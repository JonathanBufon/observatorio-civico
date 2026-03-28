import React from 'react'
import ReportCard from '../components/report/ReportCard'
import TacticalGlossary from '../components/glossary/TacticalGlossary'
import { reports } from '../data/reports'

export default function HomePage() {
  return (
    <>
      {reports.map((report, i) => (
        <ReportCard
          key={report.id}
          report={report}
          isLast={i === reports.length - 1}
        />
      ))}
      <TacticalGlossary />
    </>
  )
}
