import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Monitor,
  Laptop,
  Mouse,
  Keyboard,
  Tv,
  Cable,
  Plug,
  BatteryCharging,
  Globe,
  Radio,
  FileText,
  Ear,
  Usb,
  Cpu,
  HardDrive,
  Network,
  CircuitBoard,
  Server,
  Speaker,
  Database,
  Box,
  MemoryStick,
  Code,
  Layout,
  Layers,
  ExternalLink,
  Send,
  Trophy,
  Camera,
  Disc,
  Terminal
} from 'lucide-react';
import Herosection from './Herosection';
import Aboutsection from './Aboutsection';
import Socialabout from './Socialabout';
import Sociallink from './Sociallink';
import Footer from './Footer';


const PRODUCT_ITEMS = [
  { label: 'Mouse', Icon: Mouse },
  { label: 'Keyboard', Icon: Keyboard },
  { label: 'Monitor', Icon: Tv },
  { label: 'HDMI Cable', Icon: Cable },
  { label: 'VGA Cable', Icon: Plug },
  { label: 'UPS', Icon: BatteryCharging },
  { label: 'Pendrive', Icon: Usb },
  { label: 'SSD', Icon: Database },
  { label: 'HDD', Icon: HardDrive },
  { label: 'Motherboard', Icon: CircuitBoard },
  { label: 'Cabinet', Icon: Server },
  { label: 'Desktop', Icon: Monitor },
  { label: 'Laptop', Icon: Laptop },
  { label: 'Web Design', Icon: Globe },
  { label: 'Apply Online', Icon: FileText },
  { label: 'Vintage Audio\nSystem', Icon: Radio },
  { label: 'Processor', Icon: Cpu },
  { label: 'Hearing AIDS', Icon: Ear },
  { label: 'CCTV Accessories', Icon: Camera },
  { label: 'Windows OS', Icon: Disc },
  { label: 'Phoneix OS', Icon: Terminal },
  { label: 'PC Speaker', Icon: Speaker },
  { label: 'RAM', Icon: MemoryStick },
];

const UNIQUE_BUBBLE_COLORS = [
  'rgba(239, 68, 68, 0.88)',   // 0: Red - Mouse
  'rgba(249, 115, 22, 0.88)',  // 1: Orange - Keyboard
  'rgba(245, 158, 11, 0.88)',  // 2: Amber - Monitor
  'rgba(234, 179, 8, 0.88)',   // 3: Yellow - HDMI Cable
  'rgba(132, 204, 22, 0.88)',  // 4: Lime - VGA Cable
  'rgba(34, 197, 94, 0.88)',   // 5: Green - UPS
  'rgba(16, 185, 129, 0.88)',  // 6: Emerald - Pendrive
  'rgba(20, 184, 166, 0.88)',  // 7: Teal - SSD
  'rgba(6, 182, 212, 0.88)',   // 8: Cyan - HDD
  'rgba(14, 165, 233, 0.88)',  // 9: Sky Blue - Motherboard
  'rgba(59, 130, 246, 0.88)',  // 10: Blue - Cabinet
  'rgba(79, 70, 229, 0.88)',   // 11: Indigo - Desktop
  'rgba(99, 102, 241, 0.88)',  // 12: Indigo Accent - Laptop
  'rgba(139, 92, 246, 0.88)',  // 13: Violet - Web Design
  'rgba(168, 85, 247, 0.88)',  // 14: Purple - Apply Online
  'rgba(217, 70, 239, 0.88)',  // 15: Fuchsia - Vintage Audio System
  'rgba(236, 72, 153, 0.88)',  // 16: Pink - Processor
  'rgba(244, 63, 94, 0.88)',   // 17: Rose - Hearing AIDS
  'rgba(225, 29, 72, 0.88)',   // 18: Crimson - CCTV Accessories
  'rgba(2, 132, 199, 0.88)',   // 19: Ocean Blue - Windows OS
  'rgba(13, 148, 136, 0.88)',  // 20: Deep Teal - Phoneix OS
  'rgba(219, 39, 119, 0.88)',  // 21: Deep Pink - PC Speaker
  'rgba(101, 163, 13, 0.88)',  // 22: Olive Lime - RAM
];

