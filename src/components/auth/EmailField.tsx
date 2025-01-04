import React, { useState } from 'react';
import './auth.css';

interface EmailFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

const EmailField: React.FC<EmailFieldProps> = ({ value, onChange, error, disabled = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`auth-container ${disabled ? 'disabled' : ''}`}>
      <label className={`floating-label ${isFocused || value ? 'floating' : ''}`}></label>
      <input
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`input-field ${error ? 'error' : ''}`}
        placeholder="Enter email"
        disabled={disabled}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default EmailField;
