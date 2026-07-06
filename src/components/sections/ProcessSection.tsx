import type { FC, RefObject } from 'react'
import type { ProcessStep } from '../../types'

interface ProcessSectionProps {
  processSteps: ProcessStep[]
  processSectionRef: RefObject<HTMLElement | null>
}

const ProcessSection: FC<ProcessSectionProps> = ({ processSteps, processSectionRef }) => (
  <section className="process" ref={processSectionRef} id="processSection">
    <div className="process__pin" id="processPin">
      <div className="process__head">
        <div className="eyebrow">Cara Kerja</div>
        <h2>Empat tahap, satu tujuan: produk yang tepat guna.</h2>
      </div>
      <div className="process__track" id="processTrack">
        {processSteps.map((step) => (
          <div className="process__step" key={step.number}>
            <div className="process__step-num">{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default ProcessSection
