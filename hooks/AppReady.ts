"use client"
import { useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLoader } from "./LoaderProvider"

gsap.registerPlugin(ScrollTrigger)

export default function useAppReady() {
  const [ready, setReady] = useState(false)
  const loader=useLoader()

  useEffect(() => {
    // 1. Check if the browser window/document is completely loaded
    loader.start()
    const handleLoad = () => {
      loader.stop()
      // 2. Introduce a tiny macro-task delay to allow React's concurrent rendering
      // and layout painting to completely settle down.
      setTimeout(() => {
        setReady(true)
        
        // 3. Force GSAP to recalculate every single trigger globally
        // now that the true final heights are painted on screen.
        ScrollTrigger.refresh()
      }, 150) // 150ms is the sweet spot for layouts to settle
    }

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      
    }
    return () => window.removeEventListener('load', handleLoad)
  }, [])

  return ready
}