// ─── Font loader ──────────────────────────────────────────────────────────────
// Injects @font-face rules using the correct BASE_URL so fonts resolve on
// both local dev (/) and GitHub Pages subpath (/birthday-2026/).
// Falls back gracefully to Google Fonts (loaded in index.html) if files absent.

export function loadFonts(): void {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')

  const faces = [
    {
      family: 'Cormorant Garamond',
      weight: '400',
      style:  'normal',
      file:   'fonts/CormorantGaramond-Regular.woff2',
    },
    {
      family: 'Cormorant Garamond',
      weight: '400',
      style:  'italic',
      file:   'fonts/CormorantGaramond-Italic.woff2',
    },
    {
      family: 'Caveat',
      weight: '400',
      style:  'normal',
      file:   'fonts/Caveat-Regular.woff2',
    },
  ]

  const css = faces
    .map(
      (f) => `@font-face {
  font-family: '${f.family}';
  src: local('${f.family}'), url('${base}/${f.file}') format('woff2');
  font-weight: ${f.weight};
  font-style: ${f.style};
  font-display: swap;
}`
    )
    .join('\n')

  const style = document.createElement('style')
  style.textContent = css
  document.head.appendChild(style)
}
