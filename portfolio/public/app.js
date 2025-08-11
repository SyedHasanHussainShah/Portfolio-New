(() => {
  const { useEffect, useMemo, useRef, useState } = React;

  function useTheme() {
    const [theme, setTheme] = useState(() => {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });
    useEffect(() => {
      const root = document.documentElement;
      if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
      localStorage.setItem('theme', theme);
    }, [theme]);
    const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));
    return { theme, toggle };
  }

  function Navbar({ onToggleTheme, theme }) {
    const [open, setOpen] = useState(false);
    useEffect(() => {
      const onScroll = () => setOpen(false);
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const links = [
      { href: '#home', label: 'Home' },
      { href: '#profile', label: 'Profile' },
      { href: '#projects', label: 'Projects' },
      { href: '#education', label: 'Education' },
      { href: '#skills', label: 'Skills' },
      { href: '#contact', label: 'Contact' },
    ];

    return (
      React.createElement('nav', { className: 'fixed top-0 left-0 right-0 z-50' },
        React.createElement('div', { className: 'glass border-b border-white/10 dark:border-slate-800' },
          React.createElement('div', { className: 'container mx-auto px-4 py-3 flex items-center justify-between' },
            React.createElement('a', { href: '#home', className: 'font-display text-xl font-bold gradient-text tracking-tight' }, 'Hassan Shah'),
            React.createElement('div', { className: 'hidden md:flex items-center gap-6' },
              links.map(l => React.createElement('a', {
                key: l.href, href: l.href,
                className: 'nav-link-underline text-sm font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors'
              }, l.label)),
              React.createElement('button', {
                className: 'ms-2 px-3 py-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition btn-glow',
                title: 'Toggle theme',
                onClick: onToggleTheme
              }, React.createElement('i', { className: theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon' }))
            ),
            React.createElement('button', {
              className: 'md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900',
              onClick: () => setOpen(o => !o),
              'aria-label': 'Toggle menu'
            }, React.createElement('i', { className: 'bi bi-list text-2xl' })),
          ),
          open && React.createElement('div', { className: 'md:hidden border-t border-white/10 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-lg' },
            React.createElement('div', { className: 'container mx-auto px-4 py-3 flex flex-col gap-3' },
              links.map(l => React.createElement('a', {
                key: l.href, href: l.href,
                className: 'nav-link-underline text-base font-medium', onClick: () => setOpen(false)
              }, l.label)),
              React.createElement('button', {
                className: 'self-start px-3 py-2 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition btn-glow',
                onClick: onToggleTheme
              }, React.createElement('i', { className: theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon' }), ' Toggle theme')
            ))
        )
      )
    );
  }

  function TypewriterName() {
    const words = useMemo(() => ['Syed', 'Hassan', 'Hussain', 'Shah'], []);
    const [wordIndex, setWordIndex] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
      const full = words[wordIndex];
      const speed = isDeleting ? 60 : 120;
      const timeout = setTimeout(() => {
        const nextLength = displayed.length + (isDeleting ? -1 : 1);
        setDisplayed(full.substring(0, nextLength));
        if (!isDeleting && nextLength === full.length) {
          setTimeout(() => setIsDeleting(true), 600);
        } else if (isDeleting && nextLength === 0) {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }, speed);
      return () => clearTimeout(timeout);
    }, [displayed, isDeleting, wordIndex, words]);

    useEffect(() => {
      if (!isDeleting) setDisplayed('');
    }, [wordIndex]);

    return (
      React.createElement('h1', {
        className: 'text-5xl md:text-7xl font-extrabold font-display tracking-tight'
      },
        React.createElement('span', { className: 'gradient-text' }, displayed),
        React.createElement('span', { className: 'ml-1 text-primary-500' }, '|')
      )
    );
  }

  function Hero() {
    const [showIntro, setShowIntro] = useState(false);
    useEffect(() => {
      const t = setTimeout(() => setShowIntro(true), 1400);
      AOS.init({ once: true, duration: 700, easing: 'ease-out-quart' });
      return () => clearTimeout(t);
    }, []);

    return (
      React.createElement('section', { id: 'home', className: 'pt-28 md:pt-32 pb-12 md:pb-20 relative overflow-hidden' },
        React.createElement('div', { className: 'absolute -top-24 -right-24 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-floaty' }),
        React.createElement('div', { className: 'absolute -bottom-24 -left-24 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-floaty' }),
        React.createElement('div', { className: 'container mx-auto px-4' },
          React.createElement('div', { className: 'max-w-3xl' },
            React.createElement('p', { className: 'uppercase tracking-widest text-xs font-semibold text-slate-500 dark:text-slate-400', 'data-aos': 'fade-up' }, 'Hello, I’m'),
            React.createElement('div', { 'data-aos': 'fade-up', 'data-aos-delay': '50' }, React.createElement(TypewriterName, null)),
            showIntro && React.createElement('p', {
              className: 'mt-5 text-lg md:text-xl text-slate-700 dark:text-slate-300',
              'data-aos': 'fade-up', 'data-aos-delay': '100'
            },
              React.createElement('span', { className: 'bg-gradient-to-r from-primary-500 to-accent bg-clip-text text-transparent font-semibold' }, 'I work with'), ' HTML, CSS, JavaScript, React, Tailwind CSS, Bootstrap, Node.js, Express.js, and more.'
            ),
            React.createElement('div', { className: 'mt-8 flex gap-3', 'data-aos': 'fade-up', 'data-aos-delay': '150' },
              React.createElement('a', { href: '#projects', className: 'btn btn-primary rounded-pill px-4 py-2 btn-glow' }, 'View Projects'),
              React.createElement('a', { href: '#contact', className: 'btn btn-outline-secondary rounded-pill px-4 py-2' }, 'Contact Me')
            )
          )
        )
      )
    );
  }

  function Profile() {
    return (
      React.createElement('section', { id: 'profile', className: 'py-14 md:py-20' },
        React.createElement('div', { className: 'container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center' },
          React.createElement('div', { className: 'flex justify-center', 'data-aos': 'fade-right' },
            React.createElement('div', { className: 'relative w-56 h-56 md:w-72 md:h-72 profile-ring' },
              React.createElement('img', {
                src: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=800&auto=format&fit=crop',
                alt: 'Profile',
                className: 'relative z-10 w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-900 shadow-xl transition-transform duration-300 hover:scale-105'
              })
            )
          ),
          React.createElement('div', { 'data-aos': 'fade-left' },
            React.createElement('h2', { className: 'section-title font-display text-3xl md:text-4xl font-bold mb-4' }, 'About Me'),
            React.createElement('p', { className: 'text-slate-700 dark:text-slate-300 leading-relaxed' },
              'I build delightful, performant web experiences. I love modern UI, fluid animations, and robust backends. Currently focused on React, Node.js, and cloud-native architectures.'
            ),
            React.createElement('div', { className: 'mt-6 flex flex-wrap gap-3' },
              ['React', 'Tailwind', 'Bootstrap', 'Node.js', 'Express', 'AOS'].map(t => (
                React.createElement('span', { key: t, className: 'px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm border border-slate-200 dark:border-slate-800' }, t)
              ))
            )
          )
        )
      )
    );
  }

  function ProjectCard({ project }) {
    const deviconMap = {
      'React': 'devicon-react-original colored',
      'Node.js': 'devicon-nodejs-plain colored',
      'Express': 'devicon-express-original',
      'Express.js': 'devicon-express-original',
      'MongoDB': 'devicon-mongodb-plain colored',
      'Stripe': 'bi bi-credit-card',
      'Tailwind CSS': 'devicon-tailwindcss-plain colored',
      'Bootstrap': 'devicon-bootstrap-plain colored',
      'Chart.js': 'bi bi-graph-up',
      'Socket.io': 'devicon-socketio-original'
    };
    return (
      React.createElement('div', { className: 'card-hover rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md', 'data-aos': 'fade-up' },
        React.createElement('div', { className: 'aspect-video overflow-hidden' },
          React.createElement('img', { src: project.image, alt: project.title, className: 'w-full h-full object-cover transition-transform duration-300 hover:scale-105' })
        ),
        React.createElement('div', { className: 'p-5' },
          React.createElement('h3', { className: 'font-semibold text-lg mb-1' }, project.title),
          React.createElement('p', { className: 'text-sm text-slate-600 dark:text-slate-400' }, project.description),
          React.createElement('div', { className: 'mt-3 flex flex-wrap gap-2' },
            project.tech.map(t => React.createElement('span', { key: t, className: 'inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700' },
              React.createElement('i', { className: deviconMap[t] || 'bi bi-lightning-charge' }),
              t
            ))
          ),
          React.createElement('div', { className: 'mt-4' },
            React.createElement('a', { href: project.url, className: 'text-primary-600 dark:text-primary-400 nav-link-underline text-sm' }, 'View project')
          )
        )
      )
    );
  }

  function Projects() {
    const projects = (window.PROJECTS || []).slice();
    return (
      React.createElement('section', { id: 'projects', className: 'py-14 md:py-20 bg-slate-50 dark:bg-slate-950/40' },
        React.createElement('div', { className: 'container mx-auto px-4' },
          React.createElement('div', { className: 'flex items-end justify-between mb-8' },
            React.createElement('h2', { className: 'section-title font-display text-3xl md:text-4xl font-bold', 'data-aos': 'fade-right' }, 'Projects'),
            React.createElement('a', { href: '#contact', className: 'hidden md:inline text-sm nav-link-underline', 'data-aos': 'fade-left' }, 'Get in touch →')
          ),
          React.createElement('div', { className: 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6' },
            projects.map((p, i) => React.createElement(ProjectCard, { project: p, key: p.title + i }))
          )
        )
      )
    );
  }

  function EducationItem({ item, isLast }) {
    return (
      React.createElement('div', { className: 'relative pl-10', 'data-aos': 'fade-up' },
        React.createElement('div', { className: 'absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center' },
          React.createElement('i', { className: `bi ${item.icon} text-primary-600` })
        ),
        !isLast && React.createElement('div', { className: 'absolute left-3 top-7 bottom-0 w-px bg-slate-200 dark:bg-slate-800' }),
        React.createElement('div', { className: 'rounded-lg p-4 bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 backdrop-blur' },
          React.createElement('div', { className: 'text-xs text-slate-500 dark:text-slate-400 mb-1' }, item.period),
          React.createElement('h3', { className: 'font-semibold' }, item.title),
          React.createElement('p', { className: 'text-sm text-slate-600 dark:text-slate-400' }, item.institution),
          React.createElement('p', { className: 'mt-2 text-sm' }, item.details)
        )
      )
    );
  }

  function Education() {
    const items = window.EDUCATION || [];
    return (
      React.createElement('section', { id: 'education', className: 'py-14 md:py-20' },
        React.createElement('div', { className: 'container mx-auto px-4 max-w-3xl' },
          React.createElement('h2', { className: 'section-title font-display text-3xl md:text-4xl font-bold mb-8', 'data-aos': 'fade-right' }, 'Education'),
          React.createElement('div', { className: 'space-y-6' },
            items.map((it, idx) => React.createElement(EducationItem, { key: it.title + idx, item: it, isLast: idx === items.length - 1 }))
          )
        )
      )
    );
  }

  function Skills() {
    const skills = [
      'HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Bootstrap', 'Node.js', 'Express.js',
      'C++', 'C#', 'Oracle', 'Flask'
    ];
    const deviconMap = {
      'HTML': 'devicon-html5-plain colored',
      'CSS': 'devicon-css3-plain colored',
      'JavaScript': 'devicon-javascript-plain colored',
      'React': 'devicon-react-original colored',
      'Tailwind CSS': 'devicon-tailwindcss-plain colored',
      'Bootstrap': 'devicon-bootstrap-plain colored',
      'Node.js': 'devicon-nodejs-plain colored',
      'Express.js': 'devicon-express-original',
      'C++': 'devicon-cplusplus-plain colored',
      'C#': 'devicon-csharp-plain colored',
      'Oracle': 'devicon-oracle-original colored',
      'Flask': 'devicon-flask-original'
    };
    return (
      React.createElement('section', { id: 'skills', className: 'py-14 md:py-20 bg-slate-50 dark:bg-slate-950/40' },
        React.createElement('div', { className: 'container mx-auto px-4' },
          React.createElement('h2', { className: 'section-title font-display text-3xl md:text-4xl font-bold mb-8', 'data-aos': 'fade-right' }, 'Skills'),
          React.createElement('div', { className: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4' },
            skills.map((s, idx) => (
              React.createElement('div', { key: s + idx, className: 'group rounded-xl p-4 bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 backdrop-blur text-center hover:shadow-lg transition', 'data-aos': 'zoom-in' },
                React.createElement('div', { className: 'text-3xl mb-2 flex justify-center' },
                  React.createElement('i', { className: deviconMap[s] || 'bi bi-lightning-charge' })
                ),
                React.createElement('div', { className: 'text-sm font-medium' }, s)
              )
            ))
          )
        )
      )
    );
  }

  function Contact() {
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState(null);

    async function onSubmit(e) {
      e.preventDefault();
      setSubmitting(true);
      setStatus(null);
      const form = e.currentTarget;
      const payload = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim(),
      };
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const json = await res.json();
        if (json.ok) {
          setStatus({ ok: true, msg: 'Thanks! I will get back to you soon.' });
          form.reset();
        } else {
          setStatus({ ok: false, msg: 'Something went wrong. Please try again.' });
        }
      } catch (e) {
        setStatus({ ok: false, msg: 'Network error. Please try again.' });
      } finally {
        setSubmitting(false);
      }
    }

    return (
      React.createElement('section', { id: 'contact', className: 'py-16 md:py-24 relative overflow-hidden' },
        React.createElement('div', { className: 'absolute inset-x-0 -top-24 h-48 bg-gradient-to-r from-primary-500/20 to-accent/20 blur-3xl pointer-events-none' }),
        React.createElement('div', { className: 'container mx-auto px-4 max-w-3xl' },
          React.createElement('h2', { className: 'section-title font-display text-3xl md:text-4xl font-bold mb-8 text-center', 'data-aos': 'fade-up' }, 'Let’s Connect'),
          React.createElement('div', { className: 'rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 backdrop-blur p-6 md:p-10', 'data-aos': 'fade-up' },
            React.createElement('div', { className: 'flex justify-center gap-6 text-2xl mb-6' },
              React.createElement('a', { href: 'https://www.linkedin.com/', target: '_blank', rel: 'noreferrer', className: 'hover:text-primary-600 dark:hover:text-primary-400 transition' }, React.createElement('i', { className: 'bi bi-linkedin' })),
              React.createElement('a', { href: 'https://github.com/', target: '_blank', rel: 'noreferrer', className: 'hover:text-primary-600 dark:hover:text-primary-400 transition' }, React.createElement('i', { className: 'bi bi-github' })),
              React.createElement('a', { href: 'mailto:email@example.com', className: 'hover:text-primary-600 dark:hover:text-primary-400 transition' }, React.createElement('i', { className: 'bi bi-envelope' }))
            ),
            React.createElement('form', { onSubmit: onSubmit, className: 'grid md:grid-cols-2 gap-4' },
              React.createElement('div', { className: 'col-span-1' },
                React.createElement('label', { className: 'text-sm text-slate-600 dark:text-slate-300' }, 'Name'),
                React.createElement('input', { name: 'name', type: 'text', required: true, className: 'mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500' })
              ),
              React.createElement('div', { className: 'col-span-1' },
                React.createElement('label', { className: 'text-sm text-slate-600 dark:text-slate-300' }, 'Email'),
                React.createElement('input', { name: 'email', type: 'email', required: true, className: 'mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500' })
              ),
              React.createElement('div', { className: 'col-span-1 md:col-span-2' },
                React.createElement('label', { className: 'text-sm text-slate-600 dark:text-slate-300' }, 'Message'),
                React.createElement('textarea', { name: 'message', required: true, rows: 5, className: 'mt-1 w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500' })
              ),
              React.createElement('div', { className: 'col-span-1 md:col-span-2 flex items-center justify-between' },
                React.createElement('button', { disabled: submitting, className: 'px-5 py-2 rounded-lg btn-glow text-white bg-gradient-to-r from-primary-600 to-accent hover:opacity-95 disabled:opacity-60' }, submitting ? 'Sending…' : 'Send Message'),
                status && React.createElement('div', { className: status.ok ? 'text-green-600' : 'text-red-500' }, status.msg)
              )
            )
          )
        )
      )
    );
  }

  function Footer() {
    return (
      React.createElement('footer', { className: 'py-8 text-center text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-800/70' },
        '© ', new Date().getFullYear(), ' Hassan Shah. All rights reserved.'
      )
    );
  }

  function App() {
    const { theme, toggle } = useTheme();
    useEffect(() => {
      // Initialize AOS on mount
      AOS.init({ once: true, duration: 700, easing: 'ease-out-quart' });
    }, []);

    return (
      React.createElement(React.Fragment, null,
        React.createElement(Navbar, { onToggleTheme: toggle, theme }),
        React.createElement('main', null,
          React.createElement(Hero, null),
          React.createElement(Profile, null),
          React.createElement(Projects, null),
          React.createElement(Education, null),
          React.createElement(Skills, null),
          React.createElement(Contact, null)
        ),
        React.createElement(Footer, null)
      )
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
})();