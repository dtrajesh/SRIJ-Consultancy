export default function ContactIcon({ type }) {
  const shapes = {
    hours: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l4 2" /></>,
    chat: <><path d="M21 11.5a9 9 0 0 1-13.5 7.8L3 21l1.7-4.5A9 9 0 1 1 21 11.5Z" /><path d="M8 9h8M8 13h5" /></>,
    email: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></>,
    phone: <path d="m7 3 3 5-2.5 2a14 14 0 0 0 6.5 6.5L16 14l5 3v2a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2Z" />,
    location: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>
  };
  return <span className="contact-detail-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{shapes[type]}</svg>
  </span>;
}
