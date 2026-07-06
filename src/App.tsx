import { useEffect, useRef, useState } from 'react'
import Cursor from './components/common/CursorAndEntrance'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const works = [
  {
    title: 'Lumen — Dashboard Fintech',
    category: 'Product Design / UI Engineering',
    year: '2025',
    image: 'https://picsum.photos/seed/lumen-fin/900/1100',
    mobileImage: 'https://picsum.photos/seed/lumen-fin/900/600',
  },
  {
    title: 'Kanvas — Situs Agensi Kreatif',
    category: 'Web Design / GSAP Development',
    year: '2024',
    image: 'https://picsum.photos/seed/kanvas-agency/900/1100',
    mobileImage: 'https://picsum.photos/seed/kanvas-agency/900/600',
  },
  {
    title: 'Nadi — Aplikasi Pemantau Kesehatan',
    category: 'Mobile UX / Prototyping',
    year: '2024',
    image: 'https://picsum.photos/seed/nadi-health/900/1100',
    mobileImage: 'https://picsum.photos/seed/nadi-health/900/600',
  },
  {
    title: 'Arkana — Platform E-commerce',
    category: 'Frontend Development',
    year: '2023',
    image: 'https://picsum.photos/seed/arkana-shop/900/1100',
    mobileImage: 'https://picsum.photos/seed/arkana-shop/900/600',
  },
  {
    title: 'Serumpun — Arsip Budaya Digital',
    category: 'Web Design / Motion',
    year: '2023',
    image: 'https://picsum.photos/seed/serumpun-archive/900/1100',
    mobileImage: 'https://picsum.photos/seed/serumpun-archive/900/600',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Riset & Discovery',
    description:
      'Memahami bisnis, pengguna, dan batasan teknis sebelum satu piksel pun digambar. Di tahap ini pertanyaan lebih penting dari jawaban.',
  },
  {
    number: '02',
    title: 'Konsep & Desain',
    description:
      'Menerjemahkan temuan menjadi sistem visual: tipografi, warna, layout, dan interaksi yang punya alasan, bukan sekadar terlihat bagus.',
  },
  {
    number: '03',
    title: 'Pengembangan',
    description:
      'Membangun antarmuka dengan kode yang bersih, performa yang diperhatikan, dan animasi yang punya tujuan — bukan hiasan semata.',
  },
  {
    number: '04',
    title: 'Peluncuran & Iterasi',
    description:
      'Merilis, mengukur, lalu menyempurnakan. Produk yang baik terus berkembang setelah hari peluncurannya.',
  },
]

const services = [
  {
    label: 'A',
    title: 'Desain Produk',
    description:
      'Riset, wireframe, hingga UI final yang siap dibangun — dengan sistem desain yang konsisten dan mudah dikembangkan.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    label: 'B',
    title: 'Pengembangan Frontend',
    description:
      'Implementasi antarmuka yang presisi piksel demi piksel, cepat dimuat, dan rapi secara kode — dari landing page hingga aplikasi web.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M8 4l-6 8 6 8M16 4l6 8-6 8" />
      </svg>
    ),
  },
  {
    label: 'C',
    title: 'Motion & Interaksi',
    description:
      'Animasi scroll, transisi halaman, dan micro-interaction yang membuat produk terasa hidup — dibangun dengan GSAP.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    label: 'D',
    title: 'Brand & Identitas',
    description:
      'Sistem visual menyeluruh — logo, tipografi, dan panduan brand — agar brand Anda terasa konsisten di setiap titik sentuh.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 20l6-16h4l6 16M7 14h10" />
      </svg>
    ),
  },
]

const testimonials = [
  {
    quote:
      'valerie menerjemahkan brief yang cukup abstrak menjadi produk yang terasa presisi. Kolaborasinya jelas, timeline-nya tepat waktu.',
    author: 'Dian Kartika — Head of Product, Nusantara Co.',
  },
  {
    quote:
      'Detail animasinya luar biasa halus. Website kami jadi terasa jauh lebih premium tanpa mengorbankan kecepatan loading.',
    author: 'Bimo Saragih — Founder, Orbit Labs',
  },
  {
    quote:
      'Salah satu kolaborator paling teliti yang pernah saya ajak kerja. Setiap keputusan desain punya alasan yang jelas.',
    author: 'Sri Wulandari — Creative Director, Laras Group',
  },
]

const navLinks = [
  { label: 'Tentang', href: '#about' },
  { label: 'Karya', href: '#work' },
  { label: 'Layanan', href: '#services' },
  { label: 'Testimoni', href: '#testimonials' },
]

