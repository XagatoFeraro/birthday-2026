// ─── Scene: Pinterest Photo Board ─────────────────────────────────────────────
// Shows all uploaded photos in natural dimensions (no cropping)
// Masonry CSS columns — portrait photos show fully

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface Pin {
  src: string
  title: string
  date: string
  accent?: string
}

const PINS: Pin[] = [
  // Tanisha solo shots
  {
    src:   'images/tanisha/tanisha-01.webp',
    title: 'She just radiates ✨',
    date:  'Taniisha',
    accent: '#fde8ec',
  },
  {
    src:   'images/tanisha/tanisha-02.webp',
    title: 'Golden hour Betuuu 🧡',
    date:  'Taniisha',
    accent: '#fdf0e0',
  },
  // Together shots — all 5
  {
    src:   'images/together/together-01.webp',
    title: 'The very beginning 🫶',
    date:  '2017 · KV OEF',
    accent: '#fdf3e3',
  },
  {
    src:   'images/together/together-02.webp',
    title: 'Us, always ♡',
    date:  'Early days',
    accent: '#fde8ec',
  },
  {
    src:   'images/together/together-03.webp',
    title: 'Kanpur nights 🌙',
    date:  '2025',
    accent: '#e8f0f8',
  },
  {
    src:   'images/together/together-04.webp',
    title: 'Laser tag legends 🎯',
    date:  'Goa 2025',
    accent: '#f0ead8',
  },
  {
    src:   'images/together/together-05.webp',
    title: 'Seven years in 🌹',
    date:  'Us.',
    accent: '#f0f8f0',
  },
]

export function buildPhotoBoard(): void {
  const section = document.getElementById('scene-photos')
  if (!section) return

  const board = section.querySelector<HTMLElement>('.pin-board')
  if (!board) return

  const base = import.meta.env.BASE_URL

  PINS.forEach((pin, i) => {
    const card = document.createElement('div')
    card.className = 'pin-card'
    const tilt = (i % 2 === 0 ? 1 : -1) * (Math.random() * 1.5)
    card.style.setProperty('--card-tilt', `${tilt.toFixed(1)}deg`)

    const img = document.createElement('img')
    img.src     = base + pin.src
    img.alt     = pin.title
    img.loading = i < 4 ? 'eager' : 'lazy'
    img.decoding = 'async'
    // NO width/height constraints — natural image dimensions
    img.style.cssText = 'width:100%;height:auto;display:block'
    img.addEventListener('error', () => { card.style.display = 'none' }, { once: true })

    const caption = document.createElement('div')
    caption.className = 'pin-card__caption'
    if (pin.accent) caption.style.background = pin.accent
    caption.innerHTML = `
      <span class="pin-card__title">${pin.title}</span>
      <span class="pin-card__date">${pin.date}</span>
    `

    const saveBtn = document.createElement('button')
    saveBtn.className = 'pin-card__save'
    saveBtn.setAttribute('aria-label', 'Save')
    saveBtn.innerHTML = '♡'
    saveBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      saveBtn.classList.toggle('saved')
      saveBtn.innerHTML = saveBtn.classList.contains('saved') ? '♥' : '♡'
      // Tiny heart burst
      gsap.fromTo(saveBtn, { scale: 1 }, { scale: 1.4, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' })
    })

    card.appendChild(img)
    card.appendChild(caption)
    card.appendChild(saveBtn)
    board.appendChild(card)
  })

  // Staggered reveal as cards enter viewport
  const cards = board.querySelectorAll<HTMLElement>('.pin-card')
  cards.forEach((card, i) => {
    ScrollTrigger.create({
      trigger: card,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          delay: (i % 3) * 0.06,
          ease: 'back.out(1.2)',
        })
      },
    })
  })
}
