// ─── Scene: Intro ─────────────────────────────────────────────────────────────
// A mysterious blooming world. Cat appears. "Hey Betuuu..."
// 150dvh — tight and punchy. No dead space.

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createKitten } from '../components/cat'
import { prefersReducedMotion } from '../utils/scroll'

// Floating petals in the intro background
function spawnPetals(container: HTMLElement): void {
  const colors = ['#f4a7b0','#f8c8a0','#c8b8e8','#a8c8a4','#f8e070']
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div')
    p.className = 'petal'
    p.style.cssText = `
      left:${5 + Math.random()*90}%;
      bottom:${Math.random()*25}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      transform:rotate(${Math.random()*360}deg);
      animation:petal-drift ${3+Math.random()*4}s ${Math.random()*5}s ease-in-out infinite;
      width:${6+Math.random()*8}px;height:${9+Math.random()*10}px;
      border-radius:${Math.random()>0.5?'50% 50% 50% 0':'50%'};
    `
    container.appendChild(p)
  }
}

export function initIntro(): void {
  const section  = document.getElementById('scene-intro')
  const stage    = section?.querySelector<HTMLElement>('.intro__stage')
  const bg       = section?.querySelector<HTMLElement>('.intro__bg')
  const decoEl   = section?.querySelector<HTMLElement>('.intro__deco')
  const whisper  = section?.querySelector<HTMLElement>('.intro__whisper')
  const headline = section?.querySelector<HTMLElement>('.intro__headline')
  const sub      = section?.querySelector<HTMLElement>('.intro__sub')
  const hint     = section?.querySelector<HTMLElement>('.intro__scroll-hint')
  const catWrap  = section?.querySelector<HTMLElement>('.intro__cat-wrap')

  if (!section||!stage||!catWrap) return

  // Kitten
  const kitten = createKitten()
  kitten.style.cssText = 'width:clamp(90px,16vw,150px);height:auto;filter:drop-shadow(0 8px 20px rgba(232,120,138,0.3))'
  catWrap.appendChild(kitten)

  // Petals
  if (decoEl) spawnPetals(decoEl)

  // Pin (tight — 150dvh)
  ScrollTrigger.create({
    trigger: section, start: 'top top', end: 'bottom top', pin: stage,
  })

  if (prefersReducedMotion) {
    gsap.set([kitten,whisper,headline,sub,hint,bg], { opacity:1, y:0, scale:1 })
    return
  }

  // Initial states
  gsap.set(bg,      { opacity: 0 })
  gsap.set(kitten,  { opacity: 0, y: 50, scale: 0.7 })
  gsap.set(whisper, { opacity: 0, y: 15 })
  gsap.set(headline,{ opacity: 0, y: 30 })
  gsap.set(sub,     { opacity: 0, y: 20 })
  gsap.set(hint,    { opacity: 0 })

  // Entrance timeline
  const atTop = window.scrollY < window.innerHeight * 0.15
  if (atTop) {
    gsap.timeline({ delay: 0.2 })
      .to(bg,       { opacity: 1, duration: 1.5, ease: 'power2.out' })
      .to(kitten,   { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'back.out(1.4)' }, '-=1.0')
      .to(whisper,  { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
      .to(headline, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, '-=0.4')
      .to(sub,      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3')
      .to(hint,     { opacity: 1, duration: 0.7 }, '+=0.5')
  } else {
    gsap.set([bg,kitten,whisper,headline,sub,hint], { opacity:1, y:0, scale:1 })
  }

  // Tail idle
  const tail = kitten.querySelector('[data-cat-part="tail"]')
  if (tail) gsap.to(tail, { rotate:10, duration:2, ease:'sine.inOut', yoyo:true, repeat:-1 })

  // Blinking
  const eyes = kitten.querySelectorAll('[data-cat-part="face"] ellipse')
  if (eyes.length) {
    gsap.to(eyes, {
      scaleY:0.05, duration:0.08, ease:'power2.in',
      yoyo:true, repeat:1, repeatDelay:3,
      transformOrigin:'center center',
      stagger:0, delay:2,
    })
    setInterval(() => {
      gsap.to(eyes, {
        scaleY:0.05, duration:0.08, ease:'power2.in',
        yoyo:true, repeat:1,
        transformOrigin:'center center', stagger:0,
      })
    }, 4000)
  }

  // Scroll exit — last 45% of 150dvh
  gsap.timeline({ scrollTrigger: { trigger:section, start:'55% top', end:'bottom top', scrub:0.7 } })
    .to([kitten,whisper], { opacity:0, y:-40, stagger:0.05, ease:'power2.in' }, 0)
    .to(headline,          { opacity:0, y:-25, ease:'power2.in' }, 0.05)
    .to(sub,               { opacity:0, y:-15, ease:'power2.in' }, 0.1)
    .to(bg,                { opacity:0, ease:'power1.in' }, 0)

  // Hint fades immediately on first scroll
  gsap.to(hint, { opacity:0, scrollTrigger:{ trigger:section, start:'5% top', end:'18% top', scrub:0.4 } })
}
