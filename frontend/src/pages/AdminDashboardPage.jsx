import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminJobForm from "../components/AdminJobForm";
import {
  deleteAdminApplication,
  deleteAdminJob,
  deleteAdminConsultation,
  deleteAdminContact,
  getAdminResumeUrl,
  getAdminSubmissions
} from "../services/api";

function formatDate(value) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleString();
}

function normalizeExternalUrl(value) {
  if (!value) {
    return "";
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `https://${value}`;
}

export default function AdminDashboardPage() {
  const [data, setData] = useState({
    contacts: [],
    consultations: [],
    jobs: [],
    applications: []
  });
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

  function handleJobCreated(job) {
    setData((current) => ({
      ...current,
      jobs: [{ ...job, application_count: 0 }, ...current.jobs]
    }));
    setActionMessage("Job opening posted successfully.");
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

  async function handleDeleteJob(jobId) {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const confirmed = window.confirm(
      "Delete this job opening? This will also delete applications for this role."
    );
    if (!confirmed) {
      return;
    }

    try {
      setDeletingKey(`job-${jobId}`);
      const response = await deleteAdminJob(token, jobId);
      setData((current) => ({
        ...current,
        jobs: current.jobs.filter((item) => item.id !== jobId),
        applications: current.applications.filter((item) => item.job_id !== jobId)
      }));
      setActionMessage(response.message);
    } catch (error) {
      setActionMessage(error.message || "Unable to delete job opening.");
    } finally {
      setDeletingKey("");
    }
  }

  async function handleDeleteApplication(applicationId) {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const confirmed = window.confirm("Delete this job application?");
    if (!confirmed) {
      return;
    }

    try {
      setDeletingKey(`application-${applicationId}`);
      const response = await deleteAdminApplication(token, applicationId);
      const deletedApplication = data.applications.find((item) => item.id === applicationId);
      setData((current) => ({
        ...current,
        applications: current.applications.filter((item) => item.id !== applicationId),
        jobs: current.jobs.map((job) =>
          job.id === deletedApplication?.job_id
            ? {
                ...job,
                application_count: Math.max(0, (job.application_count || 0) - 1)
              }
            : job
        )
      }));
      setActionMessage(response.message);
    } catch (error) {
      setActionMessage(error.message || "Unable to delete job application.");
    } finally {
      setDeletingKey("");
    }
  }

  async function handleResumeDownload(applicationId, resumeName) {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const response = await fetch(getAdminResumeUrl(applicationId), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Unable to download resume.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = resumeName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setActionMessage(error.message || "Unable to download resume.");
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
              <h2>Post a new job</h2>
              <span>{data.jobs.length}</span>
            </div>
            <AdminJobForm onJobCreated={handleJobCreated} />
          </section>

          <section className="admin-panel">
            <div className="admin-panel-header">
              <h2>Active job openings</h2>
              <span>{data.jobs.length}</span>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Department</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Applications</th>
                    <th>Posted</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.jobs.length === 0 ? (
                    <tr>
                      <td colSpan="7">No job openings yet.</td>
                    </tr>
                  ) : (
                    data.jobs.map((item) => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.department}</td>
                        <td>{item.location}</td>
                        <td>{item.employment_type}</td>
                        <td>{item.application_count}</td>
                        <td>{formatDate(item.created_at)}</td>
                        <td>
                          <button
                            className="button button-danger button-small"
                            type="button"
                            disabled={deletingKey === `job-${item.id}`}
                            onClick={() => handleDeleteJob(item.id)}
                          >
                            {deletingKey === `job-${item.id}` ? "Deleting..." : "Delete"}
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
              <h2>Job applications</h2>
              <span>{data.applications.length}</span>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>Job</th>
                    <th>Contact</th>
                    <th>Experience</th>
                    <th>LinkedIn</th>
                    <th>Resume</th>
                    <th>Received</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.applications.length === 0 ? (
                    <tr>
                      <td colSpan="8">No job applications yet.</td>
                    </tr>
                  ) : (
                    data.applications.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <strong>{item.full_name}</strong>
                          <div>{item.current_company || "-"}</div>
                        </td>
                        <td>{item.job_title}</td>
                        <td>
                          <div>{item.email}</div>
                          <div>{item.phone}</div>
                        </td>
                        <td>{item.years_of_experience || "-"}</td>
                        <td>
                          {item.linkedin_url ? (
                            <a
                              href={normalizeExternalUrl(item.linkedin_url)}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Profile
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td>
                          <button
                            className="button button-secondary button-small"
                            type="button"
                            onClick={() =>
                              handleResumeDownload(item.id, item.resume_original_name)
                            }
                          >
                            Resume
                          </button>
                        </td>
                        <td>{formatDate(item.created_at)}</td>
                        <td>
                          <button
                            className="button button-danger button-small"
                            type="button"
                            disabled={deletingKey === `application-${item.id}`}
                            onClick={() => handleDeleteApplication(item.id)}
                          >
                            {deletingKey === `application-${item.id}`
                              ? "Deleting..."
                              : "Delete"}
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
