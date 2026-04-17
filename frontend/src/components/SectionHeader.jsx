export default function SectionHeader({ eyebrow, title, text, className = "" }) {
  return (
    <div className={`section-header ${className}`.trim()}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}
