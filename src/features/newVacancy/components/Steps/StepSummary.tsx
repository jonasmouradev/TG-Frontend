// src/features/createJob/components/StepSummary.tsx
import { useCreateJobWizard } from '@/features/newVacancy/hooks/useCreateVacancyWizard';
import { createJob } from '@/features/newVacancy/services/createVacancyService';

export function StepSummary() {
  const { data, prevStep, reset } = useCreateJobWizard();

  async function handleSubmit() {
    await createJob(data);
    alert('Vaga criada com sucesso!');
    reset();
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Revisar informações</h2>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>

      <div className="flex justify-between">
        <button onClick={prevStep} className="bg-gray-300 p-2 rounded">
          Voltar
        </button>
        <button onClick={handleSubmit} className="bg-green-600 text-white p-2 rounded">
          Criar vaga
        </button>
      </div>
    </div>
  );
}
