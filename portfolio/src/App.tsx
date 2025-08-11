import { useEffect, useMemo, useState } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, Moon, Sun, GraduationCap, Briefcase, BookOpen, Code2, Menu, X } from 'lucide-react'
import { FaBootstrap, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaPython } from 'react-icons/fa'
import { SiTailwindcss, SiMongodb, SiNextdotjs, SiExpress, SiTypescript, SiVite, SiFlask, SiOracle, SiCplusplus, SiDotnet } from 'react-icons/si'
import { useInView } from 'react-intersection-observer'
import './index.css'

// Content sourced from the provided CV
const PROFILE = {
  name: 'SYED HASSAN HUSSAIN SHAH',
  title: 'Full‑Stack Developer',
  location: 'Gujranwala, Pakistan',
  email: 'syedhassanhssn867@gmail.com',
  github: 'https://github.com/SyedHassanShah',
  linkedin: 'https://linkedin.com/in/syed-hassan-shah-a33512b5',
}

const NAME_PARTS = ['SYED', 'HASSAN', 'HUSSAIN', 'SHAH'] as const

const SKILL_ROTATION = [
  'C++',
  'C#',
  'HTML',
  'CSS',
  'JavaScript',
  'Tailwind CSS',
  'Bootstrap',
  'React',
  'Next.js',
  'Node.js',
  'Express.js',
]

const PROJECTS = [
  {
    title: 'Islam 360',
    stack: ['React.js', 'Vite', 'Tailwind CSS', 'Node.js', 'Axios', 'ShadCN UI', 'Context API'],
    description:
      'A full‑featured Islamic utility app with prayer times, offline Dhikr, Tasbih counter, Islamic content, and an integrated AI chatbot trained on Islamic content. Deployed on Vercel.',
    image: 'https://images.unsplash.com/photo-1550355291-bbee03d8e5b7?q=80&w=1200&auto=format&fit=crop',
    link: PROFILE.github,
  },
  {
    title: 'Train Reservation System',
    stack: ['HTML', 'Bootstrap', 'Tailwind CSS', 'JavaScript', 'DB integration'],
    description:
      'Responsive booking platform with real‑time train data, secure ticket booking, cancellation, reminders, and account management. Optimized for mobile.',
    image: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=1200&auto=format&fit=crop',
    link: PROFILE.github,
  },
  {
    title: 'ChainWallet DApp',
    stack: ['HTML', 'CSS', 'Tailwind', 'JavaScript', 'ethers.js', 'jSOPD', 'QRCode.js', 'OTPAuth', 'Web3'],
    description:
      'Decentralized crypto wallet with MetaMask integration, ETH contract transfers, transaction history, 2FA security, contacts, and PDF/QR export; multi‑network support.',
    image: 'https://images.unsplash.com/photo-1640340434855-2a62c1588160?q=80&w=1200&auto=format&fit=crop',
    link: PROFILE.github,
  },
  {
    title: 'Drive Sense AI',
    stack: ['HTML', 'Tailwind CSS', 'Bootstrap', 'Python', 'Flask', 'AI model training'],
    description:
      'AI‑powered driving analysis achieving 92% hazard detection accuracy with adjustable sensitivity and PDF/video‑based reports via Flask backend and trained ML models.',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop',
    link: PROFILE.github,
  },
  {
    title: 'Portfolio v2',
    stack: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    description:
      'A polished personal portfolio with animated hero, glass navbar, and scroll‑triggered reveals.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop',
    link: PROFILE.github,
  },
  {
    title: 'E‑Commerce Storefront',
    stack: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS'],
    description:
      'Responsive storefront with product filtering, cart/checkout, and Stripe payments.',
    image: 'https://images.unsplash.com/photo-1543363136-67f52ae95f39?q=80&w=1200&auto=format&fit=crop',
    link: PROFILE.github,
  },
]

const EDUCATION = [
  {
    school: 'University of Engineering and Technology Lahore — Gujranwala Campus',
    degree: 'BSC Computer Science',
    period: '12/2027 (In progress)',
  },
  {
    school: 'Punjab Colleges — Gujranwala',
    degree: 'FSC Pre‑Engineering',
    period: '12/2023',
  },
]

