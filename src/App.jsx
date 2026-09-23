import { useEffect, useRef, useState } from "react";


const NAV = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["work", "Work"],
  ["contact", "Contact"],
];

const LABELS = {
  home: "Say hello",
  about: "The short version",
  skills: "What I use",
  work: "Recent builds",
  contact: "Let's talk",
};

const SKILLS = [
  "UI/UX Design",
  "Next.js",
  "React",
  "Node.js",
  "Express",
  "TypeScript",
  "Frontend Architecture",
  "Design Systems",
  "Product Branding",
  "API Integration",
  "Motion & Interaction",
  "Figma",
  "Performance",
  "Git",
];

const WORKS = [
  {
    title: "SPV Bond",
    tag: "Corporate · Bond platform",
    tags: ["Web design", "Frontend"],
    href: "https://www.spv-bondproject.com/",
    shot: "/previews/spv.jpg",
  },
  {
    title: "KoboLoop",
    tag: "Savings groups",
    tags: ["Product", "Fintech"],
    href: "https://koboloop-drizzle.vercel.app/",
    shot: "/previews/koboloop.jpg",
  },
  {
    title: "CX Assets",
    tag: "Private banking",
    tags: ["Dashboard", "Data viz"],
    href: "https://www.cx-assets.com/",
    shot: "/previews/cx.jpg",
  },
  {
    title: "SeeCapital",
    tag: "Capital dashboard",
    tags: ["Dashboard", "Fintech"],
    href: "https://seecapital.vercel.app/",
    shot: "/previews/see.jpg",
  },
];

function panelTops() {
  const panels = Array.from(document.querySelectorAll(".panel"));
  const main = panels[0]?.parentElement;
  const start = main ? parseFloat(getComputedStyle(main).paddingTop) || 0 : 0;
  let y = start;
  return panels.map((el) => {
    const top = y;
    y += el.offsetHeight;
    return top;
  });
}

let cachedTops = null;
function tops() {
  if (!cachedTops) cachedTops = panelTops();
  return cachedTops;
}
function clearTops() {
  cachedTops = null;
}

function lockTop(i) {
  if (i <= 0) return 0;
  const list = tops();
  return Math.max(0, (list[i] ?? 0) - (68 + i * 18));
}

