import { useEffect, useLayoutEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SmoothScroll, useSmoothScroll } from './components/SmoothScroll.jsx'
import { StandaloneRouteContext } from './hooks/useStandaloneRoute.js'
import Navbar from './components/Navbar.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Certificates from './components/Certificates.jsx'
import Hackathons from './components/Hackathons.jsx'
import FigmaDesigns from './components/FigmaDesigns.jsx'
import Contact from './components/Contact.jsx'

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <FigmaDesigns />
      <Certificates />
      <Hackathons />
      <Contact />
    </>
  )
}

/** Wraps children in standalone context so all GSAP animations auto-adapt */
function Standalone({ children }) {
  return (
    <StandaloneRouteContext.Provider value={true}>
      {children}
    </StandaloneRouteContext.Provider>
  )
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const { lenis } = useSmoothScroll()

  useLayoutEffect(() => {
    if (!hash) {
      window.history.scrollRestoration = 'manual'
      window.scrollTo(0, 0)
      if (lenis) {
        lenis.scrollTo(0, { immediate: true })
      }
      ScrollTrigger.clearScrollMemory('manual')

      const t1 = setTimeout(() => ScrollTrigger.refresh(), 50)
      const t2 = setTimeout(() => ScrollTrigger.refresh(), 200)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [pathname, hash, lenis])

  useEffect(() => {
    if (pathname === '/' && hash && lenis) {
      const id = hash.replace('#', '')
      const target = document.getElementById(id)
      if (target) {
        const t = setTimeout(() => { lenis.scrollTo(target) }, 150)
        return () => clearTimeout(t)
      }
    }
  }, [pathname, hash, lenis])

  return null
}

export default function App() {
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-bg selection:bg-accent-blue/20 selection:text-text">
        <ScrollProgress />
        <Navbar />

        <main className="relative overflow-x-hidden">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Standalone><Hero /><About /></Standalone>} />
            <Route path="/skills" element={<Standalone><Skills /></Standalone>} />
            <Route path="/projects" element={<Standalone><Projects /><FigmaDesigns /></Standalone>} />
            <Route path="/certificates" element={<Standalone><Certificates /></Standalone>} />
            <Route path="/hackathons" element={<Standalone><Hackathons /></Standalone>} />
            <Route path="/contact" element={<Standalone><Contact /></Standalone>} />
          </Routes>
        </main>
      </div>
    </SmoothScroll>
  )
}
