import ConsentCheckbox, { ENQUIRY_CONSENT_TEXT, useConsent } from "./ConsentCheckbox";
import { Link } from "react-router-dom";
import { useState } from "react";
import { submitContact } from "../services/api";

const initialState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  website: "",
  interest: "General enquiry",
  message: ""
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const { consentProps, validateConsent, resetConsent, getConsentData } = useConsent(ENQUIRY_CONSENT_TEXT);
  const [status, setStatus] = useState({ type: "", message: "" });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status.type === "loading") return;
    if (!validateConsent(event.currentTarget)) return;
    setStatus({ type: "loading", message: "Sending your message..." });

    try {
      const response = await submitContact({ ...form, ...getConsentData() });
      setStatus({ type: "success", message: response.message });
      setForm(initialState);
      resetConsent();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again."
      });
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <div className="contact-form-header">
        <h2>General Enquiries</h2>
        <p>Have a question about Trinexora? Send us a message and we’ll reply within one business day.</p>
        <p className="contact-requirement-link">Starting a hire or project? <Link to="/get-started">Share your requirement →</Link></p>
      </div>

      <div className="contact-honeypot" aria-hidden="true">
        <label>Leave this field empty<input name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="form-grid">
        <label>
          <span>Name (required)</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
        </label>
        <label>
          <span>Email (required)</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Work Email"
            required
          />
        </label>
        <label>
          <span>Company (optional)</span>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company Name"
          />
        </label>
        <label>
          <span>Phone (optional)</span>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </label>
      </div>

      <label>
        <span>I’m interested in</span>
        <select name="interest" value={form.interest} onChange={handleChange}>
          <option>General enquiry</option>
          <option>Business partnership</option>
          <option>Other</option>
        </select>
      </label>

      <label>
        <span>Your message (required)</span>
        <textarea
          name="message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us how we can help"
          required
        />
      </label>

      <ConsentCheckbox {...consentProps} />

      <button className="button button-primary" type="submit" disabled={status.type === "loading"}>
        {status.type === "loading" ? "Sending…" : "Send Enquiry"}
      </button>

      {status.message ? (
        <p role={status.type === "error" ? "alert" : "status"} aria-live="polite" className={`form-status ${status.type}`}>{status.message}</p>
      ) : null}
    </form>
  );
}
