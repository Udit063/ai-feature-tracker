export type MessageRole = "user" | "assistant";

export interface ChatProps {
  variant?: "empty" | "chat";
  messages?: ChatMessage[];
  onSend?: (value: string) => void;
  className?: string;
}

export interface ChatHeaderProps {
  title?: string;
  subtitle?: string;
  showMenu?: boolean;
  bordered?: boolean;
}

export interface MessageListProps {
  messages: ChatMessage[];
}

export interface MessageProps {
  message: ChatMessage;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp?: string;
}

export interface ChatInputProps {
  placeholder?: string;
  onSend?: (value: string) => void;
  bordered?: boolean;
  className?: string;
}

export interface featureProposal{
  title: string;
  description: string;
}

export interface ChatResponse {
  message: string;
  proposal: featureProposal;
}
