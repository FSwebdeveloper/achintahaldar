import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

import {
  motion,
  AnimatePresence,
} from "motion/react";

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
  Terminal,
} from "lucide-react";

import Herosection from "./Herosection";
import Aboutsection from "./Aboutsection";
import Socialabout from "./Socialabout";
import Sociallink from "./Sociallink";
import Footer from "./Footer";

// =====================================================
// BACKEND API URL
// =====================================================

const API_URL =
  "https://achintahaldar-backend.onrender.com";

// =====================================================
// PRODUCT ITEMS
// =====================================================

const PRODUCT_ITEMS = [
  {
    label: "Mouse",
    Icon: Mouse,
  },
  {
    label: "Keyboard",
    Icon: Keyboard,
  },
  {
    label: "Monitor",
    Icon: Tv,
  },
  {
    label: "HDMI Cable",
    Icon: Cable,
  },
  {
    label: "VGA Cable",
    Icon: Plug,
  },
  {
    label: "UPS",
    Icon: BatteryCharging,
  },
  {
    label: "Pendrive",
    Icon: Usb,
  },
  {
    label: "SSD",
    Icon: Database,
  },
  {
    label: "HDD",
    Icon: HardDrive,
  },
  {
    label: "Motherboard",
    Icon: CircuitBoard,
  },
  {
    label: "Cabinet",
    Icon: Server,
  },
  {
    label: "Desktop",
    Icon: Monitor,
  },
  {
    label: "Laptop",
    Icon: Laptop,
  },
  {
    label: "Web Design",
    Icon: Globe,
  },
  {
    label: "Apply Online",
    Icon: FileText,
  },
  {
    label: "Vintage Audio\nSystem",
    Icon: Radio,
  },
  {
    label: "Processor",
    Icon: Cpu,
  },
  {
    label: "Hearing AIDS",
    Icon: Ear,
  },
  {
    label: "CCTV Accessories",
    Icon: Camera,
  },
  {
    label: "Windows OS",
    Icon: Disc,
  },
  {
    label: "Phoneix OS",
    Icon: Terminal,
  },
  {
    label: "PC Speaker",
    Icon: Speaker,
  },
  {
    label: "RAM",
    Icon: MemoryStick,
  },
];

// =====================================================
// UNIQUE BUBBLE COLORS
// =====================================================

const UNIQUE_BUBBLE_COLORS = [
  "rgba(239, 68, 68, 0.88)",
  "rgba(249, 115, 22, 0.88)",
  "rgba(245, 158, 11, 0.88)",
  "rgba(234, 179, 8, 0.88)",
  "rgba(132, 204, 22, 0.88)",
  "rgba(34, 197, 94, 0.88)",
  "rgba(16, 185, 129, 0.88)",
  "rgba(20, 184, 166, 0.88)",
  "rgba(6, 182, 212, 0.88)",
  "rgba(14, 165, 233, 0.88)",
  "rgba(59, 130, 246, 0.88)",
  "rgba(79, 70, 229, 0.88)",
  "rgba(99, 102, 241, 0.88)",
  "rgba(139, 92, 246, 0.88)",
  "rgba(168, 85, 247, 0.88)",
  "rgba(217, 70, 239, 0.88)",
  "rgba(236, 72, 153, 0.88)",
  "rgba(244, 63, 94, 0.88)",
  "rgba(225, 29, 72, 0.88)",
  "rgba(2, 132, 199, 0.88)",
  "rgba(13, 148, 136, 0.88)",
  "rgba(219, 39, 119, 0.88)",
  "rgba(101, 163, 13, 0.88)",
];

// =====================================================
// DEEP HIGHLIGHT BORDER COLORS
// =====================================================

const DEEP_HIGHLIGHT_BORDER_COLORS = [
  "#1E3A8A",
  "#312E81",
  "#064E3B",
  "#581C87",
  "#881337",
  "#701A75",
  "#7C2D12",
  "#991B1B",
  "#9F1239",
  "#78350F",
  "#854D0E",
  "#365314",
  "#134E4A",
  "#065F46",
  "#9A3412",
  "#0C4A6E",
  "#115E59",
  "#1E40AF",
  "#164E63",
  "#831843",
  "#6B21A8",
  "#1E1B4B",
];

