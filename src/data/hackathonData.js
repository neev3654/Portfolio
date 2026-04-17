/**
 * hackathonData.js
 * --------------------------------------------------
 * Replace the placeholder values below with your real
 * hackathon entries.
 *
 * Fields:
 *   id           – unique key (string)
 *   event        – hackathon / event name
 *   organizer    – who organized it (optional)
 *   date         – e.g. "Mar 2025" or "15–17 Mar 2025"
 *   location     – venue / city or "Online"
 *   problem      – the problem statement you tackled
 *   solution     – your approach / what you built
 *   outcome      – result description (e.g. "Built a full MVP in 36 hrs")
 *   badge        – "winner" | "runner-up" | "participant" | "finalist"
 *   tech         – array of technologies used
 *   links: {
 *     github     – repo URL  (optional, set "" to hide)
 *     demo       – demo / video URL (optional, set "" to hide)
 *   }
 */

export const hackathons = [
  {
    id: 'hack-1',
    event: 'Your Hackathon Name',
    organizer: 'Organizer Name',
    date: 'Month Year',
    location: 'City, Country',
    problem: 'Describe the problem statement you were given or chose.',
    solution: 'Describe your approach and what you built to solve it.',
    outcome: 'What was the result? Any metrics or achievements.',
    badge: 'winner',
    tech: ['React', 'Node.js', 'MongoDB'],
    links: {
      github: '',
      demo: '',
    },
  },
  {
    id: 'hack-2',
    event: 'Your Hackathon Name',
    organizer: 'Organizer Name',
    date: 'Month Year',
    location: 'Online',
    problem: 'Describe the problem statement you were given or chose.',
    solution: 'Describe your approach and what you built to solve it.',
    outcome: 'What was the result? Any metrics or achievements.',
    badge: 'runner-up',
    tech: ['Python', 'FastAPI', 'PostgreSQL'],
    links: {
      github: '',
      demo: '',
    },
  },
  {
    id: 'hack-3',
    event: 'Your Hackathon Name',
    organizer: 'Organizer Name',
    date: 'Month Year',
    location: 'City, Country',
    problem: 'Describe the problem statement you were given or chose.',
    solution: 'Describe your approach and what you built to solve it.',
    outcome: 'What was the result? Any metrics or achievements.',
    badge: 'participant',
    tech: ['React', 'Express', 'Socket.io'],
    links: {
      github: '',
      demo: '',
    },
  },
]