const DEEP_HIGHLIGHT_BORDER_COLORS = [
  '#1E3A8A', // 0: Deep Royal Blue - on Red bubble
  '#312E81', // 1: Deep Indigo - on Orange bubble
  '#064E3B', // 2: Deep Emerald Forest - on Amber bubble
  '#581C87', // 3: Deep Dark Violet - on Yellow bubble
  '#881337', // 4: Deep Crimson Rose - on Lime bubble
  '#701A75', // 5: Deep Fuchsia Plum - on Green bubble
  '#7C2D12', // 6: Deep Bronze Rust - on Emerald bubble
  '#991B1B', // 7: Deep Ruby Crimson - on Teal bubble
  '#9F1239', // 8: Deep Dark Rose - on Cyan bubble
  '#78350F', // 9: Deep Dark Amber - on Sky Blue bubble
  '#854D0E', // 10: Deep Dark Gold - on Blue bubble
  '#365314', // 11: Deep Olive Green - on Indigo bubble
  '#134E4A', // 12: Deep Forest Teal - on Indigo Accent bubble
  '#065F46', // 13: Deep Jade Green - on Violet bubble
  '#9A3412', // 14: Deep Rust Orange - on Purple bubble
  '#0C4A6E', // 15: Deep Ocean Navy - on Fuchsia bubble
  '#115E59', // 16: Deep Pine Teal - on Pink bubble
  '#1E40AF', // 17: Deep Cobalt Blue - on Rose bubble
  '#164E63', // 18: Deep Cyan Navy - on Crimson bubble
  '#831843', // 19: Deep Berry Maroon - on Ocean Blue bubble
  '#6B21A8', // 20: Deep Purple - on Deep Teal bubble
  '#1E1B4B', // 21: Deep Midnight Indigo - on Deep Pink bubble
  '#7F1D1D', // 22: Deep Dark Red - on RAM (Olive) bubble
];

const COLOR_PALETTES = {
  ocean: UNIQUE_BUBBLE_COLORS,
  neon: UNIQUE_BUBBLE_COLORS,
  sunset: UNIQUE_BUBBLE_COLORS,
  pastel: UNIQUE_BUBBLE_COLORS
};

