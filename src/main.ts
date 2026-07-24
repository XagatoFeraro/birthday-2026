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
import { initPersonality } from './scenes/personality'
import { initTimeline }   from './scenes/timeline'
import { initBirthday }   from './scenes/birthday'
import { initFinal }      from './scenes/final'

gsap.registerPlugin(ScrollTrigger)

// ── GIF URLs ──────────────────────────────────────────────────────────────────
const GIF = {
  opening:   'https://media1.giphy.com/media/1OrIIOIcRTDaNidc5p/giphy.gif',
  naughty:   'https://media0.giphy.com/media/gSQp32H82WETR5EFO6/giphy.gif',
  kiss:      'https://media1.giphy.com/media/ytu2GUYbvhz7zShGwS/giphy.gif',
  work:      'https://media3.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif',
  ragebait:  'https://media2.giphy.com/media/YLPOIP1jPu1N87yemm/giphy.gif',
  adi:       'https://media2.giphy.com/media/TbRkubcqlgBksEqMv4/giphy.gif',
  meWhenISeeYou: 'https://media1.giphy.com/media/X3ewes5lWn41o6hUjy/giphy.gif',
  swim:      'https://media1.giphy.com/media/lJdylMw5uFZzO02anM/giphy.gif',
  sing:      'https://media4.giphy.com/media/b9qgtthvTGZoDWBtNq/giphy.gif',
  meListen:  'https://media4.giphy.com/media/bRTe2TGxczPVH50vxO/giphy.gif',
  dance:     'https://media3.giphy.com/media/3UkqVq3F50bVCi9URl/giphy.gif',
  girlfriend:'https://media1.giphy.com/media/TjSPQgowhhJdHgvnwA/giphy.gif',
  always:    'https://media3.giphy.com/media/UDORIcubjYvIBAYTe1/giphy.gif',
  beating:   'https://media3.giphy.com/media/6iqK0cXu38mR0qxyx2/giphy.gif',
}

// Random extra cat GIFs from Giphy CDN (public, no API needed)
const RANDOM_CATS = [
  'https://media2.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  'https://media3.giphy.com/media/mlvseq9yvZhba/giphy.gif',
  'https://media1.giphy.com/media/vFKqnCdLPNOKc/giphy.gif',
  'https://media2.giphy.com/media/BzyTuYCmvSORqs1ABM/giphy.gif',
  'https://media0.giphy.com/media/5i7umUqAOYYEw/giphy.gif',
]

function randomCat(): string {
  return RANDOM_CATS[Math.floor(Math.random() * RANDOM_CATS.length)]
}

