import type { FC, RefObject } from 'react'

interface HeroSectionProps {
  heroSubRef: RefObject<HTMLParagraphElement | null>
  heroActionsRef: RefObject<HTMLDivElement | null>
}

const HeroSection: FC<HeroSectionProps> = ({ heroSubRef, heroActionsRef }) => (
  <section className="hero" id="hero">
    <div className="container">
      <div className="hero__eyebrow eyebrow">Creative Developer &amp; Product Designer — Berbasis di Indonesia</div>
      <h1 className="hero__title">
        <span className="reveal-line">
          <span>Merancang pengalaman digital</span>
        </span>
        <span className="reveal-line">
          <span>
            yang terasa <em>hidup.</em>
          </span>
        </span>
      </h1>
      <p className="hero__sub fade-up" ref={heroSubRef}>
        Valerie Attila Al-fath — memadukan estetika editorial dengan rekayasa frontend yang presisi untuk studio, startup, dan brand yang serius soal detail.
      </p>
      <div className="hero__actions fade-up" ref={heroActionsRef}>
        <a href="#work" className="btn btn--solid hover-target">
          Lihat Karya ↓
        </a>
        <a href="#contact" className="btn btn--ghost hover-target">
          Mulai Proyek
        </a>
      </div>
    </div>

    <div className="hero__bottom">
      <div className="marquee">
        <div className="marquee__track" id="marqueeTrack">
          <span>UI/UX DESIGN</span>
          <span>FRONTEND DEVELOPMENT</span>
          <span>MOTION DESIGN</span>
          <span>BRAND IDENTITY</span>
          <span>CREATIVE CODING</span>
          <span>UI/UX DESIGN</span>
          <span>FRONTEND DEVELOPMENT</span>
          <span>MOTION DESIGN</span>
          <span>BRAND IDENTITY</span>
          <span>CREATIVE CODING</span>
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
