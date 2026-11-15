import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import headerSymbol from "../assets/trinexora-logo-symbol-source.png";
import { siteConfig, socialLinks, whatsappNumber, whatsappMessage } from "../config/siteConfig";

const socialIcons = {
  linkedin: {
    label: "LinkedIn",
    path: "M5 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h4v12H3V9Zm6 0h4v1.6c.6-1.1 1.8-1.9 3.6-1.9 3.1 0 4.4 1.8 4.4 5.2V21h-4v-6.3c0-1.7-.5-2.6-1.9-2.6S13 13.1 13 14.7V21H9V9Z"
  },
  facebook: {
    label: "Facebook",
    path: "M14 22v-9h3l.5-4H14V6.5c0-1 .3-1.5 1.7-1.5H18V1.4A24 24 0 0 0 14.8 1C11.6 1 10 2.9 10 6v3H7v4h3v9h4Z"
  },
  instagram: {
    label: "Instagram",
    path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-3.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"
  },
  x: {
    label: "X",
    path: "M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l8.2-9.4L2.8 2h6.5l4.5 6.8L18.9 2ZM17.8 20h1.7L8.2 4H6.4l11.4 16Z"
  }
};

const activeSocialLinks = Object.entries(socialLinks).filter(
  ([, url]) => typeof url === "string" && url.trim().length > 0
);

const navItems = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
  { label: "Our Expertise", to: "/our-expertise" },
  ...(siteConfig.showSolutions ? [{ label: "Solutions", to: "/solutions" }] : [])
];

const navItemsAfterAbout = [
  { label: "Careers", to: "/careers" }
];

const aboutItems = [
  { label: "Overview", to: "/about#overview" },
  { label: "Who We Are", to: "/about#who-we-are" },
  { label: "Mission, Vision & Approach", to: "/about#mission-vision" },
  { label: "Core Values", to: "/about#core-values" },
  { label: "Leadership", to: "/about#leadership" },
  { label: "Why Choose Trinexora", to: "/about#why-choose-us" },
];

function HashScroll() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetId = hash.slice(1);
    window.requestAnimationFrame(() => {
      const target = document.getElementById(targetId);
      if (target) {
        const headerHeight = document.querySelector(".site-header")?.offsetHeight ?? 0;
        const anchor = target.querySelector("[data-scroll-anchor]") ?? target;
        const targetTop = anchor.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: Math.max(targetTop - headerHeight - 8, 0),
          behavior: "smooth"
        });
      }
    });
  }, [hash, pathname]);

  return null;
}

function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateScroll = () => setShowBackToTop(window.scrollY > 400);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
  };

  return (
    <div className="floating-actions">
      <button
        className={`floating-action back-to-top${showBackToTop ? " is-visible" : ""}`}
        type="button"
        aria-label="Back to top"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
        onClick={scrollToTop}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="m12 4 8 8-2 2-4.5-4.5V21h-3V9.5L6 14l-2-2 8-8Z" />
        </svg>
      </button>
      {whatsappNumber !== "" && (
        <a
          className="floating-action whatsapp-action"
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Trinexora on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
            <path fillRule="evenodd" d="M12 2a10 10 0 0 0-8.65 15.02L2 22l5.12-1.34A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.23 15.23l-.32-.19-2.9.76.77-2.81-.21-.34A8.2 8.2 0 0 1 12 3.8Zm-3.6 3c-.25 0-.5.1-.67.3-.45.5-.85 1.1-.85 2.05 0 1.1.8 2.25.92 2.4.11.16 1.57 2.5 3.9 3.4 1.94.76 2.33.6 2.76.56.43-.04 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28l-1.65-.78c-.24-.1-.4-.16-.57.1-.16.24-.64.78-.78.94-.15.16-.29.18-.53.06a6.7 6.7 0 0 1-1.94-1.2 7.3 7.3 0 0 1-1.34-1.67c-.14-.24-.02-.37.1-.49.12-.12.25-.28.37-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.43l-.74-1.78c-.18-.43-.37-.44-.56-.45l-.42-.01Z" />
          </svg>
        </a>
      )}
    </div>
  );
}

