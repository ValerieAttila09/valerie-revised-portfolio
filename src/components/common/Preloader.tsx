import type { FC, RefObject } from 'react'

interface PreloaderProps {
  show: boolean
  preloaderRef: RefObject<HTMLDivElement | null>
  preloaderBarRef: RefObject<HTMLDivElement | null>
  preloaderCountRef: RefObject<HTMLSpanElement | null>
}

const Preloader: FC<PreloaderProps> = ({ show, preloaderRef, preloaderBarRef, preloaderCountRef }) => (
  <div className={`preloader ${show ? '' : 'is-hidden'}`} ref={preloaderRef}>
    <div className="preloader__bar" ref={preloaderBarRef} />
    <div className="preloader__row">
      <span className="preloader__label">Memuat portofolio</span>
      <span className="preloader__count" ref={preloaderCountRef}>0</span>
    </div>
  </div>
)

export default Preloader
