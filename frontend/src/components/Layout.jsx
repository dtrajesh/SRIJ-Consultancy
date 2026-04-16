import { NavLink, Outlet } from "react-router-dom";
import brandLogo from "../assets/trinexora-logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
  { label: "Technologies", to: "/technologies" },
  { label: "Products", to: "/products" },
  { label: "Careers", to: "/careers" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" }
];

export default function Layout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-row">
          <NavLink className="brand" to="/">
            <img className="brand-logo" src={brandLogo} alt="Trinexora logo" />
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
          <div>
            <img className="footer-brand-logo" src={brandLogo} alt="Trinexora logo" />
            <p>
              Talent delivered with execution-first thinking across AI, data, applications,
              and digital transformation programs.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/industries">Industries</NavLink>
            <NavLink to="/technologies">Technologies</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/careers">Careers</NavLink>
            <NavLink to="/about">About</NavLink>
          </div>
          <div>
            <h4>Connect</h4>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/get-started">Get Started</NavLink>
            <NavLink to="/admin/login">Admin</NavLink>
            <a href="mailto:hello@trinexora.com">hello@trinexora.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
