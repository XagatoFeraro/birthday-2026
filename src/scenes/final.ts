// ─── Scene: Final ────────────────────────────────────────────────────────────
// The quiet ending. Personal message. Kitten curls up. Story complete.

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createKitten } from '../components/cat'
import { birthdayMessage } from '../data/memories'
import { prefersReducedMotion } from '../utils/scroll'

export function initFinal(): void {
  const section  = document.getElementById('scene-final')
  const content  = section?.querySelector<HTMLElement>('.final__content')
  const message  = section?.querySelector<HTMLElement>('.final__message')
  const signOff  = section?.querySelector<HTMLElement>('.final__sign-off')
  const catWrap  = section?.querySelector<HTMLElement>('[data-cat="final"]')

  if (!section || !content || !message || !signOff) return

  // Inject real message text
  message.textContent = birthdayMessage

  // Inject kitten in curled/sitting state
  if (catWrap) {
    const kitten = createKitten('final__kitten-svg')
    // Scale down slightly — the kitten should feel cosy, not dominant
    kitten.style.cssText = 'width:80px;height:auto'
    gsap.set(kitten, { opacity: 0, y: 20, scale: 0.85 })
    catWrap.appendChild(kitten)

    if (!prefersReducedMotion) {
      // Gentle breathing idle
      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          const body = kitten.querySelector('[data-cat-part="body"]')
          if (body) {
            gsap.to(body, {
              scaleY: 0.96,
              scaleX: 1.02,
              duration: 2.5,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: -1,
              transformOrigin: 'center bottom',
            })
          }
        },
      })
    }
  }

  if (prefersReducedMotion) {
    gsap.set([message, signOff], { opacity: 1, y: 0 })
    if (catWrap) gsap.set(catWrap.querySelector('svg'), { opacity: 1, y: 0, scale: 1 })
    return
  }

  // ── Initial states ───────────────────────────────────────────────────────
  gsap.set(message, { opacity: 0, y: 40 })
  gsap.set(signOff, { opacity: 0, y: 20 })

  // ── Scroll-driven reveal — IntersectionObserver is fine here (final scene
  //    doesn't need to reverse; it's the end of the story) ──────────────────
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const tl = gsap.timeline({ delay: 0.15 })

          tl.to(message, {
            opacity: 1, y: 0,
            duration: 1.4,
            ease: 'power2.out',
          })
          .to(signOff, {
            opacity: 1, y: 0,
            duration: 1.0,
            ease: 'power2.out',
          }, '-=0.4')

          const kittenSvg = catWrap?.querySelector('svg')
          if (kittenSvg) {
            tl.to(kittenSvg, {
              opacity: 1, y: 0, scale: 1,
              duration: 1.0,
              ease: 'power2.out',
            }, '-=0.3')
          }

          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 }
  )

  observer.observe(section)
}
