import { LazyMotion, MotionConfig } from 'motion/react'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { About } from './components/sections/About'
import { Automation } from './components/sections/Automation'
import { Contact } from './components/sections/Contact'
import { Education } from './components/sections/Education'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Stats } from './components/sections/Stats'
import { content } from './data/content'

const loadMotionFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default)

function App() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
        >
          {content.ui.skipLink}
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <Stats />
          <About />
          <Projects />
          <Experience />
          <Automation />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}

export default App