function buildScaffold(): void {
  const app = document.getElementById('app')
  if (!app) return

  app.innerHTML = `

  <!-- ══════════════════════════════════
       SCENE 1 — OPENING
       Cat appears with message
  ══════════════════════════════════ -->
  <section id="scene-intro" class="scene" style="min-height:100dvh;background:var(--cream)">
    <div class="intro__stage" style="min-height:100dvh">
      <div class="intro__bg"></div>
      <div class="intro__deco"></div>
      <div class="opening-gif-wrap">
        <img class="opening-gif" src="${GIF.opening}" alt="Cat waving hello" loading="eager" decoding="async"/>
        <div class="opening-message" id="opening-msg">
          Psst... hey Betuuu 👀<br/>I made something for you ♡
        </div>
      </div>
      <div class="intro__scroll-hint" aria-hidden="true" style="position:absolute;bottom:calc(var(--sp-lg) + env(safe-area-inset-bottom))">
        <span>scroll</span>
        <div class="intro__scroll-line"></div>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════
       SCENE 2 — TANISHA
       Just her name. No bridge line.
  ══════════════════════════════════ -->
  <section id="scene-who" class="scene" style="height:200dvh">
    <div class="who__stage">
      <div class="who__bg"></div>
      <span class="who__word who__word--name">Tanisha.</span>
      <span class="who__word who__word--nick">Betuuu.</span>
    </div>
  </section>

  <!-- ══════════════════════════════════
       SCENE 3 — HER PERSONALITY / MOODS
       Meme cat cards
  ══════════════════════════════════ -->
  <section id="scene-personality" class="scene story-scene story-scene--alt">
    <div class="personality__intro">
      <h2>The Many Moods of Betuuu</h2>
      <p style="margin:0 auto">A completely scientific and 100% accurate study by Adi.</p>
    </div>
    <div class="meme-grid" style="margin-top:var(--sp-xl)"></div>
    <!-- floating random cat -->
    <div class="floating-gif" id="random-cat-1" style="position:absolute;top:8%;left:3%;width:90px;opacity:0">
      <img src="${randomCat()}" alt="" loading="lazy" style="width:100%;border-radius:12px"/>
    </div>
  </section>

  <!-- ══════════════════════════════════
       SCENE 4 — THE WORK SCENE
       Cloud Engineer at Airtel
  ══════════════════════════════════ -->
  <section class="scene story-scene story-scene--lavender" id="scene-work">
    <div style="position:absolute;top:10%;right:4%;width:110px;opacity:0;animation:float-bob 3s ease-in-out infinite" id="work-gif-float">
      <img src="${GIF.work}" alt="Cat on laptop" loading="lazy" style="width:100%;border-radius:14px;box-shadow:0 6px 20px rgba(0,0,0,0.15)"/>
      <p style="font-family:var(--font-note);font-size:var(--text-xs);color:var(--ink-ghost);text-align:center;margin-top:4px">basically Betuuu at work</p>
    </div>
    <div class="story-content">
      <span class="story-date">Airtel · Cloud Engineer</span>
      <h2>She basically runs the internet.</h2>
      <p>While Adi is out here doing whatever he does, Betuuu is literally keeping cloud infrastructure up at Airtel. A whole engineer. With a brain that just works.</p>
      <p class="story-note" style="margin-top:var(--sp-md)">Certified genius. Confirmed overqualified. Still texts back in 0.2 seconds though. 🌩️</p>
    </div>
    <div style="position:absolute;bottom:8%;left:5%;width:80px;opacity:0" id="adi-gif-work">
      <img src="${GIF.adi}" alt="Adi" loading="lazy" style="width:100%;border-radius:12px"/>
      <p style="font-family:var(--font-note);font-size:10px;color:var(--ink-ghost);text-align:center;margin-top:3px">this is Adi</p>
    </div>
  </section>

  <!-- ══════════════════════════════════
       SCENE 5 — HER TALENTS
       Swimming, Singing, Dancing
  ══════════════════════════════════ -->
  <section class="scene story-scene story-scene--pink" id="scene-talents">
    <div class="story-content" style="max-width:min(800px,92vw)">
      <span class="story-date">The Triple Threat</span>
      <h2>She swims. She sings. She dances.</h2>
      <p>All seriously. All beautifully. All making Adi forget how to speak normally.</p>
      <div class="talent-row">
        <div class="talent-card" style="--tc-tilt:-3deg">
          <img class="tc-gif" src="${GIF.swim}" alt="Swimming" loading="lazy"/>
          <span class="tc-label">Swimming 🏊‍♀️</span>
          <span class="tc-sub">cuts through water like she owns it</span>
        </div>
        <div class="talent-card" style="--tc-tilt:1deg">
          <img class="tc-gif" src="${GIF.sing}" alt="Singing" loading="lazy"/>
          <span class="tc-label">Singing 🎤</span>
          <span class="tc-sub">makes Adi go 🥺 every time</span>
        </div>
        <div class="talent-card" style="--tc-tilt:2.5deg">
          <img class="tc-gif" src="${GIF.dance}" alt="Dancing" loading="lazy"/>
          <span class="tc-label">Dancing 💃</span>
          <span class="tc-sub">moves like there's a soundtrack</span>
        </div>
      </div>
      <!-- Adi listening to her sing -->
      <div style="display:flex;align-items:center;justify-content:center;gap:var(--sp-md);margin-top:var(--sp-xl);flex-wrap:wrap">
        <div style="opacity:0;will-change:opacity" id="sing-gif2">
          <img src="${GIF.sing}" alt="" loading="lazy" style="width:90px;border-radius:12px;transform:rotate(-2deg)"/>
          <p style="font-family:var(--font-note);font-size:var(--text-xs);color:var(--ink-soft);text-align:center;margin-top:4px">her ↑</p>
        </div>
        <div style="font-family:var(--font-note);font-size:var(--text-xl);color:var(--ink-ghost)">♡</div>
        <div style="opacity:0;will-change:opacity" id="listen-gif">
          <img src="${GIF.meListen}" alt="" loading="lazy" style="width:90px;border-radius:12px;transform:rotate(2deg)"/>
          <p style="font-family:var(--font-note);font-size:var(--text-xs);color:var(--ink-soft);text-align:center;margin-top:4px">Adi ↑</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════
       SCENE 6 — HOW THEY MET
       1 August 2017, KV OEF Kanpur
  ══════════════════════════════════ -->
  <section class="scene story-scene" id="scene-origin">
    <!-- floating random cat top right -->
    <div style="position:absolute;top:6%;right:5%;width:85px;opacity:0;animation:float-bob 4s ease-in-out infinite" id="random-cat-2">
      <img src="${randomCat()}" alt="" loading="lazy" style="width:100%;border-radius:12px"/>
    </div>
    <div class="story-content">
      <span class="story-date">1 August 2017 · KV OEF, Kanpur</span>
      <h2>It started with a school corridor and a follow request.</h2>
      <p>Adi was a fresh 11th grader at KV OEF. Tanisha was in 9th. They crossed paths. Became friends within a month. Then one day, a DM arrived.</p>
      <div style="margin:var(--sp-lg) auto;background:white;border-radius:18px 18px 18px 4px;padding:var(--sp-md) var(--sp-lg);box-shadow:0 4px 20px rgba(0,0,0,0.08);max-width:320px;opacity:0;will-change:opacity" id="dm-bubble">
        <p style="font-family:var(--font-note);font-size:var(--text-lg);color:var(--ink);text-align:center;margin:0">
          "Aree request to accept kr lo" 😏
        </p>
        <p style="font-size:var(--text-xs);color:var(--ink-ghost);text-align:right;margin-top:var(--sp-xs)">— Tanisha, probably already knowing 😌</p>
      </div>
      <p>And just like that — 9 years of the best friendship and the best love story started with one cheeky DM.</p>
    </div>
  </section>

  <!-- ══════════════════════════════════
       SCENE 7 — RAGEBAIT
  ══════════════════════════════════ -->
  <section class="scene story-scene story-scene--alt" id="scene-ragebait">
    <div class="story-content">
      <span class="story-date">A daily tradition 😇</span>
      <h2>Adi's favourite hobby:<br/>Ragebaiting Betuuu.</h2>
      <p>There's an art to it. A science, even. Adi has mastered it. Betuuu has... strong feelings about this.</p>
      <div class="ragebait-row">
        <div>
          <img class="ragebait-gif" id="ragebait-gif" src="${GIF.ragebait}" alt="Ragebait" loading="lazy" style="width:clamp(100px,20vw,150px);border-radius:16px;box-shadow:0 8px 30px rgba(0,0,0,0.12)"/>
          <p style="font-family:var(--font-note);font-size:var(--text-xs);color:var(--ink-ghost);text-align:center;margin-top:6px">Adi doing the thing</p>
        </div>
        <div style="font-family:var(--font-display);font-size:var(--text-xl);font-style:italic;color:var(--ink-ghost);opacity:0" id="ragebait-vs">→</div>
        <div>
          <img class="ragebait-gif" id="beating-gif" src="${GIF.beating}" alt="Betuuu's reaction" loading="lazy" style="width:clamp(100px,20vw,150px);border-radius:16px;box-shadow:0 8px 30px rgba(0,0,0,0.12)"/>
          <p style="font-family:var(--font-note);font-size:var(--text-xs);color:var(--ink-ghost);text-align:center;margin-top:6px">Betuuu's response 😂</p>
        </div>
      </div>
      <p class="story-note" style="margin-top:var(--sp-lg)">And yet... she stays. That's love. 💀</p>
    </div>
    <!-- naughty cat floating -->
    <div style="position:absolute;bottom:10%;right:4%;width:100px;opacity:0;animation:float-bob 3.5s ease-in-out infinite;transform:rotate(5deg)" id="naughty-gif">
      <img src="${GIF.naughty}" alt="" loading="lazy" style="width:100%;border-radius:12px"/>
      <p style="font-family:var(--font-note);font-size:10px;color:var(--ink-ghost);text-align:center;margin-top:3px">when Adi is feeling naughty</p>
    </div>
  </section>

  <!-- ══════════════════════════════════
       SCENE 8 — OFFICIAL
       6 July 2019
  ══════════════════════════════════ -->
  <section class="scene story-scene story-scene--pink" id="scene-official">
    <div style="position:absolute;top:8%;left:5%;opacity:0;animation:float-bob 3s ease-in-out infinite" id="gf-gif-float" style="width:110px">
      <img src="${GIF.girlfriend}" alt="" loading="lazy" style="width:110px;border-radius:14px;box-shadow:0 6px 20px rgba(232,120,138,0.3)"/>
    </div>
    <div style="position:absolute;bottom:10%;right:4%;opacity:0;animation:float-bob 2.8s 0.8s ease-in-out infinite" id="kiss-gif-float">
      <img src="${GIF.kiss}" alt="" loading="lazy" style="width:100px;border-radius:14px;box-shadow:0 6px 20px rgba(0,0,0,0.12)"/>
    </div>
    <div class="story-content">
      <span class="story-date">6 July 2019 · Officially ♡</span>
      <h2>The day Adi became the luckiest person in Kanpur.</h2>
      <p>She'd just finished 10th. He'd just finished 12th. She transferred to Sir Padampat Singhania Education Center for 11th. And somewhere in all that transition — they became official.</p>
      <p class="story-note" style="margin-top:var(--sp-md)">7 years of relationship. 9 years of friendship. And Adi's face when she said yes? ↙️</p>
      <div style="margin-top:var(--sp-md);opacity:0;will-change:opacity" id="gf-react">
        <img src="${GIF.girlfriend}" alt="" loading="lazy" style="width:120px;border-radius:16px;margin:0 auto;box-shadow:0 8px 30px rgba(232,120,138,0.25)"/>
        <p style="font-family:var(--font-note);font-size:var(--text-sm);color:var(--ink-soft);margin-top:var(--sp-xs);text-align:center">literally Adi's internal state 😭</p>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════
       SCENE 9 — ALWAYS THERE
  ══════════════════════════════════ -->
  <section class="scene story-scene story-scene--sage" id="scene-always">
    <div style="position:absolute;top:8%;right:6%;opacity:0;animation:float-bob 3.2s ease-in-out infinite" id="always-gif-float">
      <img src="${GIF.always}" alt="" loading="lazy" style="width:110px;border-radius:14px;box-shadow:0 6px 20px rgba(0,0,0,0.1)"/>
      <p style="font-family:var(--font-note);font-size:10px;color:var(--ink-ghost);text-align:center;margin-top:4px">Adi whenever she needs him</p>
    </div>
    <div class="story-content">
      <span class="story-date">Every single day</span>
      <h2>Whenever she needs him,<br/>he's there.</h2>
      <p>Through every exam season, every bad day, every mood swing, every late-night rant about cloud infrastructure — Adi shows up. Every time. No questions asked.</p>
      <p class="story-note" style="margin-top:var(--sp-md)">That's the thing about us. We just show up. ♡</p>
    </div>
    <!-- random cat bottom left -->
    <div style="position:absolute;bottom:6%;left:4%;width:80px;opacity:0;animation:float-bob 4s 1s ease-in-out infinite" id="random-cat-3">
      <img src="${randomCat()}" alt="" loading="lazy" style="width:100%;border-radius:12px"/>
    </div>
  </section>

  <!-- ══════════════════════════════════
       SCENE 10 — MEMORIES TIMELINE
  ══════════════════════════════════ -->
  <section id="scene-timeline" class="scene">
    <div class="timeline__stage">
      <div class="timeline__track" id="timeline-track"></div>
    </div>
  </section>

  <!-- ══════════════════════════════════
       SCENE 11 — BIRTHDAY
  ══════════════════════════════════ -->
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

  <!-- ══════════════════════════════════
       SCENE 12 — FINAL MESSAGE
  ══════════════════════════════════ -->
  <section id="scene-final" class="scene">
    <div class="final__content">
      <div class="final__envelope">💌</div>
      <p class="final__message"></p>
      <p class="final__signoff">Happy Birthday, Betuuu. ♡<br/><span style="font-size:var(--text-base);font-style:normal;font-family:var(--font-note);color:var(--ink-ghost)">— Adi</span></p>
      <div class="final__cat-sleep">😸</div>
    </div>
  </section>

  <!-- "This is me when I see you" — random floating fixed element -->
  <div class="me-when-gif" id="me-when-gif">
    <img src="${GIF.meWhenISeeYou}" alt=""/>
    <p>this is me<br/>when I see you 🥺</p>
  </div>
  `
}

