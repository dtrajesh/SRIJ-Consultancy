import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { products } from "../data/siteContent";

export default function ProductsPage() {
  return (
    <section className="section page-intro">
      <div className="container">
        <SectionHeader
          eyebrow="Products"
          title="Reusable solutions that help clients move faster"
          text="Alongside staffing and consulting, SRIJ can package repeatable delivery assets and accelerators that reduce setup time and improve execution."
        />

        <div className="card-grid">
          {products.map((product) => (
            <article key={product.title} className="content-card product-card">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p className="product-usecase">{product.useCase}</p>
              <Link to="/contact">Ask about this product</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
