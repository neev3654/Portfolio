import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <div className="font-display text-sm font-semibold tracking-wide text-text">
            Neev Patel
          </div>
          <div className="mt-2 text-xs text-muted">
            Full Stack Developer · Cinematic product experiences
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/20 px-4 py-2 text-xs font-semibold text-muted transition-colors hover:border-accent/40 hover:text-accent hover:shadow-glow"
            href="https://github.com/yourname"
            target="_blank"
            rel="noreferrer"
          >
            <FiGithub /> GitHub
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/20 px-4 py-2 text-xs font-semibold text-muted transition-colors hover:border-accent/40 hover:text-accent hover:shadow-glow"
            href="https://linkedin.com/in/yourname"
            target="_blank"
            rel="noreferrer"
          >
            <FiLinkedin /> LinkedIn
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/20 px-4 py-2 text-xs font-semibold text-muted transition-colors hover:border-accent/40 hover:text-accent hover:shadow-glow"
            href="mailto:you@domain.com"
          >
            <FiMail /> Email
          </a>
        </div>
      </div>
    </footer>
  )
}

