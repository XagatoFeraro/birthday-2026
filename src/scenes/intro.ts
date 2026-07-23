// ─── Scene: Intro ────────────────────────────────────────────────────────────
// "pspspsps..." → kitten appears → "Hey Betuuu..." → "I made something for you."
// Pinned for 200dvh. Entrance plays on load; exit is scrub-driven (reversible).

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createKitten } from '../components/cat'
import { prefersReducedMotion } from '../utils/scroll'

export function initIntro(): void {
  const section  = document.getElementById('scene-intro')
  const stage    = section?.querySelector<HTMLElement>('.intro__stage')
  const whisper  = section?.querySelector<HTMLElement>('.intro__line--whisper')
  const mainLine = section?.querySelector<HTMLElement>('.intro__line--main')
  const subLine  = section?.querySelector<HTMLElement>('.intro__line--sub')
  const hint     = section?.querySelector<HTMLElement>('.intro__scroll-hint')
  const catWrap  = section?.querySelector<HTMLElement>('[data-cat="intro"]')

  if (!section || !stage || !whisper || !mainLine || !subLine || !hint || !catWrap) return

  const kitten = createKitten('intro__kitten-svg')
  kitten.style.cssText = 'width:clamp(80px,15vw,140px);height:auto'
  catWrap.appendChild(kitten)

  if (prefersReducedMotion) {
    gsap.set([kitten, whisper, mainLine, subLine, hint], { opacity: 1, y: 0, scale: 1 })
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      pin: stage,
      // pinSpacing: true keeps layout intact — subsequent scenes don't overlap
    })
    return
  }

  // Initial hidden state
  gsap.set([kitten, whisper, mainLine, subLine], { opacity: 0 })
  gsap.set(kitten,  { y: 30, scale: 0.85 })
  gsap.set(whisper, { y: 20 })
  gsap.set(mainLine,{ y: 24 })
  gsap.set(subLine, { y: 18 })
  gsap.set(hint,    { opacity: 0 })

  // ── Pin ─────────────────────────────────────────────────────────────────
  // pinSpacing: true (default) ensures the 200dvh scroll space is preserved
  // so the next scene doesn't sit on top of the pinned stage.
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom top',
    pin: stage,
  })

  // ── Entrance (time-based, not scroll) ───────────────────────────────────
  // Only play if user is at the top (not refreshed mid-scroll)
  const atTop = window.scrollY < window.innerHeight * 0.1
  if (atTop) {
    gsap.timeline({ delay: 0.3 })
      .to(kitten,   { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out' })
      .to(whisper,  { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, '-=0.4')
      .to(mainLine, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, '-=0.3')
      .to(subLine,  { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, '-=0.2')
      .to(hint,     { opacity: 1, duration: 0.8, ease: 'power2.out' }, '+=0.4')
  } else {
    // Mid-scroll refresh: show content immediately
    gsap.set([kitten, whisper, mainLine, subLine, hint], { opacity: 1, y: 0, scale: 1 })
  }

  // ── Kitten idle tail sway ────────────────────────────────────────────────
  const tail = kitten.querySelector('[data-cat-part="tail"]')
  if (tail) {
    gsap.to(tail, {
      rotate: 8, duration: 2.2,
      ease: 'sine.inOut', yoyo: true, repeat: -1,
    })
  }

  // ── Scroll-exit: scrub-driven fade as user scrolls away ─────────────────
  // Starts at 55% through the section's scroll space (after intro is read)
  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: '55% top',
      end: 'bottom top',
      scrub: 0.7,
    },
  })
    .to([kitten, whisper], { opacity: 0, y: -30, stagger: 0.06, ease: 'power2.in' }, 0)
    .to(mainLine,           { opacity: 0, y: -20, ease: 'power2.in' }, 0.1)
    .to(subLine,            { opacity: 0, y: -15, ease: 'power2.in' }, 0.15)

  // Hint fades earlier — it's a UX affordance only
  gsap.to(hint, {
    opacity: 0,
    scrollTrigger: {
      trigger: section,
      start: '12% top',
      end: '25% top',
      scrub: 0.4,
    },
  })
}
