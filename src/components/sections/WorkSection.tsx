import type { FC } from 'react'
import type { WorkItem } from '../../types'

interface WorkSectionProps {
  works: WorkItem[]
  activeWork: number
  onSetActiveWork: (index: number) => void
}

const WorkSection: FC<WorkSectionProps> = ({ works, activeWork, onSetActiveWork }) => (
  <section className="work section-pad" id="work">
    <div className="container">
      <div className="section-head">
        <div>
          <div className="eyebrow fade-up">Karya Pilihan</div>
          <h2 className="fade-up">Lima proyek yang paling mewakili cara saya bekerja.</h2>
        </div>
        <div className="section-head__side fade-up">
          Arahkan kursor atau scroll ke tiap baris untuk melihat pratinjau proyek.
        </div>
      </div>

      <div className="work__grid">
        <div className="work__sticky">
          <div className="work__preview">
            <span className="work__preview-tag" id="workPreviewTag">
              {String(activeWork + 1).padStart(2, '0')} / {works[activeWork]?.title.split(' — ')[0]}
            </span>
            {works.map((work, index) => (
              <img
                key={work.title}
                className={`work__preview-img ${index === activeWork ? 'is-active' : ''}`}
                src={work.image}
                alt={`Pratinjau proyek ${work.title}`}
              />
            ))}
          </div>
        </div>

        <div className="work__list">
          {works.map((work, index) => (
            <div
              key={work.title}
              className={`work__row hover-target ${index === activeWork ? 'is-active' : ''}`}
              onMouseEnter={() => onSetActiveWork(index)}
            >
              <span className="work__index">{String(index + 1).padStart(2, '0')}</span>
              <span className="work__title">{work.title}</span>
              <span className="work__cat">{work.category}</span>
              <span className="work__year">{work.year}</span>
              <div className="work__row-mobile-img">
                <img src={work.mobileImage} alt={work.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default WorkSection
