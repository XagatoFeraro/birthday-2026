export function loadFonts(): void {
  // Non-blocking Google Fonts — Playfair Display + DM Sans + Caveat
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@300;400;500&family=Caveat:wght@400;600&display=swap'
  link.media = 'print'
  link.onload = () => { link.media = 'all' }
  document.head.appendChild(link)
}
