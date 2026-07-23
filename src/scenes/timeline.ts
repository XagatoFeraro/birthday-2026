// ─── Scene: Memory Timeline ───────────────────────────────────────────────────
// Desktop: horizontal pinned camera — scroll drives x-translation directly.
// Mobile/tablet: vertical full-screen memory sequence with depth reveals.
// Height = PER_MEMORY_VH × count. Fully content-driven.

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { memories, type Memory } from '../data/memories'
import { createImage, createVideo, observeVideo } from '../components/media'
import { prefersReducedMotion } from '../utils/scroll'

const PER_MEMORY_VH = 120  // scroll space per memory scene
const BUFFER_VH     = 60   // entry + exit buffer

export function initTimeline(): void {
  const section = document.getElementById('scene-timeline')
  const stage   = section?.querySelector<HTMLElement>('.timeline__stage')
  const track   = document.getElementById('timeline-track')
  if (!section || !stage || !track) return

  // Dynamic height — adapts to number of memories
  const totalVh = PER_MEMORY_VH * memories.length + BUFFER_VH
  section.style.height = `${totalVh}dvh`

  // Build DOM first, then wire animations
  buildTimelineDOM(track)

  if (prefersReducedMotion) {
    track.classList.add('timeline__track--vertical')
    stage.style.cssText = 'position:relative;height:auto;overflow:visible'
    track.querySelectorAll<HTMLElement>('.scene__text,.memory__overlay,.memory__note-paper,.memory__polaroid-frame')
      .forEach(el => gsap.set(el, { opacity: 1, y: 0, scale: 1 }))
    return
  }

  gsap.matchMedia().add(
    {
      desktop: '(min-width: 1024px) and (pointer: fine)',
      narrow:  '(max-width: 1023px), (pointer: coarse)',
    },
    (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean }

      if (desktop) {
        initHorizontal(section, stage!, track)
      } else {
        initVertical(section, stage!, track)
      }

      // Per-scene content animations — shared logic, param-driven
      animateSceneContent(section, track, desktop)

      // Cleanup when matchMedia context changes (resize / rotation)
      return () => {
        ScrollTrigger.getAll()
          .filter(st => st.vars.id?.toString().startsWith('timeline'))
          .forEach(st => st.kill())
        gsap.set(track, { x: 0 })
      }
    }
  )
}

// ── DOM builder ──────────────────────────────────────────────────────────────
function buildTimelineDOM(track: HTMLElement): void {
  track.innerHTML = ''
  memories.forEach((memory, i) => {
    const scene = buildMemoryScene(memory, i)
    track.appendChild(scene)
  })
}

function buildMemoryScene(memory: Memory, i: number): HTMLElement {
  const scene = document.createElement('article')
  scene.className = `memory memory--${memory.layout}`
  scene.id = `memory-${memory.id}`
  scene.dataset.index = String(i)
  if (memory.accent) {
    scene.style.background = memory.accent
    scene.style.setProperty('--scene-accent', memory.accent)
  }

  switch (memory.layout) {
    case 'full':
      scene.innerHTML = `
        <div class="memory__media"></div>
        <div class="memory__overlay scene__text">
          ${dateHtml(memory)}<h3 class="scene__title">${memory.title}</h3>
          <p class="scene__description">${memory.description}</p>${locHtml(memory)}
        </div>`
      injectImg(scene.querySelector('.memory__media')!, memory)
      break

    case 'float':
      scene.innerHTML = `
        <div class="memory__media"></div>
        <div class="scene__text float-text">
          ${dateHtml(memory)}<h3 class="scene__title">${memory.title}</h3>
          <p class="scene__description">${memory.description}</p>${locHtml(memory)}
        </div>`
      injectImg(scene.querySelector('.memory__media')!, memory)
      break

    case 'polaroid':
      scene.innerHTML = `
        <div class="memory__polaroid-frame" data-anim="polaroid">
          <div class="polaroid-img"></div>
          <p class="memory__polaroid-caption">${memory.title}</p>
        </div>
        <div class="scene__text polaroid-meta">
          ${dateHtml(memory)}<p class="scene__description">${memory.description}</p>
        </div>`
      if (memory.image) injectImg(scene.querySelector('.polaroid-img')!, memory, 'width:100%;aspect-ratio:1;overflow:hidden')
      break

    case 'note':
      scene.innerHTML = `
        <div class="memory__note-paper" data-anim="note">
          <h3 class="scene__title">${memory.title}</h3>
          ${dateHtml(memory)}
          <p class="scene__description">${memory.description}</p>${locHtml(memory)}
        </div>`
      break

    case 'video':
      scene.innerHTML = `
        <div class="memory__video-wrap">
          <div class="video-slot"></div>
          <button class="memory__play-btn" aria-label="Play video">
            <div class="memory__play-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--color-ink)" aria-hidden="true">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
            </div>
          </button>
        </div>
        <div class="scene__text" style="margin-top:var(--space-md)">
          ${dateHtml(memory)}<h3 class="scene__title">${memory.title}</h3>
          <p class="scene__description">${memory.description}</p>
        </div>`
      injectVideoEl(scene, memory)
      break

    default:
      scene.innerHTML = `
        <div class="scene__text">
          ${dateHtml(memory)}<h3 class="scene__title">${memory.title}</h3>
          <p class="scene__description">${memory.description}</p>
        </div>`
  }

  return scene
}

