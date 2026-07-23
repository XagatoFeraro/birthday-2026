import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Detect reduced-motion preference ────────────────────────────────────────
export const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

// ── Detect touch / pointer capability ───────────────────────────────────────
export const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
export const hasHover        = window.matchMedia('(hover: hover)').matches

// ── Derive device choreography tier ─────────────────────────────────────────
// Used by animation modules to select the appropriate choreography.
// Not device sniffing — based on actual capabilities + viewport.
export type Tier = 'desktop' | 'tablet' | 'mobile'

export function getTier(): Tier {
  const w = window.innerWidth
  if (w >= 1024 && !isCoarsePointer) return 'desktop'
  if (w >= 641)                        return 'tablet'
  return 'mobile'
}

// ── Lenis instance ───────────────────────────────────────────────────────────
let lenis: Lenis | null = null

export function initScroll(): void {
  // Disable Lenis on reduced-motion or very low-end devices —
  // fall back to native browser scrolling.
  if (prefersReducedMotion) {
    // Still need ScrollTrigger to use native scroll
    ScrollTrigger.normalizeScroll(false)
    return
  }

  lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    // Touch devices: let native momentum scroll handle it,
    // only smooth on wheel/trackpad.
    touchMultiplier: isCoarsePointer ? 0 : 1.5,
  })

  // Connect Lenis scroll position to GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)
}

export function destroyScroll(): void {
  lenis?.destroy()
  lenis = null
}

export function getLenis(): Lenis | null {
  return lenis
}

// ── ScrollTrigger refresh on orientation / resize ───────────────────────────
// Debounced to avoid excessive recalculation on mobile browser chrome changes.
let refreshTimer: ReturnType<typeof setTimeout>

window.addEventListener('resize', () => {
  clearTimeout(refreshTimer)
  refreshTimer = setTimeout(() => {
    ScrollTrigger.refresh(true)
  }, 200)
})

window.addEventListener('orientationchange', () => {
  clearTimeout(refreshTimer)
  refreshTimer = setTimeout(() => {
    ScrollTrigger.refresh(true)
  }, 400)
})
