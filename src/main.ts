// ─── BETUUU — Birthday 2026 ♡ ─────────────────────────────────────────────────
// Story: Adi & Tanisha. 9 years. From "Aree request to accept kr lo" to forever.
import './styles/tokens.css'
import './styles/base.css'
import './styles/scenes.css'

import { gsap }           from 'gsap'
import { ScrollTrigger }  from 'gsap/ScrollTrigger'
import { loadFonts }      from './utils/fonts'
import { initScroll }     from './utils/scroll'
import { createNav }      from './components/nav'
import { MEME_CATS, createMemeCatCard } from './components/memecats'
import { initIntro }      from './scenes/intro'
import { initMeet }       from './scenes/meet'
import { initTimeline }   from './scenes/timeline'
import { initBirthday }   from './scenes/birthday'
import { buildPhotoBoard } from './scenes/photos'
import { buildInstaScene } from './scenes/instagram'
import { birthdayMessage, ourVideo } from './data/memories'

gsap.registerPlugin(ScrollTrigger)

// ── Giphy embed IDs — iframe embeds bypass hotlink protection ─────────────────
const GID = {
  opening:      '1OrIIOIcRTDaNidc5p',
  naughty:      'gSQp32H82WETR5EFO6',
  kiss:         'ytu2GUYbvhz7zShGwS',
  work:         '3oKIPnAiaMCws8nOsE',
  ragebait:     'YLPOIP1jPu1N87yemm',
  adi:          'TbRkubcqlgBksEqMv4',
  meWhenISeeYou:'X3ewes5lWn41o6hUjy',
  swim:         'lJdylMw5uFZzO02anM',
  sing:         'b9qgtthvTGZoDWBtNq',
  meListen:     'bRTe2TGxczPVH50vxO',
  dance:        '3UkqVq3F50bVCi9URl',
  girlfriend:   'TjSPQgowhhJdHgvnwA',
  always:       'UDORIcubjYvIBAYTe1',
  beating:      '6iqK0cXu38mR0qxyx2',
}

// Random extra cat GIF IDs (Giphy public embeds)
const RANDOM_CAT_IDS = [
  'JIX9t2j0ZTN9S',
  'mlvseq9yvZhba',
  'vFKqnCdLPNOKc',
  'BzyTuYCmvSORqs1ABM',
  'CjmvTCZf2U3p09Mmaj',
]

function gif(id: string, w = 120, label = '', tilt = 0, extraStyle = ''): string {
  const rot = tilt ? `transform:rotate(${tilt}deg);` : ''
  // Giphy embeds: use padding-bottom trick for 480x270 (16:9) aspect ratio
  // The iframe expands to fill the container naturally
  return `
    <div class="gif-wrap" style="width:${w}px;${rot}${extraStyle}">
      <div class="giphy-outer" style="width:${w}px;height:${w}px">
        <iframe
          src="https://giphy.com/embed/${id}"
          class="giphy-embed"
          style="width:${w}px;height:${w}px"
          frameBorder="0"
          allowFullScreen
          title="${label || 'gif'}"
          loading="lazy"
        ></iframe>
      </div>
      ${label ? `<p class="gif-label">${label}</p>` : ''}
    </div>`
}

function floatGif(id: string, w: number, label: string, style: string, tilt = 0): string {
  return `<div class="float-gif-outer" style="${style}">
    ${gif(id, w, label, tilt)}
  </div>`
}

function rndCat(): string {
  return RANDOM_CAT_IDS[Math.floor(Math.random() * RANDOM_CAT_IDS.length)]
}

