// ─── Scene: Instagram ─────────────────────────────────────────────────────────
// Uses Instagram oEmbed blockquotes (no API key needed for public posts).
// If blocked, shows a beautiful "follow her on Instagram" note instead.
//
// TO ADD REAL POST EMBEDS: Replace the placeholder URLs below with actual
// post URLs from @taniisha.tripathii. Format: https://www.instagram.com/p/CODE/
// Get embed code from any post: tap ⋯ → Share → Embed.

export function buildInstaScene(): void {
  const section = document.getElementById('scene-insta')
  if (!section) return

  const grid = section.querySelector<HTMLElement>('.insta-grid')
  if (!grid) return

  // Placeholder post URLs — replace with real post URLs from her profile
  // Example format: 'https://www.instagram.com/p/ABC123xyz/'
  const POST_URLS: string[] = [
    // 'https://www.instagram.com/p/YOUR_POST_1/',
    // 'https://www.instagram.com/p/YOUR_POST_2/',
    // 'https://www.instagram.com/p/YOUR_POST_3/',
  ]

  if (POST_URLS.length === 0) {
    // No posts configured — show the "find her here" note
    grid.innerHTML = `
      <div class="insta-blocked-note">
        <h3>The real content lives here ✨</h3>
        <p>Follow <strong>@taniisha.tripathii</strong> on Instagram for daily proof that she is, in fact, that girl.</p>
        <a
          href="https://www.instagram.com/taniisha.tripathii"
          target="_blank" rel="noopener"
          class="insta-handle"
          style="margin:var(--sp-md) auto 0;display:inline-flex"
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
          @taniisha.tripathii
        </a>
      </div>
    `
    return
  }

  // Render actual Instagram embeds
  POST_URLS.forEach((url) => {
    const wrap = document.createElement('div')
    wrap.className = 'insta-post-wrap'
    wrap.innerHTML = `
      <div class="embed-loading">Loading Instagram post...</div>
      <blockquote
        class="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink="${url}"
        data-instgrm-version="14"
        style="background:#fff;border:0;border-radius:var(--r-lg);margin:0;width:100%;min-width:unset"
      ></blockquote>
    `
    grid.appendChild(wrap)
  })

  // Load Instagram embed.js
  const script = document.createElement('script')
  script.src = 'https://www.instagram.com/embed.js'
  script.async = true
  script.onload = () => {
    // Remove loading placeholders once embeds process
    document.querySelectorAll<HTMLElement>('.embed-loading').forEach(el => el.remove())
    // @ts-ignore
    if (window.instgrm) window.instgrm.Embeds.process()
  }
  document.body.appendChild(script)
}
