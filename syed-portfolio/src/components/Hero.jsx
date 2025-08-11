import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { profile, skills } from './data'
import heroImg from '../assets/react.svg'

const rotating = [
  'C++', 'C#', 'HTML', 'CSS', 'JavaScript', 'Tailwind', 'Bootstrap', 'React', 'Next.js', 'Node.js', 'Express.js'
]

export function Hero() {
  return (
    <section id="home" className="section">
      <div className="max-content grid md:grid-cols-2 gap-10 items-center">
        <div className="order-2 md:order-1">
          <p className="text-sm uppercase tracking-widest text-zinc-500">{profile.location}</p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mt-2">
            Hi, I am <span className="gradient-text">{profile.name}</span>
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">{profile.role}</p>

          <div className="mt-6 text-2xl font-extrabold h-10 flex items-center">
            <span className="text-zinc-500 mr-2">I build with</span>
            <motion.span
              key="rotator"
              className="gradient-text"
              animate={{ opacity: [0,1,1,0], y: [10,0,0,-10] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut', repeatDelay: 0.2 }}
            >
              <RotatingWords words={rotating} />
            </motion.span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">See Projects</a>
            <a href="#contact" className="btn-outline">Contact Me</a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-zinc-400">
            {skills.slice(0, 12).map((s) => (
              <li key={s} className="px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800">{s}</li>
            ))}
          </ul>
        </div>

        <div className="order-1 md:order-2">
          <div className="relative mx-auto w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden card-glass flex items-center justify-center">
            <img src={heroImg} alt="Profile" className="w-28 h-28 opacity-90" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

function RotatingWords({ words }) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2000)
    return () => clearInterval(id)
  }, [words.length])
  return words[index]
}