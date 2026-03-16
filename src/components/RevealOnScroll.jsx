import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const RevealOnScroll = ({ children, className = "", variant = "slideUp", delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    hidden: { 
      opacity: 0, 
      y: variant === "slideUp" ? 50 : 0, 
      scale: variant === "scaleBlur" ? 0.95 : 1,
      filter: variant === "scaleBlur" ? "blur(8px)" : "blur(0px)"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 0.8,
        delay: delay,
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }} 
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;
