'use client';

import type { ReactNode } from 'react';
import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils';

interface WizardStep {
  id: string;
  title: string;
  description?: string;
  content: ReactNode;
  isOptional?: boolean;
}

interface FormWizardProps {
  steps: WizardStep[];
  onComplete: () => void;
  onStepChange?: (stepId: string) => void;
  className?: string;
  variant?: 'linear' | 'nonlinear';
  showProgress?: boolean;
}

/**
 * FormWizard - Multi-step form wizard component
 * Supports linear and non-linear navigation between steps
 */
const FormWizard = forwardRef<HTMLDivElement, FormWizardProps>(
  ({
    steps,
    onComplete,
    onStepChange,
    className,
    variant = 'linear',
    showProgress = true,
  }, ref) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

    const handleNext = () => {
      const newCompleted = new Set(completedSteps);
      newCompleted.add(currentStep);
      setCompletedSteps(newCompleted);

      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        onStepChange?.(steps[currentStep + 1].id);
      } else {
        onComplete();
      }
    };

    const handlePrevious = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        onStepChange?.(steps[currentStep - 1].id);
      }
    };

    const goToStep = (index: number) => {
      if (variant === 'nonlinear' || completedSteps.has(currentStep)) {
        setCurrentStep(index);
        onStepChange?.(steps[index].id);
      }
    };

    const step = steps[currentStep];

    return (
      <div
        ref={ref}
        className={cn('flex flex-col h-full', className)}
        data-slot="form-wizard"
      >
        {/* Progress Indicator */}
        {showProgress && (
          <div className="border-b border-divider">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex-1">
                <div className="flex gap-2">
                  {steps.map((s, index) => (
                    <button
                      key={s.id}
                      onClick={() => goToStep(index)}
                      disabled={
                        variant === 'linear' &&
                        !completedSteps.has(currentStep) &&
                        index !== currentStep
                      }
                      className={cn(
                        'flex-1 flex flex-col items-center gap-1 pb-2 transition-all',
                        index === currentStep &&
                          'border-b-2 border-primary text-primary',
                        completedSteps.has(index) && 'text-success',
                        index < currentStep &&
                          'text-muted-foreground opacity-50'
                      )}
                    >
                      <div className="text-xs font-semibold">{s.title}</div>
                      {s.description && (
                        <div className="text-xs text-muted-foreground">
                          {s.description}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className="ml-4 text-sm text-muted-foreground">
                {currentStep + 1} / {steps.length}
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div key={step.id}>{step.content}</div>
        </div>

        {/* Actions */}
        <div className="border-t border-divider px-6 py-4 flex gap-3 justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-4 py-2 border border-divider rounded-lg hover:bg-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {step.isOptional && currentStep < steps.length - 1 && (
              <button
                onClick={handleNext}
                className="px-4 py-2 text-muted-foreground border border-divider rounded-lg hover:bg-hover transition-colors"
              >
                Skip
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

FormWizard.displayName = 'FormWizard';

export { FormWizard, type FormWizardProps, type WizardStep };
