import type { FC } from 'react'
import type { ServiceItem } from '../../types'

interface ServicesSectionProps {
  services: ServiceItem[]
}

const ServicesSection: FC<ServicesSectionProps> = ({ services }) => (
  <section className="services section-pad" id="services">
    <div className="container">
      <div className="section-head">
        <div>
          <div className="eyebrow fade-up">Layanan</div>
          <h2 className="fade-up">Bagaimana saya bisa membantu proyek Anda.</h2>
        </div>
      </div>
    </div>
    <div className="services__grid">
      {services.map((service) => (
        <div className="service-card fade-up" key={service.title}>
          <span className="service-card__num">{service.label}</span>
          <div className="service-card__icon">{service.icon}</div>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </div>
  </section>
)

export default ServicesSection
