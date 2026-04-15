import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Industries", to: "/industries" },
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
            <span className="brand-mark">S</span>
            <div>
              <strong>SRIJ Talent Solutions</strong>
              <p>Staffing and delivery partner</p>
            </div>
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
            <h3>SRIJ Talent Solutions</h3>
            <p>
              Helping clients build teams fast and deliver with confidence through staffing,
              managed delivery, and modernization support.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/industries">Industries</NavLink>
            <NavLink to="/careers">Careers</NavLink>
            <NavLink to="/about">About</NavLink>
          </div>
          <div>
            <h4>Connect</h4>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/get-started">Get Started</NavLink>
            <NavLink to="/admin/login">Admin</NavLink>
            <a href="mailto:hello@srijtalent.com">hello@srijtalent.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
