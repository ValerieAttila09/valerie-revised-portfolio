import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches

    if (isTouch || !dotRef.current || !ringRef.current) {
      return
    }

    const dot = dotRef.current
    const ring = ringRef.current

    const dotX = gsap.quickTo(dot, 'x', {
      duration: 0.12,
      ease: 'power3.out',
    })
    const dotY = gsap.quickTo(dot, 'y', {
      duration: 0.12,
      ease: 'power3.out',
    })
    const ringX = gsap.quickTo(ring, 'x', {
      duration: 0.35,
      ease: 'power3.out',
    })
    const ringY = gsap.quickTo(ring, 'y', {
      duration: 0.35,
      ease: 'power3.out',
    })

    const handleMouseMove = (event: MouseEvent) => {
      dotX(event.clientX)
      dotY(event.clientY)
      ringX(event.clientX)
      ringY(event.clientY)
    }

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target

      if (target instanceof Element && target.closest('.hover-target, a, button')) {
        ring.classList.add('is-active')
      }
    }

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target

      if (target instanceof Element && target.closest('.hover-target, a, button')) {
        ring.classList.remove('is-active')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <>
      <div className="grain" />
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* <div className="preloader" id="preloader">
        <div className="preloader__bar" id="preloaderBar" />
        <div className="preloader__row">
          <span className="preloader__label">Memuat portofolio</span>
          <span className="preloader__count" id="preloaderCount">0</span>
        </div>
      </div> */}
    </>
  )
}

export default Cursor