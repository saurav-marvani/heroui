export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  timestamp: Date;
}

export interface AIChatProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  isThinking?: boolean;
  placeholder?: string;
  maxHeight?: string;
  showStats?: boolean;
  onMessageEdit?: (id: string, content: string) => void;
  onMessageDelete?: (id: string) => void;
  className?: string;
}
