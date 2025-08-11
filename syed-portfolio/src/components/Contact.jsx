import { profile } from './data'
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="max-content grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold">Contact</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">Feel free to reach out for collaboration, internships, or freelance work.</p>

          <div className="mt-6 space-y-3 text-sm">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 btn-outline w-max"><FaEnvelope /> {profile.email}</a>
            <a target="_blank" href={profile.github} className="flex items-center gap-3 btn-outline w-max"><FaGithub /> GitHub</a>
            <a target="_blank" href={profile.linkedin} className="flex items-center gap-3 btn-outline w-max"><FaLinkedin /> LinkedIn</a>
          </div>
        </div>

        <form action={`mailto:${profile.email}`} method="post" encType="text/plain" className="card-glass p-6 space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input name="name" type="text" className="w-full rounded-lg border-zinc-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/50" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input name="email" type="email" className="w-full rounded-lg border-zinc-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/50" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea name="message" rows="5" className="w-full rounded-lg border-zinc-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/50" required />
          </div>
          <button type="submit" className="btn-primary">Send Message</button>
        </form>
      </div>

      <footer className="max-content mt-16 pb-6 text-xs text-zinc-500">© {new Date().getFullYear()} {profile.name}. All rights reserved.</footer>
    </section>
  )
}