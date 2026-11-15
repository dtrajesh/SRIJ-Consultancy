export default function IndustryIcon({ type }) {
  const shapes = {
    banking: <><path d="m3 9 9-6 9 6H3ZM3 21h18M5 18h14M6 9v9M10 9v9M14 9v9M18 9v9" /></>,
    retail: <><path d="M3 3h2l3 12h11l2-8H6M8 15l-1 3h12" /><circle cx="9" cy="21" r="1" /><circle cx="18" cy="21" r="1" /></>,
    healthcare: <><rect x="4" y="3" width="16" height="19" rx="2" /><path d="M12 6v6M9 9h6M9 22v-6h6v6M2 22h20" /></>,
    telecom: <><circle cx="12" cy="8" r="2" /><path d="m12 10-5 12m5-12 5 12M9 17h6M6 4a8 8 0 0 0 0 8m12-8a8 8 0 0 1 0 8M3 1a12 12 0 0 0 0 14M21 1a12 12 0 0 1 0 14" /></>,
    manufacturing: <><path d="M3 21V10l6 4V8l6 4V4h4l2 17H3ZM7 17h1M11 17h1M16 17h1" /></>,
    software: <><rect x="3" y="3" width="18" height="14" rx="2" /><path d="M8 21h8M12 17v4M9 7l-3 3 3 3M15 7l3 3-3 3" /></>
  };
  return <span className="industry-line-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{shapes[type]}</svg></span>;
}