const mobileNavLinks = [...navLinks, { label: 'Kontak', href: '#contact' }]

const socialLinks = ['Instagram', 'LinkedIn', 'Behance', 'GitHub']

const App = () => {
  const [showPreloader, setShowPreloader] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeWork, setActiveWork] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const navRef = useRef<HTMLElement | null>(null)
  const preloaderRef = useRef<HTMLDivElement | null>(null)
  const preloaderBarRef = useRef<HTMLDivElement | null>(null)
  const preloaderCountRef = useRef<HTMLSpanElement | null>(null)
  const heroSubRef = useRef<HTMLParagraphElement | null>(null)
  const heroActionsRef = useRef<HTMLDivElement | null>(null)
  const processSectionRef = useRef<HTMLElement | null>(null)
  const footerRef = useRef<HTMLElement | null>(null)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const heroLines = Array.from(document.querySelectorAll<HTMLElement>('.reveal-line > span'))
    const countEl = preloaderCountRef.current
    const barEl = preloaderBarRef.current
    const preloaderEl = preloaderRef.current

    const updateClock = () => {
      const heroClock = document.getElementById('clock')
      const footerClock = document.getElementById('footerClock')
      const now = new Date()
      const h = String(now.getHours()).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      const s = String(now.getSeconds()).padStart(2, '0')
      const value = `${h}:${m}:${s}`
      if (heroClock) heroClock.textContent = value
      if (footerClock) footerClock.textContent = `Jakarta, Indonesia — GMT+7`
    }

    updateClock()
    const clockTimer = window.setInterval(updateClock, 1000)

    const introCounter = { value: 0 }
    const introTl = gsap.timeline({
      onComplete: () => {
        setShowPreloader(false)
        const tl = gsap.timeline()
        tl.fromTo(
          heroLines,
          { yPercent: 110 },
          { yPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.12 },
        )
        tl.fromTo(
          heroSubRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.5',
        )
        tl.fromTo(
          heroActionsRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.55',
        )
        gsap.set(navRef.current, { y: -40, opacity: 0 })
        tl.to(navRef.current, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.9')
      },
    })

    gsap.set(barEl, { scaleX: 0 })
    introTl.to(introCounter, {
      value: 100,
      duration: reduceMotion ? 0.1 : 1.6,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (countEl) countEl.textContent = String(Math.round(introCounter.value))
      },
    })
    introTl.to(
      barEl,
      {
        scaleX: 1,
        duration: reduceMotion ? 0.1 : 1.6,
        ease: 'power2.inOut',
      },
      0,
    )
    introTl.to(
      preloaderEl,
      {
        yPercent: -100,
        duration: reduceMotion ? 0.1 : 0.9,
        ease: 'power4.inOut',
      },
      '+=0.1',
    )

    gsap.utils.toArray<HTMLElement>('.fade-up').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
          },
        },
      )
    })

    gsap.utils.toArray<HTMLElement>('.count').forEach((el) => {
      const target = parseFloat(el.getAttribute('data-target') || '0')
      const obj = { value: 0 }
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            value: target,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = String(Math.round(obj.value))
            },
          })
        },
      })
    })

    const loopMarquee = (selector: string, duration: number, dir = -1) => {
      const el = document.querySelector<HTMLElement>(selector)
      if (!el) return
      gsap.set(el, { xPercent: 0 })
      gsap.to(el, { xPercent: 50 * dir, duration, ease: 'none', repeat: -1 })
    }

    loopMarquee('#marqueeTrack', 22, -1)
    loopMarquee('#clientsTrack', 26, -1)

    const workRows = gsap.utils.toArray<HTMLElement>('.work__row')
    const previewImgs = gsap.utils.toArray<HTMLElement>('.work__preview-img')
    const previewTag = document.getElementById('workPreviewTag')

    const setActiveWorkByIndex = (index: number) => {
      setActiveWork(index)
      workRows.forEach((row) => row.classList.remove('is-active'))
      previewImgs.forEach((img) => img.classList.remove('is-active'))
      const row = workRows[index]
      const img = previewImgs[index]
      if (row) row.classList.add('is-active')
      if (img) img.classList.add('is-active')
      if (previewTag) previewTag.textContent = `${String(index + 1).padStart(2, '0')} / ${['Lumen', 'Kanvas', 'Nadi', 'Arkana', 'Serumpun'][index]}`
    }

    if (window.innerWidth > 980) {
      workRows.forEach((row, index) => {
        ScrollTrigger.create({
          trigger: row,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveWorkByIndex(index),
          onEnterBack: () => setActiveWorkByIndex(index),
        })
        row.addEventListener('mouseenter', () => setActiveWorkByIndex(index))
      })
    }

    ScrollTrigger.matchMedia({
      '(min-width: 981px)': () => {
        const track = document.getElementById('processTrack')
        const pin = document.getElementById('processPin')
        if (!track || !pin) return
        const getDistance = () => track.scrollWidth - window.innerWidth + 48
        gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: '#processSection',
            start: 'top top',
            end: () => `+=${getDistance() + window.innerHeight}`,
            scrub: 1,
            pin,
            invalidateOnRefresh: true,
          },
        })
      },
    })

    const testimonialTimer = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => {
      window.clearInterval(clockTimer)
      window.clearInterval(testimonialTimer)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [reduceMotion])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <div className="app-shell">
      <Cursor />

      <div className={`preloader ${showPreloader ? '' : 'is-hidden'}`} ref={preloaderRef}>
        <div className="preloader__bar" ref={preloaderBarRef} />
        <div className="preloader__row">
          <span className="preloader__label">Memuat portofolio</span>
          <span className="preloader__count" ref={preloaderCountRef}>0</span>
        </div>
      </div>

      <header className="nav" ref={navRef}>
        <a href="#hero" className="nav__logo" onClick={() => setMobileMenuOpen(false)}>
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
        <button
          className="nav__burger"
          id="burgerBtn"
          aria-label="Buka menu"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-menu ${mobileMenuOpen ? 'is-open' : ''}`}>
        <button className="mobile-menu__close" onClick={() => setMobileMenuOpen(false)}>
          Tutup ✕
        </button>
        <ul>
          {mobileNavLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="mm-link" onClick={() => setMobileMenuOpen(false)}>
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

      <main>
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

        <section className="about section-pad" id="about">
          <div className="container">
            <div className="eyebrow fade-up">Tentang</div>
            <div className="about__grid" style={{ marginTop: '36px' }}>
              <div className="about__quote fade-up">
                Desain yang baik terasa <span className="italic">jujur</span> — tidak berlebihan, tidak juga kurang.
              </div>
              <div className="about__body">
                <p className="fade-up">
                  Selama lebih dari enam tahun, saya membantu studio, startup, dan brand menerjemahkan ide menjadi antarmuka yang rapi dan berkarakter. Latar belakang saya di desain editorial mengajarkan saya bahwa tipografi dan jarak bukan hiasan — itu cara pesan disampaikan.
                </p>
                <p className="fade-up">
                  Saya percaya detail kecil — jeda animasi, kontras warna, rasio antar elemen — adalah pembeda antara produk yang biasa dengan produk yang diingat orang.
                </p>
              </div>
            </div>
            <div className="about__stats">
              <div className="stat">
                <div className="stat__num">
                  <span className="count" data-target="6">0</span>
                  <span className="accentmark">+</span>
                </div>
                <div className="stat__label">Tahun Pengalaman</div>
              </div>
              <div className="stat">
                <div className="stat__num">
                  <span className="count" data-target="48">0</span>
                </div>
                <div className="stat__label">Proyek Diselesaikan</div>
              </div>
              <div className="stat">
                <div className="stat__num">
                  <span className="count" data-target="22">0</span>
                </div>
                <div className="stat__label">Klien di 3 Benua</div>
              </div>
              <div className="stat">
                <div className="stat__num">
                  <span className="count" data-target="12">0</span>
                </div>
                <div className="stat__label">Penghargaan Desain</div>
              </div>
            </div>
          </div>
        </section>

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
                    {String(activeWork + 1).padStart(2, '0')} / {['Lumen', 'Kanvas', 'Nadi', 'Arkana', 'Serumpun'][activeWork]}
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
                    onMouseEnter={() => setActiveWork(index)}
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
                  onClick={() => setActiveTestimonial(index)}
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
      </main>

      <footer className="footer" ref={footerRef}>
        <div className="container footer__top" style={{ width: '100%' }}>
          <span>© 2026 Valerie Attila Al-fath. Seluruh hak dilindungi.</span>
          <span id="footerClock">Jakarta, Indonesia — GMT+7</span>
          <button className="back-to-top hover-target" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Kembali ke atas ↑
          </button>
        </div>
      </footer>
    </div>
  )
}

export default App