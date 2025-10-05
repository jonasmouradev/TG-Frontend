// src/features/createJob/components/Step1JobInfo.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Step1Schema } from '@/features/newVacancy/schemas/vacancySchemas';
import { useCreateJobWizard } from '@/features/newVacancy/hooks/useCreateVacancyWizard';
import z from 'zod';

export default function Step1VacancyInfo() {
  const { data, updateData, nextStep } = useCreateJobWizard();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof Step1Schema>>({
    resolver: zodResolver(Step1Schema),
    defaultValues: data,
  });

  const onSubmit = (values: z.infer<typeof Step1Schema>) => {
    updateData(values);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Informações da Vaga</h2>

      <input {...register('title')} placeholder="Título da vaga" className="border p-2 rounded" />
      {errors.title && <p className="text-red-500">{errors.title.message as string}</p>}

      <textarea {...register('description')} placeholder="Descrição" className="border p-2 rounded" />
      {errors.description && <p className="text-red-500">{errors.description.message as string}</p>}

      <button type="submit" className="bg-blue-600 text-white p-2 rounded">
        Próximo
      </button>
    </form>
  );
}
