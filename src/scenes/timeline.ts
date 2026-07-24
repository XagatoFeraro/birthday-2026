// ─── Scene: Memory Timeline ───────────────────────────────────────────────────
// Desktop: scrubbed horizontal camera through cinematic memory scenes.
// Mobile: vertical full-screen reveal sequence.
// Height = PER_MEMORY_VH × count. Content-driven.

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { memories, type Memory } from '../data/memories'
import { createImage, createVideo, observeVideo } from '../components/media'
import { prefersReducedMotion } from '../utils/scroll'

const PER_MEMORY_VH = 110
const BUFFER_VH     = 40

export function initTimeline(): void {
  const section = document.getElementById('scene-timeline')
  const stage   = section?.querySelector<HTMLElement>('.timeline__stage')
  const track   = document.getElementById('timeline-track')
  if (!section||!stage||!track) return

  const totalVh = PER_MEMORY_VH * memories.length + BUFFER_VH
  section.style.height = `${totalVh}dvh`

  buildDOM(track)

  if (prefersReducedMotion) {
    track.classList.add('timeline__track--vertical')
    stage.style.cssText = 'position:relative;height:auto;overflow:visible'
    track.querySelectorAll<HTMLElement>('.mem-text,.mem-note-paper,.mem-polaroid-wrap')
      .forEach(el => gsap.set(el, { opacity:1, y:0 }))
    return
  }

  gsap.matchMedia().add(
    { desktop:'(min-width:1024px) and (pointer:fine)', narrow:'(max-width:1023px),(pointer:coarse)' },
    (ctx) => {
      const { desktop } = ctx.conditions as { desktop:boolean }
      desktop ? initHorizontal(section, stage!, track) : initVertical(section, stage!, track)
      animateContent(section, track, desktop)
      return () => {
        ScrollTrigger.getAll().filter(st => String(st.vars.id||'').startsWith('tl')).forEach(st => st.kill())
        gsap.set(track, { x:0 })
      }
    }
  )
}

function buildDOM(track: HTMLElement): void {
  track.innerHTML = ''
  memories.forEach((m, i) => track.appendChild(buildScene(m, i)))
}

function buildScene(m: Memory, i: number): HTMLElement {
  const el = document.createElement('article')
  el.className = `memory memory--${m.layout}`
  el.id = `memory-${m.id}`
  el.dataset.index = String(i)
  if (m.accent) { el.style.background = m.accent; el.style.setProperty('--card-bg', m.accent) }

  const date = m.date ? `<p class="scene-label">${m.date}</p>` : ''
  const loc  = m.location ? `<p class="scene-label" style="margin-top:var(--sp-xs)">📍 ${m.location}</p>` : ''

  switch (m.layout) {
    case 'full':
      el.innerHTML = `<div class="mem-bg"></div>
        <div class="mem-text">${date}<h3 class="scene-title">${m.title}</h3>
        <p class="scene-body">${m.description}</p>${loc}</div>`
      injectImg(el.querySelector('.mem-bg')!, m)
      break
    case 'float':
      el.innerHTML = `<div class="mem-photo"></div>
        <div class="mem-text">${date}<h3 class="scene-title">${m.title}</h3>
        <p class="scene-body">${m.description}</p>${loc}</div>`
      injectImg(el.querySelector('.mem-photo')!, m)
      break
    case 'polaroid':
      el.innerHTML = `
        <div class="mem-polaroid-wrap" style="--pol-tilt:${i%2===0?'-3deg':'2deg'}">
          <div class="pol-img"></div>
          <p class="mem-polaroid-caption">${m.title}</p>
        </div>
        <div class="mem-text" style="text-align:center;margin-top:var(--sp-md)">
          ${date}<p class="scene-body">${m.description}</p>
        </div>`
      if (m.image) {
        const img = createImage({ src:m.image, alt:m.title })
        img.style.cssText = 'width:100%;aspect-ratio:1;object-fit:cover;display:block'
        el.querySelector('.pol-img')?.appendChild(img)
      }
      break
    case 'note':
      el.innerHTML = `<div class="mem-note-paper">
        <h3 class="scene-title">${m.title}</h3>${date}
        <p class="scene-body">${m.description}</p>${loc}
        </div>`
      break
    case 'video':
      el.innerHTML = `
        <div class="mem-video-wrap">
          <div class="video-slot"></div>
          <button class="mem-play-btn" aria-label="Play video">
            <div class="mem-play-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="var(--ink)" aria-hidden="true"><polygon points="5,3 19,12 5,21"/></svg></div>
          </button>
        </div>
        <div class="mem-text" style="text-align:center">
          ${date}<h3 class="scene-title">${m.title}</h3>
          <p class="scene-body">${m.description}</p>
        </div>`
      injectVideo(el, m)
      break
    default:
      el.innerHTML = `<div class="mem-text">${date}<h3 class="scene-title">${m.title}</h3><p class="scene-body">${m.description}</p></div>`
  }
  return el
}

function injectImg(container: HTMLElement, m: Memory): void {
  if (!m.image) return
  const img = createImage({ src:m.image, alt:m.title })
  img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block'
  container.appendChild(img)
}

