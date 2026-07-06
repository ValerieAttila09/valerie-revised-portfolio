import type { FC, RefObject } from 'react'
import type { NavLink } from '../../types'

interface NavbarProps {
  mobileMenuOpen: boolean
  onOpenMobileMenu: () => void
  onCloseMobileMenu: () => void
  navRef: RefObject<HTMLElement | null>
}

const navLinks: NavLink[] = [
  { label: 'Tentang', href: '#about' },
  { label: 'Karya', href: '#work' },
  { label: 'Layanan', href: '#services' },
  { label: 'Testimoni', href: '#testimonials' },
]

const mobileNavLinks: NavLink[] = [...navLinks, { label: 'Kontak', href: '#contact' }]

const Navbar: FC<NavbarProps> = ({ mobileMenuOpen, onOpenMobileMenu, onCloseMobileMenu, navRef }) => (
  <>
    <header className="nav" ref={navRef}>
      <a href="#hero" className="nav__logo" onClick={onCloseMobileMenu}>
        Valerie<span>.</span>
      </a>
      <nav className="nav__links">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="hover-target">
            {link.label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="nav__cta hover-target">
        Hubungi Saya
      </a>
      <button className="nav__burger" id="burgerBtn" aria-label="Buka menu" onClick={onOpenMobileMenu}>
        <span />
        <span />
      </button>
    </header>

    <div className={`mobile-menu ${mobileMenuOpen ? 'is-open' : ''}`}>
      <button className="mobile-menu__close" onClick={onCloseMobileMenu}>
        Tutup ✕
      </button>
      <ul>
        {mobileNavLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="mm-link" onClick={onCloseMobileMenu}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="mobile-menu__meta">
        Jakarta, Indonesia — GMT+7
        <br />
        valerieattilaalfath@gmail.com
      </div>
    </div>
  </>
)

export default Navbar