export const HomePage = ({ onNavigateToContact }) => {

const [reviews, setReviews] = useState([]);
    
const [currentUserEmail, setCurrentUserEmail] = useState("");
  
  const [bubbles, setBubbles] = useState([]);
  const [popParticles, setPopParticles] = useState([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [palette] = useState('ocean');
  const [density] = useState('medium');
  const containerRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Initialize Web Audio API
  const playPopSound = useCallback((size) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Pitch inversely proportional to bubble size (bigger = lower pitch)
      const baseFreq = Math.max(120, 800 - (size || 50) * 8);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.25, ctx.currentTime + 0.09);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch (e) {
      // Audio context error fallback
    }
  }, [soundEnabled]);

  // Maintain queue pointer for cycling through all 23 product items
  const itemIndexRef = useRef(0);

  // Compute safe responsive lane count ensuring no overlap and no edge crossing
  const getNumLanes = useCallback(() => {
    if (typeof window === 'undefined') return 4;
    const w = window.innerWidth;
    if (w < 520) return 3; // 3 isolated columns on mobile
    return 4; // 4 isolated columns on desktop
  }, []);

  // Generate a single bubble for the next product item in sequence
  const createNextBubble = useCallback((numLanes, targetColIndex = null, occupiedLanes = [], initialOffset = 0) => {
    const itemIdx = itemIndexRef.current % PRODUCT_ITEMS.length;
    itemIndexRef.current += 1;

    const item = PRODUCT_ITEMS[itemIdx];

    let colIndex;
    if (targetColIndex !== null && targetColIndex !== undefined) {
      colIndex = targetColIndex % numLanes;
    } else {
      const availableLanes = [];
      for (let l = 0; l < numLanes; l++) {
        if (!occupiedLanes.includes(l)) {
          availableLanes.push(l);
        }
      }
      colIndex = availableLanes.length > 0
        ? availableLanes[Math.floor(Math.random() * availableLanes.length)]
        : Math.floor(Math.random() * numLanes);
    }

    // Size adjusted according to max line text length to comfortably hold 12px text
    const labelText = item.label || '';
    const maxLineLen = Math.max(...labelText.split('\n').map(l => l.length));
    let size = 72;
    if (maxLineLen <= 4) size = 64;        // e.g. RAM, SSD, HDD, UPS
    else if (maxLineLen <= 7) size = 74;   // e.g. Mouse, Laptop, Monitor
    else if (maxLineLen <= 10) size = 88;  // e.g. Keyboard, HDMI Cable, VGA Cable, Pendrive, Windows OS, Phoneix OS
    else if (maxLineLen <= 14) size = 104; // e.g. Motherboard, Apply Online, Hearing AIDS, PC Speaker, Vintage Audio
    else size = 120;                       // e.g. CCTV Accessories

    // Unique color corresponding to item index
    const color = UNIQUE_BUBBLE_COLORS[itemIdx % UNIQUE_BUBBLE_COLORS.length];
    const deepBorderColor = DEEP_HIGHLIGHT_BORDER_COLORS[itemIdx % DEEP_HIGHLIGHT_BORDER_COLORS.length];
    const floatDuration = 16 + (itemIdx % 4) * 1.5; // 16s - 20.5s smooth floating speed

    return {
      id: `bubble-${Date.now()}-${itemIdx}-${Math.random().toString(36).substr(2, 5)}`,
      itemIdx,
      colIndex,
      numCols: numLanes,
      size,
      label: item.label,
      Icon: item.Icon,
      duration: floatDuration,
      initialOffset, // 0 to 1 representing vertical start position on page load
      color,
      deepBorderColor,
      borderWidth: 2.5,
      popped: false,
    };
  }, []);

  // Generate initial set of bubbles floating simultaneously in distinct dedicated lanes
  const generateBubbles = useCallback(() => {
    const numLanes = getNumLanes();
    itemIndexRef.current = 0;
    const initialCount = numLanes; // Exactly equal to numLanes (3 on mobile, 4 on desktop)
    const newBubbles = [];

    for (let i = 0; i < initialCount; i++) {
      // Stagger vertical start positions evenly (e.g. 5%, 30%, 55%, 80%) on initial load
      const initialOffset = (i / initialCount) * 0.70 + 0.05;
      const bubble = createNextBubble(numLanes, i, [], initialOffset);
      newBubbles.push(bubble);
    }

    setBubbles(newBubbles);
  }, [getNumLanes, createNextBubble]);

  useEffect(() => {
    generateBubbles();

    const handleResize = () => {
      generateBubbles();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [generateBubbles]);

  // When a bubble reaches the top, replace it with the next product bubble in that exact lane from bottom
  const handleBubbleComplete = useCallback((completedId) => {
    setBubbles(prev => {
      const numLanes = getNumLanes();
      const completedBubble = prev.find(b => b.id === completedId);
      const remaining = prev.filter(b => b.id !== completedId);
      const targetColIndex = completedBubble ? completedBubble.colIndex : null;
      const occupiedLanes = remaining.map(b => b.colIndex);
      const nextBubble = createNextBubble(numLanes, targetColIndex, occupiedLanes, 0);
      return [...remaining, nextBubble];
    });
  }, [getNumLanes, createNextBubble]);

  // Handle popping a bubble
  const handlePop = (e, bubble) => {
    e.stopPropagation();
    if (bubble.popped) return;

    // Trigger pop audio
    playPopSound(bubble.size);

    // Get click/bubble coordinates for particle pop effect
    if (e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Create 8 splash particles
      const newParticles = Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const speed = Math.random() * 40 + 20;
        return {
          id: `particle-${Date.now()}-${i}`,
          x: centerX,
          y: centerY,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          color: bubble.color,
          size: Math.random() * 6 + 4,
        };
      });

      setPopParticles(prev => [...prev.slice(-40), ...newParticles]);
    }
    setPoppedCount(prev => prev + 1);

    // Mark bubble popped
    setBubbles(prev =>
      prev.map(b => (b.id === bubble.id ? { ...b, popped: true } : b))
    );

    // Redirect to contact page with the clicked bubble's product text
    if (onNavigateToContact && bubble.label) {
      setTimeout(() => {
        onNavigateToContact(bubble.label);
      }, 150);
    }

    // Respawn replacement bubble from bottom after 0.8s to keep floating count at 4
    setTimeout(() => {
      handleBubbleComplete(bubble.id);
    }, 800);
  };

  // Click on background triggers particle pop sound & effect without breaking bubble lane rhythm
  const handleContainerClick = (e) => {
    if (e.target.closest('.home-card-hero') || e.target.closest('.interactive-bubble') || e.target.closest('.bubble-controls-panel')) {
      return;
    }

    if (!containerRef.current) return;

    playPopSound(30);

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = e.clientX - rect.left;
    const centerY = e.clientY - rect.top;

    const colors = COLOR_PALETTES[palette] || COLOR_PALETTES.ocean;
    const newParticles = Array.from({ length: 6 }, (_, i) => {
      const angle = (i * 60 * Math.PI) / 180;
      const speed = Math.random() * 30 + 15;
      return {
        id: `click-particle-${Date.now()}-${i}`,
        x: centerX,
        y: centerY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        color: colors[i % colors.length],
        size: Math.random() * 5 + 3,
      };
    });

    setPopParticles(prev => [...prev.slice(-30), ...newParticles]);
  };

  // Clear particles automatically
  useEffect(() => {
    if (popParticles.length > 0) {
      const timer = setTimeout(() => {
        setPopParticles([]);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [popParticles]);

  return (
    <div
      ref={containerRef}
      className="home-container home-bubble-wrapper"
      onClick={handleContainerClick}
      id="home-page-container"
    >
      {/* Floating Ambient Background Bubbles */}
      <div className="floating-bubbles-layer" id="bubbles-layer">
        {bubbles.map(bubble => {
          if (bubble.popped) return null;
          const IconComponent = bubble.Icon;
          const iconSize = Math.min(22, Math.max(14, Math.round(bubble.size * 0.22)));
          const numCols = bubble.numCols || 6;
          const colIndex = bubble.colIndex || 0;
          const padding = 16;
          
          // Exact calculation ensuring zero overlap and zero overflow past body boundaries
          const leftCalc = numCols > 1
            ? `calc(${padding}px + (${colIndex} / ${numCols - 1}) * (100% - ${bubble.size}px - ${padding * 2}px))`
            : `calc(50% - ${bubble.size / 2}px)`;

          const startBottomPercent = typeof bubble.initialOffset === 'number' && bubble.initialOffset > 0
            ? bubble.initialOffset * 100
            : -10;
          const startOpacity = bubble.initialOffset > 0 ? 0.96 : 0;
          const remainingDuration = bubble.initialOffset > 0
            ? bubble.duration * (1 - bubble.initialOffset * 0.85)
            : bubble.duration;

          return (
            <motion.div
              key={bubble.id}
              className="interactive-bubble"
              onClick={(e) => handlePop(e, bubble)}
              initial={{
                bottom: `${startBottomPercent}%`,
                left: leftCalc,
                scale: bubble.initialOffset > 0 ? 1 : 0.3,
                opacity: startOpacity,
              }}
              animate={{
                bottom: [`${startBottomPercent}%`, '115%'],
                scale: bubble.initialOffset > 0 ? [1, 1, 0.9] : [0.3, 1, 1, 0.9],
                opacity: bubble.initialOffset > 0 ? [0.96, 0.96, 0] : [0, 0.96, 0.96, 0],
              }}
              transition={{
                duration: Math.max(3, remainingDuration),
                ease: 'linear',
              }}
              onAnimationComplete={() => handleBubbleComplete(bubble.id)}
              whileTap={{ scale: 0.85 }}
              style={{
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                backgroundColor: bubble.color,
                boxShadow: `0 8px 24px 0 rgba(0, 0, 0, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.3)`,
                backdropFilter: 'blur(4px)',
                border: '1.5px solid rgba(255, 255, 255, 0.35)',
                outline: `2.5px solid ${bubble.deepBorderColor}`,
                outlineOffset: '5px',
              }}
            >
              <div className="bubble-product-content">
                {IconComponent && <IconComponent className="bubble-product-icon" size={iconSize} />}
                <span className="bubble-product-label" style={{ fontSize: '12px' }}>{bubble.label}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pop Particle Splash Layer */}
      <AnimatePresence>
        {popParticles.map(p => (
          <motion.div
            key={p.id}
            className="pop-particle"
            initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
            animate={{
              x: p.x + p.dx,
              y: p.y + p.dy,
              opacity: 0,
              scale: 0.1,
            }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              backgroundColor: p.color,
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
              pointerEvents: 'none',
              zIndex: 90,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Center Hero Card Content */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="home-content home-card-hero"
        id="home-hero-content"
      >
        {poppedCount > 0 && (
          <div className="hero-bubble-badge-row">
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="popped-score-badge"
            >
              <Trophy size={13} /> {poppedCount} Popped
            </motion.span>
          </div>
        )}
        <Herosection/>
        <Aboutsection
        reviews={reviews}
        setReviews={setReviews}
        currentUserEmail={
          currentUserEmail}
        setCurrentUserEmail={
          setCurrentUserEmail
        }/>
        <Socialabout
        reviews={reviews}
        setReviews={setReviews}
        currentUserEmail={
          currentUserEmail}
        setCurrentUserEmail={
          setCurrentUserEmail
        }/>
        <Sociallink/>
        <Footer/>
      </motion.div>
    </div>
  );
};