function injectVideo(scene: HTMLElement, m: Memory): void {
  if (!m.video) return
  const slot = scene.querySelector<HTMLElement>('.video-slot')!
  const vid  = createVideo({ src:m.video, poster:m.image })
  vid.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block'
  slot.appendChild(vid); observeVideo(vid)
  const btn = scene.querySelector<HTMLButtonElement>('.mem-play-btn')
  if (btn) btn.addEventListener('click', () => {
    if (vid.paused) {
      vid.muted = false; vid.play().catch(() => { vid.muted=true; vid.play() })
      btn.style.opacity='0'
    } else { vid.pause(); btn.style.opacity='1' }
  })
}

function initHorizontal(section: HTMLElement, stage: HTMLElement, track: HTMLElement): void {
  const count = track.querySelectorAll('.memory').length
  if (!count) return
  const totalX = (count-1) * window.innerWidth
  gsap.timeline({
    scrollTrigger: {
      id:'tl-horizontal', trigger:section, start:'top top', end:'bottom top',
      pin:stage, scrub:1.2, invalidateOnRefresh:true,
    },
  }).to(track, { x:-totalX, ease:'none', force3D:true })
}

function initVertical(section: HTMLElement, stage: HTMLElement, track: HTMLElement): void {
  stage.style.position = 'relative'
  stage.style.height   = 'auto'
  stage.style.overflow = 'visible'
  track.classList.add('timeline__track--vertical')
  section.style.height = 'auto'
}

function animateContent(section: HTMLElement, track: HTMLElement, isH: boolean): void {
  const scenes = Array.from(track.querySelectorAll<HTMLElement>('.memory'))
  const count  = scenes.length; if (!count) return

  scenes.forEach((scene, i) => {
    const textEl   = scene.querySelector<HTMLElement>('.mem-text')
    const polaroid = scene.querySelector<HTMLElement>('.mem-polaroid-wrap')
    const note     = scene.querySelector<HTMLElement>('.mem-note-paper')
    const bgEl     = scene.querySelector<HTMLElement>('.mem-bg')

    if (isH) {
      const frac = 1/count
      const s = i*frac
      const p = (f:number) => `${(f*100).toFixed(1)}% top`

      if (textEl) {
        gsap.set(textEl, { opacity:0, y:32 })
        gsap.to(textEl, { opacity:1, y:0, ease:'power2.out',
          scrollTrigger:{ id:`tl-ti${i}`, trigger:section, start:p(s+frac*.05), end:p(s+frac*.25), scrub:.7 } })
        if (i < count-1)
          gsap.to(textEl, { opacity:0, y:-20, ease:'power1.in',
            scrollTrigger:{ id:`tl-to${i}`, trigger:section, start:p(s+frac*.78), end:p(s+frac*.97), scrub:.7 } })
      }
      if (polaroid) {
        gsap.set(polaroid, { rotate:-8, scale:.84, opacity:0 })
        gsap.to(polaroid,  { rotate:Number(polaroid.style.getPropertyValue('--pol-tilt')||'-3'), scale:1, opacity:1, ease:'power2.out',
          scrollTrigger:{ id:`tl-p${i}`, trigger:section, start:p(s+frac*.05), end:p(s+frac*.28), scrub:.8 } })
      }
      if (note) {
        gsap.set(note, { rotate:2.5, scale:.9, opacity:0 })
        gsap.to(note,  { rotate:.8, scale:1, opacity:1, ease:'power2.out',
          scrollTrigger:{ id:`tl-n${i}`, trigger:section, start:p(s+frac*.05), end:p(s+frac*.28), scrub:.8 } })
      }
      if (bgEl && scene.classList.contains('memory--full')) {
        gsap.set(bgEl, { scale:1.1 })
        gsap.to(bgEl,  { scale:1, ease:'none',
          scrollTrigger:{ id:`tl-px${i}`, trigger:section, start:p(s), end:p(s+frac*.6), scrub:1.5 } })
      }
    } else {
      // Vertical
      if (textEl)   gsap.set(textEl,   { opacity:0, y:32 })
      if (polaroid) gsap.set(polaroid, { rotate:-8, scale:.84, opacity:0 })
      if (note)     gsap.set(note,     { rotate:2.5, scale:.9, opacity:0 })

      const obs = new IntersectionObserver(([entry]) => {
        const dir = entry.boundingClientRect.top > 0 ? 1 : -1
        if (entry.isIntersecting) {
          if (textEl)   gsap.to(textEl,   { opacity:1, y:0, duration:.65, ease:'power2.out' })
          if (polaroid) gsap.to(polaroid, { rotate:-3, scale:1, opacity:1, duration:.7, ease:'power2.out' })
          if (note)     gsap.to(note,     { rotate:.8, scale:1, opacity:1, duration:.7, ease:'power2.out' })
        } else {
          if (textEl)   gsap.to(textEl,   { opacity:0, y:22*dir, duration:.4, ease:'power1.in' })
          if (polaroid) gsap.to(polaroid, { rotate:-8, scale:.84, opacity:0, duration:.35, ease:'power1.in' })
          if (note)     gsap.to(note,     { rotate:2.5, scale:.9, opacity:0, duration:.35, ease:'power1.in' })
        }
      }, { threshold:.2, rootMargin:'0px 0px -10% 0px' })
      obs.observe(scene)
      window.addEventListener('beforeunload', () => obs.disconnect(), { once:true })
    }
  })
}
