import React from 'react'
import Cursor from './components/common/CursorAndEntrance'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger);

const App = () => {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div>
      <Cursor />
    </div>
  )
}

export default App