import { useMemo, useState } from "react";
import Gallery from "./Gallery.jsx";

const placeholderSvg = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#6c8cff"/>
      <stop offset="1" stop-color="#ff6cc8"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#g)"/>
  <circle cx="920" cy="260" r="140" fill="rgba(255,255,255,0.25)"/>
  <rect x="140" y="520" width="920" height="90" rx="18" fill="rgba(0,0,0,0.18)"/>
  <text x="170" y="580" font-family="Arial" font-size="42" fill="rgba(255,255,255,0.92)">
    Project Preview
  </text>
</svg>
`).trim();

// Lab 3: Dark mode toggle + Gallery component usage
export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = useMemo(() => {
    const common = {
      border: "1px solid rgba(255, 255, 255, 0.12)",
      borderRadius: 16
    };

    // Lab 3: ternary operators + spread syntax for style management
    return darkMode
      ? {
          ...common,
          pageBg: "#0b1020",
          panelBg: "rgba(255, 255, 255, 0.05)",
          cardBg: "rgba(255, 255, 255, 0.05)",
          text: "#eaf0ff",
          subText: "rgba(234, 240, 255, 0.85)",
          mutedBorder: "1px solid rgba(255, 255, 255, 0.12)"
        }
      : {
          ...common,
          pageBg: "#f5f7ff",
          panelBg: "rgba(0, 0, 0, 0.04)",
          cardBg: "rgba(255, 255, 255, 0.9)",
          text: "#111827",
          subText: "rgba(17, 24, 39, 0.75)",
          mutedBorder: "1px solid rgba(0, 0, 0, 0.10)"
        };
  }, [darkMode]);

  const projectForGallery = useMemo(
    () => ({
      title: "Project — Creative Prototyping Showcase",
      author: "Jiayi Huang",
      sourceLabel: "Project source link",
      sourceHref: "https://example.com",
      imageSrc: `data:image/svg+xml;charset=UTF-8,${placeholderSvg}`,
      description:
        "This gallery item demonstrates the required Lab 3 layout: an image on the left and project details on the right. The description supports a “More” expansion to reveal additional content. You can replace this text and the placeholder image with your real project content from your Week 1 portfolio exercise. The goal is to present clear hierarchy: title, author, links, and a readable description area that can expand when needed."
    }),
    []
  );

  return (
    <div className="portfolio" style={{ background: theme.pageBg, color: theme.text }}>
      <div className="hero" style={{ background: theme.panelBg, border: theme.mutedBorder }}>
        <h1>Jiayi Huang</h1>
        <p style={{ color: theme.subText }}>
          Portfolio (Week 1/Lab → React). UI/UX • Creative coding • Prototyping •
          Interaction design
        </p>
      </div>

      <div className="grid2">
        <div className="card" style={{ background: theme.cardBg, border: theme.mutedBorder }}>
          <div className="aboutHeaderRow">
            <h2 className="aboutTitle">About Me</h2>

            {/* Lab 3: 🌙/☀ toggle on the same line as "About Me" */}
            <button
              type="button"
              className="modeToggle"
              aria-label="Toggle dark mode"
              onClick={() => setDarkMode((v) => !v)}
              title="Toggle dark / light"
            >
              {darkMode ? "🌙" : "☀"}
            </button>
          </div>
          <p style={{ color: theme.subText }}>
            I am a student exploring design + technology. I enjoy building
            interactive prototypes and clean interfaces with strong visual
            hierarchy.
          </p>
        </div>

        <div className="card" style={{ background: theme.cardBg, border: theme.mutedBorder }}>
          <h2>Skills</h2>
          <p style={{ color: theme.subText }}>
            Figma, Adobe CC, HTML/CSS, JavaScript, React, Rapid prototyping,
            User research
          </p>
        </div>
      </div>

      <div className="card" style={{ background: theme.cardBg, border: theme.mutedBorder }}>
        <h2>Gallery</h2>
        <p style={{ color: theme.subText }}>
          A project details component with image-left and text-right layout.
        </p>
        <Gallery project={projectForGallery} />
      </div>

      <div className="card" style={{ background: theme.cardBg, border: theme.mutedBorder }}>
        <h2>Selected Projects</h2>
        <div className="projects">
          <div className="projectItem">
            <h3>Project 01 — Interactive Poster</h3>
            <p>
              A motion-driven visual system exploring typography, rhythm, and
              attention.
            </p>
          </div>
          <div className="projectItem">
            <h3>Project 02 — Mini Web App</h3>
            <p>
              A responsive UI concept turned into a working prototype with
              component-based structure.
            </p>
          </div>
          <div className="projectItem">
            <h3>Project 03 — Physical Computing</h3>
            <p>
              A small sensor-based interaction that connects the physical world
              to digital feedback.
            </p>
          </div>
        </div>
      </div>

      <div className="card" style={{ background: theme.cardBg, border: theme.mutedBorder }}>
        <h2>Contact</h2>
        <p style={{ color: theme.subText }}>Email: yourname@example.com</p>
        <p style={{ color: theme.subText }}>Instagram: @yourhandle</p>
      </div>
    </div>
  );
}

