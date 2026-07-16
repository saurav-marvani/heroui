"use client";

import type {ReactNode} from "react";
import React, {useState} from "react";

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "checkbox" | "select" | "textarea";
  required?: boolean;
  placeholder?: string;
  options?: Array<{label: string; value: unknown}>;
  validation?: (value: unknown) => {valid: boolean; error?: string};
}

interface FormStep {
  title: string;
  description?: string;
  fields: FormField[];
}

interface FormWizardProps {
  steps: FormStep[];
  onComplete: (data: Record<string, unknown>) => void;
  onStepChange?: (stepIndex: number) => void;
  showProgress?: boolean;
  allowSkip?: boolean;
  className?: string;
}

export const FormWizard = React.forwardRef<HTMLDivElement, FormWizardProps>(
  ({steps, onComplete, onStepChange, showProgress = true, allowSkip = false, className = ""}, ref) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, unknown>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const step = steps[currentStep];

    const validateStep = (stepData: Record<string, unknown>): boolean => {
      const stepErrors: Record<string, string> = {};

      step.fields.forEach((field) => {
        const value = stepData[field.name];

        if (field.required && !value) {
          stepErrors[field.name] = `${field.label} is required`;
        }

        if (value && field.validation) {
          const result = field.validation(value);
          if (!result.valid && result.error) {
            stepErrors[field.name] = result.error;
          }
        }
      });

      setErrors(stepErrors);
      return Object.keys(stepErrors).length === 0;
    };

    const handleNext = () => {
      const stepData = step.fields.reduce(
        (acc, field) => ({...acc, [field.name]: formData[field.name] || ""}),
        {},
      );

      if (validateStep(stepData)) {
        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
          onStepChange?.(currentStep + 1);
        } else {
          onComplete(formData);
        }
      }
    };

    const handleBack = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        onStepChange?.(currentStep - 1);
      }
    };

    const handleFieldChange = (fieldName: string, value: unknown) => {
      setFormData((prev) => ({...prev, [fieldName]: value}));
      if (errors[fieldName]) {
        setErrors((prev) => {
          const newErrors = {...prev};
          delete newErrors[fieldName];
          return newErrors;
        });
      }
    };

    return (
      <div
        ref={ref}
        className={`w-full max-w-2xl mx-auto border border-divider rounded-lg bg-background ${className}`}
        data-component="form-wizard"
      >
        {/* Progress Bar */}
        {showProgress && (
          <div className="p-4 border-b border-divider">
            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    index <= currentStep ? "bg-primary" : "bg-divider"
                  }`}
                />
              ))}
            </div>
            <div className="mt-2 text-sm text-foreground-secondary">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{step.title}</h2>
            {step.description && <p className="text-foreground-secondary mt-1">{step.description}</p>}
          </div>

          <div className="space-y-4">
            {step.fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {field.label}
                  {field.required && <span className="text-error ml-1">*</span>}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    value={String(formData[field.name] || "")}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border border-divider rounded text-sm bg-background text-foreground placeholder-foreground-tertiary"
                    rows={4}
                  />
                ) : field.type === "select" ? (
                  <select
                    value={String(formData[field.name] || "")}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    className="w-full px-3 py-2 border border-divider rounded text-sm bg-background text-foreground"
                  >
                    <option value="">Select an option</option>
                    {field.options?.map((opt) => (
                      <option key={String(opt.value)} value={String(opt.value)}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "checkbox" ? (
                  <input
                    type="checkbox"
                    checked={Boolean(formData[field.name])}
                    onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={String(formData[field.name] || "")}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2 border border-divider rounded text-sm bg-background text-foreground placeholder-foreground-tertiary"
                  />
                )}

                {errors[field.name] && <p className="text-sm text-error mt-1">{errors[field.name]}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 border-t border-divider flex gap-2 justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="px-4 py-2 text-sm font-medium bg-surface text-foreground rounded hover:bg-surface-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>

          <div className="flex gap-2">
            {allowSkip && currentStep < steps.length - 1 && (
              <button
                type="button"
                onClick={() => {
                  setCurrentStep(currentStep + 1);
                  onStepChange?.(currentStep + 1);
                }}
                className="px-4 py-2 text-sm font-medium bg-surface text-foreground rounded hover:bg-surface-secondary transition-colors"
              >
                Skip
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
            >
              {currentStep === steps.length - 1 ? "Complete" : "Next"}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

FormWizard.displayName = "FormWizard";
