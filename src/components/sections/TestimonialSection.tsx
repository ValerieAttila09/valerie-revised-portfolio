import type { FC } from 'react'
import type { Testimonial } from '../../types'

interface TestimonialSectionProps {
  testimonials: Testimonial[]
  activeTestimonial: number
  onSetActiveTestimonial: (index: number) => void
}

const TestimonialSection: FC<TestimonialSectionProps> = ({ testimonials, activeTestimonial, onSetActiveTestimonial }) => (
  <section className="testi section-pad" id="testimonials">
    <div className="container">
      <div className="eyebrow fade-up">Testimoni</div>
      <div className="testi__wrap" style={{ marginTop: '40px' }}>
        {testimonials.map((item, index) => (
          <div key={item.author} className={`testi__item ${index === activeTestimonial ? 'is-active' : ''}`}>
            <p className="testi__quote">“{item.quote}”</p>
            <div className="testi__author">{item.author}</div>
          </div>
        ))}
      </div>
      <div className="testi__dots">
        {testimonials.map((item, index) => (
          <button
            key={item.author}
            className={index === activeTestimonial ? 'is-active' : ''}
            aria-label={`Testimoni ${index + 1}`}
            onClick={() => onSetActiveTestimonial(index)}
          />
        ))}
      </div>
      <div className="clients-marquee">
        <div className="clients-marquee__track" id="clientsTrack">
          <span>NUSANTARA CO.</span>
          <span>ORBIT LABS</span>
          <span>LARAS GROUP</span>
          <span>KAYU DIGITAL</span>
          <span>MERAK.ID</span>
          <span>BINTANG STUDIO</span>
          <span>NUSANTARA CO.</span>
          <span>ORBIT LABS</span>
          <span>LARAS GROUP</span>
          <span>KAYU DIGITAL</span>
          <span>MERAK.ID</span>
          <span>BINTANG STUDIO</span>
        </div>
      </div>
    </div>
  </section>
)

export default TestimonialSection
