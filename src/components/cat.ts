// ─── Cat character — real image from cataas.com ───────────────────────────────
// Replaces the SVG character with a real cat photo.
// Returns an <img> element styled as the character.
// onerror fallback ensures layout never breaks.

export type KittenState = 'idle' | 'sit' | 'walk' | 'look' | 'curl'

// Different cat "moods" for different scenes
const CAT_URLS: Record<string, string> = {
  default: 'https://cataas.com/cat/cute?width=200&height=200&type=square',
  intro:   'https://cataas.com/cat/cute?width=220&height=220&type=square',
  birthday:'https://cataas.com/cat/birthday?width=180&height=180&type=square',
  final:   'https://cataas.com/cat?width=160&height=160&type=square&seed=final',
}

export function createKitten(className = '', scene = 'default'): HTMLElement {
  const wrap = document.createElement('div')
  wrap.className = `kitten-wrap ${className}`
  wrap.setAttribute('aria-hidden', 'true')
  wrap.setAttribute('data-cat-part', 'root')

  const url = CAT_URLS[scene] ?? CAT_URLS.default

  wrap.innerHTML = `
    <img
      src="${url}"
      alt=""
      loading="eager"
      decoding="async"
      class="kitten-img"
      data-cat-part="body"
      onerror="this.style.display='none';this.parentElement.innerHTML='<span style=font-size:3rem>🐱</span>'"
    />
  `
  return wrap
}

// For scenes that query [data-cat-part="tail"] — no-op shim so animations don't crash
export function setKittenState(_el: HTMLElement, _state: KittenState): void {}
