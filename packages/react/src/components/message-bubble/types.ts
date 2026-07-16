export interface MessageBubbleProps {
  content: string;
  role: "user" | "assistant" | "system";
  timestamp?: Date;
  onEdit?: (content: string) => void;
  onDelete?: () => void;
  avatar?: string;
  className?: string;
}
