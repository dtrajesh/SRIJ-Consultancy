export default function SectionHeader({ eyebrow, title, titleAccent, text, className = "", as: Heading = "h2" }) {
  return (
    <div className={`section-header ${className}`.trim()}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <Heading>
        {titleAccent ? (
          <>
            <span className="section-title-main">{title}</span>{" "}
            <span className="section-title-accent">{titleAccent}</span>
          </>
        ) : (
          title
        )}
      </Heading>
      {text ? <p>{text}</p> : null}
    </div>
  );
}
