// ─── Global story settings ────────────────────────────────────────────────────
// Edit this file to configure the website for your story.

export const settings = {
  name: 'Tanisha',
  nickname: 'Betuuu',
  birthday: { day: 25, month: 7, year: 2025 }, // July 25
  music: {
    enabled: false,        // Set to true once you add public/music/song.mp3
    file: 'music/song.mp3',
    autoplay: false,       // User must explicitly start music
  },
} as const
