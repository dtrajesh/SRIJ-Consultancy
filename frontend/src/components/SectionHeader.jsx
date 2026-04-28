export default function SectionHeader({ eyebrow, title, titleAccent, text, className = "" }) {
  return (
    <div className={`section-header ${className}`.trim()}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>
        {titleAccent ? (
          <>
            <span className="section-title-main">{title}</span>
            <span className="section-title-accent">{titleAccent}</span>
          </>
        ) : (
          title
        )}
      </h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}
