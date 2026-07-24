// ─── Scene: Who Is Betuuu ────────────────────────────────────────────────────
// "Tanisha." → "But I call her something else." → "Betuuu." 
// 250dvh — tighter than before. Each beat feels earned.

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../utils/scroll'

export function initMeet(): void {
  const section  = document.getElementById('scene-who')
  const stage    = section?.querySelector<HTMLElement>('.who__stage')
  const nameEl   = section?.querySelector<HTMLElement>('.who__word--name')
  const bridgeEl = section?.querySelector<HTMLElement>('.who__word--bridge')
  const nickEl   = section?.querySelector<HTMLElement>('.who__word--nick')

  if (!section||!stage||!nameEl||!bridgeEl||!nickEl) return

  ScrollTrigger.create({ trigger:section, start:'top top', end:'bottom top', pin:stage })

  if (prefersReducedMotion) {
    gsap.set([nameEl,bridgeEl,nickEl], { opacity:1, y:0, scale:1, filter:'none' })
    return
  }

  gsap.set(nameEl,   { opacity:0, y:60, scale:0.9 })
  gsap.set(bridgeEl, { opacity:0, y:30 })
  gsap.set(nickEl,   { opacity:0, y:80, scale:0.85, filter:'blur(16px)' })

  const S = 0.8 // uniform scrub

  // Beat 1 (0–30%): Name rises
  gsap.to(nameEl, { opacity:1, y:0, scale:1, ease:'power3.out',
    scrollTrigger:{ trigger:section, start:'top top', end:'30% top', scrub:S } })

  // Beat 2 (20–48%): name dims, bridge appears
  gsap.to(nameEl, { opacity:0.25, scale:0.86, y:-30, ease:'power1.inOut',
    scrollTrigger:{ trigger:section, start:'20% top', end:'48% top', scrub:S } })
  gsap.to(bridgeEl, { opacity:1, y:0, ease:'power2.out',
    scrollTrigger:{ trigger:section, start:'26% top', end:'50% top', scrub:S } })

  // Beat 3 (44–76%): BETUUU explodes in
  gsap.to([nameEl,bridgeEl], { opacity:0, y:-40, ease:'power2.in',
    scrollTrigger:{ trigger:section, start:'44% top', end:'66% top', scrub:S } })
  gsap.to(nickEl, { opacity:1, y:0, scale:1, filter:'blur(0px)', ease:'power3.out',
    scrollTrigger:{ trigger:section, start:'52% top', end:'76% top', scrub:S } })

  // Beat 4 (78–98%): Betuuu exits upward
  gsap.to(nickEl, { opacity:0, y:-70, scale:0.93, ease:'power2.in',
    scrollTrigger:{ trigger:section, start:'78% top', end:'98% top', scrub:S } })
}
