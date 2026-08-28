import React from 'react';
import { motion } from 'motion/react';

export const AboutPage = () => {
  return (
    <div className="home-container" id="about-page-container">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="home-content"
        id="about-page-content"
      >
        <h1 className="home-title" id="about-page-title">
          About
        </h1>
      </motion.div>
    </div>
  );
};
