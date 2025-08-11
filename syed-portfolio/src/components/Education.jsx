import { education } from './data'

export function Education() {
  return (
    <section id="education" className="section bg-gradient-to-t from-transparent to-zinc-100/70 dark:to-zinc-900/40">
      <div className="max-content">
        <h2 className="text-3xl md:text-4xl font-extrabold">Education</h2>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {education.map((e) => (
            <article key={e.school} className="card-glass p-6">
              <h3 className="text-xl font-bold">{e.school}</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{e.degree}</p>
              <p className="mt-1 text-sm text-zinc-500">Completed: {e.end}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}