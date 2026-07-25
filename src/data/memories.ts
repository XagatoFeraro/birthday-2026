// ─── Story Content ─────────────────────────────────────────────────────────────
// Edit this file to add your real photos and personal details.
// Photo paths are relative to public/ folder.

export interface Memory {
  id: string
  date: string
  title: string
  description: string
  layout: 'full' | 'float' | 'polaroid' | 'note' | 'video'
  image?: string
  video?: string
  location?: string
  accent?: string
}

export const memories: Memory[] = [
  {
    id: 'memory-01',
    date: '1 August 2017',
    title: 'The very beginning.',
    description: 'A school corridor in KV OEF, Kanpur. An 11th grader. A 9th grader. Neither of them knew this was the start of everything.',
    layout: 'note',
    accent: '#fde8ec',
  },
  {
    id: 'memory-02',
    date: 'August 2017',
    title: '"Aree request to accept kr lo." 😏',
    description: 'One DM. One line. Nine years of everything that followed.',
    layout: 'note',
    accent: '#ede8f8',
  },
  {
    id: 'memory-03',
    date: 'Add your photo here ♡',
    title: '[ Add an early memory ]',
    description: '[ Drop together-01.webp in public/images/together/ and fill this in ]',
    layout: 'full',
    image: 'images/together/together-01.webp',
    accent: '#fdf3e3',
  },
  {
    id: 'memory-04',
    date: '6 July 2019',
    title: 'The day it became official.',
    description: 'She said yes. He still hasn\'t recovered. 7 years and counting.',
    layout: 'polaroid',
    image: 'images/together/together-02.webp',
    accent: '#fde8ec',
  },
  {
    id: 'memory-05',
    date: 'Add your photo here ♡',
    title: '[ Add a favourite memory ]',
    description: '[ Drop together-03.webp in public/images/together/ and fill this in ]',
    layout: 'float',
    image: 'images/together/together-03.webp',
    accent: '#d8ead6',
  },
]

// ── Video moment ───────────────────────────────────────────────────────────────
// Add your video to public/videos/our-video.mp4
// Add a poster image to public/videos/our-video-poster.webp
export const ourVideo = {
  src:    'videos/our-video.mp4',
  poster: 'videos/our-video-poster.webp',
  title:  'Us.',
  caption: 'Some moments deserve to be watched, not described.',
}

// ── Final birthday message — edit this ───────────────────────────────────────
export const birthdayMessage = `Betuuu,

Nine years ago you sent one cheeky DM and accidentally ruined my life in the best possible way.

You are a cloud engineer keeping Airtel's internet running, a singer who makes everything stop, a swimmer who owns the water, and a dancer who moves like the music was made for her.

You are also the most dramatic, most adorable, most infuriatingly loveable person I know. And yes — I ragebait you because you're cute when you're angry. Sorry not sorry. 😇

7 years of us. 9 years of this friendship. And I would choose this every single time.

Happy Birthday, Betuuu. This tiny universe I made — every bit of it is yours.

— Adi ♡`
