// ─── BETUUU — Birthday 2026 ───────────────────────────────────────────────────
import './styles/tokens.css'
import './styles/base.css'
import './styles/scenes.css'

import { gsap }          from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { loadFonts }     from './utils/fonts'
import { initScroll }    from './utils/scroll'
import { createNav }     from './components/nav'
import { createRunningCat } from './components/memecats'
import { initIntro }     from './scenes/intro'
import { initMeet }      from './scenes/meet'
import { initPersonality } from './scenes/personality'
import { initTimeline }  from './scenes/timeline'
import { initBirthday }  from './scenes/birthday'
import { initFinal }     from './scenes/final'

gsap.registerPlugin(ScrollTrigger)

function buildScaffold(): void {
  const app = document.getElementById('app')
  if (!app) return
  app.innerHTML = `
    <!-- 1. INTRO -->
    <section id="scene-intro" class="scene">
      <div class="intro__stage">
        <div class="intro__bg"></div>
        <div class="intro__deco"></div>
        <div class="intro__cat-wrap"></div>
        <p class="intro__whisper">pspspsps...</p>
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
        <span class="who__word who__word--name">Tanisha.</span>
        <span class="who__word who__word--bridge">But I call her something else.</span>
        <span class="who__word who__word--nick">Betuuu.</span>
      </div>
    </section>

    <!-- 3. HER PERSONALITY -->
    <section id="scene-personality" class="scene">
      <div class="personality__intro">
        <h2>The Many Moods of Betuuu</h2>
        <p>A completely scientific and totally accurate study.</p>
      </div>
      <div class="meme-grid"></div>
    </section>

    <!-- 4. MEMORIES -->
    <section id="scene-timeline" class="scene">
      <div class="timeline__stage">
        <div class="timeline__track" id="timeline-track"></div>
      </div>
    </section>

    <!-- 5. BIRTHDAY -->
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

    <!-- 6. FINAL -->
    <section id="scene-final" class="scene">
      <div class="final__content">
        <div class="final__envelope">💌</div>
        <p class="final__message"></p>
        <p class="final__signoff">Happy Birthday, Betuuu. ♡</p>
        <div class="final__cat-sleep">😸</div>
      </div>
    </section>
  `
}

// ── Easter egg: running cat crosses screen mid-scroll ─────────────────────────
function initRunningCat(): void {
  const cat = createRunningCat()
  document.body.appendChild(cat)
  let triggered = false

  ScrollTrigger.create({
    trigger: '#scene-personality',
    start: 'center center',
    onEnter: () => {
      if (triggered) return
      triggered = true
      gsap.to(cat, {
        x: window.innerWidth + 80,
        duration: 2.2,
        ease: 'power1.inOut',
        delay: 0.5,
        onComplete: () => cat.remove(),
      })
    },
  })
}

function init(): void {
  loadFonts()
  buildScaffold()
  initScroll()

  initIntro()
  initMeet()
  initPersonality()
  initTimeline()
  initBirthday()
  initFinal()

  document.body.appendChild(createNav())
  initRunningCat()

  // Double-RAF refresh after layout settles
  requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()))
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
