// ─── Scene: Who Is Betuuu ─────────────────────────────────────────────────────
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../utils/scroll'

export function initMeet(): void {
  const section = document.getElementById('scene-who')
  const stage   = section?.querySelector<HTMLElement>('.who__stage')
  const nameEl  = document.getElementById('w-name')
  const nickEl  = document.getElementById('w-nick')
  if (!section||!stage||!nameEl||!nickEl) return

  ScrollTrigger.create({ trigger:section, start:'top top', end:'bottom top', pin:stage })

  if (prefersReducedMotion) {
    gsap.set([nameEl,nickEl], { opacity:1, y:0, scale:1, filter:'none' }); return
  }

  gsap.set(nameEl, { opacity:0, y:60, scale:0.88 })
  gsap.set(nickEl, { opacity:0, y:80, scale:0.82, filter:'blur(20px)' })

  const S = 0.85

  // "Tanisha." rises
  gsap.to(nameEl, {
    opacity:1, y:0, scale:1, ease:'power3.out',
    scrollTrigger:{ trigger:section, start:'top top', end:'30% top', scrub:S }
  })

  // Name dims out as nick approaches
  gsap.to(nameEl, {
    opacity:0.12, scale:0.8, y:-50, ease:'power2.in',
    scrollTrigger:{ trigger:section, start:'32% top', end:'58% top', scrub:S }
  })

  // "Betuuu." erupts with blur dissolve
  gsap.to(nickEl, {
    opacity:1, y:0, scale:1, filter:'blur(0px)', ease:'power3.out',
    scrollTrigger:{ trigger:section, start:'54% top', end:'80% top', scrub:S }
  })

  // Exit
  gsap.to(nickEl, {
    opacity:0, y:-70, scale:0.9, ease:'power2.in',
    scrollTrigger:{ trigger:section, start:'82% top', end:'98% top', scrub:S }
  })
}
