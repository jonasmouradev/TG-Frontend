import { useState } from 'react';
import { VacancyFormData } from '../types';
import { container } from '@core/infra/container';
import { CreateVacancyUseCaseInput, CreateVacancyUseCaseOutput, PublishVacancyUseCaseOutput } from '@core/application';
import { DateTime } from 'luxon';
import { Currency } from '../types/vacancy';
import { ContractType, ExperienceLevel, VacancyType, WorkModeType } from '@core/domain';

const vacancyFormServices = {
  async createVacancy(data: CreateVacancyUseCaseInput): Promise<CreateVacancyUseCaseOutput> {
    const createVacancyUseCase = container.createVacancyUseCase();
    return createVacancyUseCase.execute(data);
  },

  async publishVacancy(id: string): Promise<PublishVacancyUseCaseOutput> {
    const publishVacancyUseCase = container.publishVacancyUseCase();
    return publishVacancyUseCase.execute({ id });
  },
};

export const useVacancyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<VacancyFormData>({
    title: '',
    description: '',
    department: '',
    location: '',
    workMode: WorkModeType.REMOTE,
    questions: [],
    contract: ContractType.CLT,
    requirements: [],
    remote: false,
    publicationDate: DateTime.now(),
    currency: Currency.R$,
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
        contract: formData.contract || ContractType.CLT,
        workMode: formData.workMode || WorkModeType.REMOTE,
        type: formData.type || VacancyType.FULL_TIME,
        level: formData.level || ExperienceLevel.JUNIOR,
        remote: formData.workMode === WorkModeType.REMOTE,
        salaryMax: formData.salaryRange?.max,
        salaryMin: formData.salaryRange?.min,
        publicationDate: formData.publicationDate,
        expirationDate: formData.expirationDate,
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
      location: '',
      contract: ContractType.CLT,
      benefits: [],
      publicationDate: DateTime.now(),
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