export default function Layout() {
  const [isAboutMenuClosed, setIsAboutMenuClosed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCompactNav, setIsCompactNav] = useState(() => window.matchMedia("(max-width: 700px)").matches);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const update = () => setIsCompactNav(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const location = useLocation();

  useEffect(() => {
    setIsMobileNavOpen(false);
    setIsAboutMenuClosed(false);
  }, [location.pathname, location.hash]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <HashScroll />
      <header className="site-header">
        <div className="container header-row">
          <NavLink className="brand" to="/">
            <img className="brand-symbol" src={headerSymbol} alt="" aria-hidden="true" />
            <span className="brand-copy" aria-label="Trinexora, IT Staffing, IT Solutions, IT Delivery">
              <span className="brand-name" aria-hidden="true">
                <span className="brand-name-gold">TR<span className="brand-accent-letter">I</span></span>NEXORA
              </span>
              <span className="brand-tagline">IT Staffing | IT Solutions | IT Delivery</span>
            </span>
          </NavLink>

          <button
            className="mobile-nav-toggle"
            type="button"
            aria-label={isMobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="site-navigation"
            aria-expanded={isMobileNavOpen}
            onClick={() => setIsMobileNavOpen((isOpen) => !isOpen)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>

          <nav
            id="site-navigation"
            className={`nav${isMobileNavOpen ? " nav-open" : ""}`}
            aria-label="Main navigation"
            aria-hidden={isCompactNav && !isMobileNavOpen ? true : undefined}
            inert={isCompactNav && !isMobileNavOpen ? "" : undefined}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setIsAboutMenuClosed(true);
                if (isCompactNav) {
                  setIsMobileNavOpen(false);
                  event.currentTarget.previousElementSibling?.focus();
                }
              }
            }}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/" || item.to === "/contact"}
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                {item.label}
              </NavLink>
            ))}
            <div
              className={`nav-dropdown${isAboutMenuClosed ? " nav-dropdown-closed" : ""}`}
              onMouseLeave={() => setIsAboutMenuClosed(false)}
            >
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link nav-dropdown-trigger active" : "nav-link nav-dropdown-trigger"
                }
              >
                About Us
              </NavLink>
              <div className="nav-dropdown-menu" aria-label="About Us sections">
                {aboutItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="nav-dropdown-link"
                    onClick={() => setIsAboutMenuClosed(true)}
                  >
                    <span>{item.label}</span>
                    {item.hasChildren && (
                      <span className="nav-submenu-caret" aria-hidden="true">
                        &gt;
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
            {navItemsAfterAbout.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/" || item.to === "/contact"}
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/get-started" className={({ isActive }) => `button button-primary${isActive ? " nav-cta-active" : ""}`}>
              Get Started
            </NavLink>
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-section footer-brand">
            <div className="footer-brand-lockup" aria-label="Trinexora, IT Staffing, IT Solutions, IT Delivery">
              <img className="footer-brand-symbol" src={headerSymbol} alt="Trinexora" />
              <span className="footer-brand-copy">
                <span className="footer-brand-name">
                  <span className="footer-brand-name-gold">TR<span className="footer-brand-accent-letter">I</span></span>NEXORA
                </span>
                <span className="footer-brand-tagline">IT Staffing | IT Solutions | IT Delivery</span>
              </span>
            </div>
            <p>
              IT staffing and technology solutions from Hyderabad.
              <br />
              We help companies hire skilled professionals and build and deliver
              technology projects.
            </p>
            {activeSocialLinks.length > 0 && (
              <div className="footer-social-links">
                {activeSocialLinks.map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Trinexora on ${socialIcons[platform].label}`}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d={socialIcons[platform].path} fillRule="evenodd" />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>
          <nav className="footer-section" aria-label="Quick links">
            <h3>Quick Links</h3>
            <div className="footer-links">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/industries">Industries</NavLink>
              <NavLink to="/our-expertise">Our Expertise</NavLink>
              {siteConfig.showSolutions && <NavLink to="/solutions">Solutions</NavLink>}
              <NavLink to="/careers">Careers</NavLink>
              <NavLink to="/get-started">Get Started</NavLink>
            </div>
          </nav>
          <div className="footer-section">
            <h3>Services</h3>
            <div className="footer-links footer-services">
              {siteConfig.footerServices.map(({ label }) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </div>
          <div className="footer-section footer-contact-section">
            <h3>Contact Info</h3>
            <div className="footer-links footer-contact">
              <span className="footer-company-detail">{siteConfig.legalName}</span>
              <address className="footer-company-detail">{siteConfig.address}</address>
              <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}>{siteConfig.phone}</a>
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <span>GSTIN: {siteConfig.gstin}</span>
            </div>
          </div>
        </div>
        <div className="container footer-bottom-bar">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All Rights Reserved.</p>
          <nav className="footer-legal-links" aria-label="Legal">
            <NavLink to="/terms">Terms of Service</NavLink>
            <span aria-hidden="true">|</span>
            <NavLink to="/privacy-policy">Privacy Policy</NavLink>
          </nav>
        </div>
      </footer>
      <FloatingActions />
    </div>
  );
}
