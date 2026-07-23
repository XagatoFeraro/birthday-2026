// ─── Scene: Birthday ─────────────────────────────────────────────────────────
// The emotional destination. 300dvh. Single pin. Fully scrub-driven.

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createKitten } from '../components/cat'
import { createParticles } from '../components/particles'
import { prefersReducedMotion } from '../utils/scroll'

export function initBirthday(): void {
  const section  = document.getElementById('scene-birthday')
  const stage    = section?.querySelector<HTMLElement>('.birthday__stage')
  const bloom    = section?.querySelector<HTMLElement>('.birthday__bloom')
  const dateEl   = section?.querySelector<HTMLElement>('.birthday__date')
  const greeting = section?.querySelector<HTMLElement>('.birthday__greeting')
  const nameEl   = section?.querySelector<HTMLElement>('.birthday__name')
  const catWrap  = section?.querySelector<HTMLElement>('[data-cat="birthday"]')

  if (!section || !stage || !bloom || !dateEl || !greeting || !nameEl) return

  // Kitten
  const kitten = createKitten('birthday__kitten-svg')
  kitten.style.cssText = 'width:clamp(70px,12vw,120px);height:auto'
  gsap.set(kitten, { opacity: 0, y: 20, scale: 0.85 })
  catWrap?.appendChild(kitten)

  // Particles
  const particles = createParticles({ types: ['heart', 'dot', 'paw'] })
  particles.style.pointerEvents = 'none'
  stage.appendChild(particles)
  gsap.set(particles, { opacity: 0 })

  // ── Single pin — pinSpacing default (true) keeps layout intact ───────────
  ScrollTrigger.create({
    id: 'birthday-pin',
    trigger: section,
    start: 'top top',
    end: 'bottom top',
    pin: stage,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  })

  if (prefersReducedMotion) {
    gsap.set([dateEl, greeting, nameEl], { opacity: 1, y: 0, scale: 1, filter: 'none' })
    gsap.set(bloom,    { opacity: 0.4, scale: 1 })
    gsap.set(kitten,   { opacity: 1, y: 0, scale: 1 })
    gsap.set(particles,{ opacity: 0.3 })
    return
  }

  // ── Initial states ───────────────────────────────────────────────────────
  gsap.set(dateEl,   { opacity: 0, y: 40, scale: 0.9 })
  gsap.set(greeting, { opacity: 0, y: 60, scale: 0.88 })
  gsap.set(nameEl,   { opacity: 0, y: 80, scale: 0.85, filter: 'blur(8px)' })
  gsap.set(bloom,    { opacity: 0, scale: 0.2 })

  // Shared scrub value for consistent reversal
  const SCRUB = 0.9

  // ── Beat 1 (0–25%): bloom begins, date rises ─────────────────────────────
  gsap.timeline({ scrollTrigger: { trigger: section, start: 'top top',   end: '25% top', scrub: SCRUB } })
    .to(bloom,  { opacity: 0.5, scale: 0.7, ease: 'power2.out' }, 0)
    .to(dateEl, { opacity: 1, y: 0, scale: 1, ease: 'power3.out' }, 0.2)

  // ── Beat 2 (20–54%): "Happy Birthday," rises ─────────────────────────────
  gsap.timeline({ scrollTrigger: { trigger: section, start: '20% top',   end: '54% top', scrub: SCRUB } })
    .to(bloom,    { opacity: 0.75, scale: 0.9, ease: 'power2.out' }, 0)
    .to(greeting, { opacity: 1, y: 0, scale: 1, ease: 'power3.out' }, 0.15)

  // ── Beat 3 (48–78%): "Betuuu." erupts ───────────────────────────────────
  gsap.timeline({ scrollTrigger: { trigger: section, start: '48% top',   end: '78% top', scrub: SCRUB } })
    .to(bloom,      { opacity: 1, scale: 1.2, ease: 'power2.out' }, 0)
    .to(nameEl,     { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', ease: 'power3.out' }, 0.2)
    .to(particles,  { opacity: 1, ease: 'power2.out' }, 0.4)

  // ── Beat 4 (70–86%): kitten appears ──────────────────────────────────────
  gsap.timeline({ scrollTrigger: { trigger: section, start: '70% top',   end: '86% top', scrub: SCRUB } })
    .to(kitten, { opacity: 1, y: 0, scale: 1, ease: 'power2.out' })

  // Tail idle — starts when kitten is visible, killed on reverse
  const tail = kitten.querySelector('[data-cat-part="tail"]')
  if (tail) {
    ScrollTrigger.create({
      trigger: section, start: '74% top',
      onEnter:     () => gsap.to(tail, { rotate: 8, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
      onLeaveBack: () => { gsap.killTweensOf(tail); gsap.set(tail, { rotate: 0 }) },
    })
  }

  // ── Exit (86–100%): dissolve into final scene ────────────────────────────
  gsap.timeline({ scrollTrigger: { trigger: section, start: '86% top', end: 'bottom top', scrub: SCRUB } })
    .to([dateEl, greeting, nameEl, kitten, particles], { opacity: 0, y: -30, stagger: 0.04, ease: 'power1.in' }, 0)
    .to(bloom, { opacity: 0, scale: 1.5, ease: 'power2.in' }, 0)
}
