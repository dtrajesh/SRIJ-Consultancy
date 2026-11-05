import { usePageMeta } from "../usePageMeta";
import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig";

export default function TermsPage() {
  usePageMeta({
    title: "Terms of Use | Trinexora",
    path: "/terms",
    description: "The terms for using the Trinexora website and sending us enquiries or resumes."
  });
  return (
    <section className="section page-intro terms-page">
      <div className="container legal-page-content">
        <header className="section-header">
          <h1>Terms of Use</h1>
          <p>Last updated: {siteConfig.termsLastUpdated}</p>
        </header>

        <section>
          <h2>1. About these terms</h2>
          <p>These terms apply when you use www.trinexora.com, which is run by {siteConfig.legalName} ("Trinexora", "we", "us"), {siteConfig.address}. By using the site you agree to them. If you do not agree, please do not use the site.</p>
        </section>

        <section>
          <h2>2. What this website is</h2>
          <p>This website gives information about our IT staffing and technology delivery services and lets you send us enquiries and resumes. Content on the site is general information, not a quote or an offer. Our staffing and delivery services are provided only under a separate written agreement with each client, and that agreement sets out fees, replacement terms and other conditions.</p>
        </section>

        <section>
          <h2>3. Candidates</h2>
          <ul>
            <li>Submitting a resume does not guarantee an interview, a job offer or a placement.</li>
            <li>Our services are free for candidates. We do not charge candidates any fee.</li>
            <li>Please make sure the information you give us is accurate and that you have the right to share it. We may stop working with a candidate who gives false information.</li>
            <li>We share your profile with a client only with your consent (see our <Link to="/privacy-policy">Privacy Policy</Link>).</li>
          </ul>
        </section>

        <section>
          <h2>4. Businesses</h2>
          <p>Sending an enquiry does not create a contract between us. A contract exists only when both parties sign a written agreement or statement of work.</p>
        </section>

        <section>
          <h2>5. How you may use the site</h2>
          <p>You agree not to:</p>
          <ul>
            <li>use the site for anything unlawful or to send false or misleading information</li>
            <li>upload viruses or other harmful files</li>
            <li>copy, scrape or collect data from the site in bulk, or try to break into it</li>
            <li>use our contact details or candidate forms to send spam</li>
          </ul>
        </section>

        <section>
          <h2>6. Our content</h2>
          <p>The text, design, logo and other material on this site belong to us or are used with permission. You may view and share a link to the site, but you may not copy or reuse our content for commercial purposes without our written permission.</p>
        </section>

        <section>
          <h2>7. Links to other sites</h2>
          <p>The site may link to other websites. We do not control them and are not responsible for their content or privacy practices.</p>
        </section>

        <section>
          <h2>8. No warranties, and limit on liability</h2>
          <p>We try to keep the site accurate and available, but we provide it "as is" and do not promise it will be error-free or always online. To the extent the law allows, we are not liable for any loss arising from your use of the site or from relying on its content. Nothing in these terms limits liability that cannot be limited by law.</p>
        </section>

        <section>
          <h2>9. Privacy</h2>
          <p>How we handle personal data is described in our <Link to="/privacy-policy">Privacy Policy</Link>.</p>
        </section>

        <section>
          <h2>10. Changes</h2>
          <p>We may update these terms from time to time. The date at the top shows when they last changed. Using the site after a change means you accept the new terms.</p>
        </section>

        <section>
          <h2>11. Governing law</h2>
          <p>These terms are governed by the laws of India. Courts at Hyderabad, Telangana have jurisdiction over any dispute about them.</p>
        </section>

        <section>
          <h2>12. Contact us</h2>
          <p>{siteConfig.legalName}, {siteConfig.address}. Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. Phone: <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}>{siteConfig.phone}</a>.</p>
        </section>
      </div>
    </section>
  );
}
