import { skills } from './data'
import { motion } from 'framer-motion'

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="max-content">
        <h2 className="text-3xl md:text-4xl font-extrabold">Skills</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">Core technologies and tools I use day‑to‑day.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {skills.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
              className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/50 shadow-sm text-sm"
            >
              {s}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}