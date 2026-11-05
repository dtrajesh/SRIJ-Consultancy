export default function CareerBenefitIcon({ type }) {
  const icons = {
    match: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><path d="m9 12 2 2 4-5" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V3h8v4M3 12h18M10 12v3h4v-3" /></>,
    location: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    feedback: <><path d="M21 15a3 3 0 0 1-3 3H9l-6 4V5a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3Z M7 8h10M7 12h7" /></>,
    support: <><circle cx="12" cy="7" r="4" /><path d="M4 21v-2a8 8 0 0 1 16 0v2M17 6l2 2 3-4" /></>,
    guidance: <><circle cx="12" cy="12" r="9" /><path d="m16 8-2 6-6 2 2-6Z" /></>
  };
  return <span className="career-benefit-line-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{icons[type]}</svg></span>;
}
