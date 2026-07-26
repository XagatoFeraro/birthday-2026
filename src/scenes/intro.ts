// ─── Scene: Intro ─────────────────────────────────────────────────────────────
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createKitten } from '../components/cat'
import { prefersReducedMotion } from '../utils/scroll'

function spawnPetals(el: HTMLElement): void {
  const colors = ['#f2c4ce','#f5c4a0','#c0aed8','#9ab89a','#f5dc80','#fde8ec']
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div')
    p.className = 'petal'
    const size = 6 + Math.random() * 9
    p.style.cssText = `
      left:${4+Math.random()*92}%;
      bottom:${Math.random()*30}%;
      width:${size}px;height:${size*1.4}px;
      background:${colors[i%colors.length]};
      transform:rotate(${Math.random()*360}deg);
      animation:petal-drift ${3.5+Math.random()*4}s ${Math.random()*6}s ease-in-out infinite;
    `
    el.appendChild(p)
  }
}

export function initIntro(): void {
  const section  = document.getElementById('scene-intro')
  const stage    = section?.querySelector<HTMLElement>('.intro__stage')
  const bg       = section?.querySelector<HTMLElement>('.intro__bg')
  const deco     = section?.querySelector<HTMLElement>('.intro__deco')
  const whisper  = section?.querySelector<HTMLElement>('.intro__whisper')
  const headline = section?.querySelector<HTMLElement>('.intro__headline')
  const sub      = section?.querySelector<HTMLElement>('.intro__sub')
  const hint     = section?.querySelector<HTMLElement>('.intro__scroll-hint')
  const catWrap  = section?.querySelector<HTMLElement>('.intro__cat-wrap')
  if (!section||!stage||!catWrap) return

  // Kitten
  const kitten = createKitten()
  kitten.style.cssText = 'width:clamp(90px,16vw,150px);height:auto;filter:drop-shadow(0 8px 24px rgba(212,100,122,0.28));'
  catWrap.appendChild(kitten)

  // Petals
  if (deco) spawnPetals(deco)

  // Pin
  ScrollTrigger.create({
    trigger: section, start: 'top top', end: 'bottom top', pin: stage,
  })

  if (prefersReducedMotion) {
    gsap.set([kitten,whisper,headline,sub,hint,bg], { opacity:1, y:0, scale:1 }); return
  }

  // Initial state
  gsap.set(bg,       { opacity:0 })
  gsap.set(kitten,   { opacity:0, y:60, scale:0.65, rotate:-8 })
  gsap.set(whisper,  { opacity:0, y:16 })
  gsap.set(headline, { opacity:0, y:36, filter:'blur(8px)' })
  gsap.set(sub,      { opacity:0, y:22 })
  gsap.set(hint,     { opacity:0 })

  // Entrance — only when user is at top
  if (window.scrollY < window.innerHeight * 0.12) {
    const tl = gsap.timeline({ delay:0.25 })
    tl.to(bg,     { opacity:1, duration:1.6, ease:'power2.out' })
      .to(kitten, { opacity:1, y:0, scale:1, rotate:0, duration:1.1, ease:'back.out(1.7)' }, '-=1.2')
      .to(whisper,{ opacity:1, y:0, duration:0.75, ease:'power2.out' }, '-=0.4')
      .to(headline,{ opacity:1, y:0, filter:'blur(0px)', duration:1.0, ease:'power3.out' }, '-=0.5')
      .to(sub,    { opacity:1, y:0, duration:0.8, ease:'power2.out' }, '-=0.4')
      .to(hint,   { opacity:1, duration:0.7 }, '+=0.5')

    // Kitten tail idle — now just bob the whole img element
    const kittenImg = kitten.querySelector('.kitten-img')
    if (kittenImg) {
      // The CSS animation handles bobbing; just ensure it's running
    }

    // Eye blink — not applicable for real photo, skip

  } else {
    gsap.set([bg,kitten,whisper,headline,sub,hint], { opacity:1, y:0, scale:1, filter:'none', rotate:0 })
  }

  // Scroll exit — last 45% of scroll space
  gsap.timeline({ scrollTrigger:{ trigger:section, start:'55% top', end:'bottom top', scrub:0.65 } })
    .to(bg,      { opacity:0, ease:'power1.in' }, 0)
    .to(kitten,  { opacity:0, y:-50, scale:0.8, ease:'power2.in' }, 0)
    .to(whisper, { opacity:0, y:-25, ease:'power2.in' }, 0.04)
    .to(headline,{ opacity:0, y:-35, filter:'blur(6px)', ease:'power2.in' }, 0.06)
    .to(sub,     { opacity:0, y:-20, ease:'power2.in' }, 0.1)

  // Hint gone immediately
  gsap.to(hint, { opacity:0, scrollTrigger:{ trigger:section, start:'6% top', end:'20% top', scrub:0.4 } })
}
