import { usePageMeta } from "../usePageMeta";
import { siteConfig } from "../config/siteConfig";

export default function PrivacyPolicyPage() {
  usePageMeta({
    title: "Privacy Policy | Trinexora",
    path: "/privacy-policy",
    description: "How Trinexora collects, uses and protects your personal data, and how to ask us to delete it."
  });
  const privacyEmailLink = <a href={`mailto:${siteConfig.privacyEmail}`}>{siteConfig.privacyEmail}</a>;
  const phoneLink = <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`}>{siteConfig.phone}</a>;

  return (
    <section className="section page-intro privacy-policy-page">
      <div className="container privacy-policy-content">
        <header className="section-header">
          <h1>Privacy Policy</h1>
          <p>Last updated: {siteConfig.policyLastUpdated}</p>
        </header>

        <section>
          <h2>1. Who we are</h2>
          <p>{siteConfig.legalName} ("Trinexora", "we", "us") is an IT staffing and technology delivery company based in Hyderabad, India. This policy explains what personal data we collect through www.trinexora.com, why we collect it, how long we keep it, and how you can ask us to correct or delete it. Our address is {siteConfig.address}.</p>
        </section>

        <section>
          <h2>2. What we collect</h2>
          <div className="privacy-policy-table-wrap" role="region" aria-label="Personal data we collect" tabIndex={0}>
            <table>
              <thead><tr><th scope="col">If you are</th><th scope="col">What we collect</th><th scope="col">How we collect it</th></tr></thead>
              <tbody>
                <tr><th scope="row">A candidate</th><td>Name, email, phone number, your resume or CV (which may include work history, education, skills, location, current and expected pay, notice period), and anything you write to us</td><td>Resume upload forms, Talent Network form, email, phone and messaging</td></tr>
                <tr><th scope="row">A business enquiring about hiring or a project</th><td>Name, work email, company name, phone number, and details of your requirement</td><td>Contact and Get Started forms, email, phone</td></tr>
                <tr><th scope="row">A website visitor</th><td>Technical data such as IP address, browser type and pages visited</td><td>Automatically, see Section 12</td></tr>
              </tbody>
            </table>
          </div>
          <p>Please do not send ID numbers (such as Aadhaar, PAN or passport) or other sensitive details unless we ask for them for a specific role.</p>
        </section>

        <section>
          <h2>3. Where else we get data</h2>
          <p>We may find professional details of candidates on job portals and professional networks where you have made them public (for example LinkedIn or Naukri), or through a referral. If we contact you this way, we will tell you where we found your details, and you can ask us to delete them.</p>
        </section>

        <section>
          <h2>4. Why we use it</h2>
          <ul>
            <li><strong>Candidates:</strong> to assess your profile, match you to roles, contact you about openings and, with your consent, share your profile with a client or partner for a specific role.</li>
            <li><strong>Businesses:</strong> to reply to your enquiry, understand your requirement, prepare proposals and deliver our services.</li>
            <li><strong>Everyone:</strong> to run and secure our website and to meet legal, tax and accounting duties.</li>
          </ul>
          <p>We do not sell your personal data. We send marketing messages only if you agreed to receive them, and you can unsubscribe at any time.</p>
        </section>

        <section>
          <h2>5. Consent</h2>
          <p>We process your data on the basis of your consent, which you give by ticking the consent box on our forms or by sending us your details. You can withdraw consent at any time (see Section 9). Withdrawing does not affect what we did with your data before.</p>
        </section>

        <section>
          <h2>6. Who we share data with</h2>
          <ul>
            <li><strong>Clients and staffing partners:</strong> we share a candidate's profile only with the candidate's consent, for a specific role. A client may be represented by a staffing vendor, in which case we share with that vendor.</li>
            <li><strong>Service providers:</strong> companies that host our website and handle email and forms, who may use data only to provide their service to us. Some may store data on servers outside India.</li>
            <li><strong>Authorities:</strong> where the law requires it.</li>
          </ul>
          <p>We do not share your data with anyone else.</p>
        </section>

        <section>
          <h2>7. How long we keep it</h2>
          <ul>
            <li><strong>Candidate profiles and resumes:</strong> while you stay in touch with us, and for 24 months after our last contact. After that we delete or anonymise them.</li>
            <li><strong>Business enquiries:</strong> 24 months after our last contact.</li>
            <li><strong>Records the law requires us to keep (such as invoices and contracts):</strong> for as long as the law requires.</li>
          </ul>
          <p>If you ask us to delete your data sooner, we will (see Section 9).</p>
        </section>

        <section>
          <h2>8. How we protect it</h2>
          <p>We use reasonable safeguards: our site runs over HTTPS, and access to personal data is limited to people who need it for their work. No system is completely secure. If a data breach affects you, we will tell you and the authorities as the law requires.</p>
        </section>

        <section>
          <h2>9. Your rights and how to ask us to delete your data</h2>
          <p>You can ask us to:</p>
          <ul>
            <li>show you the personal data we hold about you</li>
            <li>correct anything that is wrong or out of date</li>
            <li>delete your personal data</li>
            <li>withdraw your consent</li>
            <li>let someone you name act for you if you die or cannot act yourself</li>
          </ul>
          <p><strong>How to ask:</strong> email {privacyEmailLink} from the address you gave us, with the subject "Data request", and say what you want. We may ask you to confirm your identity first. We will reply within 30 days. If you asked for deletion, we will delete your data within the same period, except records the law requires us to keep, and confirm by email.</p>
        </section>

        <section>
          <h2>10. Complaints</h2>
          <p>If you are unhappy with how we handled your data, write to our Grievance Officer at {privacyEmailLink} or call {phoneLink}. If we do not resolve it, you may complain to the Data Protection Board of India, as provided under the Digital Personal Data Protection Act, 2023.</p>
        </section>

        <section>
          <h2>11. Children</h2>
          <p>Our services are for adults aged 18 and over. We do not knowingly collect data about anyone under 18. If you believe we have, tell us and we will delete it.</p>
        </section>

        <section>
          <h2>12. Cookies</h2>
          <p>Our website does not use cookies for tracking or advertising. Our hosting provider may log technical data, such as IP address, browser and pages visited, for security and reliability.</p>
        </section>

        <section>
          <h2>13. Changes to this policy</h2>
          <p>We will post any change on this page and update the date above. For significant changes we will also email people whose address we hold.</p>
        </section>

        <section>
          <h2>14. Contact us</h2>
          <p>{siteConfig.legalName}, {siteConfig.address}. Email: {privacyEmailLink}. Phone: {phoneLink}.</p>
        </section>
      </div>
    </section>
  );
}
