import { useEffect, useRef, useState } from "react";

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');";

const ROLES = [
  "Full Stack Developer",
  "React & Node.js Engineer",
  "Real-time UI Architect",
  "Accessibility-minded Builder",
];

const SKILLS = [
  {
    label: "State & Data",
    tags: [
      "Redux Toolkit",
      "RTK Query",
      "Middleware pipelines",
      "Async orchestration",
    ],
  },
  {
    label: "Real-time Systems",
    tags: [
      "Socket.IO",
      "WebSocket middleware",
      "Event-driven state sync",
      "Optimistic UI",
    ],
  },
  {
    label: "Backend & Data",
    tags: ["Node.js", "Express.js", "PostgreSQL", "REST APIs", "AWS S3"],
  },
  {
    label: "Forms & Validation",
    tags: ["Formik", "Yup", "Schema-driven forms", "Dynamic field logic"],
  },
  {
    label: "Documents & translation",
    tags: [
      "jsPDF / AutoTable",
      "Multi-script rendering",
      "16-language support",
    ],
  },
  {
    label: "Accessibility",
    tags: ["WCAG AA", "Keyboard navigation", "ARIA & screen readers"],
  },
  {
    label: "Code Quality",
    tags: ["SonarQube", "Cognitive complexity", "Code review"],
  },
];

const EXPERIENCE = [
  {
    year: "2023 — Now",
    role: "Web Developer",
    org: "Orbio Solutions Pvt Ltd",
    desc: "A Technology Development Company that provides future-ready software and analytical solutions for businesses globally.",
  },
  {
    year: "2021 — 2023",
    role: "Software Engineer",
    org: "Capgemini Pvt Ltd",
    desc: "Multi national company in partnering with companies to transform and manage their business by harnessing the power of technology.",
  },
];

const PROJECTS = [
  {
    title: "Document Exchange Platform",
    tag: "Node.js · Express · PostgreSQL · AWS S3",
    desc: "Designed and built end-to-end as a solo developer — a full-stack app for securely exchanging documents via AWS S3, covering both the React frontend and the Node/Express/PostgreSQL backend.",
  },
  {
    title: "Legal Aid Knowledge Base API",
    tag: "Node.js · Express · REST APIs",
    desc: "Built CRUD endpoints powering the knowledge base module of the intake and matter-management platform, extending the app's backend alongside ongoing frontend feature work.",
  },
  {
    title: "Real-time Contact Import Pipeline",
    tag: "Socket.IO · Redux",
    desc: "Isolated WebSocket middleware and slice for async import jobs, with persisted progress and a global toast layer — running alongside an existing socket system without touching it.",
  },
  {
    title: "Multi-script PDF Report Engine",
    tag: "jsPDF · i18n",
    desc: "Font-resolution system covering 16 languages and scripts, with ordered range matching so shared punctuation renders under the correct script.",
  },
  {
    title: "Accessible Drag & Drop Builder",
    tag: "dnd-kit · A11y",
    desc: "Full keyboard operability for a section/field builder — custom sensors, live ARIA announcements, and precise drop-zone targeting.",
  },
  {
    title: "Config-Driven Validation Engine",
    tag: "Formik · Yup",
    desc: "Yup schemas generated at runtime from API field rules, via a closure-based factory that captures external config without stale state.",
  },
  {
    title: "Ecommerce Analytics Rebuild",
    tag: "React · State Architecture",
    desc: "Rebuilt a product analytics app from the ground up — restructured the state management layer and consolidated scattered UI into reusable components, cutting bundle size and improving load and interaction speed.",
  },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "", style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .7s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function StatusPill({ small }) {
  return (
    <div
      className="status-pill"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: small ? "5px 10px" : "7px 14px",
        borderRadius: 999,
        background: "rgba(52,211,153,0.08)",
        border: "1px solid rgba(52,211,153,0.28)",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: small ? 11 : 12.5,
        color: "#34D399",
        letterSpacing: 0.2,
      }}
    >
      <span className="pulse-dot" />
      <span>Open for Opportunities</span>
    </div>
  );
}

