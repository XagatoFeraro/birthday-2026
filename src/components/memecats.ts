// ─── Meme Cat SVG Library ─────────────────────────────────────────────────────
// Original SVG illustrations evoking famous internet cat meme personalities.
// All artwork is original — inspired by meme culture, not copied assets.

export type MemeCatId =
  | 'sleepy'    // Sleepy Betuuu — tired eyes half closed
  | 'hungry'    // Num Num Num — mouth open, excited
  | 'dramatic'  // NOOO cat — screaming, dramatic
  | 'vibing'    // Happy vibing cat — smiling, relaxed
  | 'grumpy'    // Grumpy serious face
  | 'smug'      // Smug knowing look
  | 'crying'    // Crying but ok cat
  | 'surprised' // Wide eyes shocked
  | 'heart'     // Heart eyes love
  | 'party'     // Party hat celebrating

export interface MemeCat {
  id: MemeCatId
  svg: string
  mode: string       // "Betuuu Mode" label
  caption: string    // meme-style top text
  bg: string         // card background color
  tilt: number       // card rotation degrees
}

// ── SVG builder helpers ────────────────────────────────────────────────────────
const S = (w: number, h: number, content: string) =>
  `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" class="cat-svg" aria-hidden="true">${content}</svg>`

// Shared cat face geometry (centered 120×120 in a 160×160 viewBox)
const catBase = (
  bodyColor: string,
  eyeL: string,
  eyeR: string,
  mouth: string,
  extras = ''
) => S(160, 160, `
  <!-- ears -->
  <polygon points="28,68 38,38 56,62" fill="${bodyColor}"/>
  <polygon points="132,68 122,38 104,62" fill="${bodyColor}"/>
  <polygon points="30,65 39,42 54,60" fill="#f0b8c0"/>
  <polygon points="130,65 121,42 106,60" fill="#f0b8c0"/>
  <!-- head -->
  <ellipse cx="80" cy="92" rx="48" ry="44" fill="${bodyColor}"/>
  <!-- eyes -->
  ${eyeL}
  ${eyeR}
  <!-- nose -->
  <polygon points="80,100 76,106 84,106" fill="#e07080"/>
  <!-- mouth -->
  ${mouth}
  <!-- whiskers -->
  <line x1="28" y1="104" x2="62" y2="102" stroke="#7a6060" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="26" y1="109" x2="61" y2="108" stroke="#7a6060" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="98" y1="102" x2="132" y2="104" stroke="#7a6060" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="99" y1="108" x2="134" y2="109" stroke="#7a6060" stroke-width="1.2" stroke-linecap="round"/>
  ${extras}
`)

// Standard eye (open)
const eye = (cx: number, cy: number, col = '#2d1f1a') =>
  `<ellipse cx="${cx}" cy="${cy}" rx="9" ry="10" fill="white"/>
   <ellipse cx="${cx}" cy="${cy+1}" rx="5.5" ry="6.5" fill="${col}"/>
   <circle  cx="${cx+2}" cy="${cy-2}" r="2" fill="white"/>`

// Half-closed eye (sleepy)
const eyeSleepy = (cx: number, cy: number) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="9" ry="10" fill="white"/>
   <ellipse cx="${cx}" cy="${cy+1}" rx="5.5" ry="6.5" fill="#2d1f1a"/>
   <rect x="${cx-9}" y="${cy-8}" width="18" height="10" fill="#d4918a" rx="2"/>`

// Wide shocked eye
const eyeWide = (cx: number, cy: number) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="11" ry="13" fill="white"/>
   <ellipse cx="${cx}" cy="${cy+1}" rx="7" ry="8" fill="#1a0a0a"/>
   <circle  cx="${cx+3}" cy="${cy-3}" r="2.5" fill="white"/>`

