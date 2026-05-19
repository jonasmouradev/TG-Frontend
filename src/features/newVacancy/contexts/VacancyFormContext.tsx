import { createContext, useContext, ReactNode } from 'react';
import { useVacancyForm } from '../hooks/useVacancyForm';

type VacancyFormContextType = ReturnType<typeof useVacancyForm>;

const VacancyFormContext = createContext<VacancyFormContextType | null>(null);

export const VacancyFormProvider = ({ children }: { children: ReactNode }) => {
  const form = useVacancyForm();

  return <VacancyFormContext.Provider value={form}>{children}</VacancyFormContext.Provider>;
};

export const useVacancyFormContext = () => {
  const context = useContext(VacancyFormContext);
  if (!context) {
    throw new Error('useVacancyFormContext must be used within VacancyFormProvider');
  }
  return context;
};
