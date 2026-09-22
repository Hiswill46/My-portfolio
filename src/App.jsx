import { useEffect, useMemo, useState } from "react";

const ROLES = ["DESIGNER", "ENGINEER", "BUILDER", "STRATEGIST"];

const WORKS = [
  { title: "SPV Bond", tag: "Corporate \u00b7 Dubai", copy: "SPV formation, structuring and offshore advisory.", href: "https://www.spv-bondproject.com/", shot: "https://image.thum.io/get/width/1000/crop/620/https://www.spv-bondproject.com/" },
  { title: "KoboLoop", tag: "Savings groups", copy: "Join a group, contribute, and collect on schedule.", href: "https://koboloop-drizzle.vercel.app/", shot: "https://image.thum.io/get/width/1000/crop/620/https://koboloop-drizzle.vercel.app/" },
  { title: "CX Assets", tag: "Private banking", copy: "Investment and banking surface. This is the live deploy.", href: "https://cxassets.vercel.app/", shot: "https://image.thum.io/get/width/1000/crop/620/https://cxassets.vercel.app/" },
  { title: "SeeCapital", tag: "Capital dashboard", copy: "Sign-in for the capital dashboard.", href: "https://seecapital.vercel.app/", shot: "https://image.thum.io/get/width/1000/crop/620/https://seecapital.vercel.app/" },
];

const SERVICES = [
  { title: "Development", copy: "Next.js and TypeScript systems that ship: corporate sites, dashboards, and product surfaces with production polish." },
  { title: "UI/UX Design", copy: "Interfaces with Gulf-corporate restraint \u2014 clear hierarchy, motion that earns its keep, zero gimmicks." },
  { title: "Product Branding", copy: "Wordmarks, palettes, OG cards and favicon systems handed off as atomic brand kits." },
  { title: "Motion Design", copy: "Scroll, dock, aurora and micro-interaction languages that make a site feel alive without getting in the way." },
];

