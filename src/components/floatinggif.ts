// ─── Floating GIF Component ───────────────────────────────────────────────────
// GIFs are small, floating, positioned within scenes — not full-width blocks.
// They evoke meme culture without dominating the layout.

export interface FloatingGif {
  url: string
  label?: string          // optional caption below
  size?: 'xs' | 'sm' | 'md'  // xs=80px, sm=120px, md=160px
  position?: string       // CSS: 'top:10%;right:5%' etc
  rotate?: number         // degrees
  delay?: number          // GSAP entrance delay
}

const SIZE_MAP = { xs: 80, sm: 120, md: 160 }

export function createFloatingGif(gif: FloatingGif): HTMLElement {
  const size   = SIZE_MAP[gif.size ?? 'sm']
  const rotate = gif.rotate ?? 0

  const wrap = document.createElement('div')
  wrap.className = 'floating-gif'
  wrap.setAttribute('aria-hidden', 'true')
  wrap.style.cssText = `
    position:absolute;
    ${gif.position ?? 'top:10%;right:5%'};
    width:${size}px;
    transform:rotate(${rotate}deg);
    z-index:25;
    pointer-events:none;
    opacity:0;
    will-change:transform,opacity;
    filter:drop-shadow(0 4px 12px rgba(0,0,0,0.18));
  `

  const img = document.createElement('img')
  img.src    = gif.url
  img.alt    = gif.label ?? ''
  img.loading = 'lazy'
  img.decoding = 'async'
  img.style.cssText = `
    width:100%;
    border-radius:12px;
    display:block;
  `

  // Graceful fallback
  img.addEventListener('error', () => { wrap.style.display = 'none' }, { once: true })

  wrap.appendChild(img)

  if (gif.label) {
    const cap = document.createElement('p')
    cap.textContent = gif.label
    cap.style.cssText = `
      font-family:var(--font-note);
      font-size:var(--text-xs);
      color:var(--ink-ghost);
      text-align:center;
      margin-top:4px;
      line-height:1.3;
    `
    wrap.appendChild(cap)
  }

  return wrap
}

// Inject multiple floating GIFs into a scene and return elements for GSAP
export function injectGifs(scene: HTMLElement, gifs: FloatingGif[]): HTMLElement[] {
  return gifs.map(gif => {
    const el = createFloatingGif(gif)
    scene.appendChild(el)
    return el
  })
}
