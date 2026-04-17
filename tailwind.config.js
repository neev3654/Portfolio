/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        card: 'rgb(var(--color-card) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        text: 'rgb(var(--color-text) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        'accent-blue': 'rgb(var(--color-accent-blue) / <alpha-value>)',
        'accent-purple': 'rgb(var(--color-accent-purple) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      fontSize: {
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '0.95' }],
        '10xl': ['10rem', { lineHeight: '0.9' }],
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
        tightest: '-0.06em',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #2997ff 0%, #a259ff 100%)',
      },
    },
  },
  plugins: [],
}
