// ─── Scene: Meet ─────────────────────────────────────────────────────────────
// "Tanisha." → "But I call her something else." → "Betuuu."
// 300dvh scroll space. Single pin. All transitions scrub-driven and reversible.

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../utils/scroll'

export function initMeet(): void {
  const section  = document.getElementById('scene-meet')
  const stage    = section?.querySelector<HTMLElement>('.meet__stage')
  const nameEl   = section?.querySelector<HTMLElement>('.meet__word--name')
  const bridgeEl = section?.querySelector<HTMLElement>('.meet__word--bridge')
  const nickEl   = section?.querySelector<HTMLElement>('.meet__word--nickname')

  if (!section || !stage || !nameEl || !bridgeEl || !nickEl) return

  // ── Single pin — one ScrollTrigger, no duplicates ────────────────────────
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom top',
    pin: stage,
  })

  if (prefersReducedMotion) {
    gsap.set([nameEl, bridgeEl, nickEl], { opacity: 1, y: 0, scale: 1, filter: 'none' })
    return
  }

  // ── Initial states ───────────────────────────────────────────────────────
  gsap.set(nameEl,   { opacity: 0, y: 50,  scale: 0.92 })
  gsap.set(bridgeEl, { opacity: 0, y: 30 })
  gsap.set(nickEl,   { opacity: 0, y: 60,  scale: 0.88, filter: 'blur(12px)' })

  // All beats use the same scrub value (0.8) for consistent reversal feel.
  // Each beat is a separate timeline with its own trigger window.

  // ── Beat 1 (0–28%): "Tanisha." rises in ─────────────────────────────────
  gsap.to(nameEl, {
    opacity: 1, y: 0, scale: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '28% top',
      scrub: 0.8,
    },
  })

  // ── Beat 2 (18–44%): name softens, bridge appears ───────────────────────
  gsap.to(nameEl, {
    opacity: 0.3, scale: 0.88, y: -25,
    ease: 'power1.inOut',
    scrollTrigger: {
      trigger: section,
      start: '18% top',
      end: '44% top',
      scrub: 0.8,
    },
  })

  gsap.to(bridgeEl, {
    opacity: 1, y: 0,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: '24% top',
      end: '46% top',
      scrub: 0.8,
    },
  })

  // ── Beat 3 (40–72%): "Betuuu." explodes in, others vanish ───────────────
  gsap.to([nameEl, bridgeEl], {
    opacity: 0, y: -35,
    ease: 'power2.in',
    scrollTrigger: {
      trigger: section,
      start: '40% top',
      end: '62% top',
      scrub: 0.8,
    },
  })

  gsap.to(nickEl, {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    ease: 'power3.out',
    scrollTrigger: {
      trigger: section,
      start: '50% top',
      end: '74% top',
      scrub: 0.8,
    },
  })

  // ── Beat 4 (76–100%): "Betuuu." lifts out as we transition forward ──────
  gsap.to(nickEl, {
    opacity: 0, y: -60, scale: 0.94,
    ease: 'power2.in',
    scrollTrigger: {
      trigger: section,
      start: '76% top',
      end: '98% top',
      scrub: 0.8,
    },
  })
}