// ── Scaffold ───────────────────────────────────────────────────────────────────
function buildScaffold(): void {
  const app = document.getElementById('app')
  if (!app) return
  app.innerHTML = `

  <!-- 1. INTRO — Kitten + Hey Betuuu -->
  <section id="scene-intro" class="scene">
    <div class="intro__stage">
      <div class="intro__bg"></div>
      <div class="cover-bg">
        <img src="${import.meta.env.BASE_URL}videos/cover.webp" alt="" aria-hidden="true" loading="eager" decoding="async"/>
      </div>
      <div class="intro__deco"></div>
      <div class="intro__cat-wrap"></div>
      <p class="intro__whisper">pspspsps... 👀</p>
      <h1 class="intro__headline">Hey Betuuu&nbsp;♡</h1>
      <p class="intro__sub">I made something just for you.</p>
      <div class="intro__scroll-hint" aria-hidden="true">
        <span>scroll</span>
        <div class="intro__scroll-line"></div>
      </div>
    </div>
  </section>

  <!-- 2. WHO IS BETUUU -->
  <section id="scene-who" class="scene">
    <div class="who__stage">
      <div class="who__bg"></div>
      <span class="who__word who__word--name" id="w-name">Tanisha.</span>
      <span class="who__word who__word--nick"  id="w-nick">Betuuu.</span>
    </div>
  </section>

  <!-- ═══════════════════════════════════════
       3. HER MOODS — meme cat personality grid
  ═══════════════════════════════════════ -->
  <section id="scene-personality" class="scene story-scene">
    ${floatGif(rndCat(), 80, '', 'position:absolute;top:6%;left:3%;animation:float-bob 3.5s ease-in-out infinite;', -5)}
    ${floatGif(rndCat(), 70, '', 'position:absolute;bottom:8%;right:4%;animation:float-bob 4s 1s ease-in-out infinite;', 6)}
    <div class="story-content" style="align-items:center;text-align:center">
      <span class="story-date">A completely scientific study</span>
      <h2>The Many Moods of Betuuu</h2>
      <p>100% accurate. Peer reviewed. By Adi.</p>
    </div>
    <div class="meme-grid"></div>
  </section>

  <!-- ═══════════════════════════════════════
       4. WORK — Cloud Engineer at Airtel
  ═══════════════════════════════════════ -->
  <section class="scene story-scene story-scene--lavender" id="scene-work">
    ${floatGif(GID.work, 120, 'basically Betuuu at work 💻', 'position:absolute;top:8%;right:5%;animation:float-bob 3s ease-in-out infinite;', -4)}
    ${floatGif(GID.adi, 90, 'this is Adi 🥲', 'position:absolute;bottom:10%;left:5%;animation:float-bob 3.5s 0.8s ease-in-out infinite;', 4)}
    <div class="story-content">
      <span class="story-date">Airtel · Cloud Engineer</span>
      <h2>She basically keeps<br/>the internet running.</h2>
      <p>A whole cloud engineer. Managing infrastructure for one of India's biggest telecom companies. Certified genius. Confirmed overqualified. Still texts back instantly though. 🌩️</p>
      <p class="story-note">Airtel should honestly send Adi a thank you card for emotional support services rendered. 💁‍♂️</p>
    </div>
  </section>

  <!-- ═══════════════════════════════════════
       5. TALENTS — swim, sing, dance
  ═══════════════════════════════════════ -->
  <section class="scene story-scene story-scene--pink" id="scene-talents">
    <div class="story-content" style="align-items:center;text-align:center;max-width:min(860px,94vw)">
      <span class="story-date">The Triple Threat</span>
      <h2>She swims. She sings.<br/>She dances.</h2>
      <p style="margin:0 auto">All of them beautifully. All of them making Adi forget words exist.</p>
      <div class="talent-row">
        <div class="talent-card" style="--tc-tilt:-2.5deg">
          <div class="tc-gif-wrap">${gif(GID.swim, 140, '', -2.5)}</div>
          <span class="tc-label">Swimming 🏊‍♀️</span>
          <span class="tc-sub">cuts through water like she owns every drop</span>
        </div>
        <div class="talent-card" style="--tc-tilt:0.5deg">
          <div class="tc-gif-wrap">${gif(GID.sing, 140, '', 0)}</div>
          <span class="tc-label">Singing 🎤</span>
          <span class="tc-sub">takes it seriously — and she should, she's <em>that</em> good</span>
        </div>
        <div class="talent-card" style="--tc-tilt:2.5deg">
          <div class="tc-gif-wrap">${gif(GID.dance, 140, '', 2)}</div>
          <span class="tc-label">Dancing 💃</span>
          <span class="tc-sub">moves like the music was written for her</span>
        </div>
      </div>
      <div class="listen-row" id="listen-row">
        ${gif(GID.sing, 100, 'her singing ↑', -3)}
        <span class="listen-heart">♡</span>
        ${gif(GID.meListen, 100, 'Adi ↑', 3)}
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════
       6. HOW THEY MET — 1 Aug 2017
  ═══════════════════════════════════════ -->
  <section class="scene story-scene" id="scene-origin">
    ${floatGif(rndCat(), 80, '', 'position:absolute;top:6%;right:5%;animation:float-bob 3.8s ease-in-out infinite;', -6)}
    <div class="story-content">
      <span class="story-date">1 August 2017 · KV OEF, Kanpur</span>
      <h2>It started with a school corridor<br/>and one cheeky DM.</h2>
      <p>Adi — fresh 11th grader, KV OEF. Tanisha — 9th class, same school. They crossed paths. Became friends within a month. Then one day, a notification arrived.</p>
      <div class="dm-bubble" id="dm-bubble">
        <div class="dm-avatar">T</div>
        <div class="dm-content">
          <p class="dm-text">"Aree request to accept kr lo" 😏</p>
          <p class="dm-meta">Tanisha · Instagram DM · 2017</p>
        </div>
      </div>
      <p>That one DM started 9 years of the greatest friendship and the most beautiful love story.</p>
    </div>
  </section>

  <!-- ═══════════════════════════════════════
       7. RAGEBAIT — Adi's favourite hobby
  ═══════════════════════════════════════ -->
  <section class="scene story-scene story-scene--alt" id="scene-ragebait">
    <div class="story-content" style="align-items:center;text-align:center">
      <span class="story-date">A daily tradition 😇</span>
      <h2>Adi's favourite hobby:<br/>Ragebaiting Betuuu.</h2>
      <p style="margin:0 auto">There is an art to it. A science, even. Adi has spent years perfecting it. Betuuu has... strong feelings about this.</p>
      <div class="ragebait-row" id="ragebait-row">
        <div class="ragebait-side">
          ${gif(GID.ragebait, 150, 'Adi doing the thing 😇', -3)}
        </div>
        <div class="ragebait-arrow" id="ragebait-vs">→</div>
        <div class="ragebait-side">
          ${gif(GID.beating, 150, "Betuuu's response 😂", 3)}
        </div>
      </div>
      <p class="story-note">And yet she stays. That's not love, that's a miracle. 💀</p>
    </div>
    ${floatGif(GID.naughty, 100, 'Adi when he\'s feeling naughty 😈', 'position:absolute;bottom:8%;right:5%;animation:float-bob 3.2s ease-in-out infinite;', 5)}
  </section>

  <!-- ═══════════════════════════════════════
       8. OFFICIAL — 6 July 2019
  ═══════════════════════════════════════ -->
  <section class="scene story-scene story-scene--pink" id="scene-official">
    ${floatGif(GID.kiss, 100, '', 'position:absolute;top:8%;right:5%;animation:float-bob 2.8s ease-in-out infinite;', -4)}
    <div class="story-content">
      <span class="story-date">6 July 2019 · Officially ♡</span>
      <h2>The day Adi became<br/>the luckiest person in Kanpur.</h2>
      <p>She'd finished 10th. He'd finished 12th. She transferred to Sir Padampat Singhania Education Center for 11th. And somewhere in all that change — they became official.</p>
      <p>7 years of relationship. 9 years of friendship.<br/>And Adi's face when she said yes?</p>
      <div class="gf-react-row" id="gf-react">
        ${gif(GID.girlfriend, 140, 'literally Adi\'s internal state 😭', -2)}
      </div>
    </div>
    ${floatGif(rndCat(), 75, '', 'position:absolute;bottom:8%;left:5%;animation:float-bob 4s 0.5s ease-in-out infinite;', 7)}
  </section>

  <!-- ═══════════════════════════════════════
       9. ALWAYS THERE
  ═══════════════════════════════════════ -->
  <section class="scene story-scene story-scene--sage" id="scene-always">
    ${floatGif(GID.always, 120, 'Adi whenever she needs him 🏃‍♂️', 'position:absolute;top:8%;right:5%;animation:float-bob 3s ease-in-out infinite;', -4)}
    <div class="story-content">
      <span class="story-date">Every single day</span>
      <h2>Whenever she needs him,<br/>he's already there.</h2>
      <p>Through every exam, every bad day, every 2am crisis, every mood, every moment — he shows up. No questions, no hesitation. Just there.</p>
      <p class="story-note">That's us. We just show up for each other. Always. ♡</p>
    </div>
    ${floatGif(rndCat(), 75, '', 'position:absolute;bottom:8%;left:5%;animation:float-bob 3.6s 1.2s ease-in-out infinite;', -5)}
  </section>

  <!-- ═══════════════════════════════════════
       10. "THIS IS ME WHEN I SEE YOU"
       — small floating fixed element
  ═══════════════════════════════════════ -->
  <div class="me-when-wrap" id="me-when-wrap">
    ${gif(GID.meWhenISeeYou, 110, '', -3)}
    <p class="me-when-label">this is me<br/>when I see you 🥺</p>
  </div>

  <!-- ═══════════════════════════════════════
       10. OUR VIDEO — Portrait reel
  ═══════════════════════════════════════ -->
  <section class="scene" id="scene-video" style="background:var(--ink);min-height:100dvh">
    <!-- Text side -->
    <div class="our-video-text" id="video-text">
      <span class="story-date">Us. ♡</span>
      <h2>${ourVideo.title}</h2>
      <p>${ourVideo.caption}</p>
      <p style="font-family:var(--font-note);font-size:var(--t-lg);color:rgba(255,255,255,0.5)">7 years. 9 years. ∞ more.</p>
    </div>

    <!-- Portrait reel in phone frame -->
    <div class="our-video-phone">
      <div class="our-video-wrap" id="our-video-wrap">
        <video
          id="our-video"
          src="${import.meta.env.BASE_URL}${ourVideo.src}"
          poster="${import.meta.env.BASE_URL}${ourVideo.poster}"
          playsinline
          webkit-playsinline
          preload="none"
          loop
        ></video>
        <button class="our-video-btn" id="our-video-btn" aria-label="Play video">
          <div class="our-video-play-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true"><polygon points="5,3 19,12 5,21"/></svg>
          </div>
        </button>
        <div class="no-video-label" id="no-video-label">🎬 video uploading...</div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════
       11. MEMORIES TIMELINE
  ═══════════════════════════════════════ -->
  <section id="scene-timeline" class="scene">
    <div class="timeline__stage">
      <div class="timeline__track" id="timeline-track"></div>
    </div>
  </section>

  <!-- PINTEREST PHOTO BOARD -->
  <section id="scene-photos" class="scene">
    <div class="photos-header">
      <h2 class="squiggle">Her world, in pictures.</h2>
      <p>a collection ♡</p>
      <div class="pin-tags" style="margin-top:var(--sp-sm)">
        <span class="tag tag--rose">✨ Betuuu</span>
        <span class="tag tag--sage">📍 Kanpur</span>
        <span class="tag tag--lavender">💜 9 years</span>
        <span class="tag tag--butter">🎂 Birthday 2026</span>
        <span class="tag">🐱 Adi & Tanisha</span>
      </div>
    </div>
    <div class="pin-board"></div>
  </section>

  <!-- INSTAGRAM -->
  <section id="scene-insta" class="scene">
    <div class="insta-header">
      <span class="eyebrow">find her here</span>
      <h2>She posts, therefore she is iconic.</h2>
      <p>real content. real Betuuu. daily proof.</p>
      <a
        href="https://www.instagram.com/taniisha.tripathii"
        target="_blank" rel="noopener"
        class="insta-handle"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width:18px;height:18px;fill:white;flex-shrink:0">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
        @taniisha.tripathii
      </a>
    </div>
    <div class="insta-grid"></div>
  </section>

  <!-- BIRTHDAY CLIMAX -->
  <section id="scene-birthday" class="scene">
    <div class="birthday__stage">
      <div class="birthday__bloom"></div>
      <div class="birthday__confetti"></div>
      <p class="birthday__date">25 July</p>
      <h2 class="birthday__greeting">Happy Birthday,</h2>
      <h2 class="birthday__name">Betuuu.</h2>
      <div class="birthday__cat-row"></div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════
       13. FINAL MESSAGE
  ═══════════════════════════════════════ -->
  <section id="scene-final" class="scene">
    <div class="final__content">
      <div class="final__envelope">💌</div>
      <p class="final__message"></p>
      <p class="final__signoff">
        Happy Birthday, Betuuu. ♡<br/>
        <span style="font-size:var(--text-base);font-style:normal;font-family:var(--font-note);color:var(--ink-ghost)">— Adi</span>
      </p>
      <div class="final__cat-sleep">😸</div>
    </div>
  </section>
  `
}

