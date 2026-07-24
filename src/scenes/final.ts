// ─── Scene: Final ─────────────────────────────────────────────────────────────
// The quiet emotional ending. Personal message. Sleeping cat.

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { birthdayMessage } from '../data/memories'
import { prefersReducedMotion } from '../utils/scroll'

export function initFinal(): void {
  const section  = document.getElementById('scene-final')
  const envelope = section?.querySelector<HTMLElement>('.final__envelope')
  const message  = section?.querySelector<HTMLElement>('.final__message')
  const signoff  = section?.querySelector<HTMLElement>('.final__signoff')
  const catSleep = section?.querySelector<HTMLElement>('.final__cat-sleep')

  if (!section||!message||!signoff) return

  // Inject real message
  message.textContent = birthdayMessage

  if (prefersReducedMotion) {
    gsap.set([envelope,message,signoff,catSleep], { opacity:1, y:0 })
    return
  }

  gsap.set([envelope,message,signoff,catSleep], { opacity:0 })
  gsap.set(message,  { y:40 })
  gsap.set(signoff,  { y:20 })
  gsap.set(catSleep, { y:15, scale:0.8 })

  ScrollTrigger.create({
    trigger: section, start: 'top 75%', once: true,
    onEnter: () => {
      gsap.timeline({ delay:0.1 })
        .to(envelope,  { opacity:1, duration:0.8, ease:'power2.out' })
        .to(message,   { opacity:1, y:0, duration:1.4, ease:'power2.out' }, '-=0.2')
        .to(signoff,   { opacity:1, y:0, duration:1.0, ease:'power2.out' }, '-=0.4')
        .to(catSleep,  { opacity:1, y:0, scale:1, duration:0.8, ease:'back.out(1.4)' }, '-=0.3')
    },
  })

  // Sleeping cat gentle bob
  if (catSleep) {
    gsap.to(catSleep, {
      y:-6, duration:2.5, ease:'sine.inOut', yoyo:true, repeat:-1, delay:2,
    })
  }
}
