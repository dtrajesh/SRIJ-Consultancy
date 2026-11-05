export default function ServiceIcon({ title }) {
  let shape;
  if (/Consultation/.test(title)) shape = <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V2h6v2M9 9h6M9 13h6M9 17h4" /></>;
  else if (/Specialist/.test(title)) shape = <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><path d="m12 12 8-8M16 4h4v4" /></>;
  else if (/Sourcing/.test(title)) shape = <><circle cx="10" cy="8" r="4" /><path d="M3 21v-2a7 7 0 0 1 10-6" /><circle cx="17" cy="16" r="4" /><path d="m20 19 3 3" /></>;
  else if (/Project Teams/.test(title)) shape = <><circle cx="12" cy="7" r="3" /><path d="M6 21v-3a6 6 0 0 1 12 0v3M5 5a3 3 0 0 0 0 6M19 5a3 3 0 0 1 0 6M2 20v-3a5 5 0 0 1 3-4M22 20v-3a5 5 0 0 0-3-4" /></>;
  else if (/Cloud/.test(title)) shape = <><path d="M6 17a5 5 0 0 1-1-10 7 7 0 0 1 13-1 5.5 5.5 0 0 1 0 11M8 14l-3 3 3 3M16 14l3 3-3 3M13 13l-2 8" /></>;
  else if (/Recruitment/.test(title)) shape = <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V3h8v4M3 12h18M10 12v3h4v-3" /></>;
  else if (/Contract/.test(title)) shape = <><path d="M14 3H5v18h14V8Z M14 3v5h5M8 12h5M8 16l2 2 5-5" /></>;
  else if (/Urgent/.test(title)) shape = <><circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 2M9 2h6M12 2v3" /></>;
  else if (/Testing/.test(title)) shape = <><path d="M8 3h8M10 3v6l-6 10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2L14 9V3M7 15h10" /><path d="m10 17 2 2 3-3" /></>;
  else if (/Support/.test(title)) shape = <><path d="M4 14v-3a8 8 0 0 1 16 0v3M4 12H2v6h4v-6ZM20 12h2v6h-4v-6ZM20 18v1a3 3 0 0 1-3 3h-4" /></>;
  else shape = <><rect x="3" y="3" width="18" height="14" rx="2" /><path d="M8 21h8M12 17v4M8 8l-2 2 2 2M16 8l2 2-2 2" /></>;
  return <span className="service-line-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{shape}</svg></span>;
}
