"use client"
import { createContext, useCallback, useContext, useEffect, useRef } from "react"
import Lenis from "lenis"

const SectionScrollCtx = createContext<(id: string) => void>(() => {})

/** Scroll to a section on the current page by id. */
export const useSectionScroll = () => useContext(SectionScrollCtx)

export const ScrollRoot = ({ children }: { children: React.ReactNode }) => {
  const lenis = useRef<Lenis | null>(null)

  // Inertial wheel scrolling — skipped entirely when the OS asks for less motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const instance = new Lenis({ autoRaf: true, lerp: 0.12 })
    lenis.current = instance
    return () => {
      instance.destroy()
      lenis.current = null
    }
  }, [])

  const goTo = useCallback((id: string) => {
    const section = document.getElementById(id)
    if (!section) return

    const settle = () => history.replaceState(history.state, "", `#${id}`)
    const smooth = lenis.current

    if (smooth) {
      // Lenis measures from its own last-known position; if the page moved
      // without it noticing, line the two up first so the jump lands exactly.
      if (!smooth.isScrolling && Math.abs(smooth.animatedScroll - window.scrollY) > 1) {
        smooth.scrollTo(window.scrollY, { immediate: true })
      }
      smooth.scrollTo(section, { duration: 1, onComplete: settle })
    } else {
      section.scrollIntoView({ block: "start" })
      settle()
    }

    // Keyboard and screen-reader users continue from the section they jumped to.
    section.focus({ preventScroll: true })
  }, [])

  return <SectionScrollCtx value={goTo}>{children}</SectionScrollCtx>
}
