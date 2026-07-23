// ─── Scene: Birthday ─────────────────────────────────────────────────────────
// The emotional destination. Pace slows. World blooms. "Happy Birthday, Betuuu."
// 300dvh scroll space. Fully scrub-driven.

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createKitten } from '../components/cat'
import { createParticles } from '../components/particles'
import { prefersReducedMotion } from '../utils/scroll'

export function initBirthday(): void {
  const section   = document.getElementById('scene-birthday')
  const stage     = section?.querySelector<HTMLElement>('.birthday__stage')
  const bloom     = section?.querySelector<HTMLElement>('.birthday__bloom')
  const dateEl    = section?.querySelector<HTMLElement>('.birthday__date')
  const greeting  = section?.querySelector<HTMLElement>('.birthday__greeting')
  const nameEl    = section?.querySelector<HTMLElement>('.birthday__name')
  const catWrap   = section?.querySelector<HTMLElement>('[data-cat="birthday"]')

  if (!section || !stage || !bloom || !dateEl || !greeting || !nameEl) return

  // Inject kitten
  if (catWrap) {
    const kitten = createKitten('birthday__kitten-svg')
    gsap.set(kitten, { opacity: 0, y: 20, scale: 0.85 })
    catWrap.appendChild(kitten)
  }

  // Inject particles
  const particles = createParticles({ types: ['heart', 'dot', 'paw'] })
  particles.style.pointerEvents = 'none'
  stage.appendChild(particles)
  gsap.set(particles, { opacity: 0 })

  if (prefersReducedMotion) {
    gsap.set([dateEl, greeting, nameEl], { opacity: 1, y: 0, scale: 1 })
    gsap.set(bloom, { opacity: 0.4, scale: 1 })
    if (catWrap) gsap.set(catWrap.querySelector('svg'), { opacity: 1, y: 0, scale: 1 })
    gsap.set(particles, { opacity: 0.3 })

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      pin: stage,
      pinSpacing: false,
    })
    return
  }

  // ── Initial states ───────────────────────────────────────────────────────
  gsap.set(dateEl,   { opacity: 0, y: 40, scale: 0.9 })
  gsap.set(greeting, { opacity: 0, y: 60, scale: 0.88 })
  gsap.set(nameEl,   { opacity: 0, y: 80, scale: 0.85, filter: 'blur(8px)' })
  gsap.set(bloom,    { opacity: 0, scale: 0.2 })

  // ── Pin ──────────────────────────────────────────────────────────────────
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom top',
    pin: stage,
    pinSpacing: false,
    anticipatePin: 1,
  })

  // ── Beat 1 (0%–25%): approach — gentle bloom, date appears ──────────────
  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '25% top',
      scrub: 1.0,
    },
  })
    .to(bloom, {
      opacity: 0.5, scale: 0.7,
      ease: 'power2.out',
    }, 0)
    .to(dateEl, {
      opacity: 1, y: 0, scale: 1,
      ease: 'power3.out',
    }, 0.2)

  // ── Beat 2 (20%–55%): "Happy Birthday," rises ────────────────────────────
  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: '20% top',
      end: '55% top',
      scrub: 1.0,
    },
  })
    .to(bloom, {
      opacity: 0.75, scale: 0.9,
      ease: 'power2.out',
    }, 0)
    .to(greeting, {
      opacity: 1, y: 0, scale: 1,
      ease: 'power3.out',
    }, 0.15)

  // ── Beat 3 (48%–80%): "Betuuu." erupts, world fully blooms ──────────────
  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: '48% top',
      end: '80% top',
      scrub: 0.9,
    },
  })
    .to(bloom, {
      opacity: 1, scale: 1.2,
      ease: 'power2.out',
    }, 0)
    .to(nameEl, {
      opacity: 1, y: 0, scale: 1,
      filter: 'blur(0px)',
      ease: 'power3.out',
    }, 0.2)
    .to(particles, {
      opacity: 1,
      ease: 'power2.out',
    }, 0.4)

  // ── Beat 4 (72%–88%): kitten appears beside the message ─────────────────
  const kittenSvg = catWrap?.querySelector<SVGSVGElement>('svg')
  if (kittenSvg) {
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: '72% top',
        end: '88% top',
        scrub: 0.7,
      },
    })
      .to(kittenSvg, {
        opacity: 1, y: 0, scale: 1,
        ease: 'power2.out',
      })

    // Kitten tail sway — triggered once she's visible
    const tail = kittenSvg.querySelector('[data-cat-part="tail"]')
    if (tail) {
      ScrollTrigger.create({
        trigger: section,
        start: '75% top',
        onEnter: () => {
          gsap.to(tail, {
            rotate: 8, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1,
          })
        },
        onLeaveBack: () => {
          gsap.killTweensOf(tail)
        },
      })
    }
  }

  // ── Birthday scene exit (88%–100%) ───────────────────────────────────────
  // Gentle dissolve into final scene
  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: '88% top',
      end: 'bottom top',
      scrub: 0.6,
    },
  })
    .to([dateEl, greeting, nameEl, kittenSvg, particles].filter(Boolean), {
      opacity: 0,
      y: -30,
      stagger: 0.04,
      ease: 'power1.in',
    })
    .to(bloom, {
      opacity: 0, scale: 1.5,
      ease: 'power2.in',
    }, 0)
}
