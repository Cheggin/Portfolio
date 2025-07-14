import React from 'react';
import LiquidGlassButton from './LiquidGlassButton';

interface RecruiterButtonProps {
  onClick?: () => void;
  style?: React.CSSProperties;
}

const RecruiterButton: React.FC<RecruiterButtonProps> = ({ onClick, style }) => {
  return (
    <>
      <style>
        {`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0.3; }
          }
          
          .recruiter-button-container {
            position: relative;
            display: inline-block;
          }
          
          .recruiter-button {
            position: relative;
            background: linear-gradient(135deg, 
              rgba(0, 255, 136, 0.1) 0%, 
              rgba(0, 200, 255, 0.1) 50%, 
              rgba(138, 43, 226, 0.1) 100%
            ) !important;
            border: 2px solid rgba(0, 255, 136, 0.3) !important;
            box-shadow: 
              0 8px 32px rgba(0, 255, 136, 0.2),
              0 0 0 1px rgba(255, 255, 255, 0.08) inset,
              0 1px 0 rgba(255, 255, 255, 0.15) inset !important;
            font-weight: 600 !important;
            text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
            display: flex !important;
            align-items: center !important;
            justify-content: flex-start !important;
            gap: 12px !important;
            padding-left: 20px !important;
            padding-right: 32px !important;
          }
          
          .recruiter-button span {
            display: flex !important;
            align-items: center !important;
            gap: 12px !important;
            width: 100% !important;
          }
          
          .recruiter-button:hover {
            background: linear-gradient(135deg, 
              rgba(0, 255, 136, 0.15) 0%, 
              rgba(0, 200, 255, 0.15) 50%, 
              rgba(138, 43, 226, 0.15) 100%
            ) !important;
            border: 2px solid rgba(0, 255, 136, 0.5) !important;
            box-shadow: 
              0 12px 40px rgba(0, 255, 136, 0.3),
              0 0 0 1px rgba(255, 255, 255, 0.08) inset,
              0 1px 0 rgba(255, 255, 255, 0.15) inset !important;
            transform: translateY(-2px) scale(1.02) !important;
          }
          
          .blinking-dot {
            width: 8px;
            height: 8px;
            background: #00ff88;
            border-radius: 50%;
            animation: blink 2s ease-in-out infinite;
            box-shadow: 
              0 0 6px #00ff88,
              0 0 12px #00ff88;
            flex-shrink: 0;
            margin: 0 !important;
          }
        `}
      </style>
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
    </>
  );
};

export default RecruiterButton; 