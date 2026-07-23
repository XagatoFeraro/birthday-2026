// ─── CSS Particles ────────────────────────────────────────────────────────
// Lightweight ambient environment particles.
// Max 12 particles total — CSS animation, zero JS loop.

const PARTICLE_CONFIG = [
  { type: 'heart', count: 4 },
  { type: 'dot',   count: 5 },
  { type: 'paw',   count: 3 },
] as const

type ParticleType = 'heart' | 'dot' | 'paw'

interface ParticleOptions {
  types?: ParticleType[]
  container?: HTMLElement
}

export function createParticles(opts: ParticleOptions = {}): HTMLElement {
  const types = opts.types ?? ['heart', 'dot']
  const container = opts.container ?? document.createElement('div')
  container.classList.add('particles')

  const cfg = PARTICLE_CONFIG.filter(c => types.includes(c.type))
  const total = cfg.reduce((n, c) => n + c.count, 0)

  cfg.forEach(({ type, count }) => {
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span')
      el.className = `particle particle--${type}`

      // Spread randomly across the container
      el.style.cssText = `
        left:     ${Math.random() * 90 + 5}%;
        bottom:   ${Math.random() * 20}%;
        animation-delay:    ${(Math.random() * total * 0.4).toFixed(2)}s;
        animation-duration: ${(3 + Math.random() * 4).toFixed(2)}s;
      `
      container.appendChild(el)
    }
  })

  return container
}
