import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

function SmoothScroll({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    lenisRef.current = lenis

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export default SmoothScroll
