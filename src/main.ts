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
import { initTimeline }   from './scenes/timeline'
import { initBirthday }   from './scenes/birthday'
import { birthdayMessage } from './data/memories'

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
  return `
    <div class="gif-wrap" style="width:${w}px;${rot}${extraStyle}">
      <iframe
        src="https://giphy.com/embed/${id}"
        class="giphy-embed"
        width="${w}" height="${w}"
        frameBorder="0"
        allowFullScreen
        title="${label || 'gif'}"
        loading="lazy"
      ></iframe>
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

  <!-- ═══════════════════════════════════════
       1. OPENING — Cat waves, "Hey Betuuu"
  ═══════════════════════════════════════ -->
  <section id="scene-intro" class="scene">
    <div class="intro__stage">
      <div class="intro__bg"></div>
      <div class="intro__deco"></div>

      <div class="opening-cat-wrap reveal-on-load" id="opening-cat">
        ${gif(GID.opening, 180, '', 0, 'margin:0 auto')}
      </div>

      <div class="opening-message reveal-on-load" id="opening-msg">
        <span class="opening-msg-line">psst... hey Betuuu 👀</span>
        <span class="opening-msg-line opening-msg-main">I made something<br/>just for you ♡</span>
      </div>

      <div class="intro__scroll-hint" aria-hidden="true">
        <span>scroll</span>
        <div class="intro__scroll-line"></div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════
       2. WHO — just Tanisha. Then Betuuu.
       (NO bridge line per request)
  ═══════════════════════════════════════ -->
  <section id="scene-who" class="scene" style="height:220dvh">
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
       11. MEMORIES TIMELINE
  ═══════════════════════════════════════ -->
  <section id="scene-timeline" class="scene">
    <div class="timeline__stage">
      <div class="timeline__track" id="timeline-track"></div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════
       12. BIRTHDAY CLIMAX
  ═══════════════════════════════════════ -->
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

// ── Opening scene animation ────────────────────────────────────────────────────
function initOpeningScene(): void {
  const cat  = document.getElementById('opening-cat')
  const msg  = document.getElementById('opening-msg')
  const hint = document.querySelector<HTMLElement>('.intro__scroll-hint')
  const bg   = document.querySelector<HTMLElement>('.intro__bg')
  const deco = document.querySelector<HTMLElement>('.intro__deco')
  const stage = document.querySelector<HTMLElement>('.intro__stage')

  // Petals
  if (deco) {
    const colors = ['#f4a7b0','#f8c8a0','#c8b8e8','#a8c8a4','#fde068']
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div')
      p.className = 'petal'
      p.style.cssText = `left:${5+Math.random()*90}%;bottom:${Math.random()*35}%;
        background:${colors[i%colors.length]};transform:rotate(${Math.random()*360}deg);
        animation:petal-drift ${3+Math.random()*4}s ${Math.random()*5}s ease-in-out infinite;
        width:${6+Math.random()*9}px;height:${9+Math.random()*12}px`
      deco.appendChild(p)
    }
  }

  // Pin intro
  const section = document.getElementById('scene-intro')!
  section.style.height = '140dvh'
  if (stage) {
    ScrollTrigger.create({ trigger:section, start:'top top', end:'bottom top', pin:stage })
  }

  // Entrance
  if (!cat || !msg) return
  gsap.set([cat, msg, hint, bg].filter(Boolean), { opacity:0 })
  gsap.set(cat, { y:30, scale:0.8 })
  gsap.set(msg, { y:20 })

  const atTop = window.scrollY < window.innerHeight * 0.12
  if (atTop) {
    gsap.timeline({ delay:0.2 })
      .to(bg,   { opacity:1, duration:1.4, ease:'power2.out' })
      .to(cat,  { opacity:1, y:0, scale:1, duration:1.0, ease:'back.out(1.3)' }, '-=1.0')
      .to(msg,  { opacity:1, y:0, duration:0.8, ease:'power2.out' }, '-=0.2')
      .to(hint, { opacity:1, duration:0.6 }, '+=0.4')
  } else {
    gsap.set([cat, msg, hint, bg].filter(Boolean), { opacity:1, y:0, scale:1 })
  }

  // Scroll exit
  gsap.timeline({ scrollTrigger:{ trigger:section, start:'50% top', end:'bottom top', scrub:0.7 } })
    .to([cat, msg], { opacity:0, y:-40, stagger:0.05, ease:'power2.in' }, 0)
    .to(bg,  { opacity:0 }, 0)
  gsap.to(hint, { opacity:0, scrollTrigger:{ trigger:section, start:'8% top', end:'22% top', scrub:0.4 } })
}

// ── Who scene ─────────────────────────────────────────────────────────────────
function initWhoScene(): void {
  const section  = document.getElementById('scene-who')
  const stage    = section?.querySelector<HTMLElement>('.who__stage')
  const nameEl   = document.getElementById('w-name')
  const nickEl   = document.getElementById('w-nick')
  if (!section||!stage||!nameEl||!nickEl) return

  ScrollTrigger.create({ trigger:section, start:'top top', end:'bottom top', pin:stage })

  gsap.set(nameEl, { opacity:0, y:50, scale:0.9 })
  gsap.set(nickEl, { opacity:0, y:80, scale:0.85, filter:'blur(16px)' })
  const S = 0.8
  gsap.to(nameEl, { opacity:1, y:0, scale:1, ease:'power3.out',
    scrollTrigger:{ trigger:section, start:'top top', end:'28% top', scrub:S } })
  gsap.to(nameEl, { opacity:0.15, scale:0.82, y:-40, ease:'power2.in',
    scrollTrigger:{ trigger:section, start:'30% top', end:'55% top', scrub:S } })
  gsap.to(nickEl, { opacity:1, y:0, scale:1, filter:'blur(0px)', ease:'power3.out',
    scrollTrigger:{ trigger:section, start:'50% top', end:'80% top', scrub:S } })
  gsap.to(nickEl, { opacity:0, y:-60, ease:'power2.in',
    scrollTrigger:{ trigger:section, start:'82% top', end:'98% top', scrub:S } })
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
  // Generic reveal: anything with data-reveal attribute
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.set(el, { opacity:0, y:25 })
    ScrollTrigger.create({ trigger:el, start:'top 82%', once:true,
      onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.7, ease:'power2.out' }) })
  })

  // DM bubble
  const dm = document.getElementById('dm-bubble')
  if (dm) {
    gsap.set(dm, { opacity:0, y:20, scale:0.95 })
    ScrollTrigger.create({ trigger:dm, start:'top 85%', once:true,
      onEnter:() => gsap.to(dm, { opacity:1, y:0, scale:1, duration:0.7, ease:'back.out(1.4)' }) })
  }

  // Talent cards stagger
  document.querySelectorAll<HTMLElement>('.talent-card').forEach((card, i) => {
    gsap.set(card, { opacity:0, y:40 })
    ScrollTrigger.create({ trigger:card, start:'top 88%', once:true,
      onEnter:() => gsap.to(card, { opacity:1, y:0, duration:0.55, delay:i*0.12, ease:'back.out(1.3)' }) })
  })

  // listen-row
  const lr = document.getElementById('listen-row')
  if (lr) {
    gsap.set(lr, { opacity:0, y:20 })
    ScrollTrigger.create({ trigger:lr, start:'top 85%', once:true,
      onEnter:() => gsap.to(lr, { opacity:1, y:0, duration:0.7, delay:0.2, ease:'power2.out' }) })
  }

  // Ragebait row
  const rbRow = document.getElementById('ragebait-row')
  if (rbRow) {
    gsap.set(rbRow, { opacity:0 })
    ScrollTrigger.create({ trigger:rbRow, start:'top 80%', once:true,
      onEnter:() => gsap.to(rbRow, { opacity:1, duration:0.7, ease:'power2.out' }) })
  }

  // GF react
  const gfReact = document.getElementById('gf-react')
  if (gfReact) {
    gsap.set(gfReact, { opacity:0, y:20 })
    ScrollTrigger.create({ trigger:gfReact, start:'top 85%', once:true,
      onEnter:() => gsap.to(gfReact, { opacity:1, y:0, duration:0.7, ease:'back.out(1.3)' }) })
  }

  // story-content blocks
  document.querySelectorAll<HTMLElement>('.story-content').forEach((el) => {
    gsap.set(el, { opacity:0, y:30 })
    ScrollTrigger.create({ trigger:el, start:'top 80%', once:true,
      onEnter:() => gsap.to(el, { opacity:1, y:0, duration:0.8, ease:'power2.out' }) })
  })

  // "Me when I see you" — appears fixed on screen near scene-official
  const meWhen = document.getElementById('me-when-wrap')
  if (meWhen) {
    gsap.set(meWhen, { opacity:0, x:20 })
    ScrollTrigger.create({ trigger:'#scene-official', start:'top center', once:true,
      onEnter:() => {
        gsap.to(meWhen, { opacity:1, x:0, duration:0.6, ease:'back.out(1.4)' })
        gsap.to(meWhen, { opacity:0, duration:0.5, delay:5, ease:'power1.in' })
      }
    })
  }
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

  initOpeningScene()
  initWhoScene()
  initPersonalityScene()
  initStoryScenes()
  initTimeline()
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
