import { Link, useLocation } from "react-router-dom";
import { usePageMeta } from "../usePageMeta";

export default function NotFoundPage() {
  const { pathname } = useLocation();
  usePageMeta({
    title: "Page Not Found | Trinexora",
    description: "The page you are looking for does not exist or has moved.",
    path: pathname,
    noindex: true
  });

  return (
    <section className="section page-intro">
      <div className="container">
        <div className="section-header">
          <h1>Page not found</h1>
          <p>The page you are looking for does not exist or has moved.</p>
        </div>
        <div className="hero-actions">
          <Link className="button button-primary" to="/">Go to Home</Link>
          <Link className="button button-secondary" to="/get-started">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
