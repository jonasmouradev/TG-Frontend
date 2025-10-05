// src/features/createJob/components/Step2Requirements.tsx
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Step2Schema } from '@/features/newVacancy/schemas/vacancySchemas';
import { useCreateJobWizard } from '@/features/newVacancy/hooks/useCreateVacancyWizard';
import z from 'zod';

type Step2FormData = z.infer<typeof Step2Schema>;

export default function Step2Requirements() {
  const { data, updateData, nextStep, prevStep } = useCreateJobWizard();

  const methods = useForm<Step2FormData>({
    resolver: zodResolver(Step2Schema),
    defaultValues: { requirements: data.requirements || [''] },
  });

  const { control, handleSubmit, register } = methods;

  const fieldArrayMethods = useFieldArray({
    control,
    // @ts-expect-error - react-hook-form type inference issue with array fields
    name: 'requirements',
  });

  const { fields, append, remove } = fieldArrayMethods;

  const onSubmit = (values: Step2FormData) => {
    updateData(values);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Requisitos</h2>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <input
            {...register(`requirements.${index}`)}
            className="border p-2 rounded flex-1"
            placeholder={`Requisito ${index + 1}`}
          />
          <button type="button" onClick={() => remove(index)} className="text-red-500">
            X
          </button>
        </div>
      ))}

      <button type="button" onClick={() => append('')} className="text-blue-600">
        + Adicionar requisito
      </button>

      <div className="flex justify-between">
        <button type="button" onClick={prevStep} className="bg-gray-300 p-2 rounded">
          Voltar
        </button>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Próximo
        </button>
      </div>
    </form>
  );
}