// Heart eye
const eyeHeart = (cx: number, cy: number) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="11" ry="11" fill="white"/>
   <text x="${cx}" y="${cy+5}" text-anchor="middle" font-size="14" fill="#e8405a">♥</text>`

// Crying eye
// eyeCrying helper removed (unused)

// Standard happy mouth
const mouthHappy = `<path d="M72 112 Q80 120 88 112" fill="none" stroke="#2d1f1a" stroke-width="2.2" stroke-linecap="round"/>`
// Open excited mouth (Num Num)
const mouthOpen  = `<ellipse cx="80" cy="115" rx="12" ry="9" fill="#c04060"/><ellipse cx="80" cy="119" rx="10" ry="5" fill="#ff8090"/>`
// Flat grumpy mouth
const mouthFlat  = `<path d="M71 113 Q80 110 89 113" fill="none" stroke="#2d1f1a" stroke-width="2.2" stroke-linecap="round"/>`
// Screaming mouth
const mouthScream = `<ellipse cx="80" cy="118" rx="16" ry="14" fill="#c04060"/><ellipse cx="80" cy="123" rx="13" ry="8" fill="#ff9090"/>`
// Smug smile
// mouthSmug removed (unused)

// ── Cat definitions ────────────────────────────────────────────────────────────
export const MEME_CATS: MemeCat[] = [
  {
    id: 'sleepy',
    svg: catBase('#c8a098', eyeSleepy(62, 90), eyeSleepy(98, 90), mouthHappy,
      `<!-- Zzz -->
       <text x="118" y="68" font-size="18" fill="#b09086" font-family="serif">z</text>
       <text x="128" y="55" font-size="14" fill="#b09086" font-family="serif">z</text>
       <text x="136" y="44" font-size="11" fill="#b09086" font-family="serif">z</text>`),
    mode: 'Sleepy Betuuu',
    caption: 'just 5 more minutes...',
    bg: '#f0e4f0',
    tilt: -2,
  },
  {
    id: 'hungry',
    svg: catBase('#e8b890', eye(62,90), eye(98,90), mouthOpen,
      `<!-- food bowl hint -->
       <text x="80" y="155" text-anchor="middle" font-size="18">🍜</text>`),
    mode: 'Hungry Betuuu',
    caption: 'num num num num',
    bg: '#fff0d8',
    tilt: 1,
  },
  {
    id: 'dramatic',
    svg: catBase('#b8c8d8', eyeWide(62,88), eyeWide(98,88), mouthScream,
      `<!-- dramatic tears -->
       <path d="M56 100 Q50 120 52 135" fill="none" stroke="#88bbff" stroke-width="3" stroke-linecap="round"/>
       <path d="M104 100 Q110 120 108 135" fill="none" stroke="#88bbff" stroke-width="3" stroke-linecap="round"/>
       <!-- table indicator -->
       <rect x="20" y="148" width="120" height="6" rx="3" fill="#c8d0d8"/>`),
    mode: 'Dramatic Betuuu',
    caption: 'NOOOOO!!!',
    bg: '#e4eef8',
    tilt: -1,
  },
  {
    id: 'vibing',
    svg: catBase('#a8d0a8', eye(62,90,'#2d5020'), eye(98,90,'#2d5020'), mouthHappy,
      `<!-- music notes -->
       <text x="20" y="60" font-size="20" fill="#5a9050">♪</text>
       <text x="124" y="52" font-size="16" fill="#5a9050">♫</text>
       <!-- headphones hint -->
       <path d="M36 80 Q40 65 62 70" fill="none" stroke="#5a9050" stroke-width="3" stroke-linecap="round"/>
       <path d="M124 80 Q120 65 98 70" fill="none" stroke="#5a9050" stroke-width="3" stroke-linecap="round"/>
       <circle cx="34" cy="82" r="5" fill="#5a9050"/>
       <circle cx="126" cy="82" r="5" fill="#5a9050"/>`),
    mode: 'Vibing Betuuu',
    caption: 'just chilling fr fr',
    bg: '#d8f0d8',
    tilt: 2,
  },
  {
    id: 'grumpy',
    svg: catBase('#d0b890',
      `<ellipse cx="62" cy="90" rx="9" ry="10" fill="white"/>
       <ellipse cx="62" cy="91" rx="5.5" ry="6.5" fill="#1a0a0a"/>
       <line x1="54" y1="78" x2="70" y2="83" stroke="#5a3020" stroke-width="2.5"/>`,
      `<ellipse cx="98" cy="90" rx="9" ry="10" fill="white"/>
       <ellipse cx="98" cy="91" rx="5.5" ry="6.5" fill="#1a0a0a"/>
       <line x1="106" y1="78" x2="90" y2="83" stroke="#5a3020" stroke-width="2.5"/>`,
      mouthFlat),
    mode: 'Do Not Disturb Betuuu',
    caption: 'i said what i said',
    bg: '#f0e8d4',
    tilt: -3,
  },
  {
    id: 'heart',
    svg: catBase('#f0a8b8', eyeHeart(62,90), eyeHeart(98,90), mouthHappy,
      `<text x="80" y="48" text-anchor="middle" font-size="24" fill="#e8405a">♥</text>
       <text x="42" y="70" font-size="14" fill="#e8a0b0">♡</text>
       <text x="112" y="66" font-size="14" fill="#e8a0b0">♡</text>`),
    mode: '🥰 Love Mode Betuuu',
    caption: 'literally obsessed',
    bg: '#ffe0e8',
    tilt: 1,
  },
]

// ── Render a meme cat card ──────────────────────────────────────────────────────
export function createMemeCatCard(cat: MemeCat): HTMLElement {
  const card = document.createElement('div')
  card.className = 'meme-card'
  card.style.setProperty('--card-tilt', `${cat.tilt}deg`)
  card.style.setProperty('--card-bg', cat.bg)

  card.innerHTML = `
    <div class="meme-card__face" style="background:${cat.bg}">
      ${cat.svg}
      <div class="meme-card__top">${cat.caption}</div>
    </div>
    <div class="meme-card__label">
      <span class="meme-card__mode">${cat.mode}</span>
    </div>
  `

  // Hover wiggle
  card.addEventListener('mouseenter', () => {
    card.style.transform = `rotate(0deg) scale(1.04) translateY(-4px)`
  })
  card.addEventListener('mouseleave', () => {
    card.style.transform = `rotate(${cat.tilt}deg)`
  })
  // Touch tap bounce
  card.addEventListener('click', () => {
    card.style.transform = `rotate(${cat.tilt}deg) scale(0.94)`
    setTimeout(() => {
      card.style.transform = `rotate(${cat.tilt}deg) scale(1.06)`
      setTimeout(() => {
        card.style.transform = `rotate(${cat.tilt}deg)`
      }, 150)
    }, 80)
  })

  return card
}

// ── Birthday party cat emojis row ─────────────────────────────────────────────
export function createPartyCats(): HTMLElement {
  const row = document.createElement('div')
  row.className = 'birthday__cat-row'
  // Text-based cats that work everywhere, evoke meme culture
  const cats = ['🎉', '🐱', '🎂', '🐾', '✨']
  cats.forEach((c, i) => {
    const span = document.createElement('span')
    span.className = 'birthday__party-cat'
    span.textContent = c
    span.style.animationDelay = `${i * 0.35}s`
    row.appendChild(span)
  })
  return row
}

// ── Tiny running cat for easter egg ───────────────────────────────────────────
export function createRunningCat(): HTMLElement {
  const el = document.createElement('div')
  el.className = 'running-cat'
  el.setAttribute('aria-hidden', 'true')
  el.innerHTML = `<span style="font-size:2rem;display:block">🐱</span>`
  el.style.cssText = `
    position: fixed; bottom: 80px; left: -60px; z-index: 999;
    pointer-events: none; will-change: transform;
    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.15));
  `
  return el
}