function TypedRole() {
  const [i, setI] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[i];
    const speed = deleting ? 35 : 65;
    const pause = 1400;

    if (!deleting && sub === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && sub === 0) {
      const t = setTimeout(() => {
        setDeleting(false);
        setI((n) => (n + 1) % ROLES.length);
      }, 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setSub((n) => n + (deleting ? -1 : 1)), speed);
    return () => clearTimeout(t);
  }, [sub, deleting, i]);

  return (
    <span style={{ color: "#C084FC" }}>
      {ROLES[i].slice(0, sub)}
      <span className="caret">|</span>
    </span>
  );
}

function SignalLines() {
  return (
    <svg
      viewBox="0 0 900 620"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.55,
      }}
    >
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C084FC" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F472B6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[
        "M40,520 C220,420 260,300 420,260 C560,225 620,140 780,90",
        "M20,300 C180,320 260,220 380,210 C520,198 600,120 860,150",
        "M60,140 C200,180 300,150 400,190 C520,235 660,210 840,300",
      ].map((d, idx) => (
        <path
          key={idx}
          d={d}
          fill="none"
          stroke="url(#lg1)"
          strokeWidth="1.4"
          strokeLinecap="round"
          className="signal-path"
          style={{ animationDelay: `${idx * 0.4}s` }}
        />
      ))}
      {[
        [780, 90],
        [860, 150],
        [420, 260],
        [380, 210],
        [400, 190],
      ].map(([cx, cy], idx) => (
        <circle
          key={idx}
          cx={cx}
          cy={cy}
          r="3.5"
          fill="#C084FC"
          className="node-dot"
          style={{ animationDelay: `${idx * 0.3}s` }}
        />
      ))}
    </svg>
  );
}

