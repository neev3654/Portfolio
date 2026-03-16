import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-card py-12 md:py-16 border-t border-black/[0.04] relative z-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 md:flex-row md:items-end md:justify-between md:px-10 lg:px-16">
        <div>
          <div className="font-display text-xl font-semibold tracking-tight text-text">
            Neev Patel.
          </div>
          <div className="mt-2 text-[15px] font-medium text-[#86868b]">
            Full Stack Developer <br className="md:hidden"/>
            <span className="hidden md:inline"> · </span> 
            Cinematic product experiences
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            className="inline-flex items-center gap-2 rounded-full bg-white border border-black/[0.04] px-5 py-2.5 text-[13px] font-semibold text-[#1d1d1f] transition-all hover:shadow-md hover:scale-[1.02] active:scale-95"
            href="https://github.com/yourname"
            target="_blank"
            rel="noreferrer"
          >
            <FiGithub className="h-4 w-4" /> GitHub
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full bg-white border border-black/[0.04] px-5 py-2.5 text-[13px] font-semibold text-[#1d1d1f] transition-all hover:shadow-md hover:scale-[1.02] active:scale-95"
            href="https://linkedin.com/in/yourname"
            target="_blank"
            rel="noreferrer"
          >
            <FiLinkedin className="h-4 w-4" /> LinkedIn
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full bg-white border border-black/[0.04] px-5 py-2.5 text-[13px] font-semibold text-[#1d1d1f] transition-all hover:shadow-md hover:scale-[1.02] active:scale-95"
            href="mailto:you@domain.com"
          >
            <FiMail className="h-4 w-4" /> Email
          </a>
        </div>
      </div>
    </footer>
  )
}
