import React, { useState, useEffect, useRef, useCallback } from 'react';
import { figmaDesigns } from '../data/figmaData';
import { FaFigma } from 'react-icons/fa';
import { FiExternalLink, FiMaximize2, FiX } from 'react-icons/fi';

/* ─────────────────────────────────────────────
   CSS-only Lightbox — replaces framer-motion
   ───────────────────────────────────────────── */
function Lightbox({ src, onClose }) {
  const [visible, setVisible] = useState(false);
  const backdropRef = useRef(null);

  // Trigger entrance on mount
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    // Wait for CSS transition to finish before unmounting
    setTimeout(onClose, 300);
  }, [onClose]);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg/95 p-4 md:p-8 backdrop-blur-md transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
      onClick={handleClose}
    >
      <button
        className="absolute top-6 right-6 p-3 text-text/70 hover:text-text transition-colors z-50 bg-text/10 hover:bg-text/20 rounded-full backdrop-blur-sm"
        onClick={handleClose}
      >
        <FiX className="text-2xl" />
      </button>
      <img
        src={src}
        alt="Fullscreen preview"
        className="max-w-full max-h-[90vh] object-contain rounded-[16px] shadow-2xl transition-all duration-300"
        style={{
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(10px)',
          opacity: visible ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default function FigmaDesigns() {
  const [lightboxImage, setLightboxImage] = useState(null);

  const openLightbox = (image) => setLightboxImage(image);
  const closeLightbox = () => setLightboxImage(null);

  return (
    <section id="figma-designs" className="scene-section flex items-center py-24 bg-bg relative">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tightest mb-4">
            UI/UX <span className="text-gradient">Designs</span>
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-2xl font-sans">
            A showcase of my user interface concepts and product design case studies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {figmaDesigns.map((design) => (
            <div key={design.id} className="group relative rounded-[24px] bg-card overflow-hidden card-hover-lift flex flex-col border border-border/40 gpu-accelerated">
              {/* Image Container with Hover Overlay */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-border/30">
                <img
                  src={design.image}
                  alt={design.title}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col items-center justify-center p-6 text-center z-10 backdrop-blur-sm">
                  <h3 className="text-white text-2xl font-display font-bold mb-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    {design.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-75">
                    <button
                      onClick={() => openLightbox(design.image)}
                      className="flex items-center justify-center w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-md transition-colors"
                      aria-label="View Full Image"
                    >
                      <FiMaximize2 className="text-xl" />
                    </button>
                    
                    {design.figmaLink && (
                      <a
                        href={design.figmaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-accent-purple hover:bg-[#8e45f5] text-white font-medium rounded-full transition-colors shadow-lg"
                      >
                        <FaFigma className="text-lg" /> Figma
                      </a>
                    )}
                    
                    {design.caseStudyLink && design.caseStudyLink !== "#" && (
                      <a
                        href={design.caseStudyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-card text-text hover:bg-border/30 font-medium rounded-full transition-colors shadow-lg"
                      >
                        Case Study <FiExternalLink className="text-lg" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-8 flex-grow flex flex-col justify-between relative z-0 bg-card">
                <div>
                  <h3 className="text-2xl font-bold text-text mb-3 font-display">{design.title}</h3>
                  <p className="text-muted leading-relaxed font-sans text-base">{design.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal — CSS transitions only, no framer-motion */}
      {lightboxImage && (
        <Lightbox src={lightboxImage} onClose={closeLightbox} />
      )}
    </section>
  );
}
