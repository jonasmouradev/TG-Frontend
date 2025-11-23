import {
  BasicInfoSection,
  DescriptionSection,
  RequirementsSection,
  BenefitsSection,
  ProcessSection,
  ActionButtons,
} from '../components';
import { useNewVacancy } from '../hooks';
import { VacancyFormProvider } from '../contexts/VacancyFormContext';

export default function NewVacancy() {
  const newVacancy = useNewVacancy();

  return (
    <VacancyFormProvider>
      <div className="w-screen max-w-7xl mx-auto p-6 min-h-screen bg-white">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-blue-600 bg-clip-text text-transparent">Nova Vaga</h1>
          <p className="text-gray-600">Preencha as informações abaixo para publicar uma nova oportunidade</p>
        </div>
        <BasicInfoSection />
        <DescriptionSection />
        <RequirementsSection {...newVacancy} />
        <BenefitsSection />
        <ProcessSection />
        <ActionButtons />
      </div>
    </VacancyFormProvider>
  );
}
