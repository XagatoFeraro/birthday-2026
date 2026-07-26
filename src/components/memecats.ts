// ─── Real Cat Images ──────────────────────────────────────────────────────────
// Uses cataas.com — free, public, no API key needed, hotlink-friendly.
// Each cat gets a fixed seed URL so it's always the same cat per card.
// All URLs load in the user's browser (not this sandbox).

export type MemeCatId =
  | 'sleepy' | 'hungry' | 'dramatic' | 'vibing' | 'grumpy'
  | 'smug' | 'crying' | 'surprised' | 'heart' | 'party'

export interface MemeCat {
  id: MemeCatId
  imgUrl: string     // real cat image URL
  mode: string
  caption: string
  bg: string
  tilt: number
}

// cataas.com — free cat photos, no auth, works in browser
// Each has a unique /cat/{tag} or /cat?width= URL for variety
const C = (tag: string) => `https://cataas.com/cat/${tag}?width=300&height=300&type=square`

export const MEME_CATS: MemeCat[] = [
  {
    id: 'sleepy',
    imgUrl: C('sleepy'),
    mode: 'Sleepy Mode 😴',
    caption: 'me at 11pm but still texting adi',
    bg: '#fde8ec', tilt: -3,
  },
  {
    id: 'hungry',
    imgUrl: C('cute'),
    mode: 'Num Num Mode 😋',
    caption: 'when adi says "want food?"',
    bg: '#fdf3c0', tilt: 2,
  },
  {
    id: 'dramatic',
    imgUrl: C('angry'),
    mode: 'Dramatic Mode 😤',
    caption: 'adi said something dumb again',
    bg: '#fde0d0', tilt: -1.5,
  },
  {
    id: 'vibing',
    imgUrl: C('funny'),
    mode: 'Vibe Mode ✨',
    caption: 'no context just vibing',
    bg: '#e8f5e8', tilt: 3,
  },
  {
    id: 'grumpy',
    imgUrl: C('grumpy'),
    mode: 'Grumpy Mode 😒',
    caption: 'before first coffee. do not approach.',
    bg: '#e8e0f4', tilt: -2.5,
  },
  {
    id: 'smug',
    imgUrl: C('cute'),
    mode: 'Smug Mode 😏',
    caption: 'when she\'s right (always)',
    bg: '#fde8ec', tilt: 2.5,
  },
  {
    id: 'crying',
    imgUrl: C('sad'),
    mode: 'Soft Hours 🥺',
    caption: 'watching sad reels at 1am',
    bg: '#fdf0e8', tilt: -2,
  },
  {
    id: 'surprised',
    imgUrl: 'https://cataas.com/cat?width=300&height=300&type=square',
    mode: 'Shocked Mode 😱',
    caption: 'adi doing something competent',
    bg: '#e0f0f8', tilt: 1.5,
  },
  {
    id: 'heart',
    imgUrl: C('love'),
    mode: 'Love Mode 🥰',
    caption: 'when he texts good morning ♡',
    bg: '#fde0e8', tilt: -3.5,
  },
  {
    id: 'party',
    imgUrl: C('birthday'),
    mode: 'Birthday Mode 🎂',
    caption: 'it\'s her birthday!!! act accordingly!!!',
    bg: '#fdf3c0', tilt: 3,
  },
]

// ── Real-cat meme card ─────────────────────────────────────────────────────────
export function createMemeCatCard(cat: MemeCat): HTMLElement {
  const card = document.createElement('div')
  card.className = 'meme-card'
  card.style.setProperty('--card-tilt', `${cat.tilt}deg`)

  card.innerHTML = `
    <div class="meme-card__face" style="background:${cat.bg}">
      <p class="meme-card__top">${cat.caption}</p>
      <div class="meme-card__img-wrap">
        <img
          src="${cat.imgUrl}"
          alt="${cat.mode}"
          loading="lazy"
          decoding="async"
          onerror="this.parentElement.innerHTML='<div class=meme-cat-fallback>🐱</div>'"
        />
      </div>
    </div>
    <div class="meme-card__label">
      <span class="meme-card__mode">${cat.mode}</span>
    </div>
  `

  // Hover/touch interactions
  card.addEventListener('mouseenter', () => {
    card.style.transform = `rotate(0deg) scale(1.06) translateY(-6px)`
    card.style.boxShadow = '0 20px 60px rgba(0,0,0,0.16), 4px 4px 0 var(--rose)'
  })
  card.addEventListener('mouseleave', () => {
    card.style.transform = `rotate(${cat.tilt}deg)`
    card.style.boxShadow = ''
  })
  card.addEventListener('click', () => {
    card.style.transform = `rotate(${cat.tilt}deg) scale(0.92)`
    setTimeout(() => {
      card.style.transform = `rotate(${cat.tilt}deg) scale(1.08)`
      setTimeout(() => { card.style.transform = `rotate(${cat.tilt}deg)` }, 180)
    }, 80)
  })

  return card
}

// ── Birthday real cats row ────────────────────────────────────────────────────
export function createPartyCats(): HTMLElement {
  const row = document.createElement('div')
  row.className = 'birthday__cat-row'

  const catUrls = [
    'https://cataas.com/cat/birthday?width=100&height=100&type=square',
    'https://cataas.com/cat/cute?width=100&height=100&type=square',
    'https://cataas.com/cat/funny?width=100&height=100&type=square',
    'https://cataas.com/cat?width=100&height=100&type=square&seed=1',
    'https://cataas.com/cat?width=100&height=100&type=square&seed=2',
  ]

  catUrls.forEach((url, i) => {
    const wrap = document.createElement('div')
    wrap.className = 'birthday__party-cat'
    wrap.style.animationDelay = `${i * 0.3}s`
    wrap.innerHTML = `
      <img src="${url}" alt="party cat"
        loading="lazy" decoding="async"
        onerror="this.parentElement.innerHTML='🐱'"
      />
    `
    row.appendChild(wrap)
  })

  return row
}

// ── Running cat (easter egg) — now uses real cat image ───────────────────────
export function createRunningCat(): HTMLElement {
  const el = document.createElement('div')
  el.className = 'running-cat'
  el.setAttribute('aria-hidden', 'true')
  el.innerHTML = `<img src="https://cataas.com/cat/gif?width=60&height=60" alt="" />`
  el.style.cssText = `
    position:fixed; bottom:80px; left:-70px; z-index:999;
    pointer-events:none; will-change:transform;
    width:60px; height:60px; border-radius:50%; overflow:hidden;
    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  `
  return el
}
