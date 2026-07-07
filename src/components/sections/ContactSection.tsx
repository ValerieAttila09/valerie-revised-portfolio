import type { FC } from 'react'

interface ContactSectionProps {
  socialLinks: string[]
}

const socialProfiles = [
  { label: 'GitHub', href: 'https://github.com/ValerieAttila09' },
  { label: 'Instagram', href: 'https://www.instagram.com/_valerie_aja/' },
]

const ContactSection: FC<ContactSectionProps> = ({ socialLinks }) => (
  <section className="contact" id="contact">
    <div className="container">
      <div className="eyebrow fade-up">Kontak</div>
      <h2 className="contact__title fade-up">
        Mari menciptakan sesuatu yang <span className="italic" style={{ color: 'var(--accent)' }}>
          bermakna.
        </span>
      </h2>
      <a href="mailto:valerieattilaalfath@gmail.com" className="contact__email fade-up hover-target">
        valerieattilaalfath@gmail.com
      </a>
      <div className="contact__socials fade-up">
        {socialProfiles.map((profile) => (
          <a key={profile.label} href={profile.href} target="_blank" rel="noreferrer" className="hover-target">
            {profile.label}
          </a>
        ))}
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
