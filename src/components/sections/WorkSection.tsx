import { useState, useRef, useEffect, useCallback } from 'react'
import type { FC, MouseEvent } from 'react'
import type { WorkItem } from '../../types'
import gsap from 'gsap'

interface WorkSectionProps {
  works: WorkItem[]
  activeWork: number
  onSetActiveWork: (index: number) => void
}

const WorkSection: FC<WorkSectionProps> = ({ works, activeWork, onSetActiveWork }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const animRef = useRef<gsap.core.Tween | null>(null)
  const lastToggleButtonRef = useRef<HTMLButtonElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const backdropRef = useRef<HTMLDivElement | null>(null)
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
                  className={`work__row hover-target ${index === activeWork ? 'is-active' : ''}`}
                  onMouseEnter={() => onSetActiveWork(index)}
                >
                  <div className="work__row-main">
                    <span className="work__index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="work__title">{work.title}</span>
                    <span className="work__cat">{work.category}</span>
                    <span className="work__year">{work.year}</span>

                    <div className="work__actions">
                      <button
                        type="button"
                        className="btn--link"
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
        <div ref={modalRef} className={`work__details-modal open`} role="dialog" aria-modal="true" aria-labelledby="work-title">
          <div ref={backdropRef} className="work__details-backdrop" onMouseDown={(e) => { if (e.target === backdropRef.current) closeDetails() }} />
          <div className="work__details-inner">
            <div className="work__details-left" ref={contentRef}>
              <h3 id="work-title">{works[openIndex].title}</h3>
              <p className="work__description">{works[openIndex].description}</p>
              {works[openIndex].stack?.length ? (
                <p className="work__stack"><strong>Stack:</strong> {works[openIndex].stack.join(', ')}</p>
              ) : null}
              {works[openIndex].links?.length ? (
                <div className="work__links">
                  {works[openIndex].links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
                  ))}
                </div>
              ) : null}
            </div>

            {works[openIndex].gallery?.length ? (
              <div className="work__details-gallery">
                {works[openIndex].gallery.map((src) => (
                  <img key={src} src={src} alt={`${works[openIndex].title} gallery`} />
                ))}
              </div>
            ) : null}

            <div className="work__details-actions">
              <div className="work__details-nav">
                <button type="button" className="btn--link btn--icon" onClick={goPrev} aria-label="Previous project" title="Previous project">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="btn--text">Prev</span>
                </button>
                <button type="button" className="btn--link btn--icon" onClick={goNext} aria-label="Next project" title="Next project">
                  <span className="btn--text">Next</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div className="work__details-close">
                <button ref={closeButtonRef} type="button" className="btn--close" onClick={closeDetails} aria-label="Close details" title="Close details">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default WorkSection