"use client";

import React from "react";

interface ThinkingIndicatorProps {
  isThinking: boolean;
  message?: string;
  variant?: "dots" | "pulse" | "wave";
  size?: "small" | "medium" | "large";
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

const sizeMap = {
  small: "w-1 h-1",
  medium: "w-2 h-2",
  large: "w-3 h-3",
};

const speedMap = {
  slow: "1.5s",
  normal: "1s",
  fast: "0.6s",
};

export const ThinkingIndicator = React.forwardRef<HTMLDivElement, ThinkingIndicatorProps>(
  ({isThinking = false, message = "Thinking", variant = "dots", size = "medium", speed = "normal", className = ""}, ref) => {
    if (!isThinking) return null;

    const dotSize = sizeMap[size];
    const animationSpeed = speedMap[speed];

    const dotStyle = {
      animation:
        variant === "dots" ? `bounce ${animationSpeed} infinite` : variant === "pulse" ? `pulse ${animationSpeed} infinite` : `wave ${animationSpeed} infinite`,
    };

    return (
      <div ref={ref} className={`flex items-center gap-1 ${className}`} data-component="thinking-indicator">
        <style>{`
          @keyframes bounce {
            0%, 100% { opacity: 0.6; transform: translateY(0); }
            50% { opacity: 1; transform: translateY(-8px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          @keyframes wave {
            0%, 100% { transform: scaleY(0.5); opacity: 0.6; }
            50% { transform: scaleY(1); opacity: 1; }
          }
        `}</style>

        {variant === "dots" ? (
          <>
            <div className={`${dotSize} bg-primary rounded-full`} style={{...dotStyle, animationDelay: "0s"}} />
            <div className={`${dotSize} bg-primary rounded-full`} style={{...dotStyle, animationDelay: "0.2s"}} />
            <div className={`${dotSize} bg-primary rounded-full`} style={{...dotStyle, animationDelay: "0.4s"}} />
          </>
        ) : variant === "pulse" ? (
          <div className={`${dotSize} bg-primary rounded-full`} style={dotStyle} />
        ) : (
          <>
            <div className={`${dotSize} bg-primary rounded-full`} style={{...dotStyle, animationDelay: "0s"}} />
            <div className={`${dotSize} bg-primary rounded-full`} style={{...dotStyle, animationDelay: "0.1s"}} />
            <div className={`${dotSize} bg-primary rounded-full`} style={{...dotStyle, animationDelay: "0.2s"}} />
          </>
        )}

        {message && <span className="text-sm text-foreground-secondary">{message}</span>}
      </div>
    );
  },
);

ThinkingIndicator.displayName = "ThinkingIndicator";
