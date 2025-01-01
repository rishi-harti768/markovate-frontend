import React, { useState, useEffect } from 'react';
import './auth.css';

interface PasswordStrengthFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  onCriteriaChange: (criteriaMet: boolean) => void;
}

const PasswordStrengthField: React.FC<PasswordStrengthFieldProps> = ({
  value,
  onChange,
  error,
  disabled = false,
  onCriteriaChange
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const criteria = [
    { id: 'minLength', regex: /.{8,}/, label: 'At least 8 characters' },
    { id: 'uppercase', regex: /[A-Z]/, label: 'Uppercase letter' },
    { id: 'lowercase', regex: /[a-z]/, label: 'Lowercase letter' },
    { id: 'number', regex: /\d/, label: 'Number' },
    { id: 'special', regex: /[!@#$%^&*(),.?":{}|<>]/, label: 'Special character' },
  ];

  const checkCriteria = (regex: RegExp) => regex.test(value);

  useEffect(() => {
    const allCriteriaMet = criteria.every(({ regex }) => checkCriteria(regex));
    onCriteriaChange(allCriteriaMet);
  }, [value]);

  return (
    <div className={`auth-container ${disabled ? 'disabled' : ''}`}>
      <label className={`floating-label ${isFocused || value ? 'floating' : ''}`}></label>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`input-field ${error ? 'error' : ''}`}
        placeholder="Enter password"
        disabled={disabled}
      />
      {error && <span className="error-message">{error}</span>}
      <div className="password-criteria">
        {criteria.map(({ id, label, regex }) => (
          <div key={id} className="criteria-item">
            <input type="checkbox" checked={checkCriteria(regex)} readOnly />
            <label>{label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthField;
