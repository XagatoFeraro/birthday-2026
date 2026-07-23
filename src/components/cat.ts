// ─── Kitten SVG character ─────────────────────────────────────────────────
// Lightweight inline SVG. All paths kept minimal for performance.
// Animation states applied via CSS classes or GSAP transforms on
// named groups, NOT individual path animations.
//
// Named elements (data-cat-part) for GSAP targeting:
//   body, head, ears, tail, face, whiskers

export type KittenState = 'idle' | 'sit' | 'walk' | 'look' | 'curl'

export function createKitten(className = ''): SVGSVGElement {
  const ns = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(ns, 'svg')
  svg.setAttribute('viewBox', '0 0 120 130')
  svg.setAttribute('xmlns', ns)
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('role', 'img')
  if (className) svg.setAttribute('class', className)

  // Warm ink color from design tokens (resolved at runtime)
  const ink = 'var(--color-ink, #3a2e2b)'
  const soft = 'var(--color-ink-soft, #7a6b65)'
  const bg   = 'var(--color-bg, #fdf8f3)'

  svg.innerHTML = `
    <!-- Body -->
    <g data-cat-part="body">
      <ellipse cx="60" cy="92" rx="28" ry="24" fill="${ink}" />
    </g>

    <!-- Tail -->
    <g data-cat-part="tail" style="transform-origin: 32px 100px">
      <path d="M32 100 Q10 80 18 60 Q22 50 30 58"
            fill="none" stroke="${ink}" stroke-width="7"
            stroke-linecap="round" />
    </g>

    <!-- Head -->
    <g data-cat-part="head" style="transform-origin: 60px 62px">
      <!-- Head base -->
      <ellipse cx="60" cy="62" rx="22" ry="20" fill="${ink}" />

      <!-- Ears -->
      <g data-cat-part="ears">
        <polygon points="40,48 44,30 54,46" fill="${ink}" />
        <polygon points="80,48 76,30 66,46" fill="${ink}" />
        <!-- Inner ear -->
        <polygon points="41,46 44,33 52,45" fill="${soft}" />
        <polygon points="79,46 76,33 68,45" fill="${soft}" />
      </g>

      <!-- Face -->
      <g data-cat-part="face">
        <!-- Eyes -->
        <ellipse cx="52" cy="60" rx="4.5" ry="5" fill="${bg}" />
        <ellipse cx="68" cy="60" rx="4.5" ry="5" fill="${bg}" />
        <!-- Pupils -->
        <ellipse cx="52.5" cy="60.5" rx="2.5" ry="3.5" fill="${ink}" />
        <ellipse cx="68.5" cy="60.5" rx="2.5" ry="3.5" fill="${ink}" />
        <!-- Eye shine -->
        <circle cx="53.5" cy="58.5" r="1" fill="${bg}" />
        <circle cx="69.5" cy="58.5" r="1" fill="${bg}" />

        <!-- Nose -->
        <polygon points="60,67 57.5,70 62.5,70" fill="${soft}" />

        <!-- Mouth -->
        <path d="M57.5 70 Q60 73 62.5 70"
              fill="none" stroke="${soft}" stroke-width="1.2"
              stroke-linecap="round" />
      </g>

      <!-- Whiskers -->
      <g data-cat-part="whiskers" stroke="${soft}" stroke-width="0.9" stroke-linecap="round">
        <line x1="35" y1="66" x2="52" y2="68" />
        <line x1="34" y1="69" x2="51" y2="70" />
        <line x1="36" y1="72" x2="52" y2="71" />
        <line x1="85" y1="66" x2="68" y2="68" />
        <line x1="86" y1="69" x2="69" y2="70" />
        <line x1="84" y1="72" x2="68" y2="71" />
      </g>
    </g>

    <!-- Paws -->
    <g data-cat-part="paws">
      <ellipse cx="44" cy="114" rx="8" ry="5" fill="${ink}" />
      <ellipse cx="76" cy="114" rx="8" ry="5" fill="${ink}" />
    </g>
  `

  return svg
}

// ── Apply animation state class ──────────────────────────────────────────────
export function setKittenState(svg: SVGSVGElement, state: KittenState): void {
  svg.setAttribute('data-state', state)
}
