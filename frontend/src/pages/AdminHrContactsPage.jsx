import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createAdminHrContact,
  deleteAdminHrContact,
  getAdminHrContacts
} from "../services/api";

function formatDate(value) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleString();
}

const initialForm = {
  name: "",
  company: "",
  designation: "",
  email: "",
  phone: ""
};

export default function AdminHrContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "loading", message: "Loading HR contacts..." });
  const [actionMessage, setActionMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingKey, setDeletingKey] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("adminUsername") || "admin";

  async function loadContacts(token, options = {}) {
    const { loadingMessage = "Loading HR contacts..." } = options;
    setStatus({ type: "loading", message: loadingMessage });
    const response = await getAdminHrContacts(token);
    setContacts(response);
    setStatus({ type: "success", message: "" });
  }

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      try {
        await loadContacts(token);
      } catch (error) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUsername");
        setStatus({ type: "error", message: error.message || "Unable to load HR contacts." });
        navigate("/admin/login");
      }
    }

    load();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    navigate("/admin/login");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      setSaving(true);
      const response = await createAdminHrContact(token, form);
      setContacts((current) => [response.contact, ...current]);
      setForm(initialForm);
      setActionMessage(response.message);
      setStatus({ type: "success", message: "" });
    } catch (error) {
      setActionMessage(error.message || "Unable to save HR contact.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(contactId) {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    const confirmed = window.confirm("Delete this HR contact?");
    if (!confirmed) {
      return;
    }

    try {
      setDeletingKey(`hr-${contactId}`);
      const response = await deleteAdminHrContact(token, contactId);
      setContacts((current) => current.filter((item) => item.id !== contactId));
      setActionMessage(response.message);
    } catch (error) {
      setActionMessage(error.message || "Unable to delete HR contact.");
    } finally {
      setDeletingKey("");
    }
  }

  return (
    <section className="admin-dashboard">
      <div className="container">
        <div className="admin-topbar">
          <div>
            <span className="eyebrow">Admin Dashboard</span>
            <h1>HR Contacts</h1>
            <p>Logged in as {username}</p>
          </div>
          <div className="admin-actions">
            <Link className="button button-secondary" to="/admin/dashboard">
              Back to Dashboard
            </Link>
            <button className="button button-secondary" type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {status.type === "loading" ? <p className="form-status loading">{status.message}</p> : null}
        {actionMessage ? <p className="form-status success">{actionMessage}</p> : null}

        <div className="admin-grid">
          <section className="admin-panel">
            <div className="admin-panel-header">
              <h2>Add HR contact</h2>
              <span>{contacts.length}</span>
            </div>

            <form className="form-card" onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>
                  Name
                  <input name="name" value={form.name} onChange={handleChange} required />
                </label>
                <label>
                  Company
                  <input name="company" value={form.company} onChange={handleChange} required />
                </label>
                <label>
                  Designation
                  <input
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Phone Number
                  <input name="phone" value={form.phone} onChange={handleChange} required />
                </label>
              </div>

              <button className="button button-primary" type="submit" disabled={saving}>
                {saving ? "Saving..." : "Add HR Contact"}
              </button>
            </form>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-header">
              <h2>Stored HR references</h2>
              <span>{contacts.length}</span>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Designation</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Added</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.length === 0 ? (
                    <tr>
                      <td colSpan="7">No HR contacts added yet.</td>
                    </tr>
                  ) : (
                    contacts.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.company}</td>
                        <td>{item.designation}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{formatDate(item.created_at)}</td>
                        <td>
                          <button
                            className="button button-danger button-small"
                            type="button"
                            disabled={deletingKey === `hr-${item.id}`}
                            onClick={() => handleDelete(item.id)}
                          >
                            {deletingKey === `hr-${item.id}` ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
