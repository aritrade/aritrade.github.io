import {
  useEffect,
  useState,
  useRef,
  useCallback,
  Fragment,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  about,
  certifications,
  education,
  experience,
  expertise,
  heroMetrics,
  mentoring,
  nav,
  profile,
  projects,
  sections,
  skills,
  ui,
  writing,
} from "./data/content";
import {
  Reveal,
  MetricValue,
  useActiveSection,
  useFinePointer,
  usePrefersReducedMotion,
} from "./hooks/useMotion";
import { GalleryFilmstrip } from "./components/GalleryFilmstrip";

function ExternalLink({
  href,
  children,
  className,
  onClick,
  onMouseMove,
  onMouseLeave,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseMove?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </a>
  );
}

/** GIF or muted looping video for Applied AI Projects cards — pauses off-screen; respects reduced motion. */
function WorkDemoMedia({
  demo,
  alt,
  reducedMotion,
}: {
  demo: { src: string; kind: "gif" | "video"; poster?: string };
  alt: string;
  reducedMotion: boolean;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio > 0.15),
      { threshold: [0, 0.15, 0.4], rootMargin: "40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || demo.kind !== "video") return;
    if (reducedMotion || !inView) {
      v.pause();
    } else {
      void v.play().catch(() => {});
    }
  }, [inView, reducedMotion, demo.kind]);

  const still = demo.poster || (demo.kind === "gif" ? demo.src : undefined);
  const showMotion = !reducedMotion && inView;

  return (
    <div ref={rootRef} className="work-demo">
      {demo.kind === "video" ? (
        <video
          ref={videoRef}
          className="work-demo-media"
          src={demo.src}
          poster={demo.poster}
          muted
          loop
          playsInline
          preload="metadata"
          autoPlay={!reducedMotion}
          aria-label={alt}
        />
      ) : showMotion ? (
        <img className="work-demo-media" src={demo.src} alt={alt} loading="lazy" />
      ) : still ? (
        <img className="work-demo-media" src={still} alt={alt} loading="lazy" />
      ) : null}
    </div>
  );
}

const sectionIds = sections.map((s) => s.id);

