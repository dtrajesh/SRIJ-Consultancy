import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteAdminConsultation,
  deleteAdminContact,
  getAdminSubmissions
} from "../services/api";

function formatDate(value) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleString();
}

export default function AdminDashboardPage() {
  const [data, setData] = useState({ contacts: [], consultations: [] });
  const [status, setStatus] = useState({ type: "loading", message: "Loading submissions..." });
  const [actionMessage, setActionMessage] = useState("");
  const [deletingKey, setDeletingKey] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("adminUsername") || "admin";

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      try {
        const response = await getAdminSubmissions(token);
        setData(response);
        setStatus({ type: "success", message: "" });
      } catch (error) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUsername");
        setStatus({ type: "error", message: error.message || "Unable to load submissions." });
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

  async function handleDeleteContact(submissionId) {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const confirmed = window.confirm("Delete this contact submission?");
    if (!confirmed) {
      return;
    }

    try {
      setDeletingKey(`contact-${submissionId}`);
      const response = await deleteAdminContact(token, submissionId);
      setData((current) => ({
        ...current,
        contacts: current.contacts.filter((item) => item.id !== submissionId)
      }));
      setActionMessage(response.message);
    } catch (error) {
      setActionMessage(error.message || "Unable to delete contact submission.");
    } finally {
      setDeletingKey("");
    }
  }

  async function handleDeleteConsultation(submissionId) {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const confirmed = window.confirm("Delete this Get Started request?");
    if (!confirmed) {
      return;
    }

    try {
      setDeletingKey(`consultation-${submissionId}`);
      const response = await deleteAdminConsultation(token, submissionId);
      setData((current) => ({
        ...current,
        consultations: current.consultations.filter((item) => item.id !== submissionId)
      }));
      setActionMessage(response.message);
    } catch (error) {
      setActionMessage(error.message || "Unable to delete consultation request.");
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
            <h1>Website leads</h1>
            <p>Logged in as {username}</p>
          </div>
          <button className="button button-secondary" type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {status.type === "loading" ? <p className="form-status loading">{status.message}</p> : null}
        {actionMessage ? <p className="form-status success">{actionMessage}</p> : null}

        <div className="admin-grid">
          <section className="admin-panel">
            <div className="admin-panel-header">
              <h2>Contact form submissions</h2>
              <span>{data.contacts.length}</span>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Received</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.contacts.length === 0 ? (
                    <tr>
                      <td colSpan="7">No contact submissions yet.</td>
                    </tr>
                  ) : (
                    data.contacts.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.company}</td>
                        <td>{item.phone || "-"}</td>
                        <td>{item.message}</td>
                        <td>{formatDate(item.created_at)}</td>
                        <td>
                          <button
                            className="button button-danger button-small"
                            type="button"
                            disabled={deletingKey === `contact-${item.id}`}
                            onClick={() => handleDeleteContact(item.id)}
                          >
                            {deletingKey === `contact-${item.id}` ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="admin-panel">
            <div className="admin-panel-header">
              <h2>Get Started requests</h2>
              <span>{data.consultations.length}</span>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Need Type</th>
                    <th>Timeline</th>
                    <th>Team Size</th>
                    <th>Goals</th>
                    <th>Received</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.consultations.length === 0 ? (
                    <tr>
                      <td colSpan="9">No consultation requests yet.</td>
                    </tr>
                  ) : (
                    data.consultations.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.company}</td>
                        <td>{item.need_type}</td>
                        <td>{item.timeline || "-"}</td>
                        <td>{item.team_size || "-"}</td>
                        <td>{item.goals}</td>
                        <td>{formatDate(item.created_at)}</td>
                        <td>
                          <button
                            className="button button-danger button-small"
                            type="button"
                            disabled={deletingKey === `consultation-${item.id}`}
                            onClick={() => handleDeleteConsultation(item.id)}
                          >
                            {deletingKey === `consultation-${item.id}` ? "Deleting..." : "Delete"}
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
