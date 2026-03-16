/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#000000',
        card: '#111111',
        border: '#1f1f1f',
        text: '#f5f5f7',
        muted: '#a1a1aa',
        accent: '#00ffff',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        display: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          sm: '1.5rem',
          lg: '2.5rem',
          xl: '3rem',
          '2xl': '3.5rem',
        },
      },
      letterSpacing: {
        tighter2: '-0.04em',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(0,255,255,.25), 0 0 60px rgba(0,255,255,.08)',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(800px 400px at 50% 20%, rgba(0,255,255,.22), rgba(0,0,0,0) 60%), radial-gradient(700px 350px at 80% 40%, rgba(99,102,241,.18), rgba(0,0,0,0) 55%), radial-gradient(600px 300px at 20% 55%, rgba(236,72,153,.10), rgba(0,0,0,0) 55%)',
        'subtle-grid':
          'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '64px 64px',
      },
    },
  },
  plugins: [],
}