export default function Portfolio() {
  const heroRef = useRef(null);
  const [glow, setGlow] = useState({ x: 50, y: 30 });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      setGlow({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const logo = () => {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" style={{ flexShrink: 0 }}>
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="36"
          height="36"
          rx="10"
          fill="url(#logoGrad)"
        />
        <text
          x="18"
          y="24"
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
          fontSize="15"
          fill="#150A1E"
        >
          GN
        </text>
      </svg>
    );
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#0D0716",
        color: "#F3EEFB",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <style>{`
        ${FONT_IMPORT}
        * { box-sizing: border-box; }
        ::selection { background: rgba(192,132,252,0.25); color: #fff; }
        a { color: inherit; text-decoration: none; }
        .glass {
          background: rgba(196,158,255,0.055);
          border: 1px solid rgba(196,158,255,0.16);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .pulse-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #34D399;
          box-shadow: 0 0 0 0 rgba(52,211,153,0.6);
          animation: pulseRing 2s infinite;
        }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(52,211,153,0.55); }
          70% { box-shadow: 0 0 0 9px rgba(52,211,153,0); }
          100% { box-shadow: 0 0 0 0 rgba(52,211,153,0); }
        }
        .caret { animation: blink 1s step-start infinite; color:#C084FC; }
        @keyframes blink { 50% { opacity: 0; } }
        .signal-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 2.6s ease-out forwards;
        }
        @keyframes draw { to { stroke-dashoffset: 0; } }
        .node-dot {
          opacity: 0;
          animation: nodeIn 0.6s ease-out forwards, nodePulse 2.4s ease-in-out infinite;
          animation-delay: 2s, 2.6s;
        }
        @keyframes nodeIn { to { opacity: 1; } }
        @keyframes nodePulse {
          0%,100% { r: 3.5; opacity: 1; }
          50% { r: 5; opacity: 0.6; }
        }
        .skill-chip {
          transition: transform .25s ease, border-color .25s ease, background .25s ease;
        }
        .skill-chip:hover {
          transform: translateY(-3px);
          border-color: rgba(192,132,252,0.5);
          background: rgba(192,132,252,0.08);
        }
        .proj-card {
          transition: transform .35s cubic-bezier(.16,1,.3,1), border-color .35s ease, box-shadow .35s ease;
        }
        .proj-card:hover {
          transform: translateY(-6px);
          border-color: rgba(192,132,252,0.4);
          box-shadow: 0 20px 60px -20px rgba(192,132,252,0.25);
        }
        .cta-btn {
          transition: transform .25s ease, box-shadow .25s ease, background .25s ease;
        }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 30px -10px rgba(192,132,252,0.45); }
        .tl-node {
          box-shadow: 0 0 0 4px rgba(10,14,20,1), 0 0 0 5px rgba(192,132,252,0.35);
        }
        .header-nav {
          display: flex;
          gap: 28px;
        }
        @media (max-width: 639px) {
          .header-nav {
            gap: 12px;
          }
        }
        .nav-link { position: relative; }
        .nav-link::after {
          content: ""; position: absolute; left: 0; bottom: -4px; width: 0; height: 1px;
          background: #C084FC; transition: width .25s ease;
        }
        .nav-link:hover::after { width: 100%; }
        @media (prefers-reduced-motion: reduce) {
          .pulse-dot, .caret, .signal-path, .node-dot { animation: none !important; }
        }
      `}</style>

      {/* NAV */}
      <nav
        className="glass"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 28px",
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          {logo()}
        </span>
        <div className="header-nav" style={{ fontSize: 14, color: "#C9BEDD" }}>
          {["About", "Experience", "Projects", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">
              {l}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          minHeight: "88vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          padding: "0 28px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(600px circle at ${glow.x}% ${glow.y}%, rgba(192,132,252,0.10), transparent 60%)`,
            pointerEvents: "none",
            transition: "background .15s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(196,158,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(196,158,255,0.06) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
            maskImage:
              "radial-gradient(ellipse at 30% 40%, black 30%, transparent 75%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "55%",
            height: "100%",
          }}
        >
          <SignalLines />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 780,
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Reveal>
            <StatusPill />
          </Reveal>
          <Reveal delay={100}>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(40px, 7vw, 76px)",
                lineHeight: 1.02,
                margin: "22px 0 10px",
                letterSpacing: -1,
              }}
            >
              Niranjana Adiga G
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "clamp(15px, 2.4vw, 20px)",
                minHeight: 28,
                color: "#C9BEDD",
              }}
            >
              <TypedRole />
            </div>
          </Reveal>
          <Reveal delay={320}>
            <p
              style={{
                marginTop: 22,
                maxWidth: 540,
                color: "#9C8FB0",
                fontSize: 16,
                lineHeight: 1.7,
              }}
            >
              I build full stack products where state, real-time data, and
              accessibility all have to work at once — from WebSocket-driven
              imports and config-generated forms on the frontend, to the
              PostgreSQL/Node backend and S3-backed storage behind them.
            </p>
          </Reveal>
          <Reveal delay={440}>
            <div
              style={{
                display: "flex",
                gap: 14,
                marginTop: 34,
                flexWrap: "wrap",
              }}
            >
              <a
                href="#projects"
                className="cta-btn"
                style={{
                  padding: "13px 26px",
                  borderRadius: 10,
                  background: "linear-gradient(135deg,#C084FC,#e879c1)",
                  color: "#2B0A38",
                  fontWeight: 600,
                  fontSize: 14.5,
                }}
              >
                View work
              </a>
              <a
                href="#contact"
                className="glass cta-btn"
                style={{
                  padding: "13px 26px",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 14.5,
                }}
              >
                Get in touch
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT + SKILLS */}
      <section
        id="about"
        style={{ padding: "90px 28px", maxWidth: 1080, margin: "0 auto" }}
      >
        <Reveal>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#C084FC",
              fontSize: 13,
            }}
          >
            About Me
          </div>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(26px, 4vw, 38px)",
              marginTop: 10,
              fontWeight: 600,
              maxWidth: 680,
            }}
          >
            A full stack developer focused on the parts most teams
            under-invest in.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p
            style={{
              color: "#9C8FB0",
              marginTop: 18,
              maxWidth: 640,
              lineHeight: 1.75,
              fontSize: 15.5,
            }}
          >
            My day-to-day sits inside a legal intake and matter-management
            platform — untangling socket middleware, building schema-driven
            forms, contributing backend CRUD APIs for its knowledge base, and
            making sure every interaction still works on a keyboard and a
            screen reader. I've also independently designed and shipped a
            full-stack document exchange app end to end, from Postgres schema
            to React UI.
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 16,
            marginTop: 44,
          }}
        >
          {SKILLS.map((group, idx) => (
            <Reveal key={group.label} delay={idx * 70}>
              <div
                className="glass"
                style={{ borderRadius: 14, padding: "20px 20px 16px" }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11.5,
                    color: "#C084FC",
                    letterSpacing: 0.4,
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  {group.label}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {group.tags.map((t) => (
                    <span
                      key={t}
                      className="skill-chip glass"
                      style={{
                        padding: "6px 10px",
                        borderRadius: 8,
                        fontSize: 12.5,
                        color: "#E4D9F5",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        style={{ padding: "70px 28px", maxWidth: 900, margin: "0 auto" }}
      >
        <Reveal>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#C084FC",
              fontSize: 13,
            }}
          >
            History
          </div>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(26px, 4vw, 34px)",
              marginTop: 10,
              fontWeight: 600,
            }}
          >
            Experience
          </h2>
        </Reveal>

        <div style={{ position: "relative", marginTop: 44, paddingLeft: 28 }}>
          <div
            style={{
              position: "absolute",
              left: 5,
              top: 50,
              bottom: 80,
              width: 1,
              background:
                "linear-gradient(to bottom, rgba(192,132,252,0.55), rgba(244,114,182,0.15))",
            }}
          />
          {EXPERIENCE.map((e, idx) => (
            <Reveal
              key={idx}
              delay={idx * 110}
              style={{ position: "relative", marginBottom: 34 }}
            >
              <span
                className="tl-node"
                style={{
                  position: "absolute",
                  left: -28 + 1,
                  top: 50,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#C084FC",
                }}
              />
              <div
                className="glass"
                style={{ borderRadius: 14, padding: "18px 22px" }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: "#F472B6",
                    marginBottom: 6,
                  }}
                >
                  {e.year}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: 17,
                  }}
                >
                  {e.role}{" "}
                  <span style={{ color: "#8A7C9E", fontWeight: 400 }}>
                    · {e.org}
                  </span>
                </div>
                <p
                  style={{
                    color: "#9C8FB0",
                    marginTop: 8,
                    fontSize: 14.5,
                    lineHeight: 1.65,
                  }}
                >
                  {e.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        style={{ padding: "70px 28px", maxWidth: 1080, margin: "0 auto" }}
      >
        <Reveal>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#C084FC",
              fontSize: 13,
            }}
          >
            Projects
          </div>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(26px, 4vw, 34px)",
              marginTop: 10,
              fontWeight: 600,
            }}
          >
            Selected work
          </h2>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 18,
            marginTop: 40,
          }}
        >
          {PROJECTS.map((p, idx) => (
            <Reveal key={p.title} delay={idx * 90}>
              <div
                className="glass proj-card"
                style={{ borderRadius: 16, padding: 24, height: "100%" }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11.5,
                    color: "#C084FC",
                    marginBottom: 12,
                  }}
                >
                  {p.tag}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: 19,
                  }}
                >
                  {p.title}
                </div>
                <p
                  style={{
                    color: "#9C8FB0",
                    marginTop: 10,
                    fontSize: 14.5,
                    lineHeight: 1.7,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{ padding: "90px 28px 110px", maxWidth: 760, margin: "0 auto" }}
      >
        <Reveal>
          <div
            className="glass"
            style={{
              borderRadius: 20,
              padding: "44px 36px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "#C084FC",
                fontSize: 13,
              }}
            >
              Connect With Me
            </div>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(24px, 4vw, 32px)",
                fontWeight: 600,
                marginTop: 14,
              }}
            >
              Let's build something reliable.
            </h2>
            <p style={{ color: "#9C8FB0", marginTop: 10, fontSize: 15 }}>
              Open to full stack roles — reach out directly.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 14,
                marginTop: 26,
                flexWrap: "wrap",
              }}
            >
              <a
                href="mailto:g.niranjana.adiga@gmail.com"
                className="cta-btn"
                style={{
                  padding: "12px 24px",
                  borderRadius: 10,
                  background: "linear-gradient(135deg,#C084FC,#e879c1)",
                  color: "#2B0A38",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                Email me
              </a>
              <a
                href="https://linkedin.com/in/niranjana-adiga-g-a75663190/"
                className="glass cta-btn"
                style={{
                  padding: "12px 24px",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/GNAlearner"
                className="glass cta-btn"
                style={{
                  padding: "12px 24px",
                  borderRadius: 10,
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                GitHub
              </a>
            </div>
            <div style={{ marginTop: 26 }}>
              <StatusPill small />
            </div>
          </div>
        </Reveal>

        <div
          style={{
            textAlign: "center",
            marginTop: 40,
            color: "#6B5F7E",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11.5,
          }}
        >
          built by Niranjana Adiga G · {new Date().getFullYear()}
        </div>
      </section>
    </div>
  );
}