// ── Personality / meme cats ────────────────────────────────────────────────────
function initPersonalityScene(): void {
  const grid = document.querySelector<HTMLElement>('.meme-grid')
  if (!grid) return
  MEME_CATS.forEach(cat => grid.appendChild(createMemeCatCard(cat)))
  grid.querySelectorAll<HTMLElement>('.meme-card').forEach((card, i) => {
    gsap.set(card, { opacity:0, y:35 })
    ScrollTrigger.create({ trigger:card, start:'top 88%', once:true,
      onEnter:() => gsap.to(card, { opacity:1, y:0, duration:0.5, delay:i%3*0.08, ease:'back.out(1.3)' }) })
  })
}

// ── Story scenes — IntersectionObserver reveals ────────────────────────────────
function initStoryScenes(): void {
  // ── Utility: reveal element on scroll ───────────────────────────────────────
  function onEnter(
    selector: string | HTMLElement,
    anim: (el: HTMLElement) => void,
    opts: { start?: string; delay?: number } = {}
  ) {
    const el = typeof selector === 'string'
      ? document.querySelector<HTMLElement>(selector) : selector
    if (!el) return
    ScrollTrigger.create({
      trigger: el,
      start: opts.start ?? 'top 85%',
      once: true,
      onEnter: () => {
        if (opts.delay) gsap.delayedCall(opts.delay, () => anim(el))
        else anim(el)
      },
    })
  }

  // ── Headings: char-by-char stagger ──────────────────────────────────────────
  document.querySelectorAll<HTMLElement>('.story-content h2').forEach((h2) => {
    const rect = h2.getBoundingClientRect()
    if (rect.top < window.innerHeight) { gsap.set(h2, { opacity:1 }); return }
    gsap.set(h2, { opacity:1 })
    const words = (h2.textContent ?? '').split(' ')
    h2.innerHTML = words.map(w =>
      `<span style="display:inline-block;overflow:hidden;vertical-align:bottom">` +
      `<span class="word-inner" style="display:inline-block;will-change:transform">${w}</span></span> `
    ).join('')
    const inners = h2.querySelectorAll<HTMLElement>('.word-inner')
    gsap.set(inners, { y: '110%' })
    onEnter(h2, () => {
      gsap.to(inners, { y:'0%', duration:0.65, stagger:0.06, ease:'power3.out' })
    }, { start: 'top 82%' })
  })

  // ── story-content paragraphs: fade up ───────────────────────────────────────
  document.querySelectorAll<HTMLElement>('.story-content p, .story-date, .story-note').forEach((el) => {
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) { gsap.set(el, { opacity:1 }); return }
    gsap.set(el, { opacity:0, y:22 })
    onEnter(el, (e) => gsap.to(e, { opacity:1, y:0, duration:0.7, ease:'power2.out' }), { start:'top 88%' })
  })

  // ── DM bubble: scale + slide from left ──────────────────────────────────────
  onEnter('#dm-bubble', (el) => {
    gsap.fromTo(el,
      { opacity:0, x:-30, scale:0.92 },
      { opacity:1, x:0, scale:1, duration:0.75, ease:'back.out(1.5)' }
    )
  })

  // ── Talent cards: cascade with spring ───────────────────────────────────────
  document.querySelectorAll<HTMLElement>('.talent-card').forEach((card, i) => {
    gsap.set(card, { opacity:0, y:50, rotate: i%2===0 ? -4 : 4 })
    onEnter(card, (el) => {
      gsap.to(el, {
        opacity:1, y:0, rotate:0,
        duration:0.6, delay:i*0.1,
        ease:'back.out(1.4)',
      })
    }, { start:'top 90%' })
  })

  // ── Listen row: slide from sides ─────────────────────────────────────────────
  onEnter('#listen-row', (el) => {
    const children = el.children
    gsap.fromTo(children[0], { opacity:0, x:-30 }, { opacity:1, x:0, duration:0.6, ease:'power2.out' })
    gsap.fromTo(children[1], { opacity:0, scale:0.5 }, { opacity:1, scale:1, duration:0.5, delay:0.1, ease:'back.out(2)' })
    gsap.fromTo(children[2], { opacity:0, x:30 }, { opacity:1, x:0, duration:0.6, ease:'power2.out' })
  })

  // ── Ragebait: left/right swoosh ───────────────────────────────────────────────
  onEnter('#ragebait-row', (el) => {
    const sides = el.querySelectorAll('.ragebait-side')
    const arrow = el.querySelector('.ragebait-arrow')
    gsap.fromTo(sides[0], { opacity:0, x:-50, rotate:-8 }, { opacity:1, x:0, rotate:0, duration:0.7, ease:'back.out(1.4)' })
    gsap.fromTo(sides[1], { opacity:0, x:50, rotate:8 }, { opacity:1, x:0, rotate:0, duration:0.7, ease:'back.out(1.4)' })
    gsap.fromTo(arrow, { opacity:0, scale:0 }, { opacity:1, scale:1, duration:0.4, delay:0.3, ease:'back.out(2)' })
  })

  // ── GF react: pop up from below ───────────────────────────────────────────────
  onEnter('#gf-react', (el) => {
    gsap.fromTo(el, { opacity:0, y:30, scale:0.85 }, { opacity:1, y:0, scale:1, duration:0.65, ease:'back.out(1.7)' })
  })

  // ── Video scene ────────────────────────────────────────────────────────────────
  const videoText = document.getElementById('video-text')
  if (videoText) {
    gsap.set(videoText, { opacity:0, x:-40 })
    onEnter('#scene-video', () => {
      gsap.to(videoText, { opacity:1, x:0, duration:0.9, ease:'power3.out' })
    }, { start:'top 70%' })
  }

  const phone = document.querySelector<HTMLElement>('.our-video-phone')
  if (phone) {
    gsap.set(phone, { opacity:0, y:40, scale:0.92 })
    onEnter('#scene-video', () => {
      gsap.to(phone, { opacity:1, y:0, scale:1, duration:0.9, delay:0.15, ease:'back.out(1.3)' })
    }, { start:'top 70%' })
  }

  const videoEl   = document.getElementById('our-video') as HTMLVideoElement | null
  const videoBtn  = document.getElementById('our-video-btn')
  const videoWrap = document.getElementById('our-video-wrap')

  if (videoEl && videoBtn && videoWrap) {
    videoEl.addEventListener('error', () => {
      videoWrap.classList.add('no-video')
      videoBtn.style.display = 'none'
      const lbl = document.getElementById('no-video-label')
      if (lbl) lbl.style.display = 'flex'
    }, { once:true })

    videoBtn.addEventListener('click', () => {
      if (videoEl.paused) {
        videoEl.play().then(() => videoBtn.classList.add('is-playing')).catch(() => {})
      } else {
        videoEl.pause()
        videoBtn.classList.remove('is-playing')
      }
    })

    const videoObs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && !videoEl.paused) {
        videoEl.pause(); videoBtn.classList.remove('is-playing')
      }
    }, { threshold:0.2 })
    videoObs.observe(videoWrap)

    const preloadObs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && videoEl.preload === 'none') videoEl.preload = 'metadata'
    }, { rootMargin:'50% 0px' })
    preloadObs.observe(videoWrap)
  }

  // ── "Me when I see you" fixed pop-in ─────────────────────────────────────────
  const meWhen = document.getElementById('me-when-wrap')
  if (meWhen) {
    gsap.set(meWhen, { opacity:0, scale:0.7, x:20 })
    ScrollTrigger.create({ trigger:'#scene-official', start:'top center', once:true,
      onEnter:() => {
        gsap.to(meWhen, { opacity:1, scale:1, x:0, duration:0.6, ease:'back.out(1.7)' })
        gsap.to(meWhen, { opacity:0, duration:0.5, delay:5.5, ease:'power1.in' })
      }
    })
  }

  // ── Photos header ───────────────────────────────────────────────────────────
  const photosHeader = document.querySelector<HTMLElement>('.photos-header')
  if (photosHeader) {
    gsap.set(photosHeader, { opacity:0, y:24 })
    onEnter(photosHeader, (el) => gsap.to(el, { opacity:1, y:0, duration:0.75, ease:'power2.out' }))
  }

  // ── Pin tags: cascade stagger ────────────────────────────────────────────────
  const pinTags = document.querySelectorAll<HTMLElement>('.pin-tags .tag')
  if (pinTags.length) {
    gsap.set(pinTags, { opacity:0, y:12, scale:0.85 })
    ScrollTrigger.create({ trigger:'.pin-tags', start:'top 88%', once:true,
      onEnter: () => gsap.to(pinTags, { opacity:1, y:0, scale:1, duration:0.45, stagger:0.07, ease:'back.out(1.6)' })
    })
  }

  // ── Instagram header ─────────────────────────────────────────────────────────
  onEnter('.insta-header', (el) => {
    gsap.fromTo(el, { opacity:0, y:30 }, { opacity:1, y:0, duration:0.8, ease:'power2.out' })
  })
}

