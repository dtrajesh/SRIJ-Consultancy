const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const customHeaders = options.headers || {};
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  const { headers: _ignoredHeaders, ...restOptions } = options;
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...customHeaders
    },
    ...restOptions
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || "Request failed");
  }

  return response.json();
}

export function submitContact(payload) {
  return request("/contact", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function submitConsultation(payload) {
  return request("/consultations", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function adminLogin(payload) {
  return request("/admin/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function getAdminSubmissions(token) {
  return request("/admin/submissions", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function deleteAdminContact(token, submissionId) {
  return request(`/admin/contacts/${submissionId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function deleteAdminConsultation(token, submissionId) {
  return request(`/admin/consultations/${submissionId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function getPublicJobs() {
  return request("/careers/jobs");
}

export function getPublicJob(jobId) {
  return request(`/careers/jobs/${jobId}`);
}

export function applyToJob(jobId, formData) {
  return request(`/careers/jobs/${jobId}/apply`, {
    method: "POST",
    body: formData
  });
}

export function createAdminJob(token, payload) {
  return request("/admin/jobs", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
}

export function deleteAdminJob(token, jobId) {
  return request(`/admin/jobs/${jobId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function deleteAdminApplication(token, applicationId) {
  return request(`/admin/applications/${applicationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function getAdminResumeUrl(applicationId) {
  return `${API_BASE}/admin/applications/${applicationId}/resume`;
}
