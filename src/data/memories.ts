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
}

export const memories: Memory[] = [
  {
    id: 'memory-01',
    date: 'August 2017',
    title: 'The very beginning.',
    description: 'A school corridor in KV OEF, Kanpur. An 11th grader. A 9th grader. Neither of them knew this was it.',
    layout: 'note',
    accent: '#fde8ec',
  },
  {
    id: 'memory-02',
    date: 'August 2017 — onwards',
    title: '"Aree request to accept kr lo."',
    description: 'One DM. One cheeky line. Nine years of everything.',
    layout: 'note',
    accent: '#ede8f8',
  },
  {
    id: 'memory-03',
    date: 'Add your photo ♡',
    title: '[ Add a memory here ]',
    description: '[ Drop your photo in public/images/memories/photo-03.webp and fill this in ]',
    layout: 'full',
    image: 'images/memories/photo-03.webp',
    accent: '#fdf3e3',
  },
  {
    id: 'memory-04',
    date: '6 July 2019',
    title: 'The day it became official.',
    description: 'She said yes. He will never recover. 7 years and counting.',
    layout: 'polaroid',
    image: 'images/memories/photo-04.webp',
    accent: '#fde8ec',
  },
  {
    id: 'memory-05',
    date: 'Add your photo ♡',
    title: '[ Add a memory here ]',
    description: '[ Drop your photo in public/images/memories/photo-05.webp and fill this in ]',
    layout: 'float',
    image: 'images/memories/photo-05.webp',
    accent: '#d8f0d8',
  },
]

export const birthdayMessage = `Betuuu,

Nine years ago you sent one cheeky DM and accidentally ruined my life in the best possible way.

You are the most talented, most beautiful, most infuriating-when-I-ragebait-you person I know. A cloud engineer who keeps Airtel's internet running and somehow still has time to beat me regularly for crimes I definitely did not commit.

You swim like you own the water. You sing like you don't know how good you are. You dance like the music was written just for you.

I have been lucky every single day since 1 August 2017.

Happy Birthday, Betuuu. ♡

This tiny universe I made — it's all yours.

— Adi`
