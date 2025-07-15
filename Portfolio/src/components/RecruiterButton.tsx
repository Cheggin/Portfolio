import React from 'react';
import LiquidGlassButton from './LiquidGlassButton';

interface RecruiterButtonProps {
  onClick?: () => void;
  style?: React.CSSProperties;
}

const RecruiterButton: React.FC<RecruiterButtonProps> = ({ onClick, style }) => {
  return (
    <div className="recruiter-button-container" style={style}>
      <LiquidGlassButton
        size="large"
        variant="primary"
        onClick={onClick}
        className="recruiter-button"
      >
        <div className="blinking-dot"></div>
        Recruiters, Click Here!
      </LiquidGlassButton>
    </div>
  );
};

export default RecruiterButton; 