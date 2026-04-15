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
      setForm(initialState);
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Something went wrong. Please try again."
      });
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Work Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Company
          <input name="company" value={form.company} onChange={handleChange} required />
        </label>
        <label>
          Phone
          <input name="phone" value={form.phone} onChange={handleChange} />
        </label>
      </div>

      <label>
        Message
        <textarea
          name="message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
        />
      </label>

      <button className="button button-primary" type="submit">
        Submit Inquiry
      </button>

      {status.message ? (
        <p className={`form-status ${status.type}`}>{status.message}</p>
      ) : null}
    </form>
  );
}
