import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import headerLogo from "../assets/trinexora-dark-logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
  { label: "Technologies", to: "/technologies" },
  { label: "Accelerators", to: "/products" }
];

const navItemsAfterAbout = [
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" }
];

const aboutItems = [
  { label: "Overview", to: "/about#overview" },
  { label: "Who We Are", to: "/about#who-we-are" },
  { label: "Mission & Vision", to: "/about#mission-vision" },
  { label: "Leadership", to: "/about#leadership" },
  { label: "Why Choose Us", to: "/about#why-choose-us" },
  { label: "What We Do?", to: "/about#what-we-do" },
  { label: "What You Gain", to: "/about#what-you-gain" },
  { label: "Join Our Growing Team", to: "/about#join-team" },
  { label: "Recognition", to: "/about#recognition" },
  { label: "CSR", to: "/about#csr" }
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

export default function Layout() {
  const [isAboutMenuClosed, setIsAboutMenuClosed] = useState(false);

  return (
    <div className="site-shell">
      <HashScroll />
      <header className="site-header">
        <div className="container header-row">
          <NavLink className="brand" to="/">
            <img className="brand-logo" src={headerLogo} alt="Trinexora logo" />
          </NavLink>

          <nav className="nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
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
                <span className="nav-caret" aria-hidden="true">
                  v
                </span>
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
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/get-started" className="button button-primary">
              Get Started
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-section footer-brand">
            <img className="footer-brand-logo" src={headerLogo} alt="Trinexora logo" />
            <p>
              Building high-performance teams for AI, data, and digital
              transformation.
              <br />
              Helping organizations scale faster with expert talent and reliable
              delivery.
            </p>
          </div>
          <div className="footer-section">
            <h4>Explore</h4>
            <div className="footer-links">
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/industries">Industries</NavLink>
              <NavLink to="/technologies">Technologies</NavLink>
              <NavLink to="/products">Accelerators</NavLink>
              <NavLink to="/careers">Careers</NavLink>
              <NavLink to="/about">About</NavLink>
            </div>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="footer-links">
              <NavLink to="/contact">Contact</NavLink>
              <NavLink to="/get-started">Get Started</NavLink>
              <NavLink to="/admin/login">Admin</NavLink>
              <a href="mailto:hello@trinexora.com">hello@trinexora.com</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