function dateHtml(m: Memory): string {
  return m.date ? `<p class="scene__date">${m.date}</p>` : ''
}
function locHtml(m: Memory): string {
  return m.location ? `<p class="scene__location">📍 ${m.location}</p>` : ''
}
function injectImg(container: HTMLElement, memory: Memory, extraStyle = ''): void {
  if (!memory.image) return
  const img = createImage({ src: memory.image, alt: memory.title })
  img.style.cssText = `width:100%;height:100%;object-fit:cover;display:block;${extraStyle}`
  container.style.cssText += extraStyle
  container.appendChild(img)
}
function injectVideoEl(scene: HTMLElement, memory: Memory): void {
  if (!memory.video) return
  const slot = scene.querySelector<HTMLElement>('.video-slot')!
  const video = createVideo({ src: memory.video, poster: memory.image })
  video.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block'
  slot.appendChild(video)
  observeVideo(video)

  const playBtn = scene.querySelector<HTMLButtonElement>('.memory__play-btn')
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (video.paused) {
        video.muted = false
        video.play().catch(() => { video.muted = true; video.play() })
        playBtn.style.opacity = '0'
      } else {
        video.pause()
        playBtn.style.opacity = '1'
      }
    })
  }
}

// ── Horizontal camera (desktop) ──────────────────────────────────────────────
function initHorizontal(section: HTMLElement, stage: HTMLElement, track: HTMLElement): void {
  const scenes = track.querySelectorAll<HTMLElement>('.memory')
  if (!scenes.length) return

  const totalX = (scenes.length - 1) * window.innerWidth

  // Use a scrubbed GSAP timeline rather than onUpdate for proper Lenis sync
  const tl = gsap.timeline({
    scrollTrigger: {
      id: 'timeline-horizontal',
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      pin: stage,
      scrub: 1.0,
      invalidateOnRefresh: true,
    },
  })

  tl.to(track, {
    x: -totalX,
    ease: 'none',
    force3D: true,
  })
}

// ── Vertical depth sequence (mobile + tablet) ────────────────────────────────
function initVertical(section: HTMLElement, stage: HTMLElement, track: HTMLElement): void {
  // Override sticky CSS — vertical uses natural document flow
  stage.style.position = 'relative'
  stage.style.height   = 'auto'
  stage.style.overflow = 'visible'
  track.classList.add('timeline__track--vertical')
  // Let section height be determined by content, not fixed dvh
  section.style.height = 'auto'
  section.style.minHeight = '0'
}

