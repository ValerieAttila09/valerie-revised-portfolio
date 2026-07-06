import type { FC, RefObject } from 'react'

interface FooterSectionProps {
  footerRef: RefObject<HTMLElement | null>
}

const FooterSection: FC<FooterSectionProps> = ({ footerRef }) => (
  <footer className="footer" ref={footerRef}>
    <div className="container footer__top" style={{ width: '100%' }}>
      <span>© 2026 Valerie Attila Al-fath. Seluruh hak dilindungi.</span>
      <span id="footerClock">Jakarta, Indonesia — GMT+7</span>
      <button className="back-to-top hover-target" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Kembali ke atas ↑
      </button>
    </div>
  </footer>
)

export default FooterSection
