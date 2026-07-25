export interface Memory {
  id: string
  date: string
  title: string
  description: string
  layout: 'full' | 'float' | 'polaroid' | 'note' | 'video'
  image?: string
  images?: string[]
  video?: string
  location?: string
  accent?: string
  portrait?: boolean  // true = image is portrait/vertical, don't crop it
}

export const memories: Memory[] = [
  {
    id: 'memory-01',
    date: '1 August 2017',
    title: 'The very beginning.',
    description: 'KV OEF, Kanpur. An 11th grader named Adi. A 9th grader named Tanisha. Neither of them knew this was the start of everything.',
    layout: 'note',
    accent: '#fde8ec',
  },
  {
    id: 'memory-02',
    date: 'August 2017',
    title: '"Aree request to accept kr lo." 😏',
    description: 'One DM. One line. Nine years of everything that followed.',
    layout: 'note',
    accent: '#e8e0f4',
  },
  {
    id: 'memory-03',
    date: 'Early days ♡',
    title: 'Before we even knew.',
    description: 'Friends first. The best kind of story.',
    layout: 'full',
    image: 'images/together/together-01.webp',
    accent: '#fdf3e3',
    portrait: false,
  },
  {
    id: 'memory-04',
    date: 'Getting closer',
    title: 'Her, always.',
    description: 'Some people just fit.',
    layout: 'polaroid',
    image: 'images/together/together-02.webp',
    accent: '#fde8ec',
    portrait: true,
  },
  {
    id: 'memory-05',
    date: '6 July 2019 · Official ♡',
    title: 'The night everything changed.',
    description: 'Kanpur, under the lights. She looked at him and he forgot how to breathe. 7 years and still forgetting.',
    layout: 'float',
    image: 'images/together/together-03.webp',
    accent: '#d8e8f0',
    portrait: false,
  },
  {
    id: 'memory-06',
    date: 'Goa 2025 ✨',
    title: 'She makes every place look like a movie.',
    description: 'Laser tag, beaches, and Betuuu looking dangerously cool the entire time.',
    layout: 'polaroid',
    image: 'images/together/together-04.webp',
    accent: '#f0ead8',
    portrait: true,
  },
  {
    id: 'memory-07',
    date: 'Us.',
    title: 'Seven years in.',
    description: 'Still laughing. Still choosing each other every single day.',
    layout: 'full',
    image: 'images/together/together-05.webp',
    accent: '#e8f0e4',
    portrait: false,
  },
]

export const ourVideo = {
  src:    'videos/our-video.mp4',
  poster: 'videos/our-video-poster.webp',
  title:  'Us.',
  caption: 'Some moments deserve to be watched, not described.',
  portrait: true,  // ← Instagram reel format
}

export const birthdayMessage = `Betuuu,

Nine years ago you sent one cheeky DM and accidentally ruined my life in the best possible way.

You are a cloud engineer who keeps Airtel's internet running, a singer who takes her craft seriously (and should — she's that good), a swimmer who owns the water, and a dancer who moves like the music was made for her.

You are also the most dramatic, most adorable, most infuriatingly loveable person I know. And yes — I ragebait you because you're cute when you're angry. Sorry not sorry. 😇

7 years together. 9 years of this friendship. From KV OEF corridors to everything we've built since — I would choose this every single time.

Happy Birthday, Betuuu. I made this entire little world just for you.

— Adi ♡`
