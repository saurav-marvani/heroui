export interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  theme?: "light" | "dark";
  height?: string;
  readOnly?: boolean;
  showLineNumbers?: boolean;
  className?: string;
}
