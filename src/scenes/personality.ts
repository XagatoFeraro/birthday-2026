// ─── Scene: Her Personality — The Betuuu Modes ────────────────────────────────
// Meme cat grid revealing different sides of Tanisha's personality.
// Uses IntersectionObserver + staggered GSAP reveals.

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MEME_CATS, createMemeCatCard } from '../components/memecats'
import { prefersReducedMotion } from '../utils/scroll'

export function initPersonality(): void {
  const section = document.getElementById('scene-personality')
  if (!section) return

  const grid = section.querySelector<HTMLElement>('.meme-grid')
  const intro = section.querySelector<HTMLElement>('.personality__intro')
  if (!grid) return

  // Inject meme cat cards
  MEME_CATS.forEach(cat => {
    grid.appendChild(createMemeCatCard(cat))
  })

  const cards = Array.from(grid.querySelectorAll<HTMLElement>('.meme-card'))

  if (prefersReducedMotion) {
    cards.forEach(c => gsap.set(c, { opacity:1 }))
    if (intro) gsap.set(intro, { opacity:1, y:0 })
    return
  }

  // Intro text reveal
  if (intro) {
    gsap.set(intro, { opacity:0, y:30 })
    ScrollTrigger.create({
      trigger: intro,
      start: 'top 80%',
      once: true,
      onEnter: () => gsap.to(intro, { opacity:1, y:0, duration:0.8, ease:'power2.out' }),
    })
  }

  // Staggered card reveals on scroll into view
  cards.forEach((card, i) => {
    gsap.set(card, { opacity:0, y:40, rotate: MEME_CATS[i]?.tilt ?? 0 })
    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(card, {
          opacity:1, y:0,
          duration: 0.55,
          delay: (i % 3) * 0.08, // row-stagger
          ease: 'back.out(1.3)',
        })
      },
    })
  })

  // Easter egg: clicking any card makes others react
  cards.forEach((card, i) => {
    card.addEventListener('click', () => {
      cards.forEach((other, j) => {
        if (j !== i) {
          gsap.to(other, { scale:0.92, duration:0.15, yoyo:true, repeat:1 })
        }
      })
    })
  })
}
