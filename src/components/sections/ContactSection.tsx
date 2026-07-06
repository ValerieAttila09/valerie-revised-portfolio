import type { FC } from 'react'

interface ContactSectionProps {
  socialLinks: string[]
}

const ContactSection: FC<ContactSectionProps> = ({ socialLinks }) => (
  <section className="contact" id="contact">
    <div className="container">
      <div className="eyebrow fade-up">Kontak</div>
      <h2 className="contact__title fade-up">
        Mari ciptakan sesuatu yang <span className="italic" style={{ color: 'var(--accent)' }}>
          berarti.
        </span>
      </h2>
      <a href="mailto:valerieattilaalfath@gmail.com" className="contact__email fade-up hover-target">
        valerieattilaalfath@gmail.com
      </a>
      <div className="contact__socials fade-up">
        {socialLinks.map((link) => (
          <a key={link} href="#" className="hover-target">
            {link}
          </a>
        ))}
      </div>
    </div>
  </section>
)

export default ContactSection
