import { useState } from "react";
import { submitContact } from "../services/api";

const initialState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  message: ""
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ type: "", message: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });

    try {
      const response = await submitContact(form);
      setStatus({ type: "success", message: response.message });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again."
      });
    } finally {
      setForm(initialState);
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="contact-form-header">
        <h2>Get in Touch With Our Experts</h2>
        <p>Partner with us to tackle your IT challenges and drive success.</p>
      </div>

      <div className="form-grid">
        <label>
          <span className="sr-only">Full Name</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
        </label>
        <label>
          <span className="sr-only">Work Email</span>
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
          <span className="sr-only">Company Name</span>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company Name"
            required
          />
        </label>
        <label>
          <span className="sr-only">Phone Number</span>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </label>
      </div>

      <label>
        <span className="sr-only">How Can We Help?</span>
        <textarea
          name="message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          placeholder="How Can We Help?"
          required
        />
      </label>

      <p className="contact-form-note">Your information is confidential and secure.</p>

      <button className="button button-primary" type="submit">
        Request a Consultation
      </button>

      {status.message ? (
        <p className={`form-status ${status.type}`}>{status.message}</p>
      ) : null}
    </form>
  );
}
