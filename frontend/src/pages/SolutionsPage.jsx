import { usePageMeta } from "../usePageMeta";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { products } from "../data/siteContent";

export default function SolutionsPage() {
  usePageMeta({ title: "Our Innovations | Products & Accelerators by Trinexora", description: "Explore products, reusable frameworks and delivery accelerators being developed by the Trinexora team.", path: "/our-innovations" });
  return (
    <section className="section page-intro accelerators-page innovations-page">
      <div className="container">
        <div className="accelerators-hero"><SectionHeader as="h1" title="Our Innovations" titleAccent="Built by Trinexora" text="Products, reusable frameworks and accelerators created by our team to simplify testing and technology delivery. Explore what we’re building and each item’s current development status." /></div>
        <div className="accelerators-heading"><h2>Our Products &amp; Accelerators</h2><p>These initiatives are in development and are not yet available for general use.</p></div>
        <div className="accelerator-grid">{products.map((product, index) => <article className="accelerator-card" key={product.title}>
          <div className="accelerator-card-header"><h3>{index + 1}. {product.title}</h3></div>
          <span className="accelerator-status">{product.status}</span>
          <div className="accelerator-copy-block"><p>{product.description}</p></div>
          <div className="accelerator-detail"><strong>Planned Capabilities</strong><div className="accelerator-tags">{product.highlights.map(item => <span key={item}>{item}</span>)}</div></div>
          <Link className="accelerator-link" to="/get-started">Ask About This Innovation →</Link>
        </article>)}</div>
        <div className="accelerators-cta"><div><h3>Interested in What We’re Building?</h3><p>Talk to our team about an innovation or share the challenge you want to solve.</p></div><Link className="button button-primary" to="/get-started">Talk to Our Team</Link></div>
      </div>
    </section>
  );
}
