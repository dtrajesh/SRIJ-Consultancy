import { useState } from "react";
import { Link } from "react-router-dom";

const tracks = {
  hiring: {
    label: "Hiring talent",
    steps: [
      { title: "Requirement Discovery", icon: "discover", summary: "Define the people and skills your team needs.", description: "We start with your hiring goals, technical requirements and working environment to agree on a clear candidate profile.", points: ["Discuss required skills, experience and role responsibilities.", "Confirm location, work model, engagement type and budget.", "Agree on the hiring process, stakeholders and target timeline."], outcome: "An agreed hiring brief to guide the search." },
      { title: "Curated Talent Delivery", icon: "people", summary: "Meet professionals matched to your requirements.", description: "Our recruiters source and screen candidates against your brief, so you can focus on reviewing relevant profiles.", points: ["Source professionals with relevant technical and industry experience.", "Screen skills, availability and interest in the role.", "Share shortlisted profiles with experience and availability details."], outcome: "A focused shortlist for your team to review." },
      { title: "Selection & Alignment", icon: "check", summary: "Choose the right fit for your team.", description: "We coordinate the selection process and help align candidate expectations with your project and team needs.", points: ["Schedule interviews and technical assessments with your team.", "Collect feedback and clarify role expectations.", "Coordinate offer discussions, joining dates and onboarding needs."], outcome: "A selected professional with clear joining expectations." },
      { title: "Execution & Scaling", icon: "growth", summary: "Onboard, stay aligned and adapt as you grow.", description: "We support the transition into your team and stay connected as your resource requirements evolve.", points: ["Coordinate onboarding and engagement administration.", "Check in on alignment and address staffing concerns.", "Discuss additional skills or resources as priorities change."], outcome: "Ongoing staffing support aligned with your needs." }
    ]
  },
  project: {
    label: "Building a project",
    steps: [
      { title: "Discover & Scope", icon: "discover", summary: "Turn your goals into a clear project brief.", description: "We explore the problem, users and existing systems so everyone understands what the project needs to achieve.", points: ["Discuss business goals, user needs and technical constraints.", "Review integrations, existing systems and key dependencies.", "Agree on scope, deliverables and acceptance criteria."], outcome: "A shared understanding of what to build and why." },
      { title: "Plan & Estimate", icon: "plan", summary: "Agree on the route from idea to delivery.", description: "We turn the agreed scope into a delivery plan with clear responsibilities, milestones and estimates.", points: ["Define the architecture and proposed technical approach.", "Plan milestones, team responsibilities and review checkpoints.", "Agree on estimates, costs, risks and how changes will be handled."], outcome: "An agreed delivery plan before development begins." },
      { title: "Build & Test", icon: "code", summary: "Develop, validate and review progress together.", description: "Our delivery team builds the solution in reviewable stages, with quality checks throughout development.", points: ["Develop features and integrate the agreed systems.", "Test functionality and quality against acceptance criteria.", "Review progress with you and resolve feedback."], outcome: "A tested solution ready for release approval." },
      { title: "Deliver & Support", icon: "delivery", summary: "Release with a clear handover and support plan.", description: "We coordinate deployment and handover, then provide maintenance and support within the agreed engagement.", points: ["Prepare the release and coordinate deployment.", "Hand over documentation and relevant knowledge.", "Provide agreed support and discuss future enhancements."], outcome: "A deployed solution with a clear path for ongoing support." }
    ]
  }
};

function ProcessIcon({ type }) {
  const shapes = {
    discover: <><rect x="4" y="3" width="12" height="17" rx="2" /><path d="M7 7h6M7 11h4m8 8 3 3" /><circle cx="16" cy="16" r="4" /></>,
    people: <><circle cx="9" cy="7" r="3" /><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-17a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 4v3" /></>,
    check: <><path d="m12 2 8 4v6c0 5-8 10-8 10S4 17 4 12V6l8-4Z" /><path d="m8 12 3 3 5-6" /></>,
    growth: <><path d="M3 3v18h18M7 15l5-5 4 3 5-8m-5 0h5v5" /></>,
    plan: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 2v6m10-6v6M3 11h18M7 15h3m4 0h3m-10 3h3" /></>,
    code: <><rect x="2" y="3" width="20" height="18" rx="2" /><path d="M2 8h20m-14 4-3 3 3 3m8-6 3 3-3 3m-3-7-2 8" /></>,
    delivery: <><path d="m12 2 9 5v10l-9 5-9-5V7l9-5ZM3 7l9 5 9-5m-9 5v10M7 5l10 5" /><path d="m7 15 2 2 3-3" /></>
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[type]}</svg>;
}

export default function ProcessGraph() {
  const [track, setTrack] = useState("hiring");
  const [stepIndex, setStepIndex] = useState(0);
  const { steps } = tracks[track];
  const selected = steps[stepIndex];
  function changeTrack(next) { setTrack(next); setStepIndex(0); }
  function handleTrackKey(event) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? "hiring" : event.key === "End" ? "project" : track === "hiring" ? "project" : "hiring";
    changeTrack(next);
    document.getElementById(`process-tab-${next}`)?.focus();
  }
  return (
    <div className="process-graph">
      <div className="process-tabs" role="tablist" aria-label="Choose a process" onKeyDown={handleTrackKey}>
        {Object.entries(tracks).map(([key, value]) => <button key={key} id={`process-tab-${key}`} type="button" role="tab" aria-selected={track === key} aria-controls={`process-panel-${key}`} tabIndex={track === key ? 0 : -1} onClick={() => changeTrack(key)}>{value.label}</button>)}
      </div>
      <p className="process-graph-hint">Select a step to explore how we work with you.</p>
      {Object.keys(tracks).map(key => <div key={key} role="tabpanel" id={`process-panel-${key}`} aria-labelledby={`process-tab-${key}`} hidden={track !== key}>
        {track === key && <>
          <ol className="process-graph-nodes" aria-label={`${tracks[track].label} steps`}>
            {steps.map((step, index) => <li key={step.title} className={index === stepIndex ? "is-selected" : ""}>
              <button type="button" className="process-graph-node" aria-pressed={index === stepIndex} aria-controls={`process-detail-${track}`} onClick={() => setStepIndex(index)}>
                <span className="process-node-icon"><ProcessIcon type={step.icon} /><span className="process-node-number">{index + 1}</span></span>
                <span className="process-node-title">{step.title}</span><span className="process-node-summary">{step.summary}</span>
              </button>
            </li>)}
          </ol>
          <div className="process-detail" id={`process-detail-${track}`} role="region" aria-label="Selected step details">
            <div className="process-detail-intro" aria-live="polite" aria-atomic="true"><span className="process-detail-label">{tracks[track].label} / Step {stepIndex + 1} of {steps.length}</span><h3>{selected.title}</h3><p>{selected.description}</p><Link to="/get-started">{track === "hiring" ? "Discuss Your Hiring Needs" : "Discuss Your Project"} →</Link></div>
            <div className="process-detail-actions"><h4>What happens at this step</h4><ul>{selected.points.map(point => <li key={point}>{point}</li>)}</ul><p className="process-detail-outcome"><strong>Outcome:</strong> {selected.outcome}</p></div>
          </div>
        </>}
      </div>)}
    </div>
  );
}
