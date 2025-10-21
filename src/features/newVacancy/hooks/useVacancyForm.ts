import { useState } from 'react';
import { VacancyFormData } from '../types';
import { container } from '@core/infra/container';
import { CreateVacancyUseCaseInput, CreateVacancyUseCaseOutput, PublishVacancyUseCaseOutput } from '@core/application';

const vacancyFormServices = {
  async createVacancy(data: CreateVacancyUseCaseInput): Promise<CreateVacancyUseCaseOutput> {
    const createVacancyUseCase = container.createCreateVacancyUseCase();
    return createVacancyUseCase.execute(data);
  },

  async publishVacancy(vacancyId: string): Promise<PublishVacancyUseCaseOutput> {
    const publishVacancyUseCase = container.createPublishVacancyUseCase();
    return publishVacancyUseCase.execute({ id: vacancyId });
  },
};

export const useVacancyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<
    VacancyFormData & {
      department?: string;
      contractType?: string;
      location: string;
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

  const createVacancy = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const vacancyData: CreateVacancyUseCaseInput = {
        ...formData,
        companyId: 'company-123',
        requirements: formData.requirements || [],
        responsibilities: [],
        type: formData.contractType || 'full-time',
        level: 'mid',
        remote: formData.workMode === 'remote',
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
    resetForm,
  };
};
