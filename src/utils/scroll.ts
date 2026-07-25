import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const isCoarsePointer      = window.matchMedia('(pointer: coarse)').matches

let lenis: Lenis | null = null

export function initScroll(): void {
  if (prefersReducedMotion) { ScrollTrigger.normalizeScroll(false); return }

  lenis = new Lenis({
    duration: 0.9,          // tighter = more responsive, less laggy
    easing: (t: number) => 1 - Math.pow(1 - t, 4), // quartic ease-out
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.85,  // slightly slower wheel = more cinematic
    touchMultiplier: isCoarsePointer ? 1.8 : 1.5,
    infinite: false,
    autoResize: true,
  })

  // Sync Lenis → ScrollTrigger every frame
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => { lenis?.raf(time * 1000) })
  gsap.ticker.lagSmoothing(0)

  // Debounced refresh on resize / orientation change
  let t: ReturnType<typeof setTimeout>
  const refresh = (delay = 220) => { clearTimeout(t); t = setTimeout(() => ScrollTrigger.refresh(true), delay) }
  window.addEventListener('resize', () => refresh())
  window.addEventListener('orientationchange', () => refresh(450))
}

export function getLenis() { return lenis }
export function destroyScroll() { lenis?.destroy(); lenis = null }
