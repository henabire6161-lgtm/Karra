"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  MapPin,
  Smartphone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { FormEvent, PointerEvent } from "react";
import { Brand } from "@/components/brand";
import { SiteHeader } from "@/components/site-header";
import { SolutionCard } from "@/components/solution-card";
import { approach, contacts, differentiators, solutions, team } from "@/lib/content";

export default function HomePage() {
  const [nearbyId, setNearbyId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".reveal");
    document.documentElement.classList.add("reveal-ready");

    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return () => document.documentElement.classList.remove("reveal-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  function handleProximity(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    let closest: string | null = null;
    let closestRect: DOMRect | null = null;
    let shortest = Number.POSITIVE_INFINITY;

    for (const solution of solutions) {
      const card = cardRefs.current[solution.id];
      if (!card) continue;
      const rect = card.getBoundingClientRect();
      const dx = Math.max(rect.left - event.clientX, 0, event.clientX - rect.right);
      const dy = Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom);
      const distance = Math.hypot(dx, dy);
      if (distance < shortest) {
        shortest = distance;
        closest = solution.id;
        closestRect = rect;
      }
    }

    const nextNearby = shortest <= 154 ? closest : null;
    if (nextNearby && closestRect) {
      const x = Math.min(100, Math.max(0, ((event.clientX - closestRect.left) / closestRect.width) * 100));
      const y = Math.min(100, Math.max(0, ((event.clientY - closestRect.top) / closestRect.height) * 100));
      cardRefs.current[nextNearby]?.style.setProperty("--pointer-x", `${x}%`);
      cardRefs.current[nextNearby]?.style.setProperty("--pointer-y", `${y}%`);
    }
    setNearbyId((current) => current === nextNearby ? current : nextNearby);
  }

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Integration point: POST this validated FormData to /api/contact when a backend is configured.
    setSubmitted(true);
  }

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-image" aria-hidden="true">
            <Image
              src="/images/market-solutions.png"
              alt=""
              fill
              priority
              sizes="(max-width: 760px) 100vw, 58vw"
            />
          </div>
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-inner site-container">
            <p className="eyebrow hero-eyebrow">A multi sector solutions partner · Ethiopia</p>
            <h1 id="hero-title">Practical solutions.<br /><em>Sustainable growth.</em></h1>
            <p className="hero-copy">
              We connect businesses, markets, properties and agricultural value chains through practical solutions designed to create lasting value.
            </p>
            <div className="hero-actions">
              <a className="button button-gold" href="#solutions">
                Explore our solutions <ArrowUpRight size={18} strokeWidth={1.8} />
              </a>
              <a className="text-link text-link-light" href="#contact">Let’s talk <ArrowRight size={16} /></a>
            </div>
            <div className="hero-bottomline">
              <span>MARKETS</span><i /><span>ASSETS</span><i /><span>VALUE CHAINS</span>
              <div className="hero-scroll"><span>Scroll to discover</span><ArrowDown size={15} /></div>
            </div>
          </div>
        </section>

        <section className="about-section section-pad" id="about" aria-labelledby="about-title">
          <div className="site-container">
            <div className="about-top reveal">
              <div className="section-intro">
                <p className="eyebrow">About Karra</p>
                <h2 id="about-title">Connecting opportunity.<br /><em>Delivering solutions.</em></h2>
              </div>
              <div className="about-copy">
                <p className="lead-copy">One partner, working across the details that make growth possible.</p>
                <p>
                  Karra brings together market execution, owner side property management and agricultural linkages. We help clients solve operational challenges, care for valuable assets and build stronger connections between producers and buyers.
                </p>
                <p>
                  Every engagement starts with a clear scope and is supported by practical oversight, evidence from the work and transparent reporting.
                </p>
                <a className="text-link" href="#approach">How we work <ArrowRight size={16} /></a>
              </div>
            </div>
            <div className="about-ribbon reveal">
              <div className="about-ribbon-photo">
                <Image src="/images/property-solutions.png" alt="Modern building and well cared for property grounds in Addis Ababa" fill sizes="(max-width: 760px) 100vw, 42vw" />
                <span className="photo-note"><MapPin size={14} /> Ethiopia · Local insight, practical delivery</span>
              </div>
              <div className="about-ribbon-copy">
                <span className="ribbon-label">Our shared standard</span>
                <h3>Different sectors.<br />A shared standard.</h3>
                <p>Clear responsibilities, measured work and a single point of accountability carry through every division.</p>
                <a href="#digital" className="round-link" aria-label="Explore our digital platform"><ArrowUpRight size={19} /></a>
              </div>
              <div className="about-pillars" aria-label="Our business divisions">
                {solutions.map((solution) => <a key={solution.id} href={`#${solution.id}`}>{solution.shortName}<ArrowUpRight size={14} /></a>)}
              </div>
            </div>
          </div>
        </section>

        <section className="who-section section-pad" id="who-we-are" aria-labelledby="who-title">
          <div className="site-container who-layout">
            <div className="who-heading reveal">
              <p className="eyebrow">Who we are</p>
              <h2 id="who-title">Experience close<br /><em>to the work.</em></h2>
              <p>Karra’s leaders bring practical experience from consumer goods, property operations, finance, agribusiness and digital delivery.</p>
              <div className="experience-notes">
                <div><strong>10+ years</strong><span>FMCG sales and trade marketing</span></div>
                <div><strong>15+ years</strong><span>Agribusiness and food systems</span></div>
              </div>
            </div>
            <div className="team-list reveal">
              {team.map((person) => (
                <article className="team-member" key={person.name}>
                  <div className="team-member-heading">
                    <h3>{person.name}</h3>
                    <span>{person.role}</span>
                  </div>
                  <p className="team-experience">{person.experience}</p>
                  <p className="team-detail">{person.detail}</p>
                  <div className="team-contact">
                    {person.phone && <a href={`tel:${person.phone.replaceAll(" ", "")}`}>{person.phone}</a>}
                    <a href={`mailto:${person.email}`}>{person.email}</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="solutions-section section-pad" id="solutions" aria-labelledby="solutions-title">
          <div className="site-container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">Our solutions</p>
                <h2 id="solutions-title">Three ways to<br /><em>move work forward.</em></h2>
              </div>
              <p className="section-heading-copy">Focused expertise for the moments that matter, where a brand meets its customer, an owner protects an asset, or a producer connects with a market.</p>
            </div>
            <div
              className="solution-grid"
              onPointerMove={handleProximity}
              onPointerLeave={() => setNearbyId(null)}
            >
              {solutions.map((solution) => (
                <SolutionCard
                  key={solution.id}
                  solution={solution}
                  cardRef={(node) => { cardRefs.current[solution.id] = node; }}
                  active={nearbyId === solution.id || expandedId === solution.id}
                  expanded={expandedId === solution.id}
                  onFocus={() => setNearbyId(solution.id)}
                  onBlur={() => setNearbyId(null)}
                  onToggle={() => setExpandedId((current) => current === solution.id ? null : solution.id)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="why-section section-pad" aria-labelledby="why-title">
          <div className="site-container why-layout">
            <div className="why-heading reveal">
              <p className="eyebrow">Why Karra</p>
              <h2 id="why-title">One group.<br /><em>Three areas of expertise.</em><br />Practical results.</h2>
              <p className="why-subtitle">Set up to understand the brief, take responsibility for the work and make progress visible.</p>
              <a className="text-link" href="#contact">Talk to our team <ArrowRight size={16} /></a>
            </div>
            <div className="reason-list reveal">
              {differentiators.map((item) => (
                <article className="reason-row" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <ChevronRight className="reason-arrow" size={17} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="digital-section section-pad" id="digital" aria-labelledby="digital-title">
          <div className="site-container">
            <div className="digital-heading reveal">
              <p className="eyebrow">Our digital advantage</p>
              <h2 id="digital-title">Visibility. Accountability.<br /><em>Everything in one place.</em></h2>
              <p className="digital-lead">A shared Karaa platform gives clients a clearer view of approved services, work in progress and the evidence behind each update.</p>
            </div>
            <div className="digital-layout reveal">
              <div className="digital-features">
                <div className="digital-feature"><span className="feature-icon"><ClipboardCheck size={19} /></span><div><h3>Approve with clarity</h3><p>Review scopes, activities and changes in one place.</p></div></div>
                <div className="digital-feature"><span className="feature-icon"><Smartphone size={19} /></span><div><h3>Follow progress</h3><p>See service status as field and operations teams deliver.</p></div></div>
                <div className="digital-feature"><span className="feature-icon"><ShieldCheck size={19} /></span><div><h3>Verify the work</h3><p>Photo and GPS verified evidence supports field activity updates.</p></div></div>
                <div className="digital-feature"><span className="feature-icon"><FileCheck2 size={19} /></span><div><h3>Keep records together</h3><p>Access reports, statements and invoices where applicable.</p></div></div>
                <a className="text-link" href="#contact">Ask us for a dashboard demo <ArrowRight size={16} /></a>
              </div>
              <div className="dashboard-frame">
                <div className="dashboard-window">
                  <div className="dashboard-topbar">
                    <div className="dashboard-brand"><span>KARRA <small>CLIENT SPACE</small></span></div>
                    <div className="dashboard-top-right"><span className="live-dot" /> Private client view <span className="avatar">K</span></div>
                  </div>
                  <div className="dashboard-body">
                    <aside className="dashboard-sidebar" aria-label="Illustrative dashboard navigation">
                      <span className="dash-nav active"><span className="dash-square" /> Overview</span>
                      <span className="dash-nav"><span className="dash-square" /> My services</span>
                      <span className="dash-nav"><span className="dash-square" /> Approvals</span>
                      <span className="dash-nav"><span className="dash-square" /> Reports</span>
                      <span className="dash-nav"><span className="dash-square" /> Documents</span>
                    </aside>
                    <div className="dashboard-content">
                      <div className="dashboard-greeting"><div><span className="dash-overline">CLIENT OVERVIEW</span><h3>Your work, at a glance.</h3></div><span className="dash-date">Illustrative preview</span></div>
                      <div className="dash-summary-grid">
                        <div className="dash-summary"><span>ACTIVE SERVICES</span><strong>In progress</strong><i><span /></i></div>
                        <div className="dash-summary"><span>ITEMS TO REVIEW</span><strong>Awaiting approval</strong><i><span /></i></div>
                        <div className="dash-summary"><span>LATEST UPDATE</span><strong>Report ready</strong><i><span /></i></div>
                      </div>
                      <div className="dash-list-head"><span>RECENT SERVICE UPDATES</span><span>View all <ArrowUpRight size={12} /></span></div>
                      <div className="dash-service-row"><span className="dash-service-icon green"><Check size={14} /></span><div><strong>Market activity</strong><small>Field update · Evidence attached</small></div><span className="dash-status complete">Verified</span></div>
                      <div className="dash-service-row"><span className="dash-service-icon gold"><ClipboardCheck size={14} /></span><div><strong>Property maintenance</strong><small>Estimate · Client review</small></div><span className="dash-status review">Review</span></div>
                      <div className="dash-service-row"><span className="dash-service-icon pale"><Sparkles size={14} /></span><div><strong>Agricultural linkage</strong><small>Programme update · Season report</small></div><span className="dash-status progress">In progress</span></div>
                      <div className="dash-preview-note">ILLUSTRATIVE PREVIEW · SAMPLE CONTENT, NOT COMPANY RESULTS</div>
                    </div>
                  </div>
                </div>
                <div className="dashboard-caption"><p>A single, private view of the services you approve.</p><span className="caption-rule" /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="approach-section section-pad" id="approach" aria-labelledby="approach-title">
          <div className="site-container">
            <div className="approach-heading reveal">
              <div><p className="eyebrow">Our approach</p><h2 id="approach-title">From understanding<br /><em>to execution.</em></h2></div>
              <p>Every engagement is shaped around a clear scope, practical delivery and a useful feedback loop.</p>
            </div>
            <div className="approach-track reveal">
              {approach.map((step, index) => (
                <article className="approach-step" key={step.title}>
                  <span className="step-dot"><span /></span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                  {index < approach.length - 1 && <span className="step-connector" aria-hidden="true" />}
                </article>
              ))}
            </div>
            <div className="approach-note reveal"><span><Check size={15} /></span> Every engagement starts with a written scope: deliverables, locations, timeline, measures and fees.</div>
          </div>
        </section>

        <section className="contact-section section-pad" id="contact" aria-labelledby="contact-title">
          <div className="site-container contact-container">
            <div className="contact-intro reveal">
              <p className="eyebrow">Start a conversation</p>
              <h2 id="contact-title">Let’s build something<br /><em>that creates value.</em></h2>
              <p>Whether you are growing a brand, managing property or strengthening an agricultural supply chain, let’s explore how Karra can support your objectives.</p>
              <div className="contact-divider" />
              {[contacts.marketAndProperty, contacts.agriculture, contacts.digital].map((person) => (
                <div className="contact-person" key={person.name}>
                  <div><strong>{person.name}</strong><small>{person.role}</small><a href={`tel:${person.phone.replaceAll(" ", "")}`}>{person.phone}</a><a href={`mailto:${person.email}`}>{person.email}</a></div>
                </div>
              ))}
            </div>
            <form className="contact-form reveal" onSubmit={handleContactSubmit} onChange={() => setSubmitted(false)}>
              <p className="form-intro">Tell us a little about what you need.</p>
              <div className="form-grid">
                <label><span>Name <b>*</b></span><input autoComplete="name" name="name" required maxLength={100} placeholder="Your name" /></label>
                <label><span>Company</span><input autoComplete="organization" name="company" maxLength={120} placeholder="Company or organisation" /></label>
                <label><span>Email <b>*</b></span><input type="email" autoComplete="email" name="email" required maxLength={254} placeholder="name@company.com" /></label>
                <label><span>Phone</span><input type="tel" autoComplete="tel" name="phone" maxLength={30} placeholder="+251 …" /></label>
                <label className="form-wide"><span>Business area <b>*</b></span><select name="interest" required defaultValue=""><option value="" disabled>Select a division</option><option>Market Solutions</option><option>Property Solutions</option><option>Agri Linkages</option><option>More than one division</option></select></label>
                <label className="form-wide"><span>Message <b>*</b></span><textarea name="message" required minLength={10} maxLength={2000} rows={4} placeholder="What would you like to achieve?" /></label>
              </div>
              <div className="form-submit-row">
                <button className="button button-gold" type="submit">Send an enquiry <ArrowUpRight size={18} /></button>
                <span>Fields marked * are required.</span>
              </div>
              {submitted && <p className="form-status" role="status">Your details are validated. This form is not connected to a message service yet; connect the submit handler to <code>POST /api/contact</code> to receive enquiries.</p>}
              <p className="form-integration">Your information stays in this browser until a contact service is connected.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-container">
          <div className="footer-main">
            <div className="footer-brand-column">
              <Brand light />
              <p>Connecting markets, managing assets and strengthening value chains through practical solutions.</p>
              <span className="footer-tagline">Practical solutions. Sustainable growth.</span>
            </div>
            <div className="footer-column"><span className="footer-label">DIVISIONS</span>{solutions.map((solution) => <a key={solution.id} href={`#${solution.id}`}>{solution.name}<ArrowUpRight size={13} /></a>)}</div>
            <div className="footer-column"><span className="footer-label">EXPLORE</span><a href="#about">About us</a><a href="#who-we-are">Who we are</a><a href="#solutions">Our solutions</a><a href="#digital">Digital platform</a><a href="#approach">Our approach</a><a href="#contact">Contact</a></div>
            <div className="footer-column footer-contact-column"><span className="footer-label">CONTACT</span><a href={`tel:${contacts.marketAndProperty.phone.replaceAll(" ", "")}`}>{contacts.marketAndProperty.phone}</a><a href={`mailto:${contacts.marketAndProperty.email}`}>{contacts.marketAndProperty.email}</a><a href={`tel:${contacts.agriculture.phone.replaceAll(" ", "")}`}>{contacts.agriculture.phone}</a><a href={`mailto:${contacts.agriculture.email}`}>{contacts.agriculture.email}</a><a href={`tel:${contacts.digital.phone}`}>{contacts.digital.phone}</a><a href={`mailto:${contacts.digital.email}`}>{contacts.digital.email}</a></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} Karra Solutions</span><span>Practical solutions for lasting value.</span><a href="#home">Back to top ↑</a></div>
        </div>
      </footer>
    </>
  );
}