// ── Scene-specific scroll reveals ────────────────────────────────────────────
function initStoryScenes(): void {
  // Work scene
  revealOnEnter(['#work-gif-float', '#adi-gif-work'], '#scene-work')

  // Talents scene
  document.querySelectorAll<HTMLElement>('.talent-card').forEach((card, i) => {
    gsap.set(card, { opacity: 0, y: 30 })
    ScrollTrigger.create({
      trigger: card, start: 'top 85%', once: true,
      onEnter: () => gsap.to(card, { opacity:1, y:0, duration:0.5, delay:i*0.1, ease:'back.out(1.3)' }),
    })
  })
  revealOnEnter(['#sing-gif2', '#listen-gif'], '#scene-talents', '60%')

  // Origin scene
  revealOnEnter(['#random-cat-2'], '#scene-origin')
  ScrollTrigger.create({
    trigger: '#dm-bubble', start: 'top 80%', once: true,
    onEnter: () => gsap.to('#dm-bubble', { opacity:1, y:0, duration:0.7, ease:'back.out(1.4)' }),
  })
  gsap.set('#dm-bubble', { y: 20 })

  // Ragebait
  revealOnEnter(['#ragebait-gif', '#ragebait-vs', '#beating-gif', '#naughty-gif'], '#scene-ragebait')
  gsap.set('#ragebait-gif', { x: -20 })
  gsap.set('#beating-gif',  { x: 20 })

  // Official
  revealOnEnter(['#gf-gif-float', '#kiss-gif-float', '#gf-react'], '#scene-official')

  // Always there
  revealOnEnter(['#always-gif-float', '#random-cat-3'], '#scene-always')

  // Personality random cat
  revealOnEnter(['#random-cat-1'], '#scene-personality')

  // "Me when I see you" — appears mid-scroll, disappears
  ScrollTrigger.create({
    trigger: '#scene-official', start: 'top center',
    onEnter: () => {
      gsap.to('#me-when-gif', { opacity:1, duration:0.5, ease:'back.out(1.4)' })
      setTimeout(() => gsap.to('#me-when-gif', { opacity:0, duration:0.5, delay:3 }), 0)
    },
    once: true,
  })
}

