<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/GSAP-3-88CE02?style=for-the-badge&logo=greensock&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Three.js-r183-000000?style=for-the-badge&logo=three.js&logoColor=white" />
</p>

# 🎬 Neev Patel — Cinematic Portfolio

A **production-grade, Apple-inspired cinematic portfolio** built with React 19, GSAP 3, and Three.js. Featuring scroll-scrubbed animations, masked text reveals, smooth Lenis scrolling, dark/light mode, and a fully interactive 3D hero scene — designed to leave a lasting impression.

> **Live:** [neevpatel.vercel.app](https://neevpatel.vercel.app) _(update with your deployment URL)_

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🎥 **Cinematic Chapters** | 8 scroll-driven sections (01–08) with unified entrance animations and chapter labels |
| 🌀 **GSAP ScrollTrigger** | Parallax backgrounds, scrub-based text reveals, and trigger-based pop-up effects |
| ✍️ **Masked Text Reveal** | Custom `SplitType` + GSAP component that reveals text line-by-line or word-by-word on scroll |
| 🧊 **3D Hero Scene** | Interactive Three.js scene using `@react-three/fiber` and `@react-three/drei` |
| 🧈 **Smooth Scrolling** | Lenis-powered buttery smooth scroll with proper ScrollTrigger integration |
| 🌗 **Dark / Light Mode** | Persistent theme toggle with CSS custom properties and `localStorage` |
| 📄 **Resume Viewer** | Secure in-browser PDF viewer modal (Google Drive hosted) with manual download |
| 📱 **Fully Responsive** | Mobile-first design with seamless adaptation from 320px to 4K displays |
| ⚡ **Code Splitting** | Lazy-loaded routes via `React.lazy()` + `Suspense` for optimal performance |
| 🔗 **Standalone Routes** | Each section is accessible as a direct URL (`/about`, `/projects`, etc.) with adapted animations |

---

## 🏗️ Architecture

```
Portfolio/
├── public/
│   └── resume.pdf              # Resume PDF (backup copy)
├── src/
│   ├── components/
│   │   ├── Hero.jsx            # Chapter 00 – 3D hero with cinematic text
│   │   ├── HeroScene.jsx       # Three.js 3D scene (React Three Fiber)
│   │   ├── About.jsx           # Chapter 01 – Bio, picture, signature card
│   │   ├── Skills.jsx          # Chapter 02 – Technical skill categories
│   │   ├── Projects.jsx        # Chapter 03 – Project showcase grid
│   │   ├── FigmaDesigns.jsx    # Chapter 04 – UI/UX design gallery with lightbox
│   │   ├── Certificates.jsx    # Chapter 05 – Certificate cards with proof viewer
│   │   ├── Hackathons.jsx      # Chapter 06 – Hackathon timeline with badges
│   │   ├── Resume.jsx          # Chapter 07 – PDF viewer modal + download
│   │   ├── Contact.jsx         # Chapter 08 – Contact form (Web3Forms) + socials
│   │   ├── ChapterSection.jsx  # Reusable cinematic section wrapper
│   │   ├── MaskedTextReveal.jsx# SplitType + GSAP masked text animation
│   │   ├── Navbar.jsx          # Responsive nav with active section tracking
│   │   ├── ScrollProgress.jsx  # Scroll progress indicator bar
│   │   └── SmoothScroll.jsx    # Lenis smooth scroll provider
│   ├── hooks/
│   │   ├── useActiveSection.js # Tracks which section is in viewport
│   │   ├── usePinnedContainer.js # Provides pinned container ref for ScrollTrigger
│   │   ├── useScrollProgress.js  # Returns scroll progress (0–1)
│   │   └── useStandaloneRoute.js # Detects standalone routes vs. home page
│   ├── data/
│   │   ├── projects.js         # Project entries (title, tech, links, images)
│   │   ├── skills.js           # Skill categories and items
│   │   ├── certificatesData.js # Certificate entries with proof images
│   │   ├── hackathonData.js    # Hackathon entries with badges
│   │   └── figmaData.js        # Figma design showcase entries
│   ├── App.jsx                 # Root component with routing & theme init
│   ├── index.css               # Tailwind directives + CSS custom properties
│   └── main.jsx                # Entry point
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | React 19, React Router v7 |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS 3.4, CSS Custom Properties |
| **Animations** | GSAP 3.14 (ScrollTrigger, timelines), SplitType |
| **3D Graphics** | Three.js r183, React Three Fiber, Drei |
| **Smooth Scroll** | Lenis |
| **Icons** | React Icons (Feather, Font Awesome, Simple Icons) |
| **Form Backend** | Web3Forms API |
| **Hosting** | Vercel / Netlify |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/neev3654/Portfolio.git

# Navigate to the project directory
cd Portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Production Build

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 📂 Sections Overview

### 🎬 Hero (Landing)
A full-screen cinematic landing with an interactive **Three.js 3D scene**, scroll-scrubbed text reveals powered by `MaskedTextReveal`, and a dramatic entrance animation.

### 📖 Chapter 01 — About
Personal bio with parallax background layers, an animated profile picture with a conic-gradient glow ring, and a signature card with masked text reveals.

### ⚡ Chapter 02 — Skills
Technical skill categories displayed in animated cards — covering Programming Languages, Web Development frameworks, and Developer Tools.

### 💼 Chapter 03 — Projects
A showcase grid featuring live projects:
- **Kraken Clone** — Pixel-perfect cryptocurrency exchange frontend
- **Blockworks Clone** — Responsive crypto media platform
- **Random User Profile** — Chrome extension (Manifest V3)

Each card includes GitHub links, live demo links, and technology badges.

### 🎨 Chapter 04 — UI/UX Designs
A Figma design gallery with hover overlays, a fullscreen lightbox viewer, and direct links to Figma prototypes.

### 🏆 Chapter 05 — Certificates
HackerRank certifications displayed in elegant cards with proof image lightboxes:
- React (Basic)
- Frontend Developer (React)
- Node.js (Basic)

### 🏅 Chapter 06 — Hackathons
Timeline-style hackathon entries with achievement badges (Winner, Runner-up, Participant) and technology tags.

### 📄 Chapter 07 — Resume
A secure, in-browser PDF viewer modal powered by Google Drive embed. Features:
- **View Resume** button opens the modal (no auto-download)
- **Download PDF** button for manual download
- Escape key and backdrop click to close

### 📬 Chapter 08 — Contact
A fully functional contact form powered by **Web3Forms API** with:
- Form validation and loading/success/error states
- Email and location info cards with hover effects
- Social media links (GitHub, LinkedIn, LeetCode, X/Twitter, YouTube)

---

## 🎨 Animation System

The portfolio uses a sophisticated multi-layer animation system:

### MaskedTextReveal
A custom component that splits text using `SplitType`, wraps each fragment in an overflow-hidden mask, and reveals them with GSAP:
- **`mode="scrub"`** — Tied to scroll position (used in Hero)
- **`mode="trigger"`** — Plays once when scrolled into view (used in all Chapter sections)
- **`split="lines"` / `split="words"`** — Controls text splitting granularity

### ChapterSection
A reusable wrapper that provides the cinematic section structure with:
- Consistent padding and layout constraints
- Chapter label slot
- Viewport detection for active section highlighting in the navbar

### Standalone Route Detection
The `useIsStandaloneRoute` hook detects whether a section is rendered on the home page (scroll-driven) or on an isolated route (e.g., `/about`). Animations automatically adapt — ScrollTrigger is used universally, but `pinnedContainer` references are omitted on standalone routes to prevent conflicts.

---

## 🌗 Theming

The portfolio supports **dark** and **light** modes via CSS custom properties defined under `:root` and `.dark` selectors in `index.css`. The theme persists in `localStorage` and respects `prefers-color-scheme` on first visit.

| Token | Purpose |
|---|---|
| `--color-bg` | Page background |
| `--color-card` | Card / surface background |
| `--color-text` | Primary text color |
| `--color-muted` | Secondary / subdued text |
| `--color-border` | Borders and dividers |
| `--color-accent-blue` | Primary accent |
| `--color-accent-purple` | Secondary accent |

---

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build the project
npm run build

# Deploy the dist/ folder to Netlify
```

> **Note:** Ensure your deployment platform handles SPA routing by redirecting all paths to `index.html`.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/neev3654/Portfolio/issues).

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Neev Patel**

- 🌐 Portfolio: [neevpatel.vercel.app](https://neevpatel.vercel.app)
- 💼 LinkedIn: [neev-ptl](https://www.linkedin.com/in/neev-ptl)
- 🐙 GitHub: [neev3654](https://github.com/neev3654)
- 📧 Email: neev.patel.cg@gmail.com
- 📍 Gandhinagar, Gujarat, India

---

<p align="center">
  Made with ❤️ and a lot of GSAP
</p>