// =====================================================
// COLOR PALETTES
// =====================================================

const COLOR_PALETTES = {
  ocean: UNIQUE_BUBBLE_COLORS,
  neon: UNIQUE_BUBBLE_COLORS,
  sunset: UNIQUE_BUBBLE_COLORS,
  pastel: UNIQUE_BUBBLE_COLORS,
};

// =====================================================
// HOME PAGE
// =====================================================

export const HomePage = ({
  onNavigateToContact,
}) => {

  // ===================================================
  // REVIEW STATE
  // ===================================================

  const [reviews, setReviews] = useState([]);

  // ===================================================
  // CURRENT USER EMAIL
  // ===================================================
  // Read email from localStorage when website loads
  // ===================================================

  const [currentUserEmail, setCurrentUserEmail] =
    useState(
      () =>
        localStorage.getItem(
          "currentUserEmail"
        ) || ""
    );

  // ===================================================
  // SAVE CURRENT USER EMAIL TO LOCAL STORAGE
  // ===================================================
  // Whenever Socialabout updates currentUserEmail,
  // it will also be saved in localStorage.
  // ===================================================

  useEffect(() => {
    if (currentUserEmail) {
      localStorage.setItem(
        "currentUserEmail",
        currentUserEmail.trim()
      );
    }
  }, [currentUserEmail]);

  // ===================================================
  // GET APPROVED REVIEWS FROM BACKEND
  // ===================================================

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log(
          "Fetching reviews from backend..."
        );

        const response =
          await fetch(
            `${API_URL}/api/reviews`
          );

        const data =
          await response.json();

        console.log(
          "Backend review response:",
          data
        );

        if (!response.ok) {
          console.error(
            data.message ||
              "Failed to get reviews"
          );
          return;
        }

        // =========================================
        // SAVE REVIEWS INTO REACT STATE
        // =========================================

        setReviews(
          data.reviews || []
        );

      } catch (error) {
        console.error(
          "GET reviews error:",
          error
        );
      }
    };

    fetchReviews();
  }, []);

  // ===================================================
  // BUBBLE STATES
  // ===================================================

  const [bubbles, setBubbles] =
    useState([]);

  const [popParticles, setPopParticles] =
    useState([]);

  const [poppedCount, setPoppedCount] =
    useState(0);

  const [soundEnabled, setSoundEnabled] =
    useState(true);

  const [palette] =
    useState("ocean");

  const [density] =
    useState("medium");

  const containerRef =
    useRef(null);

  const audioCtxRef =
    useRef(null);

  // ===================================================
  // WEB AUDIO
  // ===================================================

  const playPopSound =
    useCallback(
      (size) => {
        if (!soundEnabled) {
          return;
        }

        try {
          if (!audioCtxRef.current) {
            const AudioCtx =
              window.AudioContext ||
              window.webkitAudioContext;

            if (AudioCtx) {
              audioCtxRef.current =
                new AudioCtx();
            }
          }

          const ctx =
            audioCtxRef.current;

          if (
            ctx &&
            ctx.state === "suspended"
          ) {
            ctx.resume();
          }

          if (!ctx) {
            return;
          }

          const osc =
            ctx.createOscillator();

          const gain =
            ctx.createGain();

          const baseFreq =
            Math.max(
              120,
              800 -
                (size || 50) * 8
            );

          osc.type = "sine";

          osc.frequency.setValueAtTime(
            baseFreq,
            ctx.currentTime
          );

          osc.frequency.exponentialRampToValueAtTime(
            baseFreq * 0.25,
            ctx.currentTime + 0.09
          );

          gain.gain.setValueAtTime(
            0.25,
            ctx.currentTime
          );

          gain.gain.exponentialRampToValueAtTime(
            0.001,
            ctx.currentTime + 0.09
          );

          osc.connect(gain);

          gain.connect(
            ctx.destination
          );

          osc.start();

          osc.stop(
            ctx.currentTime + 0.09
          );

        } catch (error) {
          // Audio error ignored
        }
      },
      [soundEnabled]
    );

  // ===================================================
  // ITEM INDEX
  // ===================================================

  const itemIndexRef =
    useRef(0);

  // ===================================================
  // GET NUMBER OF LANES
  // ===================================================

  const getNumLanes =
    useCallback(() => {
      if (
        typeof window ===
        "undefined"
      ) {
        return 4;
      }

      const width =
        window.innerWidth;

      if (width < 520) {
        return 3;
      }

      return 4;
    }, []);

  // ===================================================
  // CREATE NEXT BUBBLE
  // ===================================================

  const createNextBubble =
    useCallback(
      (
        numLanes,
        targetColIndex = null,
        occupiedLanes = [],
        initialOffset = 0
      ) => {
        const itemIdx =
          itemIndexRef.current %
          PRODUCT_ITEMS.length;

        itemIndexRef.current += 1;

        const item =
          PRODUCT_ITEMS[itemIdx];

        let colIndex;

        if (
          targetColIndex !==
            null &&
          targetColIndex !==
            undefined
        ) {
          colIndex =
            targetColIndex %
            numLanes;
        } else {
          const availableLanes =
            [];

          for (
            let lane = 0;
            lane < numLanes;
            lane++
          ) {
            if (
              !occupiedLanes.includes(
                lane
              )
            ) {
              availableLanes.push(
                lane
              );
            }
          }

          colIndex =
            availableLanes.length >
            0
              ? availableLanes[
                  Math.floor(
                    Math.random() *
                      availableLanes.length
                  )
                ]
              : Math.floor(
                  Math.random() *
                    numLanes
                );
        }

        // =========================================
        // BUBBLE SIZE
        // =========================================

        const labelText =
          item.label || "";

        const maxLineLen =
          Math.max(
            ...labelText
              .split("\n")
              .map(
                (line) =>
                  line.length
              )
          );

        let size = 72;

        if (
          maxLineLen <= 4
        ) {
          size = 64;
        } else if (
          maxLineLen <= 7
        ) {
          size = 74;
        } else if (
          maxLineLen <= 10
        ) {
          size = 88;
        } else if (
          maxLineLen <= 14
        ) {
          size = 104;
        } else {
          size = 120;
        }

        // =========================================
        // COLORS
        // =========================================

        const color =
          UNIQUE_BUBBLE_COLORS[
            itemIdx %
              UNIQUE_BUBBLE_COLORS.length
          ];

        const deepBorderColor =
          DEEP_HIGHLIGHT_BORDER_COLORS[
            itemIdx %
              DEEP_HIGHLIGHT_BORDER_COLORS.length
          ];

        const floatDuration =
          16 +
          (itemIdx % 4) *
            1.5;

        // =========================================
        // RETURN BUBBLE
        // =========================================

        return {
          id:
            `bubble-${Date.now()}-${itemIdx}-${Math.random()
              .toString(36)
              .substr(2, 5)}`,
          itemIdx,
          colIndex,
          numCols:
            numLanes,
          size,
          label:
            item.label,
          Icon:
            item.Icon,
          duration:
            floatDuration,
          initialOffset,
          color,
          deepBorderColor,
          borderWidth:
            2.5,
          popped:
            false,
        };
      },
      []
    );

  // ===================================================
  // GENERATE BUBBLES
  // ===================================================

  const generateBubbles =
    useCallback(() => {
      const numLanes =
        getNumLanes();

      itemIndexRef.current =
        0;

      const initialCount =
        numLanes;

      const newBubbles =
        [];

      for (
        let i = 0;
        i < initialCount;
        i++
      ) {
        const initialOffset =
          (i / initialCount) *
            0.70 +
          0.05;

        const bubble =
          createNextBubble(
            numLanes,
            i,
            [],
            initialOffset
          );

        newBubbles.push(
          bubble
        );
      }

      setBubbles(
        newBubbles
      );
    }, [
      getNumLanes,
      createNextBubble,
    ]);

  // ===================================================
  // INITIAL BUBBLE LOAD
  // ===================================================

  useEffect(() => {
    generateBubbles();

    const handleResize =
      () => {
        generateBubbles();
      };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [
    generateBubbles,
  ]);

  // ===================================================
  // BUBBLE COMPLETE
  // ===================================================

  const handleBubbleComplete =
    useCallback(
      (completedId) => {
        setBubbles(
          (previous) => {
            const numLanes =
              getNumLanes();

            const completedBubble =
              previous.find(
                (bubble) =>
                  bubble.id ===
                  completedId
              );

            const remaining =
              previous.filter(
                (bubble) =>
                  bubble.id !==
                  completedId
              );

            const targetColIndex =
              completedBubble
                ? completedBubble.colIndex
                : null;

            const occupiedLanes =
              remaining.map(
                (bubble) =>
                  bubble.colIndex
              );

            const nextBubble =
              createNextBubble(
                numLanes,
                targetColIndex,
                occupiedLanes,
                0
              );

            return [
              ...remaining,
              nextBubble,
            ];
          }
        );
      },
      [
        getNumLanes,
        createNextBubble,
      ]
    );

  // ===================================================
  // POP BUBBLE
  // ===================================================

  const handlePop =
    (event, bubble) => {
      event.stopPropagation();

      if (
        bubble.popped
      ) {
        return;
      }

      // =========================================
      // SOUND
      // =========================================

      playPopSound(
        bubble.size
      );

      // =========================================
      // PARTICLES
      // =========================================

      if (
        event &&
        event.currentTarget
      ) {
        const rect =
          event.currentTarget
            .getBoundingClientRect();

        const centerX =
          rect.left +
          rect.width / 2;

        const centerY =
          rect.top +
          rect.height / 2;

        const newParticles =
          Array.from(
            {
              length: 8,
            },
            (_, i) => {
              const angle =
                (i * 45 * Math.PI) /
                180;

              const speed =
                Math.random() *
                  40 +
                20;

              return {
                id:
                  `particle-${Date.now()}-${i}`,
                x:
                  centerX,
                y:
                  centerY,
                dx:
                  Math.cos(angle) *
                  speed,
                dy:
                  Math.sin(angle) *
                  speed,
                color:
                  bubble.color,
                size:
                  Math.random() *
                    6 +
                  4,
              };
            }
          );

        setPopParticles(
          (previous) => [
            ...previous.slice(-40),
            ...newParticles,
          ]
        );
      }

      // =========================================
      // COUNT
      // =========================================

      setPoppedCount(
        (previous) =>
          previous + 1
      );

      // =========================================
      // MARK POPPED
      // =========================================

      setBubbles(
        (previous) =>
          previous.map(
            (item) =>
              item.id ===
              bubble.id
                ? {
                    ...item,
                    popped: true,
                  }
                : item
          )
      );

      // =========================================
      // NAVIGATE CONTACT
      // =========================================

      if (
        onNavigateToContact &&
        bubble.label
      ) {
        setTimeout(() => {
          onNavigateToContact(
            bubble.label
          );
        }, 150);
      }

      // =========================================
      // RESPAWN
      // =========================================

      setTimeout(() => {
        handleBubbleComplete(
          bubble.id
        );
      }, 800);
    };

  // ===================================================
  // BACKGROUND CLICK
  // ===================================================

  const handleContainerClick =
    (event) => {
      if (
        event.target.closest(
          ".home-card-hero"
        ) ||
        event.target.closest(
          ".interactive-bubble"
        ) ||
        event.target.closest(
          ".bubble-controls-panel"
        )
      ) {
        return;
      }

      if (
        !containerRef.current
      ) {
        return;
      }

      playPopSound(30);

      const rect =
        containerRef.current
          .getBoundingClientRect();

      const centerX =
        event.clientX -
        rect.left;

      const centerY =
        event.clientY -
        rect.top;

      const colors =
        COLOR_PALETTES[
          palette
        ] ||
        COLOR_PALETTES.ocean;

      const newParticles =
        Array.from(
          {
            length: 6,
          },
          (_, i) => {
            const angle =
              (i * 60 * Math.PI) /
              180;

            const speed =
              Math.random() *
                30 +
              15;

            return {
              id:
                `click-particle-${Date.now()}-${i}`,
              x:
                centerX,
              y:
                centerY,
              dx:
                Math.cos(angle) *
                speed,
              dy:
                Math.sin(angle) *
                speed,
              color:
                colors[
                  i %
                    colors.length
                ],
              size:
                Math.random() *
                  5 +
                3,
            };
          }
        );

      setPopParticles(
        (previous) => [
          ...previous.slice(-30),
          ...newParticles,
        ]
      );
    };

  // ===================================================
  // CLEAR PARTICLES
  // ===================================================

  useEffect(() => {
    if (
      popParticles.length >
      0
    ) {
      const timer =
        setTimeout(() => {
          setPopParticles([]);
        }, 500);

      return () => {
        clearTimeout(
          timer
        );
      };
    }
  }, [
    popParticles,
  ]);

  // ===================================================
  // RETURN
  // ===================================================

  return (
    <div
      ref={containerRef}
      className="
        home-container
        home-bubble-wrapper
      "
      onClick={
        handleContainerClick
      }
      id="home-page-container"
    >

      {/* =================================================
          FLOATING BUBBLES
      ================================================= */}

      <div
        className="
          floating-bubbles-layer
        "
        id="bubbles-layer"
      >
        {bubbles.map(
          (bubble) => {
            if (
              bubble.popped
            ) {
              return null;
            }

            const IconComponent =
              bubble.Icon;

            const iconSize =
              Math.min(
                22,
                Math.max(
                  14,
                  Math.round(
                    bubble.size *
                      0.22
                  )
                )
              );

            const numCols =
              bubble.numCols ||
              6;

            const colIndex =
              bubble.colIndex ||
              0;

            const padding =
              16;

            const leftCalc =
              numCols > 1
                ? `calc(${padding}px + (${colIndex} / ${
                    numCols - 1
                  }) * (100% - ${
                    bubble.size
                  }px - ${
                    padding * 2
                  }px)`
                : `calc(50% - ${
                    bubble.size /
                    2
                  }px)`;

            const startBottomPercent =
              typeof bubble.initialOffset ===
                "number" &&
              bubble.initialOffset >
                0
                ? bubble.initialOffset *
                  100
                : -10;

            const startOpacity =
              bubble.initialOffset >
              0
                ? 0.96
                : 0;

            const remainingDuration =
              bubble.initialOffset >
              0
                ? bubble.duration *
                  (
                    1 -
                    bubble.initialOffset *
                      0.85
                  )
                : bubble.duration;

            return (
              <motion.div
                key={
                  bubble.id
                }
                className="
                  interactive-bubble
                "
                onClick={(event) =>
                  handlePop(
                    event,
                    bubble
                  )
                }
                initial={{
                  bottom:
                    `${startBottomPercent}%`,
                  left:
                    leftCalc,
                  scale:
                    bubble.initialOffset >
                    0
                      ? 1
                      : 0.3,
                  opacity:
                    startOpacity,
                }}
                animate={{
                  bottom: [
                    `${startBottomPercent}%`,
                    "115%",
                  ],
                  scale:
                    bubble.initialOffset >
                    0
                      ? [
                          1,
                          1,
                          0.9,
                        ]
                      : [
                          0.3,
                          1,
                          1,
                          0.9,
                        ],
                  opacity:
                    bubble.initialOffset >
                    0
                      ? [
                          0.96,
                          0.96,
                          0,
                        ]
                      : [
                          0,
                          0.96,
                          0.96,
                          0,
                        ],
                }}
                transition={{
                  duration:
                    Math.max(
                      3,
                      remainingDuration
                    ),
                  ease:
                    "linear",
                }}
                onAnimationComplete={() =>
                  handleBubbleComplete(
                    bubble.id
                  )
                }
                whileTap={{
                  scale: 0.85,
                }}
                style={{
                  width:
                    `${bubble.size}px`,
                  height:
                    `${bubble.size}px`,
                  backgroundColor:
                    bubble.color,
                  boxShadow:
                    "0 8px 24px 0 rgba(0, 0, 0, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.3)",
                  backdropFilter:
                    "blur(4px)",
                  border:
                    "1.5px solid rgba(255, 255, 255, 0.35)",
                  outline:
                    `2.5px solid ${bubble.deepBorderColor}`,
                  outlineOffset:
                    "5px",
                }}
              >
                <div
                  className="
                    bubble-product-content
                  "
                >
                  {IconComponent && (
                    <IconComponent
                      className="
                        bubble-product-icon
                      "
                      size={
                        iconSize
                      }
                    />
                  )}

                  <span
                    className="
                      bubble-product-label
                    "
                    style={{
                      fontSize:
                        "12px",
                    }}
                  >
                    {
                      bubble.label
                    }
                  </span>
                </div>
              </motion.div>
            );
          }
        )}
      </div>

      {/* =================================================
          POP PARTICLES
      ================================================= */}

      <AnimatePresence>
        {popParticles.map(
          (particle) => (
            <motion.div
              key={
                particle.id
              }
              className="
                pop-particle
              "
              initial={{
                x:
                  particle.x,
                y:
                  particle.y,
                opacity: 1,
                scale: 1,
              }}
              animate={{
                x:
                  particle.x +
                  particle.dx,
                y:
                  particle.y +
                  particle.dy,
                opacity: 0,
                scale: 0.1,
              }}
              transition={{
                duration:
                  0.45,
                ease:
                  "easeOut",
              }}
              style={{
                position:
                  "fixed",
                width:
                  `${particle.size}px`,
                height:
                  `${particle.size}px`,
                borderRadius:
                  "50%",
                backgroundColor:
                  particle.color,
                boxShadow:
                  "0 0 8px rgba(255, 255, 255, 0.8)",
                pointerEvents:
                  "none",
                zIndex: 90,
              }}
            />
          )
        )}
      </AnimatePresence>

      {/* =================================================
          HERO CONTENT
      ================================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="
          home-content
          home-card-hero
        "
        id="home-hero-content"
      >

        {/* =================================================
            POPPED COUNT
        ================================================= */}

        {poppedCount > 0 && (
          <div
            className="
              hero-bubble-badge-row
            "
          >
            <motion.span
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              className="
                popped-score-badge
              "
            >
              <Trophy
                size={13}
              />
              {" "}
              {poppedCount}
              {" "}
              Popped
            </motion.span>
          </div>
        )}

        {/* =================================================
            HERO
        ================================================= */}

        <Herosection />

        {/* =================================================
            ABOUT + REVIEWS
        ================================================= */}

        <Aboutsection
          reviews={
            reviews
          }
          setReviews={
            setReviews
          }
          currentUserEmail={
            currentUserEmail
          }
          setCurrentUserEmail={
            setCurrentUserEmail
          }
        />

        {/* =================================================
            REVIEW FORM
        ================================================= */}

        <Socialabout
          reviews={
            reviews
          }
          setReviews={
            setReviews
          }
          currentUserEmail={
            currentUserEmail
          }
          setCurrentUserEmail={
            setCurrentUserEmail
          }
        />

        {/* =================================================
            SOCIAL LINKS
        ================================================= */}

        <Sociallink />

        {/* =================================================
            FOOTER
        ================================================= */}

        <Footer />

      </motion.div>
    </div>
  );
};

export default HomePage;