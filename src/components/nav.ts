// ─── Story navigation ─────────────────────────────────────────────────────
// Minimal floating nav: jump buttons + optional music toggle.
// Appears after the user begins scrolling past the intro.

import { settings } from '../data/settings'

export function createNav(): HTMLElement {
  const nav = document.createElement('nav')
  nav.id = 'nav'
  nav.setAttribute('aria-label', 'Story navigation')

  // Jump buttons — IDs match scene element IDs
  const jumps: { label: string; target: string }[] = [
    { label: '↑ Beginning', target: 'scene-intro' },
    { label: 'Memories',    target: 'scene-timeline' },
    { label: 'Birthday ♡',  target: 'scene-birthday' },
  ]

  jumps.forEach(({ label, target }) => {
    const btn = document.createElement('button')
    btn.className = 'nav__btn'
    btn.textContent = label
    btn.setAttribute('aria-label', `Jump to ${label}`)
    btn.addEventListener('click', () => {
      const el = document.getElementById(target)
      if (!el) return
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    nav.appendChild(btn)
  })

  // Music toggle (only rendered if music is enabled in settings)
  if (settings.music.enabled) {
    const musicBtn = document.createElement('button')
    musicBtn.className = 'nav__music nav__btn'
    musicBtn.setAttribute('aria-label', 'Toggle music')
    musicBtn.setAttribute('aria-pressed', 'false')
    musicBtn.innerHTML = musicNoteIcon()
    nav.appendChild(musicBtn)

    setupMusicToggle(musicBtn)
  }

  // Show nav after user scrolls past 10% of page
  const observer = new IntersectionObserver(
    ([entry]) => {
      nav.classList.toggle('is-visible', !entry.isIntersecting)
    },
    { threshold: 0.1 }
  )

  // Observe after DOM is mounted
  requestAnimationFrame(() => {
    const intro = document.getElementById('scene-intro')
    if (intro) observer.observe(intro)
  })

  return nav
}

// ── Music ──────────────────────────────────────────────────────────────────
let audio: HTMLAudioElement | null = null
let isPlaying = false

function setupMusicToggle(btn: HTMLButtonElement): void {
  btn.addEventListener('click', () => {
    if (!audio) {
      audio = new Audio(import.meta.env.BASE_URL + settings.music.file)
      audio.loop = true
    }

    if (isPlaying) {
      audio.pause()
      isPlaying = false
      btn.setAttribute('aria-pressed', 'false')
      btn.style.opacity = '0.5'
    } else {
      audio.play().catch(() => {
        // Autoplay may be blocked — that's fine
        console.warn('Music playback blocked by browser policy.')
      })
      isPlaying = true
      btn.setAttribute('aria-pressed', 'true')
      btn.style.opacity = '1'
    }
  })
}

function musicNoteIcon(): string {
  return `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3"/>
    <circle cx="18" cy="16" r="3"/>
  </svg>`
}
