import { SmoothScroll } from './components/SmoothScroll.jsx'
import Navbar from './components/Navbar.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-bg selection:bg-accent-blue/20 selection:text-[#1d1d1f]">
        <ScrollProgress />
        <Navbar />

        <main className="relative overflow-x-hidden">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  )
}
