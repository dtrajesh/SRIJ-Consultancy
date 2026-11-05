export default function TechnologyIcon({ title }) {
  const icons = {
    "QA & Performance Engineering": <><path d="M8 3h8M10 3v6L4 19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2L14 9V3M7 15h10M10 17l2 2 3-3" /></>,
    "Enterprise Applications": <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    "Software Engineering": <><path d="m8 5-6 7 6 7M16 5l6 7-6 7M14 3l-4 18" /></>,
    "Frontend Engineering": <><rect x="2" y="3" width="20" height="18" rx="2" /><path d="M2 9h20M8 9v12M5 6h.1M8 6h.1M11 6h.1" /></>,
    "Cloud & DevOps": <><path d="M6 17a5 5 0 0 1-1-10 7 7 0 0 1 13-1 5.5 5.5 0 0 1 0 11M8 14l-3 3 3 3M16 14l3 3-3 3M13 13l-2 8" /></>,
    "Data Engineering & Analytics": <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" /></>,
    "AI & Machine Learning": <><rect x="6" y="6" width="12" height="12" rx="3" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4M10 14v-4h4v4Z" /></>,
    "Cybersecurity": <><path d="m12 2 9 4v6c0 6-9 10-9 10S3 18 3 12V6Z" /><rect x="8" y="10" width="8" height="7" rx="1" /><path d="M10 10V8a2 2 0 0 1 4 0v2" /></>
  };
  return <span className="technology-line-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{icons[title]}</svg></span>;
}
