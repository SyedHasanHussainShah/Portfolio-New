import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin, FaSun, FaMoon } from 'react-icons/fa'
import { profile } from './data'
import clsx from 'classnames'

export function Navbar() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200/60 dark:border-zinc-800">
      <nav className="max-content flex h-16 items-center justify-between">
        <a href="#home" className="font-extrabold tracking-tight text-xl gradient-text">{profile.name.split(' ')[0]}<span className="text-zinc-800 dark:text-zinc-200">.</span></a>

        <ul className="hidden md:flex gap-6 text-sm font-medium">
          {['Home','Projects','Skills','Education','Contact'].map((item) => (
            <li key={item}><a href={`#${item.toLowerCase()}`} className="hover:text-zinc-950 dark:hover:text-white transition">{item}</a></li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href={profile.linkedin} target="_blank" className="btn-outline px-3 py-2" aria-label="LinkedIn"><FaLinkedin /></a>
          <a href={profile.github} target="_blank" className="btn-outline px-3 py-2" aria-label="GitHub"><FaGithub /></a>
          <button onClick={() => setIsDark(v => !v)} className={clsx('btn-outline px-3 py-2', 'ml-1')} aria-label="Toggle theme">
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>
    </header>
  )
}