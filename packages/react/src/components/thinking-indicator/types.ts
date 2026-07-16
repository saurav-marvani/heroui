export interface ThinkingIndicatorProps {
  isThinking: boolean;
  message?: string;
  variant?: "dots" | "pulse" | "wave";
  size?: "small" | "medium" | "large";
  speed?: "slow" | "normal" | "fast";
  className?: string;
}
