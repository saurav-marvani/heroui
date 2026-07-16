export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "checkbox" | "select" | "textarea";
  required?: boolean;
  placeholder?: string;
  options?: Array<{label: string; value: unknown}>;
  validation?: (value: unknown) => {valid: boolean; error?: string};
}

export interface FormStep {
  title: string;
  description?: string;
  fields: FormField[];
}

export interface FormWizardProps {
  steps: FormStep[];
  onComplete: (data: Record<string, unknown>) => void;
  onStepChange?: (stepIndex: number) => void;
  showProgress?: boolean;
  allowSkip?: boolean;
  className?: string;
}
