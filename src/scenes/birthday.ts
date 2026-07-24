// ─── Scene: Birthday ─────────────────────────────────────────────────────────
// The earned emotional climax. 280dvh. Bloom, cats, confetti.

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createPartyCats } from '../components/memecats'
import { prefersReducedMotion } from '../utils/scroll'

function spawnConfetti(container: HTMLElement): void {
  const colors = ['#f4a7b0','#f8c8a0','#c8b8e8','#a8c8a4','#f8e070','#f08060','#88ccff']
  const shapes = ['4px','50%','2px']
  for (let i = 0; i < 60; i++) {
    const p = document.createElement('div')
    p.className = 'confetti-piece'
    const color = colors[Math.floor(Math.random()*colors.length)]
    const size  = 6 + Math.random()*8
    p.style.cssText = `
      left:${Math.random()*100}%;
      top:${-20 + Math.random()*30}px;
      width:${size}px; height:${size * (Math.random()>0.5?2.5:1)}px;
      background:${color};
      border-radius:${shapes[Math.floor(Math.random()*shapes.length)]};
      animation:confetti-fall ${2+Math.random()*3}s ${Math.random()*2}s ease-in forwards;
    `
    container.appendChild(p)
  }
}

export function initBirthday(): void {
  const section  = document.getElementById('scene-birthday')
  const stage    = section?.querySelector<HTMLElement>('.birthday__stage')
  const bloom    = section?.querySelector<HTMLElement>('.birthday__bloom')
  const confetti = section?.querySelector<HTMLElement>('.birthday__confetti')
  const dateEl   = section?.querySelector<HTMLElement>('.birthday__date')
  const greeting = section?.querySelector<HTMLElement>('.birthday__greeting')
  const nameEl   = section?.querySelector<HTMLElement>('.birthday__name')
  const catRow   = section?.querySelector<HTMLElement>('.birthday__cat-row')

  if (!section||!stage||!bloom||!dateEl||!greeting||!nameEl) return

  // Inject party cats
  if (catRow) {
    const cats = createPartyCats()
    Array.from(cats.children).forEach(c => catRow.appendChild(c))
  }

  ScrollTrigger.create({
    id: 'birthday-pin',
    trigger: section, start: 'top top', end: 'bottom top',
    pin: stage, anticipatePin: 1, invalidateOnRefresh: true,
  })

  if (prefersReducedMotion) {
    gsap.set([dateEl,greeting,nameEl,bloom,catRow], { opacity:1, y:0, scale:1, filter:'none' })
    gsap.set(bloom, { opacity:0.5, scale:1 })
    return
  }

  // Initial states
  gsap.set(bloom,   { opacity:0, scale:0.1 })
  gsap.set(dateEl,  { opacity:0, y:50, scale:0.88 })
  gsap.set(greeting,{ opacity:0, y:70, scale:0.86 })
  gsap.set(nameEl,  { opacity:0, y:90, scale:0.82, filter:'blur(10px)' })
  gsap.set(catRow,  { opacity:0, y:30 })

  const SCRUB = 0.9

  // Beat 1 (0–22%): bloom pulses in, date floats up
  gsap.timeline({ scrollTrigger:{ trigger:section, start:'top top', end:'22% top', scrub:SCRUB } })
    .to(bloom,  { opacity:0.6, scale:0.6, ease:'power2.out' }, 0)
    .to(dateEl, { opacity:1, y:0, scale:1, ease:'power3.out' }, 0.3)

  // Beat 2 (18–52%): "Happy Birthday," rises, bloom expands
  gsap.timeline({ scrollTrigger:{ trigger:section, start:'18% top', end:'52% top', scrub:SCRUB } })
    .to(bloom,    { opacity:0.8, scale:0.85, ease:'power2.out' }, 0)
    .to(greeting, { opacity:1, y:0, scale:1, ease:'power3.out' }, 0.2)

  // Beat 3 (46–78%): BETUUU — full bloom explosion
  gsap.timeline({ scrollTrigger:{ trigger:section, start:'46% top', end:'78% top', scrub:SCRUB } })
    .to(bloom,  { opacity:1, scale:1.3, ease:'power2.out' }, 0)
    .to(nameEl, { opacity:1, y:0, scale:1, filter:'blur(0px)', ease:'power3.out' }, 0.2)

  // Beat 4 (70–86%): party cats bounce in
  gsap.timeline({ scrollTrigger:{ trigger:section, start:'70% top', end:'86% top', scrub:SCRUB } })
    .to(catRow, { opacity:1, y:0, ease:'back.out(1.5)' })

  // Confetti fires once when birthday name is fully revealed
  let confettiFired = false
  ScrollTrigger.create({
    trigger: section, start: '74% top',
    onEnter: () => {
      if (!confettiFired && confetti) {
        confettiFired = true
        spawnConfetti(confetti)
      }
    },
    onLeaveBack: () => { confettiFired = false; if (confetti) confetti.innerHTML = '' },
  })

  // Exit (84–100%)
  gsap.timeline({ scrollTrigger:{ trigger:section, start:'84% top', end:'100% top', scrub:SCRUB } })
    .to([dateEl,greeting,nameEl,catRow], { opacity:0, y:-40, stagger:0.04, ease:'power1.in' }, 0)
    .to(bloom, { opacity:0, scale:1.6, ease:'power2.in' }, 0)
}
