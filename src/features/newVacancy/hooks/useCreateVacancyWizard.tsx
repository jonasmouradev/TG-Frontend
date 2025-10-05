// src/features/createJob/hooks/useCreateJobWizard.tsx
import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { FullJobType } from '../schemas/vacancySchemas';

interface CreateJobContextProps {
  step: number;
  data: Partial<FullJobType>;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (fields: Partial<FullJobType>) => void;
  reset: () => void;
}

const CreateJobContext = createContext<CreateJobContextProps | null>(null);

export function CreateJobProvider({ children }: { readonly children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<FullJobType>>({});

  function updateData(fields: Partial<FullJobType>) {
    setData(prev => ({ ...prev, ...fields }));
  }

  const contextValue = useMemo<CreateJobContextProps>(
    () => ({
      step,
      data,
      nextStep: () => setStep(s => s + 1),
      prevStep: () => setStep(s => Math.max(1, s - 1)),
      updateData,
      reset: () => {
        setStep(1);
        setData({});
      },
    }),
    [step, data],
  );

  return <CreateJobContext.Provider value={contextValue}>{children}</CreateJobContext.Provider>;
}

export function useCreateJobWizard() {
  const ctx = useContext(CreateJobContext);
  if (!ctx) throw new Error('useCreateJobWizard must be used within provider');
  return ctx;
}
