import { useEffect, useMemo, useState } from "react";

const ROLES = ["Developer", "Designer"];

const WORKS = [
  {
    title: "SPV Bond",
    tag: "Corporate · Dubai",
    href: "https://www.spv-bondproject.com/",
    shot: "/previews/spv.jpg",
    tall: true,
  },
  {
    title: "KoboLoop",
    tag: "Savings groups",
    href: "https://koboloop-drizzle.vercel.app/",
    shot: "/previews/koboloop.jpg",
    tall: false,
  },
  {
    title: "CX Assets",
    tag: "Private banking",
    href: "https://www.cx-assets.com/",
    shot: "/previews/cx.jpg",
    tall: false,
  },
  {
    title: "SeeCapital",
    tag: "Capital dashboard",
    href: "https://seecapital.vercel.app/",
    shot: "/previews/see.jpg",
    tall: false,
  },
];

const SERVICES = [
  { title: "Development", copy: "Next.js and TypeScript systems that ship: corporate sites, dashboards, and product surfaces." },
  { title: "UI/UX Design", copy: "Clear hierarchy and motion that earns its keep. Gulf-corporate, never gimmicky." },
  { title: "Product Branding", copy: "Wordmarks, palettes, share cards and favicon systems as a finished kit." },
  { title: "Motion Design", copy: "Scroll, dock and micro-interactions that make the surface feel alive." },
];

function Icon({ name }) {
  const common = { width: 20, height: 20, fill: "currentColor" };
  if (name === "home")
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M5 22h14a2 2 0 0 0 2-2v-9a1 1 0 0 0-.29-.71l-8-8a1 1 0 0 0-1.41 0l-8 8A1 1 0 0 0 3 11v9a2 2 0 0 0 2 2zm5-2v-5h4v5zm-5-8.59 7-7 7 7V20h-3v-5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v5H5z" />
      </svg>
    );
  if (name === "user")
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z" />
      </svg>
    );
  if (name === "work")
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M20 6h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zM10 4h4v2h-4zm10 15H4V8h16z" />
      </svg>
    );
  if (name === "mail")
    return (
      <svg {...common} viewBox="0 0 24 24">
        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.3-8-5.3V6l8 5.3L20 6z" />
      </svg>
    );
  return (
    <svg {...common} viewBox="0 0 24 24">
      <path d="M12 3C6.5 3 2 6.6 2 11c0 2.2 1.2 4.2 3.1 5.6-.1.8-.5 2-1.6 3.1 1.6-.1 3.1-.8 4.2-1.5.7.2 1.5.3 2.3.3 5.5 0 10-3.6 10-8S17.5 3 12 3z" />
    </svg>
  );
}

function Tile({ w }) {
  return (
    <a className={w.tall ? "tile tall" : "tile"} href={w.href} target="_blank" rel="noreferrer">
      <img src={w.shot} alt={`${w.title} preview`} />
      <span className="veil" />
      <span className="cap linkg">{w.tag}</span>
      <span className="subcap">{w.title}</span>
    </a>
  );
}

export default function App() {
  const [role, setRole] = useState(0);
  const [section, setSection] = useState("home");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const ids = ["home", "about", "services", "work", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target.id) setSection(vis.target.id);
      },
      { threshold: [0.3, 0.5] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);
  function go(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
  function submit(e) {
    e.preventDefault();
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} <${form.email}>`);
    window.location.href = `mailto:hello@hiswill.dev?subject=${encodeURIComponent("Work with Hiswill")}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="site">
      <header className="topbar">
        <div className="wrap inner">
          <a href="#home" onClick={() => go("home")}>
            <img className="logo" src="/logo.svg" alt="Hiswill" />
          </a>
          <a className="btn btn-sm" href="#contact">
            Work With Me
          </a>
        </div>
      </header>

      <section id="home" className="block">
        <div className="wrap hero">
          <div className="hero-copy">
            <h1 className="name">
              HISWILL
              <br />
              IROEGBULAM
            </h1>
            <p className="role">
              I am a <em>{ROLES[role]}</em>
            </p>
            <p className="lede">
              Freelance front-end work for Gulf corporates and product teams. The sites have to look expensive and behave like software.
            </p>
            <div className="row">
              <a className="btn btn-lg" href="#contact">
                Contact me
              </a>
              <a className="linkg" href="#work">
                My Portfolio
              </a>
            </div>
          </div>
          <img className="me" src="/me.png" alt="Hiswill Iroegbulam" />
        </div>
      </section>

      <section id="about" className="block">
        <div className="wrap copy">
          <h2 className="accent">About Me.</h2>
          <h3 className="lead">I'm a freelance front-end developer with over 5 years of experience.</h3>
          <p>
            Based between Port Harcourt and the Gulf corridor. Next.js brand sites and product dashboards — SPV firms in Downtown Dubai, PMOs in Muscat, private-banking UIs, and full-stack TypeScript apps.
          </p>
            <div className="stats">
              <div className="stat">
                <b>7</b>
                <span>
                  Years of
                  <br />
                  Experience
                </span>
              </div>
              <div className="stat">
                <b>100</b>
                <span>
                  Projects
                  <br />
                  Completed
                </span>
              </div>
              <div className="stat">
                <b>50</b>
                <span>
                  Satisfied
                  <br />
                  Clients
                </span>
              </div>
            </div>
            <div className="row">
              <a className="btn btn-lg" href="#contact">
                Contact me
              </a>
              <a className="linkg" href="#work">
                My Portfolio
              </a>
            </div>
        </div>
      </section>

      <section id="services" className="block">
        <div className="wrap copy">
          <h2 className="accent">What I Do.</h2>
          <h3 className="lead">Four crafts. The surface has to feel inevitable.</h3>
          {SERVICES.map((s) => (
              <article className="svc" key={s.title}>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.copy}</p>
                </div>
                <div className="svc-side">
                  <a className="btn btn-sq" href="#work" aria-label={`See ${s.title} work`}>
                    ↗
                  </a>
                  <a className="linkg" href="#work" style={{ fontSize: 14 }}>
                    Learn More
                  </a>
                </div>
              </article>
            ))}
        </div>
      </section>

      <section id="work" className="block">
        <div className="wrap">
          <div className="intro">
            <h2 className="accent">
              My Latest
              <br />
              Works.
            </h2>
            <p>Live sites only. Open a frame.</p>
          </div>
          <div className="works">
            {WORKS.map((w) => (
              <Tile key={w.title} w={w} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="block">
        <div className="wrap contact-grid">
          <div>
            <p className="accent" style={{ fontSize: 18, letterSpacing: "0.2em" }}>
              Get in touch
            </p>
            <h2 className="big">
              Let's work
              <br />
              Together!
            </h2>
            <p className="fine">
              © {year} Hiswill Iroegbulam ·{" "}
              <a href="https://github.com/Hiswill46" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </p>
          </div>
          <form className="form" onSubmit={submit}>
            <input required placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input required type="email" placeholder="Your email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <textarea required placeholder="Your message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <button className="btn btn-lg" type="submit">
              {sent ? "Opening mail…" : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      <nav className="dock" aria-label="Primary">
        {(
          [
            ["home", "home"],
            ["about", "user"],
            ["services", "mail"],
            ["work", "work"],
            ["contact", "chat"],
          ]
        ).map(([id, icon]) => (
          <button key={id} className={section === id ? "active" : ""} onClick={() => go(id)} aria-label={id} type="button">
            <Icon name={icon} />
          </button>
        ))}
      </nav>
    </div>
  );
}