function revealOnEnter(selectors: string[], trigger: string, start = 'top 75%'): void {
  selectors.forEach((sel, i) => {
    const el = document.querySelector<HTMLElement>(sel)
    if (!el) return
    ScrollTrigger.create({
      trigger, start, once: true,
      onEnter: () => gsap.to(el, { opacity:1, duration:0.6, delay:i*0.15, ease:'power2.out' }),
    })
  })
}

// ── Custom intro for new opening ─────────────────────────────────────────────
function initOpeningScene(): void {
  const gif = document.querySelector<HTMLImageElement>('.opening-gif')
  const msg = document.getElementById('opening-msg')
  const hint = document.querySelector<HTMLElement>('.intro__scroll-hint')
  const bg   = document.querySelector<HTMLElement>('.intro__bg')
  const deco = document.querySelector<HTMLElement>('.intro__deco')

  // Spawn petals in deco
  if (deco) {
    const colors = ['#f4a7b0','#f8c8a0','#c8b8e8','#a8c8a4']
    for (let i = 0; i < 16; i++) {
      const p = document.createElement('div')
      p.className = 'petal'
      p.style.cssText = `left:${5+Math.random()*90}%;bottom:${Math.random()*30}%;
        background:${colors[i%colors.length]};transform:rotate(${Math.random()*360}deg);
        animation:petal-drift ${3+Math.random()*4}s ${Math.random()*4}s ease-in-out infinite;
        width:${7+Math.random()*7}px;height:${10+Math.random()*10}px`
      deco.appendChild(p)
    }
  }

  if (!gif || !msg || !hint) return

  gsap.set([gif, msg, hint, bg].filter(Boolean), { opacity: 0 })
  gsap.set(gif, { scale: 0.8, y: 20 })
  gsap.set(msg, { y: 15 })

  const atTop = window.scrollY < window.innerHeight * 0.1
  if (atTop) {
    gsap.timeline({ delay: 0.3 })
      .to(bg,   { opacity: 1, duration: 1.5, ease: 'power2.out' })
      .to(gif,  { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'back.out(1.3)' }, '-=1.0')
      .to(msg,  { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.2')
      .to(hint, { opacity: 1, duration: 0.6 }, '+=0.5')
  } else {
    gsap.set([gif, msg, hint, bg].filter(Boolean), { opacity:1, y:0, scale:1 })
  }

  // Pin + exit
  const stage = document.querySelector<HTMLElement>('.intro__stage')
  const section = document.getElementById('scene-intro')
  if (stage && section) {
    ScrollTrigger.create({ trigger:section, start:'top top', end:'bottom top', pin:stage })
    gsap.timeline({ scrollTrigger:{ trigger:section, start:'40% top', end:'bottom top', scrub:0.7 } })
      .to([gif, msg], { opacity:0, y:-40, stagger:0.05, ease:'power2.in' }, 0)
      .to(hint, { opacity:0 }, 0)
      .to(bg,   { opacity:0 }, 0)
  }
}

// ── "Who Is Betuuu" — simplified, no bridge line ─────────────────────────────
function initWhoScene(): void {
  const section = document.getElementById('scene-who')
  const stage   = section?.querySelector<HTMLElement>('.who__stage')
  const nameEl  = section?.querySelector<HTMLElement>('.who__word--name')
  const nickEl  = section?.querySelector<HTMLElement>('.who__word--nick')
  if (!section||!stage||!nameEl||!nickEl) return

  ScrollTrigger.create({ trigger:section, start:'top top', end:'bottom top', pin:stage })

  gsap.set(nameEl, { opacity:0, y:50, scale:0.9 })
  gsap.set(nickEl, { opacity:0, y:80, scale:0.85, filter:'blur(16px)' })

  // Name in (0–35%)
  gsap.to(nameEl, { opacity:1, y:0, scale:1, ease:'power3.out',
    scrollTrigger:{ trigger:section, start:'top top', end:'35% top', scrub:0.8 } })
  // Name dims (28–55%)
  gsap.to(nameEl, { opacity:0.15, scale:0.82, y:-40, ease:'power2.in',
    scrollTrigger:{ trigger:section, start:'30% top', end:'58% top', scrub:0.8 } })
  // Betuuu erupts (50–80%)
  gsap.to(nickEl, { opacity:1, y:0, scale:1, filter:'blur(0px)', ease:'power3.out',
    scrollTrigger:{ trigger:section, start:'50% top', end:'80% top', scrub:0.8 } })
  // Exit (82–98%)
  gsap.to(nickEl, { opacity:0, y:-60, ease:'power2.in',
    scrollTrigger:{ trigger:section, start:'82% top', end:'98% top', scrub:0.8 } })
}

function init(): void {
  loadFonts()
  buildScaffold()
  initScroll()

  initOpeningScene()
  initWhoScene()
  initPersonality()
  initStoryScenes()
  initTimeline()
  initBirthday()
  initFinal()

  document.body.appendChild(createNav())

  requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()))
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
