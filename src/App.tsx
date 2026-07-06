import { useEffect, useRef, useState } from 'react'
import Cursor from './components/common/CursorAndEntrance'
import Navbar from './components/common/Navbar'
import Preloader from './components/common/Preloader'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import WorkSection from './components/sections/WorkSection'
import ProcessSection from './components/sections/ProcessSection'
import ServicesSection from './components/sections/ServicesSection'
import TestimonialSection from './components/sections/TestimonialSection'
import ContactSection from './components/sections/ContactSection'
import FooterSection from './components/sections/FooterSection'
import type { WorkItem } from './types'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const works: WorkItem[] = [
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
      <Preloader
        show={showPreloader}
        preloaderRef={preloaderRef}
        preloaderBarRef={preloaderBarRef}
        preloaderCountRef={preloaderCountRef}
      />
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
        navRef={navRef}
      />

      <main>
        <HeroSection heroSubRef={heroSubRef} heroActionsRef={heroActionsRef} />
        <AboutSection />
        <WorkSection works={works} activeWork={activeWork} onSetActiveWork={setActiveWork} />
        <ProcessSection processSteps={processSteps} processSectionRef={processSectionRef} />
        <ServicesSection services={services} />
        <TestimonialSection
          testimonials={testimonials}
          activeTestimonial={activeTestimonial}
          onSetActiveTestimonial={setActiveTestimonial}
        />
        <ContactSection socialLinks={socialLinks} />
      </main>

      <FooterSection footerRef={footerRef} />
    </div>
  )
}

export default App