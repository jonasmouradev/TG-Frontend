import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { vacancyFormSchema, VacancyFormSchema } from '../schemas';
import { CreateVacancyInput } from '@core/application/use-cases';
import { DateTime } from 'luxon';
import { Currency } from '../types/vacancy';
import { ContractType, ExperienceLevel, VacancyType, WorkModeType } from '@core/domain';
import { useCompanyCases, useVacancyCases } from '@shared/hooks';

export const useVacancyForm = () => {
  const companyCases = useCompanyCases();
  const vacancyCases = useVacancyCases();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<VacancyFormSchema>({
    resolver: zodResolver(vacancyFormSchema),
    defaultValues: {
      title: '',
      description: '',
      area: '',
      location: '',
      workMode: WorkModeType.REMOTE,
      questions: [],
      contract: ContractType.CLT,
      requirements: [],
      benefits: [],
      salaryRange: { min: 0, max: 0 },
      currency: Currency.R$,
      publicationDate: DateTime.now().toISODate(),
      expirationDate: DateTime.now().plus({ days: 30 }).toISODate(),
      level: ExperienceLevel.JUNIOR,
      type: VacancyType.FULL_TIME,
    },
    mode: 'onChange',
  });

  const formData = watch();

  const updateFormData = (updates: Partial<VacancyFormSchema>) => {
    Object.entries(updates).forEach(([key, value]) => {
      setValue(key as keyof VacancyFormSchema, value, { shouldValidate: true, shouldDirty: true });
    });
  };

  const createVacancy = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const values = getValues();
      const vacancyData: CreateVacancyInput = {
        companyId: companyCases.getId() || '',
        requirements: values.requirements || [],
        responsibilities: [],
        contract: values.contract || ContractType.CLT,
        workMode: values.workMode || WorkModeType.REMOTE,
        type: values.type || VacancyType.FULL_TIME,
        level: values.level || ExperienceLevel.JUNIOR,
        salaryMax: values.salaryRange?.max,
        salaryMin: values.salaryRange?.min,
        publicationDate: DateTime.now().toISODate(),
        expirationDate: DateTime.now().plus({ days: 30 }).toISODate(),
        currency: values.currency || Currency.R$,
        title: values.title,
        description: values.description,
        location: values.location,
        benefits: values.benefits || [],
        area: values.area || '',
        steps: [],
      };

      const result = await vacancyCases.create(vacancyData);
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
      const result = await vacancyCases.publish({ id: vacancyId });
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
    reset({
      title: '',
      description: '',
      requirements: [],
      questions: [],
      area: '',
      location: '',
      contract: ContractType.CLT,
      benefits: [],
      salaryRange: { min: 0, max: 0 },
    });
    setError(null);
  };

  return {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    formData,
    updateFormData,
    isLoading,
    error,
    errors,
    isValid,
    isDirty,
    createVacancy,
    publishVacancy,
    resetForm,
  };
};