function sectionById(id: string) {
  return sections.find((s) => s.id === id)!;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [entered, setEntered] = useState(false);
  const [metricsLive, setMetricsLive] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useFinePointer();
  const activeSection = useActiveSection(sectionIds);
  const heroRef = useRef<HTMLElement | null>(null);
  const metricsRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const spotEnabled = finePointer && !reducedMotion;

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    if (reducedMotion) {
      document.documentElement.classList.add("reduce-motion");
    } else {
      document.documentElement.classList.remove("reduce-motion");
    }
  }, [reducedMotion]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setEntered(true);
      return;
    }
    const id = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(id);
  }, [reducedMotion]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* Metric count-up once when metrics enter view */
  useEffect(() => {
    const el = metricsRef.current;
    if (!el) return;
    if (reducedMotion) {
      setMetricsLive(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setMetricsLive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  /* Soft spotlight + gold cursor ring (desktop fine pointer only) */
  useEffect(() => {
    if (!spotEnabled) return;
    const hero = heroRef.current;
    const ring = ringRef.current;
    if (!hero || !ring) return;

    let raf = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty("--spot-x", `${x}%`);
      hero.style.setProperty("--spot-y", `${y}%`);
      hero.classList.add("has-spot");
    };

    const onLeave = () => {
      hero.classList.remove("has-spot");
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    hero.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [spotEnabled]);

  const onMagneticMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!spotEnabled) return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${dx * 0.12}px, ${dy * 0.18}px)`;
    },
    [spotEnabled],
  );

  const onMagneticLeave = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.currentTarget.style.transform = "";
    },
    [],
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <Fragment>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {spotEnabled ? (
        <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
      ) : null}

      <header
        className={`site-header ${scrolled ? "is-scrolled" : ""} ${scrolled ? "is-condensed" : ""}`}
      >
        <div className="header-inner">
          <a className="wordmark" href="#top" onClick={closeMenu}>
            <span className="wordmark-mark" aria-hidden="true">
              {ui.footerMark}
            </span>
            <span className="wordmark-name">
              {profile.name.split(" ")[0]}{" "}
              <span className="accent">
                {profile.name.split(" ").slice(1).join(" ")}
              </span>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? "is-active" : undefined}
                aria-current={activeSection === item.id ? "true" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <ExternalLink
              className="btn btn-pill btn-gold"
              href={profile.links.calendly}
            >
              {ui.bookTimeShort}
            </ExternalLink>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="sr-only">
                {menuOpen ? "Close menu" : "Open menu"}
              </span>
              <span className="menu-bars" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>

        <nav
          id="mobile-nav"
          className={`mobile-nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Mobile"
          hidden={!menuOpen}
        >
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
          <ExternalLink href={profile.links.linkedin} onClick={closeMenu}>
            LinkedIn
          </ExternalLink>
          <ExternalLink href={profile.links.calendly}>Book on Calendly</ExternalLink>
          <a href={`tel:${profile.phoneTel}`} onClick={closeMenu}>
            {profile.phone}
          </a>
        </nav>
      </header>

      <aside className="spine" aria-hidden="true">
        <span>{profile.name}</span>
        <span className="spine-rule" />
        <span>{ui.spineLine}</span>
      </aside>

      <main id="main">
        <section
          id="top"
          ref={heroRef}
          className={`hero ${entered ? "is-entered" : ""}`}
          style={
            {
              "--spot-x": "70%",
              "--spot-y": "20%",
            } as CSSProperties
          }
        >
          <div className="hero-veil" aria-hidden="true" />
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-ambient" aria-hidden="true" />
          <div className="hero-spotlight" aria-hidden="true" />

          <div className="hero-stage">
            <div className="hero-name-slot">
              <h1 className="hero-name">
                {profile.name.split(" ")[0]}{" "}
                <span className="accent">
                  {profile.name.split(" ").slice(1).join(" ")}
                </span>
              </h1>
            </div>

            <figure className="hero-portrait">
              <img
                src="/aritra-de.jpg"
                alt="Aritra De"
                width={768}
                height={1024}
                decoding="async"
                fetchPriority="high"
              />
            </figure>

            <div className="hero-copy">
              <div className="hero-rule" aria-hidden="true" />

              <p className="hero-manifesto">{profile.positioning}</p>

              <p className="hero-lede">{profile.heroLede}</p>

              <div className="hero-cta">
                <ExternalLink
                  className="btn btn-pill btn-ivory btn-magnetic"
                  href={profile.links.calendly}
                  onMouseMove={onMagneticMove}
                  onMouseLeave={onMagneticLeave}
                >
                  {ui.bookTimeCalendly}
                </ExternalLink>
                <ExternalLink
                  className="btn btn-pill btn-ghost-light btn-magnetic"
                  href={profile.links.linkedin}
                  onMouseMove={onMagneticMove}
                  onMouseLeave={onMagneticLeave}
                >
                  {ui.linkedInCta}
                </ExternalLink>
              </div>

              <ul className="hero-profiles" aria-label="Profiles">
                <li>
                  <ExternalLink href={profile.links.topmate}>Topmate</ExternalLink>
                </li>
                <li>
                  <ExternalLink href={profile.links.github}>GitHub</ExternalLink>
                </li>
                <li>
                  <ExternalLink href={profile.links.medium}>Medium</ExternalLink>
                </li>
                <li>
                  <ExternalLink href={profile.links.credly}>Credly</ExternalLink>
                </li>
              </ul>
            </div>

            <div
              className="hero-metrics"
              aria-label="Expertise and highlights"
              ref={metricsRef}
            >
              <aside className="hero-expertise">
                <p className="expertise-kicker">{ui.expertiseKicker}</p>
                <ul>
                  {expertise.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </aside>
              <div className="hero-metrics-stats">
                <article>
                  <MetricValue
                    spec={heroMetrics[0]}
                    reducedMotion={reducedMotion}
                    active={metricsLive}
                  />
                  <p className="metric-label">{heroMetrics[0].label}</p>
                </article>
                <article>
                  <MetricValue
                    spec={heroMetrics[1]}
                    reducedMotion={reducedMotion}
                    active={metricsLive}
                  />
                  <p className="metric-label">{heroMetrics[1].label}</p>
                </article>
              </div>
            </div>
          </div>

          <a className="hero-scroll" href="#about">
            <span>{ui.heroScroll}</span>
            <span className="scroll-line" aria-hidden="true" />
          </a>
        </section>

        {/* ABOUT */}
        <section id="about" className="band band-ivory">
          <div className="band-inner">
            <Reveal
              as="header"
              className="chapter-head"
              reducedMotion={reducedMotion}
            >
              <p className="chapter-num">{sectionById("about").numeral}</p>
              <div>
                <h2>{sectionById("about").heading}</h2>
                <p className="chapter-deck">{sectionById("about").deck}</p>
              </div>
            </Reveal>

            <div className="about-layout">
              <Reveal
                as="blockquote"
                className="pull-quote"
                reducedMotion={reducedMotion}
                delay={80}
              >
                <p>{about.pullQuote}</p>
                <footer>{about.pullQuoteFooter}</footer>
              </Reveal>

              <Reveal className="prose" reducedMotion={reducedMotion} delay={140}>
                {about.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
                <p className="edu-line">
                  <strong>Education</strong>
                  <span>
                    {education.degree} — {education.school} · {education.year}
                  </span>
                </p>
              </Reveal>
            </div>

            <Reveal as="ul" className="pillar-row" reducedMotion={reducedMotion} delay={180}>
              {about.highlights.map((h, i) => (
                <li
                  key={h.label}
                  className="reveal-child"
                  style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
                >
                  <strong>{h.label}</strong>
                  <span>{h.detail}</span>
                </li>
              ))}
            </Reveal>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="band band-ink">
          <div className="band-inner">
            <Reveal
              as="header"
              className="chapter-head chapter-head-light"
              reducedMotion={reducedMotion}
            >
              <p className="chapter-num">{sectionById("experience").numeral}</p>
              <div>
                <h2>{sectionById("experience").heading}</h2>
                <p className="chapter-deck">{sectionById("experience").deck}</p>
              </div>
            </Reveal>

            <ol className="chapters">
              {experience.map((role, i) => (
                <Reveal
                  as="li"
                  key={`${role.company}-${role.title}`}
                  className="chapter"
                  reducedMotion={reducedMotion}
                  delay={i * 60}
                >
                  <div className="chapter-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="chapter-body">
                    <p className="chapter-dates">{role.dates}</p>
                    <h3>{role.title}</h3>
                    <p className="chapter-company">{role.company}</p>
                    <ul>
                      {role.bullets.map((b) => (
                        <li key={b.slice(0, 56)}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="band band-ivory">
          <div className="band-inner">
            <Reveal as="header" className="chapter-head" reducedMotion={reducedMotion}>
              <p className="chapter-num">{sectionById("skills").numeral}</p>
              <div>
                <h2>{sectionById("skills").heading}</h2>
                <p className="chapter-deck">{sectionById("skills").deck}</p>
              </div>
            </Reveal>

            <Reveal className="skill-columns" reducedMotion={reducedMotion}>
              {skills.groups.map((g, i) => (
                <article
                  key={g.title}
                  className="reveal-child"
                  style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
                >
                  <h3>{g.title}</h3>
                  <p>{g.items}</p>
                </article>
              ))}
            </Reveal>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certifications" className="band band-ink">
          <div className="band-inner">
            <Reveal
              as="header"
              className="chapter-head chapter-head-light"
              reducedMotion={reducedMotion}
            >
              <p className="chapter-num">{sectionById("certifications").numeral}</p>
              <div>
                <h2>{sectionById("certifications").heading}</h2>
                <p className="chapter-deck">
                  {certifications.credlyCount} verified badges on Credly — real
                  artwork below, each linked to the public badge page.
                </p>
              </div>
            </Reveal>

            {(
              [
                {
                  label: "VMware (Broadcom) certifications",
                  items: certifications.vmware,
                },
                {
                  label: "Nutanix Certifications",
                  items: certifications.nutanix,
                },
                {
                  label: "Cloud Native Certifications",
                  items: certifications.cloudNative,
                },
                {
                  label: "Data Protection and Disaster Recovery certifications",
                  items: certifications.dataProtection,
                },
                {
                  label: "Other credentials",
                  items: certifications.badges,
                },
              ] as const
            ).map((group, gi) =>
              group.items.length === 0 ? null : (
                <Reveal
                  key={group.label}
                  className="badge-all"
                  reducedMotion={reducedMotion}
                  delay={gi * 40}
                >
                  <p className="badge-strip-label">{group.label}</p>
                  <ul className="badge-grid">
                    {group.items.map((c) => (
                      <li
                        key={`${group.label}-${c.url}`}
                      >
                        <ExternalLink className="badge-card" href={c.url}>
                          <span className="badge-art">
                            <img src={c.image} alt={c.name} loading="lazy" />
                          </span>
                          <span className="badge-name">{c.name}</span>
                          <span className="badge-issuer">{c.issuer}</span>
                        </ExternalLink>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ),
            )}

            {(
              [
                { label: "AI certifications", items: certifications.ai },
                {
                  label: "AI Security certifications",
                  items: certifications.aiSecurity,
                },
                {
                  label: "Management certifications",
                  items: certifications.management,
                },
                {
                  label: "Well-being certifications",
                  items: certifications.wellbeing,
                },
              ] as const
            ).map((group, gi) =>
              group.items.length === 0 ? null : (
                <Reveal
                  key={group.label}
                  className="mgmt-certs"
                  reducedMotion={reducedMotion}
                  delay={160 + gi * 20}
                >
                  <p className="badge-strip-label">{group.label}</p>
                  <ul className="mgmt-cert-list">
                    {group.items.map((c) => {
                      const body = (
                        <>
                          <span className="mgmt-cert-frame">
                            <img src={c.image} alt={c.name} loading="lazy" />
                          </span>
                          <span className="mgmt-cert-caption">
                            <span className="mgmt-cert-name">{c.name}</span>
                            <span className="mgmt-cert-meta">
                              {c.issuer}
                              {c.issued ? ` · ${c.issued}` : ""}
                            </span>
                            {c.url ? (
                              <span className="mgmt-cert-verify">
                                Verify credential
                              </span>
                            ) : (
                              <span className="mgmt-cert-verify">
                                View certificate
                              </span>
                            )}
                          </span>
                        </>
                      );
                      return (
                        <li key={c.image}>
                          {c.url ? (
                            <ExternalLink className="mgmt-cert-card" href={c.url}>
                              {body}
                            </ExternalLink>
                          ) : (
                            <a
                              className="mgmt-cert-card"
                              href={c.image}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {body}
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </Reveal>
              ),
            )}

            {certifications.resumeOnly.length > 0 ? (
              <Reveal className="resume-only" reducedMotion={reducedMotion} delay={240}>
                <h3>Also listed on the resume</h3>
                <p>
                  No matching certificate artwork — shown as text only, without
                  images.
                </p>
                <ul>
                  {certifications.resumeOnly.map((c) => (
                    <li key={c.name}>
                      <strong>{c.name}</strong>
                      <span>{c.issuer}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}

            <Reveal className="resume-only" reducedMotion={reducedMotion} delay={260}>
              <ExternalLink
                className="btn btn-pill btn-ghost-light"
                href={certifications.credlyProfile}
              >
                Open full Credly profile
              </ExternalLink>
            </Reveal>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="band band-ivory">
          <div className="band-inner">
            <Reveal as="header" className="chapter-head" reducedMotion={reducedMotion}>
              <p className="chapter-num">{sectionById("work").numeral}</p>
              <div>
                <h2>{sectionById("work").heading}</h2>
                <p className="chapter-deck">{sectionById("work").deck}</p>
              </div>
            </Reveal>

            <div className="work-stack">
              {projects.map((p, i) => (
                <Reveal
                  as="article"
                  key={p.url}
                  className={p.demo ? "work-piece work-piece-demo" : "work-piece"}
                  reducedMotion={reducedMotion}
                  delay={i * 55}
                >
                  <p className="work-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div className="work-body">
                    <h3>
                      <ExternalLink href={p.url}>{p.name}</ExternalLink>
                    </h3>
                    <p>{p.description}</p>
                    {p.stack ? <p className="work-stack-line">{p.stack}</p> : null}
                    <div className="work-links">
                      <ExternalLink href={p.url}>{ui.githubLabel}</ExternalLink>
                      {p.homepage ? (
                        <ExternalLink href={p.homepage}>{ui.liveDemo}</ExternalLink>
                      ) : null}
                    </div>
                  </div>
                  {p.demo ? (
                    <WorkDemoMedia
                      demo={p.demo}
                      alt={`${p.name} demo`}
                      reducedMotion={reducedMotion}
                    />
                  ) : null}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* WRITING */}
        <section id="writing" className="band band-parchment">
          <div className="band-inner">
            <Reveal as="header" className="chapter-head" reducedMotion={reducedMotion}>
              <p className="chapter-num">{sectionById("writing").numeral}</p>
              <div>
                <h2>{sectionById("writing").heading}</h2>
                <p className="chapter-deck">
                  Selected pieces from{" "}
                  <ExternalLink href={profile.links.medium}>
                    medium.com/@decodedbyaritra
                  </ExternalLink>{" "}
                  (TEKTALKS).
                </p>
              </div>
            </Reveal>

            <ul className="writing-rail">
              {writing.map((a, i) => (
                <Reveal
                  as="li"
                  key={a.url}
                  reducedMotion={reducedMotion}
                  delay={i * 50}
                >
                  <time>{a.date}</time>
                  <div>
                    <h3>
                      <ExternalLink href={a.url}>{a.title}</ExternalLink>
                    </h3>
                    <p>{a.subtitle}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* MENTORING */}
        <section id="mentoring" className="band band-oxblood">
          <div className="band-inner">
            <Reveal
              as="header"
              className="chapter-head chapter-head-light"
              reducedMotion={reducedMotion}
            >
              <p className="chapter-num">{sectionById("mentoring").numeral}</p>
              <div>
                <h2>{sectionById("mentoring").heading}</h2>
                <p className="chapter-deck">{mentoring.tagline}</p>
              </div>
            </Reveal>

            <div className="mentor-layout">
              <Reveal className="mentor-offer" reducedMotion={reducedMotion} delay={60}>
                <p className="mentor-proof">{mentoring.proof}</p>
                <ul className="mentor-service-cards">
                  {mentoring.services.map((s) => (
                    <li key={s.name}>
                      <ExternalLink className="mentor-service-card" href={s.url}>
                        <span className="mentor-service-art">
                          <img src={s.image} alt={s.name} loading="lazy" />
                        </span>
                        <span className="mentor-service-caption">
                          <strong>{s.name}</strong>
                          <span>{s.detail}</span>
                        </span>
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
                <ExternalLink
                  className="btn btn-pill btn-ivory"
                  href={mentoring.profileUrl}
                >
                  {ui.mentoringCta}
                </ExternalLink>
              </Reveal>
              <Reveal className="testimonial-stack" reducedMotion={reducedMotion} delay={120}>
                {mentoring.testimonials.map((t) => (
                  <blockquote key={t.author}>
                    <p>“{t.quote}”</p>
                    <footer>— {t.author}</footer>
                  </blockquote>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        {/* GALLERY / IN FRAME */}
        <section id="gallery" className="band band-ink gallery-band">
          <div className="band-inner">
            <Reveal
              as="header"
              className="chapter-head chapter-head-light"
              reducedMotion={reducedMotion}
            >
              <p className="chapter-num">{sectionById("gallery").numeral}</p>
              <div>
                <h2>{sectionById("gallery").heading}</h2>
                <p className="chapter-deck">{sectionById("gallery").deck}</p>
              </div>
            </Reveal>
          </div>
          <GalleryFilmstrip reducedMotion={reducedMotion} />
        </section>

        {/* CONTACT */}
        <section id="contact" className="band band-ink contact-band">
          <div className="band-inner">
            <Reveal
              as="header"
              className="chapter-head chapter-head-light"
              reducedMotion={reducedMotion}
            >
              <p className="chapter-num">{sectionById("contact").numeral}</p>
              <div>
                <h2>{sectionById("contact").heading}</h2>
                <p className="chapter-deck">{sectionById("contact").deck}</p>
              </div>
            </Reveal>

            <Reveal className="contact-stage" reducedMotion={reducedMotion} delay={80}>
              <div className="contact-primary">
                <h3>{ui.contactHeading}</h3>
                <p>{ui.contactBlurb}</p>
                <div className="contact-actions">
                  <ExternalLink
                    className="btn btn-pill btn-ivory"
                    href={profile.links.calendly}
                  >
                    {ui.openCalendly}
                  </ExternalLink>
                  <a
                    className="btn btn-pill btn-ghost-light"
                    href={`tel:${profile.phoneTel}`}
                  >
                    Call {profile.phone}
                  </a>
                </div>
              </div>

              <ul className="contact-direct">
                <li>
                  <span>Phone</span>
                  <a href={`tel:${profile.phoneTel}`}>{profile.phone}</a>
                </li>
                <li>
                  <span>Email</span>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </li>
                <li>
                  <span>LinkedIn</span>
                  <ExternalLink href={profile.links.linkedin}>
                    {ui.linkedInDisplay}
                  </ExternalLink>
                </li>
              </ul>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <p className="footer-mark">{ui.footerMark}</p>
            <div>
              <strong>{profile.name}</strong>
              <span>{profile.positioning}</span>
            </div>
          </div>
          <ul className="footer-links">
            <li>
              <a href={`tel:${profile.phoneTel}`}>{profile.phone}</a>
            </li>
            <li>
              <ExternalLink href={profile.links.linkedin}>LinkedIn</ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.links.github}>GitHub</ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.links.medium}>Medium</ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.links.credly}>Credly</ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.links.topmate}>Topmate</ExternalLink>
            </li>
            <li>
              <ExternalLink href={profile.links.calendly}>Calendly</ExternalLink>
            </li>
          </ul>
          <p className="footer-note">
            Facts sourced from the resume, GitHub, Medium, Credly, and Topmate.
            LinkedIn profile page was not scrapable during build; the public URL
            is linked as provided.
          </p>
        </div>
      </footer>
    </Fragment>
  );
}
