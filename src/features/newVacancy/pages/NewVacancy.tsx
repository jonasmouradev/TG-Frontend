import Step1VacancyInfo from '../components/Steps/Step1VacancyInfo';
import Step2Requirements from '../components/Steps/Step2Requirements';
import { StepSummary } from '../components/Steps/StepSummary';
import { useCreateJobWizard } from '../hooks/useCreateVacancyWizard';
import Stepper from '@/features/newVacancy/components/Stepper';

const NewVacancy = () => {
  const { step } = useCreateJobWizard();

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 border rounded shadow">
      <Stepper current={step} total={4} />
      {step === 1 && <Step1VacancyInfo />}
      {step === 2 && <Step2Requirements />}
      {step === 4 && <StepSummary />}
    </div>
  );
};

export default NewVacancy;
