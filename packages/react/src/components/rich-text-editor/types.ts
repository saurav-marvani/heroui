export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showPreview?: boolean;
  readOnly?: boolean;
  height?: string;
  className?: string;
}
