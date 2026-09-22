import { useEffect, useState } from "react";


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
    tag: "Corporate · Dubai",
    copy: "Formation, funding and advisory site for an SPV firm in Downtown Dubai.",
    href: "https://www.spv-bondproject.com/",
    shot: "/previews/spv.jpg",
  },
  {
    title: "KoboLoop",
    tag: "Savings groups",
    copy: "A product for rotating savings groups — contributions, cycles, and the people in them.",
    href: "https://koboloop-drizzle.vercel.app/",
    shot: "/previews/koboloop.jpg",
  },
  {
    title: "CX Assets",
    tag: "Private banking",
    copy: "Investment banking surface for personal, business, and lending.",
    href: "https://www.cx-assets.com/",
    shot: "/previews/cx.jpg",
  },
  {
    title: "SeeCapital",
    tag: "Capital dashboard",
    copy: "A capital dashboard built to be read quickly, not decorated.",
    href: "https://seecapital.vercel.app/",
    shot: "/previews/see.jpg",
  },
];

export default function App() {
  const [section, setSection] = useState("home");
  const [menu, setMenu] = useState(false);
  const [year] = useState(() => new Date().getFullYear());

  useEffect(() => {
    const glow = document.getElementById("glow");
    if (!glow || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const move = (e: MouseEvent) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const panels = document.querySelectorAll(".panel");
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target.id) setSection(vis.target.id);
      },
      { threshold: [0.35, 0.6] },
    );
    panels.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const nums = document.querySelectorAll(".num");
    const seen = new WeakSet<Element>();
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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const panels = () => Array.from(document.querySelectorAll(".panel"));
    let locked = false;
    let acc = 0;
    let accTimer = 0;

    function goPanel(dir) {
      if (locked) return;
      const list = panels();
      const y = window.scrollY;
      const target =
        dir > 0
          ? list.find((el) => el.offsetTop > y + 12)
          : [...list].reverse().find((el) => el.offsetTop < y - 12);
      if (!target) return;
      locked = true;
      window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
      window.setTimeout(() => {
        locked = false;
      }, 900);
    }

    function onWheel(e) {
      e.preventDefault();
      if (locked) return;
      acc += e.deltaY;
      window.clearTimeout(accTimer);
      accTimer = window.setTimeout(() => {
        acc = 0;
      }, 140);
      if (Math.abs(acc) < 36) return;
      const dir = acc > 0 ? 1 : -1;
      acc = 0;
      goPanel(dir);
    }

    let startY = 0;
    function onTouchStart(e) {
      startY = e.touches[0]?.clientY ?? 0;
    }
    function onTouchMove(e) {
      e.preventDefault();
    }
    function onTouchEnd(e) {
      const endY = e.changedTouches[0]?.clientY ?? startY;
      const dy = startY - endY;
      if (Math.abs(dy) < 48) return;
      goPanel(dy > 0 ? 1 : -1);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  function go(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
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
        <a className="brand" href="#home" onClick={() => go("home")}>
          <span className="brand-mark">H</span>
          Hiswill
          <span className="brand-live">
            <span className="dot" />
            {LABELS[section]}
          </span>
        </a>
        <div className={menu ? "nav-links open" : "nav-links"}>
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={section === id ? "active" : ""} onClick={() => go(id)}>
              {label}
            </a>
          ))}
        </div>
        <a className="nav-cta" href="#contact" onClick={() => go("contact")}>
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
        <section className="panel" id="home">
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
                <span className="grad">web designer</span>
                <br />
                & developer.
              </h1>
              <p className="hero-desc">
                I turn ideas into clean, working websites and dashboards — from the first sketch to the last line of code. Design and engineering, handled by one person, end to end.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="btn btn-fill" onClick={() => go("contact")}>
                  <span className="glint" />
                  Got a project?
                </a>
                <a href="#work" className="btn btn-outline" onClick={() => go("work")}>
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

        <section className="panel" id="about">
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
                  Based between Port Harcourt and the Gulf. The work is Next.js sites and dashboards for SPV firms, private banks, and the products I run.
                </p>
              </div>
              <div className="stat-row">
                <div className="stat-card">
                  <div className="stat-num">
                    <span className="num" data-count="100">
                      0
                    </span>
                  </div>
                  <div className="stat-label">Projects shipped</div>
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
                  <div className="stat-label">Years building</div>
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

        <section className="panel" id="skills">
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

        <section className="panel" id="work">
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
                  <img className="work-shot" src={w.shot} alt="" />
                  <div className="work-body">
                    <div className="work-kicker">{w.tag}</div>
                    <h3>{w.title}</h3>
                    <p>{w.copy}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="panel" id="contact">
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
