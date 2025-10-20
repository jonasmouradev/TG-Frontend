import { useState } from 'react';
import { VacancyFormData, Stage } from '../types';

interface CreateVacancyData extends VacancyFormData {
  department?: string;
  contractType?: string;
  location?: string;
  workMode?: string;
  benefits?: string[];
  salaryRange?: { min: number; max: number };
  stages?: Stage[];
}

interface VacancyResult {
  id: string;
  status: 'draft' | 'published';
  [key: string]: unknown;
}

// Vacancy form services using the existing API structure but prepared for use case integration
const vacancyFormServices = {
  async createVacancy(data: CreateVacancyData): Promise<VacancyResult> {
    // TODO: Replace with CreateVacancyUseCase
    console.log('Creating vacancy with data:', data);
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ id: Date.now().toString(), ...data, status: 'draft' });
      }, 1000);
    });
  },

  async publishVacancy(vacancyId: string): Promise<VacancyResult> {
    // TODO: Replace with PublishVacancyUseCase
    console.log('Publishing vacancy:', vacancyId);
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ id: vacancyId, status: 'published' });
      }, 1000);
    });
  },

  async saveDraft(data: CreateVacancyData): Promise<VacancyResult> {
    // TODO: Replace with SaveVacancyDraftUseCase (if needed)
    console.log('Saving draft:', data);
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ id: Date.now().toString(), ...data, status: 'draft' });
      }, 1000);
    });
  },
};

export const useVacancyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Basic vacancy form data
  const [formData, setFormData] = useState<
    VacancyFormData & {
      department?: string;
      contractType?: string;
      location?: string;
      workMode?: string;
      benefits?: string[];
      salaryRange?: { min: number; max: number };
    }
  >({
    title: '',
    description: '',
    requirements: [],
    questions: [],
    department: '',
    contractType: '',
    location: '',
    workMode: '',
    benefits: [],
    salaryRange: { min: 0, max: 0 },
  });

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const createVacancy = async (stages: Stage[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const vacancyData: CreateVacancyData = {
        ...formData,
        stages,
      };

      const result = await vacancyFormServices.createVacancy(vacancyData);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar vaga';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const publishVacancy = async (vacancyId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await vacancyFormServices.publishVacancy(vacancyId);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao publicar vaga';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const saveDraft = async (stages: Stage[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const draftData: CreateVacancyData = {
        ...formData,
        stages,
      };

      const result = await vacancyFormServices.saveDraft(draftData);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao salvar rascunho';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createAndPublish = async (stages: Stage[]) => {
    // First create the vacancy as draft
    const createdVacancy = await createVacancy(stages);

    // Then publish it
    const publishedVacancy = await publishVacancy(createdVacancy.id);

    return publishedVacancy;
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      requirements: [],
      questions: [],
      department: '',
      contractType: '',
      location: '',
      workMode: '',
      benefits: [],
      salaryRange: { min: 0, max: 0 },
    });
    setError(null);
  };

  return {
    formData,
    updateFormData,
    isLoading,
    error,
    createVacancy,
    publishVacancy,
    saveDraft,
    createAndPublish,
    resetForm,
  };
};
