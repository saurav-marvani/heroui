# Phase 4: AI Components - Implementation Plan

**Status:** In Progress  
**Target Completion:** 3-4 hours  
**Components:** 5

---

## Components to Implement

### 1. AIChat (0.12-0.18kb estimated)
**Purpose:** Full-featured chat interface for AI conversations

**Features:**
- Message list with auto-scroll to latest
- Input field with send button
- Loading indicator for AI responses
- Thinking/typing state
- Message editing capability
- Copy message to clipboard
- Clear conversation button
- Token count display
- System message support

**Props:**
```typescript
interface AIChatProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  isThinking?: boolean;
  placeholder?: string;
  maxHeight?: string;
  showTokenCount?: boolean;
}
```

---

### 2. Conversation (0.08-0.12kb estimated)
**Purpose:** Conversation thread visualization

**Features:**
- Conversation list with metadata
- Search/filter conversations
- Conversation selection
- Timestamp display
- Preview of last message
- Delete conversation
- Archive/pin options
- Conversation count badge

**Props:**
```typescript
interface ConversationProps {
  conversations: ConversationItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onDelete?: (id: string) => void;
  searchable?: boolean;
}
```

---

### 3. MessageBubble (0.06-0.10kb estimated)
**Purpose:** Individual chat message component

**Features:**
- User/Assistant message differentiation
- Markdown rendering for rich content
- Code block syntax highlighting
- Copy button for code
- Timestamp
- Avatar support
- Edit/delete actions
- Reaction emojis
- Link preview

**Props:**
```typescript
interface MessageBubbleProps {
  content: string;
  role: "user" | "assistant" | "system";
  timestamp?: Date;
  onEdit?: (content: string) => void;
  onDelete?: () => void;
  avatar?: string;
  actions?: MessageAction[];
}
```

---

### 4. StreamingText (0.08-0.12kb estimated)
**Purpose:** Real-time text streaming display

**Features:**
- Character-by-character streaming animation
- Configurable stream speed
- Stop/pause controls
- Progress indicator
- Copy streamed text
- Word count
- Reading time estimate
- HTML/Markdown support

**Props:**
```typescript
interface StreamingTextProps {
  text: string;
  isStreaming: boolean;
  speed?: number;
  onStreamComplete?: () => void;
  onStop?: () => void;
}
```

---

### 5. ThinkingIndicator (0.04-0.08kb estimated)
**Purpose:** Visual AI thinking state indicator

**Features:**
- Animated thinking dots
- Configurable animation speed
- Custom thinking messages
- Multiple style variants
- Pulse animation
- Size variants (small, medium, large)
- Color customization

**Props:**
```typescript
interface ThinkingIndicatorProps {
  isThinking: boolean;
  message?: string;
  variant?: "dots" | "pulse" | "wave";
  size?: "small" | "medium" | "large";
  speed?: "slow" | "normal" | "fast";
}
```

---

## Implementation Order

1. **ThinkingIndicator** - Start with simplest component (animations)
2. **MessageBubble** - Build single message display
3. **StreamingText** - Add text streaming capability
4. **Conversation** - List management
5. **AIChat** - Full chat interface (uses other components)

---

## Dependencies Status

No new dependencies needed - will use existing:
- React hooks for state management
- React Markdown (already installed)
- Native HTML5 for animations

---

## File Structure

```
packages/react/src/components/
├── ai-chat/
│   ├── ai-chat.tsx
│   ├── types.ts
│   └── index.ts
├── conversation/
│   ├── conversation.tsx
│   ├── types.ts
│   └── index.ts
├── message-bubble/
│   ├── message-bubble.tsx
│   ├── types.ts
│   └── index.ts
├── streaming-text/
│   ├── streaming-text.tsx
│   ├── types.ts
│   └── index.ts
└── thinking-indicator/
    ├── thinking-indicator.tsx
    ├── types.ts
    └── index.ts
```

---

## Success Criteria

- All 5 AI components compile without errors
- TypeScript strict mode compliance
- Zero new external dependencies
- Bundle size < 0.65kb total (gzipped)
- Seamless integration with Phase 1-3 components
- Proper animation performance
- All components fully typed
- Git commit with detailed message
