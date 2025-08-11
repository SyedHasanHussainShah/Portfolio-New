import { projects } from './data'
import { motion } from 'framer-motion'

export function Projects() {
  return (
    <section id="projects" className="section bg-gradient-to-b from-transparent to-zinc-100/70 dark:to-zinc-900/40">
      <div className="max-content">
        <h2 className="text-3xl md:text-4xl font-extrabold">Projects</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">A selection of shipped work and study builds.</p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              className="card-glass p-6 flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <h3 className="text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-xs text-zinc-500">{p.stack.join(' · ')}</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300 list-disc pl-5">
                {p.points.map((pt) => (<li key={pt}>{pt}</li>))}
              </ul>
              <div className="mt-6">
                <a href={p.link} target="_blank" className="btn-outline">View</a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}