export default function App() {
  const [section, setSection] = useState("home");
  const [menu, setMenu] = useState(false);
  const [year] = useState(() => new Date().getFullYear());

  useEffect(() => {
    const glow = document.getElementById("glow");
    if (!glow || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const jump = useRef(() => {});

  useEffect(() => {
    const ids = NAV.map(([id]) => id);
    let current = 0;
    function sync() {
      const y = window.scrollY + 2;
      const list = tops();
      let i = 0;
      list.forEach((top, idx) => {
        const stick = 68 + idx * 18;
        if (y >= top - stick) i = idx;
      });
      if (i !== current) {
        current = i;
      }
      const id = ids[i] ?? "home";
      setSection((cur) => (cur === id ? cur : id));
    }
    function onResize() {
      clearTops();
      sync();
    }
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const nums = document.querySelectorAll(".num");
    const seen = new WeakSet();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || seen.has(entry.target)) return;
          seen.add(entry.target);
          const el = entry.target;
          const target = Number(el.dataset.count || 0);
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / 1100, 1);
            el.textContent = String(Math.floor(p * target));
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = String(target);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.6 },
    );
    nums.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    function animateTo(top) {
      if (reduced) {
        window.scrollTo(0, top);
        return;
      }
      const start = window.scrollY;
      const dist = top - start;
      if (Math.abs(dist) < 2) {
        window.scrollTo(0, top);
        return;
      }
      const dur = 520;
      const t0 = performance.now();
      cancelAnimationFrame(frame);
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        window.scrollTo(0, start + dist * eased);
        if (p < 1) frame = requestAnimationFrame(step);
        else window.scrollTo(0, top);
      };
      frame = requestAnimationFrame(step);
    }
    jump.current = animateTo;

    function onResize() {
      clearTops();
    }
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  function go(id, event) {
    event?.preventDefault();
    const index = NAV.findIndex(([n]) => n === id);
    const top = lockTop(index);
    setSection(id);
    setMenu(false);
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.style.scrollSnapType = "none";
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    window.setTimeout(() => {
      root.style.scrollSnapType = "";
    }, 700);
  }

  function tilt(e) {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
  }

  return (
    <div className="site">
      <div className="cursor-glow" id="glow" />

      <nav className="topbar">
        <a className="brand" href="#home" onClick={(e) => go("home", e)}>
          <span className="brand-mark">H</span>
          Hiswill
          <span className="brand-live">
            <span className="dot" />
            {LABELS[section]}
          </span>
        </a>
        <div className={menu ? "nav-links open" : "nav-links"}>
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={section === id ? "active" : ""} onClick={(e) => go(id, e)}>
              {label}
            </a>
          ))}
        </div>
        <a className="nav-cta" href="#contact" onClick={(e) => go("contact", e)}>
          Got a project?
        </a>
        <button className="menu-btn" aria-label="Open menu" onClick={() => setMenu((v) => !v)}>
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className="rail">
        {NAV.map(([id, label]) => (
          <button
            key={id}
            className={section === id ? "active" : ""}
            data-label={label}
            aria-label={label}
            onClick={() => go(id)}
          />
        ))}
      </div>

      <main>
        <section className="panel" id="home" style={{ "--i": 0 }}>
          <div className="orb" />
          <div className="panel-inner hero-grid">
            <div>
              <div className="eyebrow-line">
                <span className="bar" />
                <span>Available for new work</span>
              </div>
              <h1 className="hero-name">
                I'm Hiswill,
                <br />
                <span className="grad">web designer &</span>
                <br />
                full-stack developer.
              </h1>
              <p className="hero-desc">
                I turn ideas into clean, working websites and dashboards — from the first sketch to the last line of code. Design and engineering, handled by one person, end to end.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="btn btn-fill" onClick={(e) => go("contact", e)}>
                  <span className="glint" />
                  Got a project?
                </a>
                <a href="#work" className="btn btn-outline" onClick={(e) => go("work", e)}>
                  My Portfolio
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="avatar-ring">
                <div className="avatar-disc">
                  <img src="/me-fit.png" alt="Hiswill Iroegbulam" />
                  <span className="avatar-shine" aria-hidden="true" />
                </div>
              </div>
              <div className="float-chip c1">
                <span className="dotc" />
                Designing UI
              </div>
              <div className="float-chip c2">
                <span className="dotc" />
                Shipping code
              </div>
            </div>
          </div>
        </section>

        <section className="panel" id="about" style={{ "--i": 1 }}>
          <div className="orb" />
          <div className="panel-inner about-grid">
            <div>
              <div className="section-tag">About</div>
              <h2>One person, two disciplines, no hand-offs.</h2>
              <div className="about-copy">
                <p>
                  I design the interface and build the product that runs it — which means nothing gets lost translating a mockup into working software.
                </p>
                <p>
                  I care about interfaces that feel considered: fast, legible, and built to hold up under real use, not just look good in a screenshot.
                </p>
              </div>
              <div className="stat-row">
                <div className="stat-card">
                  <div className="stat-num">
                    <span className="num" data-count="100">
                      0
                    </span>
                  </div>
                  <div className="stat-label">Projects</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">
                    <span className="num" data-count="50">
                      0
                    </span>
                  </div>
                  <div className="stat-label">Clients</div>
                </div>
                <div className="stat-card">
                  <div className="stat-num">
                    <span className="num" data-count="7">
                      0
                    </span>
                  </div>
                  <div className="stat-label">Years</div>
                </div>
              </div>
            </div>
            <div className="principles">
              <div className="principle">
                <div className="icon">◐</div>
                <div>
                  <h3>Design first</h3>
                  <p>Every build starts as a layout decision, not a component library default.</p>
                </div>
              </div>
              <div className="principle">
                <div className="icon">⌁</div>
                <div>
                  <h3>Built to last</h3>
                  <p>Clean, maintainable code — the kind future-me won't resent.</p>
                </div>
              </div>
              <div className="principle">
                <div className="icon">◈</div>
                <div>
                  <h3>Detail-driven</h3>
                  <p>Spacing, motion, and copy get the same attention as the architecture.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="panel" id="skills" style={{ "--i": 2 }}>
          <div className="orb" />
          <div className="panel-inner">
            <div className="skills-head">
              <h2>Tools I reach for</h2>
              <p>A working set, kept current — picked for the job rather than habit.</p>
            </div>
            <div className="skill-cloud">
              {SKILLS.map((s) => (
                <span className="skill-pill" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="panel" id="work" style={{ "--i": 3 }}>
          <div className="orb" />
          <div className="panel-inner">
            <div className="work-head">
              <div className="section-tag">Selected work</div>
              <h2>A few things I've built</h2>
            </div>
            <div className="work-grid">
              {WORKS.map((w) => (
                <a
                  className="work-card"
                  key={w.title}
                  href={w.href}
                  target="_blank"
                  rel="noreferrer"
                  onMouseMove={tilt}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                  }}
                >
                  <div className="browser-chrome" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="shot-wrap">
                    <img className="work-shot" src={w.shot} alt="" />
                    <div className="shot-scrim" />
                  </div>
                  <div className="work-body">
                    <div className="work-kicker">{w.tag}</div>
                    <h3>{w.title}</h3>
                    <div className="work-tags">
                      {w.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="panel" id="contact" style={{ "--i": 4 }}>
          <div className="panel-inner contact-inner">
            <div className="section-tag">Contact</div>
            <h2>
              Have a project in mind?
              <br />
              Let's talk it through.
            </h2>
            <p>Tell me what you're building and where it's stuck — I'll tell you honestly whether I'm the right fit.</p>
            <a className="contact-email" href="mailto:hello@hiswill.dev">
              hello@hiswill.dev
            </a>
            <div className="socials">
              <a className="social-btn" href="https://github.com/Hiswill46" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="social-btn" href="https://x.com/iroegbulam_e" target="_blank" rel="noreferrer">
                X
              </a>
            </div>
            <div className="foot-note">
              <span>© {year} Hiswill Iroegbulam</span>
              <span>Designed & built by hand</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
