# birthday-2026 ♡

A cinematic interactive birthday story for Betuuu — built with Vite, TypeScript, GSAP, and Lenis.

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build locally
```

## Add your content

### Photos
Drop `.webp` or `.jpg` files into `public/images/memories/`:
```
public/images/memories/photo-01.webp
public/images/memories/photo-02.webp
...
```
Recommended: **1200×800px**, under **300KB** each. Convert with [Squoosh](https://squoosh.app).

### Videos
Drop `.mp4` files into `public/videos/`:
```
public/videos/memory-01.mp4
```
Recommended: **1080p max**, H.264, under **20MB** each.

### Edit memories
Open `src/data/memories.ts` and fill in each entry:
```ts
{
  id: 'memory-01',
  date: 'March 2023',          // displayed in scene
  title: 'How we met',         // scene heading
  description: 'The story...', // body text
  layout: 'full',              // full | float | polaroid | note | video
  image: 'images/memories/photo-01.webp',
  accent: '#f9e0d0',           // optional scene background tint
}
```

### Edit birthday message
Open `src/data/memories.ts`, scroll to the bottom, edit `birthdayMessage`.

### Add music (optional)
1. Drop `song.mp3` into `public/music/`
2. Open `src/data/settings.ts` and set `music.enabled: true`

## GitHub Pages deployment

### First-time setup
1. Push to `main` branch (GitHub Actions handles the rest)
2. Go to repo **Settings → Pages → Source → GitHub Actions**
3. Site will be live at: `https://XagatoFeraro.github.io/birthday-2026/`

### Updating content
```bash
git add .
git commit -m "feat: add memories and photos"
git push
```
GitHub Actions will auto-build and deploy in ~2 minutes.

### Change repo name
If you rename the repo, update `VITE_BASE_PATH` in `.github/workflows/deploy.yml`:
```yaml
VITE_BASE_PATH: /new-repo-name/
```

## Self-hosted fonts (optional, faster)
Download from Google Fonts and place in `public/fonts/`:
- `CormorantGaramond-Regular.woff2`
- `CormorantGaramond-Italic.woff2`
- `Caveat-Regular.woff2`

## Troubleshooting

| Problem | Fix |
|---|---|
| Blank page on GitHub Pages | Check `VITE_BASE_PATH` in workflow matches repo name exactly |
| Images not loading | Confirm files are in `public/images/memories/` and path in `memories.ts` matches |
| Videos not playing on iOS | Ensure `.mp4` is H.264, add `playsinline` attribute (already handled) |
| Animations don't reverse | All animations use GSAP scrub — should reverse naturally |
| Build fails | Run `npm run build` locally first to see TypeScript errors |
