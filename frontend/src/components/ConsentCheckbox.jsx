import { useId, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const ENQUIRY_CONSENT_TEXT = "I agree to Trinexora contacting me about this enquiry and using my details as described in the Privacy Policy.";
export const CANDIDATE_CONSENT_TEXT = "I agree that Trinexora may keep my resume and contact me about suitable roles. I understand my profile is shared with a client only after I agree. See the Privacy Policy.";
export const CONSENT_ERROR = "Please tick this box to continue.";

export function useConsent(labelText) {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  function validateConsent(formElement) {
    if (!checked) {
      setError(CONSENT_ERROR);
      inputRef.current?.focus();
      return false;
    }
    // Keep each form's existing browser field validation after the consent check.
    return formElement.reportValidity();
  }

  function resetConsent() {
    setChecked(false);
    setError("");
  }

  function getConsentData() {
    return { consent: true, consentText: labelText, consentAt: new Date().toISOString() };
  }

  return {
    consentProps: {
      labelText,
      error,
      checked,
      inputRef,
      onChange: (event) => {
        setChecked(event.target.checked);
        setError("");
      }
    },
    validateConsent,
    resetConsent,
    getConsentData
  };
}

export default function ConsentCheckbox({ labelText, error = "", checked, onChange, inputRef }) {
  const id = useId();
  const errorId = `${id}-error`;
  const [before, after = ""] = labelText.split("Privacy Policy");

  return (
    <div className="consent-field">
      <label className="consent-checkbox" htmlFor={id}>
        <input
          id={id}
          ref={inputRef}
          type="checkbox"
          name="consent"
          checked={checked}
          onChange={onChange}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
        <span>{before}<Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>{after}</span>
      </label>
      {error && <p id={errorId} className="form-status error consent-error" role="alert">{error}</p>}
    </div>
  );
}
