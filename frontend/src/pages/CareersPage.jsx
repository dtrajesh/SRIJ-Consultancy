import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { getPublicJobs } from "../services/api";

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await getPublicJobs();
        setJobs(response);
      } catch (loadError) {
        setError(loadError.message || "Unable to load careers page.");
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  return (
    <section className="section page-intro">
      <div className="container">
        <SectionHeader
          eyebrow="Careers"
          title="Build your career with Trinexora"
          text="We will publish open positions here as our team grows. When a role is posted, applicants can apply directly with their resume."
        />

        {loading ? <p className="form-status loading">Loading openings...</p> : null}
        {error ? <p className="form-status error">{error}</p> : null}

        {!loading && !error && jobs.length === 0 ? (
          <div className="empty-state">
            <h3>No openings right now</h3>
            <p>
              There are currently no active job openings. Please check back later for new
              opportunities.
            </p>
          </div>
        ) : null}

        {jobs.length > 0 ? (
          <div className="card-grid">
            {jobs.map((job) => (
              <article key={job.id} className="content-card job-card">
                <div className="job-card-top">
                  <div>
                    <h3>{job.title}</h3>
                    <p>{job.summary}</p>
                  </div>
                  <div className="job-meta">
                    <span>{job.department}</span>
                    <span>{job.location}</span>
                    <span>{job.employment_type}</span>
                  </div>
                </div>
                <Link className="button button-primary" to={`/careers/${job.id}/apply`}>
                  View and Apply
                </Link>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
