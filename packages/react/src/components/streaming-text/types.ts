export interface StreamingTextProps {
  text: string;
  isStreaming: boolean;
  speed?: number;
  onStreamComplete?: () => void;
  className?: string;
}
