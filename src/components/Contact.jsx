import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useActiveSection } from '../hooks/useActiveSection.js';
import { useIsStandaloneRoute } from '../hooks/useStandaloneRoute.js';
import { FaGithub, FaLinkedin, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

function Field({ label, children }) {
  return (
    <label className="grid gap-2 text-[15px] font-medium text-text">
      {label}
      {children}
    </label>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const infoRef = useRef(null);
  const socialRef = useRef(null);
  const formSectionRef = useRef(null);
  const formRef = useRef(null);
  
  const { markActive } = useActiveSection();
  const isStandalone = useIsStandaloneRoute();

  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom bottom',
        onEnter: () => markActive('contact'),
        onEnterBack: () => markActive('contact'),
      });

      if (!isStandalone) {
        // ── HOME: scroll-triggered animations ──
        if (headlineRef.current) {
          gsap.fromTo(headlineRef.current, 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power4.out',
              scrollTrigger: {
                trigger: headlineRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }

        if (formSectionRef.current) {
          gsap.fromTo(formSectionRef.current,
            { y: 60, opacity: 0, rotateX: -5, scale: 0.98 },
            { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 1.2, ease: 'power4.out',
              scrollTrigger: {
                trigger: formSectionRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }

        if (infoRef.current) {
          gsap.fromTo(infoRef.current.children, 
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out',
              scrollTrigger: {
                trigger: infoRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }
        
        if (socialRef.current) {
          gsap.fromTo(socialRef.current.children, 
            { y: 20, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.8, ease: 'back.out(1.5)',
              scrollTrigger: {
                trigger: socialRef.current,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      } else {
        // ── STANDALONE: immediate animations ──
        if (headlineRef.current) {
          gsap.fromTo(headlineRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
          );
        }

        if (formSectionRef.current) {
          gsap.fromTo(formSectionRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
          );
        }

        if (infoRef.current) {
          gsap.fromTo(infoRef.current.children,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out', delay: 0.15 }
          );
        }

        if (socialRef.current) {
          gsap.fromTo(socialRef.current.children,
            { y: 15, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, stagger: 0.06, duration: 0.6, ease: 'back.out(1.5)', delay: 0.3 }
          );
        }
      }

    }, section);

    return () => ctx.revert();
  }, [markActive, isStandalone]);

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // REPLACE WITH YOUR EMAILJS CREDENTIALS
    const SERVICE_ID = 'YOUR_SERVICE_ID';
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then((result) => {
          setStatus('success');
          formRef.current.reset();
          setTimeout(() => setStatus('idle'), 5000);
      }, (error) => {
          console.error(error.text);
          setErrorMessage('Oops! Something went wrong. Check console.');
          setStatus('error');
          setTimeout(() => setStatus('idle'), 5000);
      });
  };

  return (
    <section id="contact" ref={sectionRef} className="relative w-full bg-bg text-text pt-24 pb-32 md:pt-32 md:pb-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 container">
        
        <div className="mb-20">
          <p className="mb-4 text-xs font-semibold tracking-widest uppercase text-accent-blue">Get In Touch</p>
          <h2 ref={headlineRef} className="font-display text-5xl md:text-6xl lg:text-[5rem] font-bold tracking-tightest leading-[1.1]">
            Let's Start a <span className="text-gradient">Conversation</span>
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,1fr)] gap-16 lg:gap-24 items-start">
          
          {/* Form Side - Left Column */}
          <div
            ref={formSectionRef}
            className="bg-card rounded-[32px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-border/50 relative overflow-hidden will-change-transform"
            style={{ opacity: 0 }}
          >
            <div className="absolute inset-x-0 top-0 h-[4px] bg-gradient-to-r from-accent-blue to-accent-purple" />

            <form ref={formRef} onSubmit={onSubmit} className="grid gap-7 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Name">
                  <input
                    name="user_name"
                    required
                    className="w-full h-14 rounded-[16px] bg-bg px-5 text-base text-text outline-none border border-border/30 focus:bg-card focus:border-accent-blue/40 focus:ring-4 focus:ring-accent-blue/10 transition-all placeholder:text-muted/60"
                    placeholder="Jane Doe"
                  />
                </Field>
                <Field label="Email">
                  <input
                    name="user_email"
                    type="email"
                    required
                    pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                    title="Please enter a valid email address."
                    className="w-full h-14 rounded-[16px] bg-bg px-5 text-base text-text outline-none border border-border/30 focus:bg-card focus:border-accent-blue/40 focus:ring-4 focus:ring-accent-blue/10 transition-all placeholder:text-muted/60"
                    placeholder="jane@example.com"
                  />
                </Field>
              </div>

              <Field label="Subject">
                <input
                  name="subject"
                  required
                  className="w-full h-14 rounded-[16px] bg-bg px-5 text-base text-text outline-none border border-border/30 focus:bg-card focus:border-accent-blue/40 focus:ring-4 focus:ring-accent-blue/10 transition-all placeholder:text-muted/60"
                  placeholder="Project Inquiry"
                />
              </Field>

              <Field label="Message">
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full resize-none rounded-[16px] bg-bg px-5 py-4 text-base text-text outline-none border border-border/30 focus:bg-card focus:border-accent-blue/40 focus:ring-4 focus:ring-accent-blue/10 transition-all placeholder:text-muted/60"
                  placeholder="Tell me about your project or opportunity..."
                />
              </Field>

              <div className="mt-2 relative">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full h-14 rounded-full bg-text text-bg font-medium text-[15px] hover:opacity-80 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {status === 'loading' ? 'Sending Message...' : 'Send Message'}
                </button>

                {/* Toast Notification positioned absolutely */}
                <div 
                  className={`absolute top-[110%] left-0 right-0 flex items-center justify-center gap-2 p-4 rounded-[16px] transition-all duration-500 transform ${
                    status === 'success' 
                      ? 'opacity-100 translate-y-0 bg-green-50 text-green-700 border border-green-200 shadow-sm' 
                      : status === 'error' 
                      ? 'opacity-100 translate-y-0 bg-red-50 text-red-700 border border-red-200 shadow-sm' 
                      : 'opacity-0 translate-y-[-10px] pointer-events-none'
                  }`}
                >
                  {status === 'success' && (
                    <>
                      <FaCheckCircle className="text-xl" />
                      <span className="font-medium">Message sent!</span>
                    </>
                  )}
                  {status === 'error' && (
                    <>
                      <FaExclamationCircle className="text-xl" />
                      <span className="font-medium text-sm">{errorMessage}</span>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Social + Contact Info Side - Right Column */}
          <div ref={infoRef} className="flex flex-col gap-12 lg:pt-8 w-full max-w-lg">
            
            <div style={{ opacity: 0 }}>
              <h3 className="text-3xl font-display font-medium text-text mb-4">Have an idea?</h3>
              <p className="text-lg text-muted leading-relaxed font-sans">
                I'm currently available for freelance work and open to full-time opportunities. If you're building something exciting, let's talk about how I can help.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-5 text-text group cursor-pointer" style={{ opacity: 0 }}>
                <div className="w-14 h-14 rounded-full bg-card flex flex-shrink-0 items-center justify-center border border-border/30 group-hover:scale-[1.15] group-hover:bg-accent-blue/10 group-hover:text-accent-blue transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted mb-0.5 tracking-wide">Email Me</p>
                  <a href="mailto:hello@example.com" className="text-lg font-medium hover:text-accent-blue transition-colors">hello@example.com</a>
                </div>
              </div>

              <div className="flex items-center gap-5 text-text group cursor-default" style={{ opacity: 0 }}>
                <div className="w-14 h-14 rounded-full bg-card flex flex-shrink-0 items-center justify-center border border-border/30 group-hover:scale-[1.15] group-hover:bg-accent-purple/10 group-hover:text-accent-purple transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted mb-0.5 tracking-wide">Location</p>
                  <p className="text-lg font-medium">New York, NY · Remote</p>
                </div>
              </div>
            </div>

            <div className="mt-2 text-left">
              <p className="text-sm font-semibold text-muted mb-6 uppercase tracking-widest pl-1" style={{ opacity: 0 }}>Connect With Me</p>
              
              {/* Horizontal Social Links */}
              <div ref={socialRef} className="flex flex-wrap items-center gap-4">
                <a href="https://github.com/neev3654" target="_blank" rel="noreferrer" className="w-[52px] h-[52px] rounded-full bg-card border border-border/40 flex items-center justify-center text-text hover:bg-[#24292e] hover:text-white hover:scale-[1.15] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-[0_10px_20px_rgba(36,41,46,0.2)] group" aria-label="GitHub">
                  <FaGithub className="text-[1.5rem] group-hover:rotate-[8deg] transition-transform duration-300" />
                </a>
                <a href="https://www.linkedin.com/in/neev-ptl" target="_blank" rel="noreferrer" className="w-[52px] h-[52px] rounded-full bg-card border border-border/40 flex items-center justify-center text-text hover:bg-[#0077b5] hover:text-white hover:scale-[1.15] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-[0_10px_20px_rgba(0,119,181,0.2)] group" aria-label="LinkedIn">
                  <FaLinkedin className="text-[1.5rem] group-hover:rotate-[8deg] transition-transform duration-300" />
                </a>
                <a href="https://leetcode.com/u/Neevptl/" target="_blank" rel="noreferrer" className="w-[52px] h-[52px] rounded-full bg-card border border-border/40 flex items-center justify-center text-text hover:bg-[#ffa116] hover:text-white hover:scale-[1.15] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-[0_10px_20px_rgba(255,161,22,0.2)] group" aria-label="LeetCode">
                  <SiLeetcode className="text-[1.3rem] group-hover:rotate-[8deg] transition-transform duration-300" />
                </a>
                <a href="https://x.com/NeevPatel130469" target="_blank" rel="noreferrer" className="w-[52px] h-[52px] rounded-full bg-card border border-border/40 flex items-center justify-center text-text hover:bg-black hover:text-white hover:scale-[1.15] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] group" aria-label="X">
                  <FaXTwitter className="text-[1.4rem] group-hover:rotate-[8deg] transition-transform duration-300" />
                </a>
                <a href="https://www.youtube.com/@NeevPatel-i5f" target="_blank" rel="noreferrer" className="w-[52px] h-[52px] rounded-full bg-card border border-border/40 flex items-center justify-center text-text hover:bg-[#ff0000] hover:text-white hover:scale-[1.15] hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-[0_10px_20px_rgba(255,0,0,0.2)] group" aria-label="YouTube">
                  <FaYoutube className="text-[1.5rem] group-hover:rotate-[8deg] transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
