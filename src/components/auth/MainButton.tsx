// import React from 'react';
// import './auth.css';

// interface FormButtonProps {
//   text: string;
//   onClick: () => void;
//   disabled?: boolean;
// }

// const MainButton: React.FC<FormButtonProps> = ({ text, onClick, disabled = false }) => {
//   return (
//     <button className={`animated-button ${disabled ? 'disabled' : ''}`} onClick={onClick} disabled={disabled}>
//       {text}
//     </button>
//   );
// };

// export default MainButton;


import React from "react";
import './auth.css';

const FormButton = ({
  text,
  onClick,
  disabled = false,
}: {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`animated-button ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default FormButton;
