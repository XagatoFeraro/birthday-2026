// ─── Memory data ──────────────────────────────────────────────────────────────
// Add your real memories here. Each entry becomes a cinematic scene.
// The animation engine adapts automatically to the number of memories.
//
// layout options:
//   'full'      → single full-screen photo
//   'float'     → photo floating in space with text beside it
//   'collage'   → multiple photos in a scrapbook composition
//   'video'     → video scene (photo used as poster)
//   'note'      → handwritten-style text moment (no photo needed)
//   'polaroid'  → polaroid-inspired single photo with caption
//
// accent: optional color hint for this scene's ambient mood (CSS color string)

export interface Memory {
  id: string
  date: string          // Display string e.g. "March 2023"
  title: string
  description: string
  layout: 'full' | 'float' | 'collage' | 'video' | 'note' | 'polaroid'
  image?: string        // Path relative to public/ e.g. "images/memories/photo-01.webp"
  images?: string[]     // For collage layout
  video?: string        // Path relative to public/ e.g. "videos/memory-01.mp4"
  location?: string     // Optional display location
  accent?: string       // Optional ambient color e.g. "#f7c6c7"
}

export const memories: Memory[] = [
  {
    id: 'memory-01',
    date: '[ DATE ]',
    title: '[ HOW WE MET ]',
    description: '[ ADD YOUR STORY OF HOW YOU FIRST MET ]',
    layout: 'full',
    image: 'images/memories/photo-01.webp',
    accent: '#f9e0d0',
  },
  {
    id: 'memory-02',
    date: '[ DATE ]',
    title: '[ FIRST CONVERSATION ]',
    description: '[ THE MOMENT EVERYTHING STARTED ]',
    layout: 'float',
    image: 'images/memories/photo-02.webp',
    accent: '#fde8ec',
  },
  {
    id: 'memory-03',
    date: '[ DATE ]',
    title: '[ A MEMORY ]',
    description: '[ SOMETHING YOU REMEMBER VIVIDLY ]',
    layout: 'polaroid',
    image: 'images/memories/photo-03.webp',
    accent: '#e8f0e8',
  },
  {
    id: 'memory-04',
    date: '[ DATE ]',
    title: '[ ANOTHER MEMORY ]',
    description: '[ SOMETHING FUNNY OR SWEET ]',
    layout: 'note',
    accent: '#fdf3e3',
  },
  {
    id: 'memory-05',
    date: '[ DATE ]',
    title: '[ A MOMENT TOGETHER ]',
    description: '[ YOUR DESCRIPTION ]',
    layout: 'video',
    image: 'images/memories/photo-05.webp',
    video: 'videos/memory-01.mp4',
    accent: '#e8e0f0',
  },
]

// The final birthday message — shown in the last scene
export const birthdayMessage = `[ YOUR PERSONAL MESSAGE FOR BETUUU ]

Write something from the heart here.
This can be as long as you like.
It will display beautifully on screen.`
