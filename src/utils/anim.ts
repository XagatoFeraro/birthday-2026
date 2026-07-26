// ─── Text & element animation utilities ───────────────────────────────────────
import { gsap } from 'gsap'

// Split text into spans for char-by-char animation
export function splitChars(el: HTMLElement): HTMLElement[] {
  const text = el.textContent || ''
  el.innerHTML = ''
  el.setAttribute('aria-label', text) // preserve accessibility
  return text.split('').map(ch => {
    const span = document.createElement('span')
    span.className = 'split-char'
    span.textContent = ch === ' ' ? '\u00a0' : ch
    el.appendChild(span)
    return span
  })
}

// Animate chars in — staggered from left
export function animateCharsIn(el: HTMLElement, delay = 0): gsap.core.Tween {
  const chars = splitChars(el)
  gsap.set(chars, { opacity: 0, y: 30, rotate: 8 })
  return gsap.to(chars, {
    opacity: 1, y: 0, rotate: 0,
    duration: 0.5,
    stagger: 0.025,
    delay,
    ease: 'back.out(1.8)',
  })
}

// Clip-path wipe reveal for images (left → right)
export function clipReveal(el: HTMLElement, delay = 0): gsap.core.Tween {
  gsap.set(el, { clipPath: 'inset(0 100% 0 0)' })
  return gsap.to(el, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.1,
    delay,
    ease: 'power4.inOut',
  })
}

// Scale + fade pop
export function popIn(el: HTMLElement, delay = 0): gsap.core.Tween {
  gsap.set(el, { scale: 0.7, opacity: 0, transformOrigin: 'center center' })
  return gsap.to(el, {
    scale: 1, opacity: 1,
    duration: 0.65,
    delay,
    ease: 'back.out(1.7)',
  })
}

// Fade up from below
export function fadeUp(el: HTMLElement | HTMLElement[], delay = 0, stagger = 0): gsap.core.Tween {
  gsap.set(el, { opacity: 0, y: 30 })
  return gsap.to(el, {
    opacity: 1, y: 0,
    duration: 0.75,
    delay,
    stagger,
    ease: 'power3.out',
  })
}

// Scroll-triggered once reveal
export function revealOnScroll(
  el: HTMLElement,
  animFn: (el: HTMLElement, d?: number) => void,
  opts: { start?: string; delay?: number } = {}
): void {
  const { ScrollTrigger } = (window as any).__gsap__ || {}
  if (!ScrollTrigger) return

  import('gsap/ScrollTrigger').then(({ ScrollTrigger: ST }) => {
    ST.create({
      trigger: el,
      start: opts.start ?? 'top 85%',
      once: true,
      onEnter: () => animFn(el, opts.delay ?? 0),
    })
  })
}
