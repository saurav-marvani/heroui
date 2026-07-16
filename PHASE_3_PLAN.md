# Phase 3: Editors & Input Components - Implementation Plan

**Status:** In Progress  
**Target Completion:** 3-4 hours  
**Components:** 4

---

## Components to Implement

### 1. RichTextEditor (0.15-0.20kb estimated)
**Purpose:** WYSIWYG markdown/HTML editor

**Features:**
- Markdown syntax support
- Toolbar with formatting buttons (bold, italic, underline, etc.)
- Link and image insertion
- Code block support
- Real-time markdown preview
- HTML export

**Dependencies:**
- react-markdown (lightweight rendering)
- remark + remark-gfm (parsing)

**Props:**
```typescript
interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showPreview?: boolean;
  readOnly?: boolean;
  height?: string;
}
```

---

### 2. CodeEditor (0.08-0.12kb estimated)
**Purpose:** Syntax-highlighted code input with language support

**Features:**
- Multiple language syntax highlighting
- Line numbers
- Code folding (optional)
- Copy-to-clipboard
- Theme support (light/dark)
- Language selection dropdown

**Dependencies:**
- @monaco-editor/react OR highlight.js

**Props:**
```typescript
interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  theme?: "light" | "dark";
  height?: string;
  readOnly?: boolean;
}
```

---

### 3. QueryBuilder (0.10-0.15kb estimated)
**Purpose:** SQL/GraphQL query builder with visual editor

**Features:**
- Visual query construction
- Filter conditions (AND/OR logic)
- Field selection
- Sort configuration
- Limit/offset controls
- Raw query preview
- Export as SQL or JSON

**Dependencies:**
- Custom implementation (no external deps)

**Props:**
```typescript
interface QueryBuilderProps {
  fields: QueryField[];
  initialQuery?: Query;
  onQueryChange: (query: Query) => void;
  mode?: "sql" | "graphql" | "json";
  readOnly?: boolean;
}
```

---

### 4. FormWizard (0.12-0.18kb estimated)
**Purpose:** Multi-step form handler with validation

**Features:**
- Step navigation (back/next/finish)
- Form validation per step
- Progress indicator
- Step titles and descriptions
- Conditional step visibility
- Summary review before submission

**Dependencies:**
- No external deps (native validation)

**Props:**
```typescript
interface FormWizardProps {
  steps: FormStep[];
  onComplete: (data: Record<string, unknown>) => void;
  onStepChange?: (stepIndex: number) => void;
  showProgress?: boolean;
  allowSkip?: boolean;
}
```

---

## Implementation Order

1. **RichTextEditor** - Start with simpler implementation
2. **CodeEditor** - Add syntax highlighting
3. **QueryBuilder** - More complex state management
4. **FormWizard** - Complex multi-step logic

---

## Libraries to Install

```bash
pnpm add react-markdown remark remark-gfm highlight.js
```

---

## File Structure

```
packages/react/src/components/
├── rich-text-editor/
│   ├── rich-text-editor.tsx
│   ├── types.ts
│   └── index.ts
├── code-editor/
│   ├── code-editor.tsx
│   ├── types.ts
│   └── index.ts
├── query-builder/
│   ├── query-builder.tsx
│   ├── types.ts
│   └── index.ts
└── form-wizard/
    ├── form-wizard.tsx
    ├── types.ts
    └── index.ts
```

---

## Success Criteria

- All 4 components compile without errors
- TypeScript strict mode compliance
- Zero external dependencies (except React + optional markdown libs)
- Bundle size < 0.65kb total (gzipped)
- All components fully typed
- Proper index exports
- Integration with existing components
- Git commit with detailed message