function Icon({ name }) {
  const common = { width: 20, height: 20, fill: "none", stroke: "currentColor", strokeWidth: 1.7 };
  if (name === "home") return (<svg {...common} viewBox="0 0 24 24"><path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z" /></svg>);
  if (name === "user") return (<svg {...common} viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.2" /><path d="M5 19c1.6-3.2 4-4.8 7-4.8S17.4 15.8 19 19" /></svg>);
  if (name === "work") return (<svg {...common} viewBox="0 0 24 24"><rect x="4" y="8" width="16" height="11" rx="2" /><path d="M9 8V6.8A1.8 1.8 0 0 1 10.8 5h2.4A1.8 1.8 0 0 1 15 6.8V8" /></svg>);
  if (name === "mail") return (<svg {...common} viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="12" rx="2" /><path d="m5 8 7 5 7-5" /></svg>);
  return (<svg {...common} viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M7 16h6" /><path d="M5 6h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3V7a1 1 0 0 1 1-1Z" /></svg>);
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
    const ids = ["home", "about", "work", "services", "contact"];
    const obs = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (vis) setSection(vis.target.id);
    }, { threshold: [0.35, 0.55] });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);
  function go(id) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }
  function submit(e) {
    e.preventDefault();
    const body = encodeURIComponent(`${form.message}\n\n\u2014 ${form.name} <${form.email}>`);
    window.location.href = `mailto:hello@hiswill.dev?subject=${encodeURIComponent("Work with Hiswill")}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="app">
      <div className="aurora" aria-hidden="true">
        <span className="orb a" />
        <span className="orb b" />
        <span className="orb c" />
      </div>
      <header className="topbar">
        <a className="pill" href="#contact">Work With Me</a>
      </header>
      <section id="home" className="section">
        <div className="stack">
          <h1 className="display">HISWILL<br />IROEGBULAM</h1>
          <p className="role-line">I AM A <em>{ROLES[role]}</em></p>
          <p className="lede">I design and ship motion-rich product surfaces for Gulf corporates, fintech, and founders who need the work to look expensive and behave like software.</p>
          <div className="actions">
            <a className="pill" href="#contact">contact me</a>
            <a className="pill ghost" href="#work">My portfolio</a>
          </div>
        </div>
      </section>
      <section id="about" className="section right">
        <div className="stack">
          <p className="h-section">ABOUT ME.</p>
          <h2 className="h-lead">I'm a freelance front-end developer with over 5 years of experience.</h2>
          <p className="muted">Based between Port Harcourt and the Gulf corridor. I build Next.js brand sites and product dashboards \u2014 SPV structuring, private-banking UIs, and full-stack TypeScript apps.</p>
          <div className="stats">
            <div className="stat"><b>5+</b><span>Years of Experience</span></div>
            <div className="stat"><b>22+</b><span>Projects Completed</span></div>
            <div className="stat"><b>4</b><span>Live Products</span></div>
          </div>
          <div className="actions">
            <a className="pill sm" href="#contact">Contact me</a>
            <a className="pill ghost" href="#work">My Portfolio</a>
          </div>
        </div>
      </section>
      <section id="services" className="section right">
        <div className="stack">
          <p className="h-section">WHAT I DO.</p>
          <h2 className="h-lead">Four crafts, one standard \u2014 the surface has to feel inevitable.</h2>
          <div className="services">
            {SERVICES.map((s) => (
              <article className="svc" key={s.title}>
                <div><h3>{s.title}</h3><p>{s.copy}</p></div>
                <a className="more" href="#work">Learn More</a>
                <span className="ico" aria-hidden="true">\u2197</span>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="work" className="section" style={{ justifyContent: "center" }}>
        <div className="stack wide" style={{ width: "min(1040px, 100%)", maxWidth: 1040 }}>
          <div className="works-head">
            <div>
              <p className="h-section">MY LATEST</p>
              <h2 className="h-lead" style={{ marginBottom: 8 }}>WORKS.</h2>
              <p className="muted">Screenshots of the live deploys. Click a card to open it.</p>
            </div>
          </div>
          <div className="grid">
            {WORKS.map((w) => (
              <a className="card" key={w.title} href={w.href} target="_blank" rel="noreferrer" style={{ padding: 0, minHeight: 0, justifyContent: "flex-start" }}>
                <div style={{ height: 210, overflow: "hidden", background: "#0e061c", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  <img src={w.shot} alt={`${w.title} preview`} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
                </div>
                <div style={{ padding: "16px 18px 18px" }}>
                  <span className="tag">{w.tag}</span>
                  <h3>{w.title}</h3>
                  <p>{w.copy}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="section right">
        <div className="stack">
          <p className="kicker">GET IN TOUCH</p>
          <h2 className="display" style={{ fontSize: "clamp(36px, 6vw, 72px)" }}>Let's work<br />Together!</h2>
          <form className="contact-box" onSubmit={submit}>
            <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <textarea required placeholder="What should we build?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <button className="pill" type="submit" style={{ justifySelf: "start" }}>{sent ? "Opening mail\u2026" : "Send Message"}</button>
          </form>
          <p className="muted" style={{ marginTop: 28, fontSize: 14 }}>
            \u00a9 {year} Hiswill Iroegbulam \u00b7 <a href="https://github.com/Hiswill46" target="_blank" rel="noreferrer">GitHub</a> \u00b7 <a href="https://x.com/iroegbulam_e" target="_blank" rel="noreferrer">X</a>
          </p>
        </div>
      </section>
      <nav className="dock" aria-label="Primary">
        {[["home", "home"], ["about", "user"], ["work", "work"], ["services", "mail"], ["contact", "chat"]].map(([id, icon]) => (
          <button key={id} className={section === id ? "active" : ""} onClick={() => go(id)} aria-label={id}>
            <Icon name={icon} />
          </button>
        ))}
      </nav>
    </div>
  );
}