// ── Per-scene content animations ─────────────────────────────────────────────
function animateSceneContent(section: HTMLElement, track: HTMLElement, isHorizontal: boolean): void {
  const scenes = track.querySelectorAll<HTMLElement>('.memory')
  const count  = scenes.length
  if (!count) return

  scenes.forEach((scene, i) => {
    const textEl    = scene.querySelector<HTMLElement>('.scene__text, .memory__overlay, .float-text, .polaroid-meta')
    const polaroid  = scene.querySelector<HTMLElement>('[data-anim="polaroid"]')
    const note      = scene.querySelector<HTMLElement>('[data-anim="note"]')
    const mediaEl   = scene.querySelector<HTMLElement>('.memory__media')

    if (isHorizontal) {
      // ── Horizontal: triggers based on section scroll % per-scene ──────────
      const frac  = 1 / count
      const s     = i * frac          // scene start fraction
      const enter = s + frac * 0.05   // 5% into the scene's window
      const mid   = s + frac * 0.25   // 25% in — fully revealed
      const exit  = s + frac * 0.80   // 80% in — start fading
      const end   = s + frac * 0.98

      const pct = (f: number) => `${(f * 100).toFixed(1)}% top`

      if (textEl) {
        gsap.set(textEl, { opacity: 0, y: 28 })
        gsap.to(textEl, {
          opacity: 1, y: 0, ease: 'power2.out',
          scrollTrigger: { id: `timeline-text-in-${i}`, trigger: section, start: pct(enter), end: pct(mid), scrub: 0.7 },
        })
        // Fade out before leaving (skip last scene — it exits into birthday)
        if (i < count - 1) {
          gsap.to(textEl, {
            opacity: 0, y: -20, ease: 'power1.in',
            scrollTrigger: { id: `timeline-text-out-${i}`, trigger: section, start: pct(exit), end: pct(end), scrub: 0.7 },
          })
        }
      }

      if (polaroid) {
        gsap.set(polaroid, { rotate: -7, scale: 0.86, opacity: 0 })
        gsap.to(polaroid, {
          rotate: -2, scale: 1, opacity: 1, ease: 'power2.out',
          scrollTrigger: { id: `timeline-polaroid-${i}`, trigger: section, start: pct(enter), end: pct(mid), scrub: 0.8 },
        })
      }

      if (note) {
        gsap.set(note, { rotate: 2.5, scale: 0.9, opacity: 0 })
        gsap.to(note, {
          rotate: 0.8, scale: 1, opacity: 1, ease: 'power2.out',
          scrollTrigger: { id: `timeline-note-${i}`, trigger: section, start: pct(enter), end: pct(mid), scrub: 0.8 },
        })
      }

      // Parallax on full-bleed photo background
      if (mediaEl && scene.classList.contains('memory--full')) {
        gsap.set(mediaEl, { scale: 1.1 })
        gsap.to(mediaEl, {
          scale: 1, ease: 'none',
          scrollTrigger: { id: `timeline-parallax-${i}`, trigger: section, start: pct(s), end: pct(s + frac * 0.6), scrub: 1.5 },
        })
      }

    } else {
      // ── Vertical: IntersectionObserver for each scene ─────────────────────
      if (textEl)   gsap.set(textEl,   { opacity: 0, y: 30 })
      if (polaroid) gsap.set(polaroid, { rotate: -7, scale: 0.86, opacity: 0 })
      if (note)     gsap.set(note,     { rotate: 2.5, scale: 0.9, opacity: 0 })

      // Root margin gives a generous buffer — avoids popping on fast scroll
      const observer = new IntersectionObserver(
        ([entry]) => {
          const dir = entry.boundingClientRect.top > 0 ? 1 : -1
          if (entry.isIntersecting) {
            if (textEl)   gsap.to(textEl,   { opacity: 1, y: 0,             duration: 0.65, ease: 'power2.out' })
            if (polaroid) gsap.to(polaroid, { rotate: -2, scale: 1, opacity: 1, duration: 0.7,  ease: 'power2.out' })
            if (note)     gsap.to(note,     { rotate: 0.8, scale: 1, opacity: 1, duration: 0.7,  ease: 'power2.out' })
          } else {
            if (textEl)   gsap.to(textEl,   { opacity: 0, y: 22 * dir,      duration: 0.4,  ease: 'power1.in' })
            if (polaroid) gsap.to(polaroid, { rotate: -7, scale: 0.86, opacity: 0, duration: 0.35, ease: 'power1.in' })
            if (note)     gsap.to(note,     { rotate: 2.5, scale: 0.9, opacity: 0, duration: 0.35, ease: 'power1.in' })
          }
        },
        { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
      )
      observer.observe(scene)
      // Disconnect after page unload to prevent leaks (SPA-style cleanup)
      window.addEventListener('beforeunload', () => observer.disconnect(), { once: true })
    }
  })
}