const SKILLS = [
  { name: 'JavaScript/TypeScript', icon: <SiTypescript className="text-sky-500" />, level: 85 },
  { name: 'React', icon: <FaReact className="text-sky-400" />, level: 85 },
  { name: 'Next.js', icon: <SiNextdotjs />, level: 75 },
  { name: 'Node.js', icon: <FaNodeJs className="text-green-600" />, level: 80 },
  { name: 'Express.js', icon: <SiExpress />, level: 78 },
  { name: 'MongoDB', icon: <SiMongodb className="text-green-700" />, level: 70 },
  { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" />, level: 95 },
  { name: 'CSS3', icon: <FaCss3Alt className="text-blue-500" />, level: 90 },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-sky-400" />, level: 90 },
  { name: 'Bootstrap', icon: <FaBootstrap className="text-purple-600" />, level: 85 },
  { name: 'Python', icon: <FaPython className="text-yellow-500" />, level: 65 },
  { name: 'Vite', icon: <SiVite className="text-purple-500" />, level: 80 },
  { name: 'C++', icon: <SiCplusplus className="text-blue-600" />, level: 70 },
  { name: 'C#', icon: <SiDotnet className="text-purple-700" />, level: 65 },
  { name: 'Oracle', icon: <SiOracle className="text-red-600" />, level: 55 },
  { name: 'Flask', icon: <SiFlask />, level: 60 },
]

function useTheme(): [string, () => void] {
  const [theme, setTheme] = useState<string>(() =>
    localStorage.getItem('theme') || 'light',
  )
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])
  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return [theme, toggle]
}

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 dark:bg-slate-800 text-sky-600 dark:text-indigo-400">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          <span className="gradient-text">{title}</span>
        </h2>
        {subtitle && (
          <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

function useReveal() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const variants = useMemo(
    () => ({ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }),
    [],
  )
  return { ref, variants, inView }
}

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [navOpen, setNavOpen] = useState(false)
  const [nameIndex, setNameIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setNameIndex((i) => (i + 1) % NAME_PARTS.length)
    }, 1400)
    return () => clearInterval(id)
  }, [])

  const { ref: heroRef, variants: heroVariants, inView: heroInView } = useReveal()
  const { ref: projectsRef, variants: projectsVariants, inView: projectsInView } = useReveal()
  const { ref: eduRef, variants: eduVariants, inView: eduInView } = useReveal()
  const { ref: skillsRef, variants: skillsVariants, inView: skillsInView } = useReveal()
  const { ref: contactRef, variants: contactVariants, inView: contactInView } = useReveal()

  return (
    <div className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 border-b border-slate-200/70 dark:border-slate-800/60">
        <div className="container-responsive flex items-center justify-between py-3">
          <a href="#home" className="flex items-center gap-2 text-lg font-extrabold">
            <Code2 className="text-sky-500" />
            <span className="hidden sm:inline">{PROFILE.name}</span>
            <span className="sm:hidden">SHHS</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a href="#projects" className="hover:text-sky-600">Projects</a>
            <a href="#education" className="hover:text-sky-600">Education</a>
            <a href="#skills" className="hover:text-sky-600">Skills</a>
            <a href="#contact" className="hover:text-sky-600">Contact</a>
          </div>
          <div className="flex items-center gap-2">
            <a href={PROFILE.github} target="_blank" className="btn-outline" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={PROFILE.linkedin} target="_blank" className="btn-outline" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <button onClick={toggleTheme} className="btn-outline" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="md:hidden btn-outline" aria-label="Menu" onClick={() => setNavOpen((o) => !o)}>
              {navOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-slate-200 dark:border-slate-800"
            >
              <div className="container-responsive py-3 grid grid-cols-2 gap-3 text-sm font-semibold">
                <a href="#projects" onClick={() => setNavOpen(false)} className="btn-outline">Projects</a>
                <a href="#education" onClick={() => setNavOpen(false)} className="btn-outline">Education</a>
                <a href="#skills" onClick={() => setNavOpen(false)} className="btn-outline">Skills</a>
                <a href="#contact" onClick={() => setNavOpen(false)} className="btn-outline">Contact</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <header id="home" className="container-responsive">
        <motion.section
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? 'show' : 'hidden'}
          variants={heroVariants}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16"
        >
          <div className="order-2 lg:order-1 space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 text-sky-700 dark:bg-slate-800 dark:text-indigo-300 px-4 py-1 text-xs font-bold tracking-widest uppercase">
              {PROFILE.title}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight">
              Hi, I’m <span className="gradient-text">{PROFILE.name}</span>
            </h1>
            <div className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1">
              <span className="text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 me-2">NAME</span>
              <div className="relative h-6 w-28 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={nameIndex}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 flex items-center font-extrabold text-sky-600 dark:text-indigo-400"
                  >
                    {NAME_PARTS[nameIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              I craft clean, modern UIs with solid architecture — from beautiful HTML/CSS to interactive React frontends and robust Node/Flask backends.
            </p>
            <p className="text-base text-slate-500 dark:text-slate-400">
              I work with{' '}
              <span className="font-semibold">
                <Typewriter
                  words={SKILL_ROTATION}
                  loop={0}
                  typeSpeed={70}
                  deleteSpeed={40}
                  delaySpeed={1400}
                />
              </span>
            </p>
            <div className="flex gap-3">
              <a href="#projects" className="btn-primary">View Projects</a>
              <a href="#contact" className="btn-outline">Hire Me</a>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative mx-auto h-60 w-60 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
              <div className="absolute inset-0 -z-10 rounded-[2.4rem] blur-2xl bg-gradient-to-tr from-sky-400/30 to-indigo-400/20" />
              <div className="p-[3px] rounded-[2.2rem] bg-gradient-to-tr from-sky-500 to-indigo-500">
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-200/70 dark:ring-slate-700 bg-white dark:bg-slate-900">
                  {/* Placeholder for profile image; user will replace src */}
                  <img
                    src="/profile.jpg"
                    alt="Profile"
                    className="h-60 w-60 sm:h-72 sm:w-72 lg:h-80 lg:w-80 object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-500/20 to-indigo-500/10 mix-blend-overlay" />
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-3 -left-3 h-10 w-10 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-md">
                <FaReact className="text-sky-500" />
              </div>
              <div className="absolute -bottom-3 -right-3 h-10 w-10 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-md">
                <FaNodeJs className="text-green-600" />
              </div>
              <div className="absolute -top-3 -right-3 h-10 w-10 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-md">
                <SiTailwindcss className="text-sky-400" />
              </div>
            </div>
          </div>
        </motion.section>
      </header>

      {/* Projects */}
      <main className="space-y-24">
        <motion.section
          id="projects"
          ref={projectsRef}
          initial="hidden"
          animate={projectsInView ? 'show' : 'hidden'}
          variants={projectsVariants}
          transition={{ duration: 0.5 }}
          className="container-responsive"
        >
          <SectionHeader
            icon={<Briefcase />}
            title="Projects"
            subtitle="A selection of recently built apps and experiments"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {PROJECTS.map((p, idx) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 card-hover"
              >
                <img src={p.image} alt={p.title} className="h-44 w-full object-cover" />
                <div className="p-5 space-y-4">
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <span key={t} className="px-2 py-1 text-xs rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2">
                    <a className="btn-primary" href={p.link} target="_blank" rel="noreferrer">
                      View Project
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          id="education"
          ref={eduRef}
          initial="hidden"
          animate={eduInView ? 'show' : 'hidden'}
          variants={eduVariants}
          transition={{ duration: 0.5 }}
          className="container-responsive"
        >
          <SectionHeader icon={<GraduationCap />} title="Education" subtitle="Academic background" />
          <ol className="relative border-s border-slate-200 dark:border-slate-800">
            {EDUCATION.map((e, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="ms-6 py-6"
              >
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-white ring-8 ring-white dark:ring-slate-900">
                  <BookOpen size={14} />
                </span>
                <h4 className="text-lg font-bold">{e.school}</h4>
                <p className="text-slate-600 dark:text-slate-300">{e.degree}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{e.period}</p>
              </motion.li>
            ))}
          </ol>
        </motion.section>

        {/* Skills */}
        <motion.section
          id="skills"
          ref={skillsRef}
          initial="hidden"
          animate={skillsInView ? 'show' : 'hidden'}
          variants={skillsVariants}
          transition={{ duration: 0.5 }}
          className="container-responsive"
        >
          <SectionHeader icon={<Code2 />} title="Skills" subtitle="Core technologies I use" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {SKILLS.map((s) => (
              <div key={s.name} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900 card-hover">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{s.icon}</div>
                  <div className="font-semibold">{s.name}</div>
                </div>
                <div className="mt-4 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section
          id="contact"
          ref={contactRef}
          initial="hidden"
          animate={contactInView ? 'show' : 'hidden'}
          variants={contactVariants}
          transition={{ duration: 0.5 }}
          className="container-responsive"
        >
          <SectionHeader icon={<Mail />} title="Contact" subtitle="Let’s build something great together" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <a className="btn-outline w-full sm:w-auto" href={`mailto:${PROFILE.email}`}>
                <Mail size={18} /> {PROFILE.email}
              </a>
              <div className="flex gap-3">
                <a className="btn-outline" href={PROFILE.github} target="_blank" rel="noreferrer"><Github size={18}/> GitHub</a>
                <a className="btn-outline" href={PROFILE.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn</a>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                This form uses EmailJS. Set your service ID, template ID, and public key in environment variables or replace placeholders in the code.
              </p>
            </div>
            <ContactForm />
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-slate-200 dark:border-slate-800">
        <div className="container-responsive py-8 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</span>
          <span className="flex items-center gap-2"><SiVite /> Built with React + Vite + Tailwind</span>
        </div>
      </footer>
    </div>
  )
}

import emailjs from '@emailjs/browser'
import type { FormEvent } from 'react'
import { useRef, useState as useFormState } from 'react'

function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [status, setStatus] = useFormState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    try {
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      })
      setStatus('sent')
      formRef.current.reset()
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input name="user_name" required className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" name="user_email" required className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Subject</label>
        <input name="subject" className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea name="message" rows={5} required className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" />
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" className="btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
        {status === 'sent' && <span className="text-green-600">Sent!</span>}
        {status === 'error' && <span className="text-red-600">Something went wrong. Try again.</span>}
      </div>
    </form>
  )
}
