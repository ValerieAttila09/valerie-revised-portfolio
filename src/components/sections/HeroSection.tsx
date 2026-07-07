import type { FC, RefObject } from 'react'

interface HeroSectionProps {
  heroSubRef: RefObject<HTMLParagraphElement | null>
  heroActionsRef: RefObject<HTMLDivElement | null>
}

const HeroSection: FC<HeroSectionProps> = ({ heroSubRef, heroActionsRef }) => (
  <section className="hero" id="hero">
    <div className="container">
      <div className="hero__eyebrow eyebrow">Student Developer — RPL SMK Multi Karya Medan</div>
      <h1 className="hero__title">
        <span className="reveal-line">
          <span>Membangun web modern</span>
        </span>
        <span className="reveal-line">
          <span>
            melalui <em>inovasi</em> dan eksperimen teknis.
          </span>
        </span>
      </h1>
      <p className="hero__sub fade-up" ref={heroSubRef}>
        Saya Valerie Attila Al-fath, seorang siswa berusia 17 tahun yang berfokus pada pengembangan web modern, khususnya dengan Next.js, Tailwind CSS, GSAP, dan teknologi front-end terkini.
      </p>
      <div className="hero__actions fade-up" ref={heroActionsRef}>
        <a href="#work" className="btn btn--solid hover-target">
          Lihat Project ↓
        </a>
        <a href="#contact" className="btn btn--ghost hover-target">
          Hubungi Saya
        </a>
      </div>
    </div>

    <div className="hero__bottom">
      <div className="marquee">
        <div className="marquee__track" id="marqueeTrack">
          <span>NEXT.JS</span>
          <span>TAILWIND CSS</span>
          <span>GSAP</span>
          <span>FRAMERMOTION</span>
          <span>SUPABASE</span>
          <span>PRISMA</span>
          <span>NODEMAIL</span>
          <span>BETTER AUTH</span>
          <span>PLAYWRIGHT</span>
          <span>FULLSTACK</span>
        </div>
      </div>
      <div className="container hero__meta">
        <span id="clock">--:--:--</span>
        <span>Scroll untuk menjelajah ↓</span>
      </div>
    </div>
  </section>
)

export default HeroSection
