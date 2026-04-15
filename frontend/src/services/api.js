const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const customHeaders = options.headers || {};
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...customHeaders
    },
    ...options
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
