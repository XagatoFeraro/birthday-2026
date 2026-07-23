// ─── Viewport utilities ───────────────────────────────────────────────────────

// True viewport height accounting for mobile browser chrome.
// Prefers dvh; falls back to innerHeight for Safari < 15.5.
export function dvh(units: number): number {
  if (CSS.supports('height', '1dvh')) {
    // Return as a pixel value from the CSS unit
    const el = document.createElement('div')
    el.style.cssText = `position:fixed;top:0;height:${units}dvh;pointer-events:none;visibility:hidden`
    document.documentElement.appendChild(el)
    const px = el.getBoundingClientRect().height
    el.remove()
    return px
  }
  return (window.innerHeight * units) / 100
}

// Stable large viewport height — excludes dynamic toolbar
export function lvh(units: number): number {
  if (CSS.supports('height', '1lvh')) {
    const el = document.createElement('div')
    el.style.cssText = `position:fixed;top:0;height:${units}lvh;pointer-events:none;visibility:hidden`
    document.documentElement.appendChild(el)
    const px = el.getBoundingClientRect().height
    el.remove()
    return px
  }
  return (window.innerHeight * units) / 100
}

// Current viewport width
export function vw(): number {
  return window.innerWidth
}

// Named breakpoints (capability-based, not device-sniffing)
export const bp = {
  mobile:  640,
  tablet:  1023,
  desktop: 1024,
} as const

export function isMobile():  boolean { return vw() <= bp.mobile  }
export function isTablet():  boolean { return vw() > bp.mobile && vw() <= bp.tablet }
export function isDesktop(): boolean { return vw() >= bp.desktop }
