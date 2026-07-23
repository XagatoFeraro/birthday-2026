// ─── BETUUU — A Cinematic Interactive Birthday Story ─────────────────────────
import './styles/tokens.css'
import './styles/base.css'
import './styles/scenes.css'

import { initScroll } from './utils/scroll'
import { createNav }  from './components/nav'
import { initIntro }  from './scenes/intro'
import { initMeet }   from './scenes/meet'
import { initTimeline } from './scenes/timeline'
import { initBirthday } from './scenes/birthday'
import { initFinal }    from './scenes/final'

function buildScaffold(): void {
  const app = document.getElementById('app')
  if (!app) return
  app.innerHTML = `
    <section id="scene-intro" class="scene">
      <div class="intro__stage">
        <div data-cat="intro"></div>
        <p class="intro__line intro__line--whisper">pspspsps...</p>
        <h1 class="intro__line intro__line--main">Hey Betuuu...</h1>
        <p class="intro__line intro__line--sub">I made something for you.</p>
        <div class="intro__scroll-hint" aria-hidden="true">
          <span>scroll</span>
          <div class="intro__scroll-arrow"></div>
        </div>
      </div>
    </section>

    <section id="scene-meet" class="scene">
      <div class="meet__stage">
        <span class="meet__word meet__word--name">Tanisha.</span>
        <span class="meet__word meet__word--bridge">But I call her something else.</span>
        <span class="meet__word meet__word--nickname">Betuuu.</span>
      </div>
    </section>

    <section id="scene-timeline" class="scene">
      <div class="timeline__stage">
        <div class="timeline__track" id="timeline-track"></div>
      </div>
    </section>

    <section id="scene-birthday" class="scene">
      <div class="birthday__stage">
        <div class="birthday__bloom"></div>
        <p class="birthday__date">25 July</p>
        <h2 class="birthday__greeting">Happy Birthday,</h2>
        <h2 class="birthday__name">Betuuu.</h2>
        <div data-cat="birthday" style="margin-top:var(--space-lg)"></div>
      </div>
    </section>

    <section id="scene-final" class="scene">
      <div class="final__content">
        <p class="final__message"></p>
        <p class="final__sign-off">Happy Birthday, Betuuu.</p>
        <div class="final__kitten" data-cat="final"></div>
      </div>
    </section>
  `
}

function init(): void {
  buildScaffold()
  initScroll()

  // Scene animations — order matters: DOM must be built before GSAP runs
  initIntro()
  initMeet()
  initTimeline()
  initBirthday()
  initFinal()

  document.body.appendChild(createNav())
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
