import Navbar from './components/Navbar.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Philosophy from './components/Philosophy.jsx'
import Education from './components/Education.jsx'
import Projects from './components/Projects.jsx'
import Achievements from './components/Achievements.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-bg">
      <ScrollProgress />
      <Navbar />

      <main className="relative overflow-x-hidden perspective-[1600px] [transform-style:preserve-3d]">
        <Hero />
        <About />
        <Skills />
        <Education />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
