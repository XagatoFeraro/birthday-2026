// ─── Media helpers ─────────────────────────────────────────────────────────
// Render images and videos with fallback, lazy loading, and scroll-aware
// resource management via IntersectionObserver.

function resolvePath(path: string): string {
  // import.meta.env.BASE_URL always has a trailing slash in Vite
  // e.g. '/' locally, '/birthday-2026/' on GitHub Pages
  const base = import.meta.env.BASE_URL // guaranteed trailing slash by Vite
  return base + path.replace(/^\//, '')
}

// ── Image ──────────────────────────────────────────────────────────────────
interface ImageOptions {
  src: string
  alt?: string
  className?: string
  objectPosition?: string
  eager?: boolean       // true = don't lazy-load (only for LCP images)
}

export function createImage(opts: ImageOptions): HTMLImageElement {
  const img = document.createElement('img')
  img.alt = opts.alt ?? ''
  img.decoding = 'async'
  img.loading = opts.eager ? 'eager' : 'lazy'
  if (opts.className) img.className = opts.className
  if (opts.objectPosition) img.style.objectPosition = opts.objectPosition

  const src = resolvePath(opts.src)

  // Graceful fallback: if image fails to load, hide the element
  img.addEventListener('error', () => {
    img.style.visibility = 'hidden'
    img.style.opacity = '0'
  }, { once: true })

  img.src = src
  return img
}

// ── Video ──────────────────────────────────────────────────────────────────
interface VideoOptions {
  src: string
  poster?: string
  className?: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  playsinline?: boolean
}

export function createVideo(opts: VideoOptions): HTMLVideoElement {
  const video = document.createElement('video')
  video.preload = 'none'              // Never preload; load only on play intent
  video.muted = opts.muted ?? true    // Always muted unless explicitly set
  video.loop = opts.loop ?? false
  video.playsInline = opts.playsinline ?? true
  video.setAttribute('playsinline', '')  // iOS Safari requires the attribute
  video.setAttribute('webkit-playsinline', '')
  if (opts.className) video.className = opts.className

  if (opts.poster) {
    video.poster = resolvePath(opts.poster)
  }

  // Source element — allows browser to pick best format if multiple provided
  const source = document.createElement('source')
  source.src = resolvePath(opts.src)
  source.type = opts.src.endsWith('.webm') ? 'video/webm' : 'video/mp4'
  video.appendChild(source)

  // Graceful fallback
  video.addEventListener('error', () => {
    video.style.display = 'none'
  }, { once: true })

  return video
}

// ── Scroll-aware video management ─────────────────────────────────────────
// Videos near the viewport get a preload hint; far-away videos stay unloaded.
export function observeVideo(video: HTMLVideoElement): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Near viewport — allow preloading metadata
          if (video.preload === 'none') {
            video.preload = 'metadata'
          }
        } else {
          // Far from viewport — pause and release
          if (!video.paused) {
            video.pause()
          }
        }
      })
    },
    { rootMargin: '50% 0px' }  // Start preloading 50vh before entering view
  )
  observer.observe(video)
}