// ── Final message injection ────────────────────────────────────────────────────
function initFinalScene(): void {
  const section  = document.getElementById('scene-final')
  const envelope = section?.querySelector<HTMLElement>('.final__envelope')
  const message  = section?.querySelector<HTMLElement>('.final__message')
  const signoff  = section?.querySelector<HTMLElement>('.final__signoff')
  const catSleep = section?.querySelector<HTMLElement>('.final__cat-sleep')

  if (!message||!signoff) return
  message.textContent = birthdayMessage

  gsap.set([envelope,message,signoff,catSleep].filter(Boolean), { opacity:0 })
  gsap.set(message, { y:40 })
  gsap.set(signoff, { y:20 })

  ScrollTrigger.create({ trigger:section!, start:'top 75%', once:true,
    onEnter:() => gsap.timeline({ delay:0.1 })
      .to(envelope, { opacity:1, duration:0.8 })
      .to(message,  { opacity:1, y:0, duration:1.4, ease:'power2.out' }, '-=0.3')
      .to(signoff,  { opacity:1, y:0, duration:1.0, ease:'power2.out' }, '-=0.5')
      .to(catSleep, { opacity:1, duration:0.8, ease:'power2.out' }, '-=0.3')
  })

  if (catSleep) gsap.to(catSleep, { y:-8, duration:2.5, ease:'sine.inOut', yoyo:true, repeat:-1, delay:2 })
}

// ── Master init ────────────────────────────────────────────────────────────────
function init(): void {
  loadFonts()
  buildScaffold()
  initScroll()

  initIntro()
  initMeet()
  initPersonalityScene()
  initStoryScenes()
  initTimeline()
  buildPhotoBoard()
  buildInstaScene()
  initBirthday()
  initFinalScene()

  document.body.appendChild(createNav())
  requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()))
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
