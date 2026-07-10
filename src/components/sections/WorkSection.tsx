import { useState, useRef, useEffect, useCallback } from 'react'
import type { FC, MouseEvent } from 'react'
import type { WorkItem } from '../../types'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface WorkSectionProps {
  works: WorkItem[]
  activeWork: number
  onSetActiveWork: (index: number) => void
}

const WorkSection: FC<WorkSectionProps> = ({ works, activeWork, onSetActiveWork }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  // const contentRef = useRef<HTMLDivElement | null>(null)
  const animRef = useRef<gsap.core.Tween | null>(null)
  const lastToggleButtonRef = useRef<HTMLButtonElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const backdropRef = useRef<HTMLDivElement | null>(null)
  const rowRefs = useRef<Array<HTMLDivElement | null>>([])
  const previousBodyOverflow = useRef<string | null>(null)

  const closeDetails = useCallback(() => {
    // animate close
    const modalEl = modalRef.current
    const inner = modalEl?.querySelector('.work__details-inner') as HTMLElement | null
    gsap.killTweensOf(inner ?? modalEl)
    if (inner) {
      gsap.to(inner, {
        scale: 0.98,
        opacity: 0,
        y: 10,
        duration: 0.18,
        ease: 'power2.in',
        onComplete: () => {
          setOpenIndex(null)
          // restore body scroll & ScrollTrigger
          if (previousBodyOverflow.current !== null) document.body.style.overflow = previousBodyOverflow.current
          previousBodyOverflow.current = null
          const st = (gsap as any).ScrollTrigger
          if (st && typeof st.getAll === 'function') st.getAll().forEach((t: any) => t.enable())
          lastToggleButtonRef.current?.focus()
        },
      })
    } else {
      setOpenIndex(null)
      if (previousBodyOverflow.current !== null) document.body.style.overflow = previousBodyOverflow.current
      previousBodyOverflow.current = null
      const st = (gsap as any).ScrollTrigger
      if (st && typeof st.getAll === 'function') st.getAll().forEach((t: any) => t.enable())
      lastToggleButtonRef.current?.focus()
    }
  }, [])

  const handleToggle = useCallback((index: number, e?: MouseEvent<HTMLButtonElement>) => {
    if (e?.currentTarget) lastToggleButtonRef.current = e.currentTarget
    if (openIndex === index) {
      closeDetails()
    } else {
      // open
      previousBodyOverflow.current = document.body.style.overflow || ''
      document.body.style.overflow = 'hidden'
      const st = (gsap as any).ScrollTrigger
      if (st && typeof st.getAll === 'function') st.getAll().forEach((t: any) => t.disable())
      setOpenIndex(index)
    }
  }, [openIndex, closeDetails])



  const goPrev = useCallback(() => {
    setOpenIndex((current) => {
      if (current === null) return 0
      return (current - 1 + works.length) % works.length
    })
  }, [works.length])

  const goNext = useCallback(() => {
    setOpenIndex((current) => {
      if (current === null) return 0
      return (current + 1) % works.length
    })
  }, [works.length])

  useEffect(() => {
    if (window.innerWidth <= 980) return

    const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[]
    if (!rows.length) return

    const triggers = rows.map((row, index) => ScrollTrigger.create({
      trigger: row,
      start: 'top 70%',
      end: 'bottom 70%',
      onEnter: () => onSetActiveWork(index),
      onEnterBack: () => onSetActiveWork(index),
      toggleActions: 'play none none reverse',
    }))

    return () => {
      triggers.forEach((trigger) => trigger.kill())
    }
  }, [onSetActiveWork, works.length])

  // ESC handler
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (openIndex !== null) {
          e.preventDefault()
          closeDetails()
        }
        return
      }
      if (openIndex !== null) {
        if (e.key === 'ArrowLeft') goPrev()
        if (e.key === 'ArrowRight') goNext()

        // trap tab inside modal
        if (e.key === 'Tab') {
          const container = modalRef.current
          if (!container) return
          const focusables = Array.from(container.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'))
            .filter((el) => el.offsetParent !== null)
          if (focusables.length === 0) {
            e.preventDefault()
            return
          }
          const idx = focusables.indexOf(document.activeElement as HTMLElement)
          if (e.shiftKey && idx === 0) {
            e.preventDefault()
            focusables[focusables.length - 1].focus()
          } else if (!e.shiftKey && idx === focusables.length - 1) {
            e.preventDefault()
            focusables[0].focus()
          }
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeDetails, openIndex, goPrev, goNext])
  // when modal opens, animate inner and set focus
  useEffect(() => {
    const modalEl = modalRef.current
    const inner = modalEl?.querySelector('.work__details-inner') as HTMLElement | null
    animRef.current?.kill()
    if (openIndex !== null && inner) {
      gsap.set(inner, { scale: 0.98, opacity: 0, y: 8 })
      animRef.current = gsap.to(inner, {
        scale: 1, opacity: 1, y: 0, duration: 0.28, ease: 'power2.out', onComplete: () => {
          // focus first focusable inside modal
          const focusables = Array.from(modalEl!.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'))
            .filter((el) => el.offsetParent !== null)
          if (focusables.length) focusables[0].focus()
        }
      })
    }

    return () => {
      animRef.current?.kill()
    }
  }, [openIndex])

  return (
    <section className="work section-pad" id="work">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow fade-up">Project &amp; Experiments</div>
            <h2 className="fade-up">Beberapa karya yang saya bangun dari belajar, bereksperimen, hingga ikut mengerjakan project nyata.</h2>
          </div>
          <div className="section-head__side fade-up">
            Klik tombol View Details untuk melihat konteks project, stack yang dipakai, dan tautan sumber atau demo.
          </div>
        </div>

        <div className="work__grid">
          <div className="work__sticky">
            <div className="work__preview">
              <span className="work__preview-tag" id="workPreviewTag">
                {String(activeWork + 1).padStart(2, '0')} / {works[activeWork]?.title.split(' — ')[0]}
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
            {works.map((work, index) => {
              const isOpen = index === openIndex
              return (
                <div
                  key={work.title}
                  ref={(el) => {
                    rowRefs.current[index] = el
                  }}
                  className={`work__row hover-target ${index === activeWork ? 'is-active' : ''}`}
                  onMouseEnter={() => onSetActiveWork(index)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex justify-start items-center gap-4">
                      <span className="work__index">{String(index + 1).padStart(2, '0')}</span>
                      <div className="flex flex-col justify-start items-start">
                        <span className="work__title">{work.title}</span>
                        <span className="work__cat">{work.category}</span>
                        <span className="work__year">{work.year}</span>
                      </div>
                    </div>

                    <div className="work__actions">
                      <button
                        type="button"
                        className="btn--link text-nowrap rounded-none transition-all"
                        onClick={(e) => handleToggle(index, e)}
                        aria-expanded={isOpen}
                        aria-controls={`work-detail-${index}`}
                      >
                        {isOpen ? 'Tutup' : 'View Details'}
                      </button>
                    </div>
                  </div>

                  {/* removed inline details; details are rendered in modal when opened */}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Modal details (rendered once) */}
      {openIndex !== null && (
        <div
          ref={modalRef}
          className={`work__details-modal open`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="work-title"
        >
          <div
            ref={backdropRef}
            className="work__details-backdrop"
            onMouseDown={(e) => { if (e.target === backdropRef.current) closeDetails() }}
          />

          <div className="work__details-inner animated">
            {/* Header */}
            <div className="work__details-header">
              <div className="work__details-title-group">
                <h3 id="work-title" className="work__details-title">
                  {works[openIndex].title}
                </h3>
                <div className="work__details-meta">
                  <span className="work__details-category">
                    {works[openIndex].category}
                  </span>
                  <span className="work__details-year">
                    {works[openIndex].year}
                  </span>
                </div>
              </div>

              <div className="work__details-controls">
                <div className="work__details-nav">
                  <button
                    type="button"proce
                    className="work__nav-btn"
                    onClick={goPrev}
                    aria-label="Previous project"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Prev</span>
                  </button>
                  <button
                    type="button"
                    className="work__nav-btn"
                    onClick={goNext}
                    aria-label="Next project"
                  >
                    <span>Next</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  className="work__close-btn"
                  onClick={closeDetails}
                  aria-label="Close details"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="work__details-content">
              <div className="work__details-left">
                <p className="work__description">
                  {works[openIndex].description}
                </p>

                {works[openIndex].stack?.length ? (
                  <div>
                    <h4 className="work__section-label">Technology Stack</h4>
                    <div className="work__stack-list">
                      {works[openIndex].stack.map((tech) => (
                        <span key={tech} className="work__stack-item">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {works[openIndex].links?.length ? (
                  <div>
                    <h4 className="work__section-label">Project Links</h4>
                    <div className="work__links">
                      {works[openIndex].links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className={`work__link ${l.label === 'Source' ? 'work__link--secondary' : ''}`}
                        >
                          {l.label === 'Live Demo' && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <polyline points="15 3 21 3 21 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          {l.label === 'Source' && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                          {l.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              {(works[openIndex].gallery?.length ? works[openIndex].gallery : [works[openIndex].image]).length ? (
                <div className="work__details-right">
                  <div className="work__details-gallery">
                    {(works[openIndex].gallery?.length ? works[openIndex].gallery : [works[openIndex].image]).map((src, idx) => (
                      <img
                        key={`${src}-${idx}`}
                        src={src}
                        alt={`${works[openIndex].title} - Screenshot ${idx + 1}`}
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Footer */}
            <div className="work__details-footer">
              <span className="work__details-counter">
                {String(openIndex + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
              </span>
              <span className="work__details-counter">
                Use arrow keys to navigate
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default WorkSection