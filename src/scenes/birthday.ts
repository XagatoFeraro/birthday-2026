// ─── Scene: Birthday Climax ───────────────────────────────────────────────────
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createPartyCats } from '../components/memecats'
import { prefersReducedMotion } from '../utils/scroll'

function spawnConfetti(container: HTMLElement): void {
  const colors = ['#f2c4ce','#f5c4a0','#c0aed8','#9ab89a','#f5dc80','#f08060','#88ccff','#fde8ec']
  for (let i = 0; i < 70; i++) {
    const p = document.createElement('div')
    p.className = 'confetti-piece'
    const size = 6 + Math.random() * 9
    p.style.cssText = `
      left:${Math.random()*100}%;
      top:${-10 - Math.random()*20}px;
      width:${size}px;
      height:${size * (Math.random()>0.4 ? 2.5 : 1)}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      border-radius:${Math.random()>0.5?'50%':'3px'};
      animation:confetti-fall ${2.2+Math.random()*3}s ${Math.random()*2.5}s ease-in forwards;
      opacity:1;
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

  // Party cats
  if (catRow) {
    const cats = createPartyCats()
    while (cats.firstChild) catRow.appendChild(cats.firstChild)
  }

  ScrollTrigger.create({
    id:'birthday-pin', trigger:section, start:'top top', end:'bottom top',
    pin:stage, anticipatePin:1, invalidateOnRefresh:true,
  })

  if (prefersReducedMotion) {
    gsap.set([dateEl,greeting,nameEl,catRow], { opacity:1, y:0, scale:1, filter:'none' })
    gsap.set(bloom, { opacity:0.5, scale:1 }); return
  }

  gsap.set(bloom,   { opacity:0, scale:0.08 })
  gsap.set(dateEl,  { opacity:0, y:55, letterSpacing:'0.6em' })
  gsap.set(greeting,{ opacity:0, y:70, scale:0.84 })
  gsap.set(nameEl,  { opacity:0, y:90, scale:0.78, filter:'blur(12px)' })
  gsap.set(catRow,  { opacity:0, y:35, scale:0.9 })

  const S = 0.95

  // Beat 1: bloom seeds, date rises with letter-spacing animation
  gsap.timeline({ scrollTrigger:{ trigger:section, start:'top top', end:'24% top', scrub:S } })
    .to(bloom,  { opacity:0.55, scale:0.55, ease:'power2.out' }, 0)
    .to(dateEl, { opacity:1, y:0, letterSpacing:'0.35em', ease:'power3.out' }, 0.2)

  // Beat 2: "Happy Birthday," rises, bloom fills
  gsap.timeline({ scrollTrigger:{ trigger:section, start:'20% top', end:'54% top', scrub:S } })
    .to(bloom,    { opacity:0.82, scale:0.88, ease:'power2.out' }, 0)
    .to(greeting, { opacity:1, y:0, scale:1, ease:'power3.out' }, 0.15)

  // Beat 3: BETUUU. Full bloom explosion + blur dissolve
  gsap.timeline({ scrollTrigger:{ trigger:section, start:'48% top', end:'78% top', scrub:S } })
    .to(bloom,  { opacity:1, scale:1.35, ease:'expo.out' }, 0)
    .to(nameEl, { opacity:1, y:0, scale:1, filter:'blur(0px)', ease:'power3.out' }, 0.18)

  // Beat 4: party cats bounce in
  gsap.timeline({ scrollTrigger:{ trigger:section, start:'72% top', end:'86% top', scrub:S } })
    .to(catRow, { opacity:1, y:0, scale:1, ease:'back.out(2)' })

  // Confetti fires once
  let fired = false
  ScrollTrigger.create({ trigger:section, start:'76% top',
    onEnter:()  => { if (!fired&&confetti) { fired=true; spawnConfetti(confetti) } },
    onLeaveBack:()=> { fired=false; if (confetti) confetti.innerHTML='' },
  })

  // Exit
  gsap.timeline({ scrollTrigger:{ trigger:section, start:'86% top', end:'100% top', scrub:0.7 } })
    .to([dateEl,greeting,nameEl,catRow], { opacity:0, y:-45, stagger:0.04, ease:'power1.in' }, 0)
    .to(bloom, { opacity:0, scale:1.7, ease:'power2.in' }, 0)
}
