import { Button } from '@shared/index';
import { CheckCircle2, FileText, Loader2 } from 'lucide-react';
import { useNewVacancy } from '../../hooks';
import { useVacancyFormContext } from '../../contexts/VacancyFormContext';
import { toast } from 'sonner';

export default function ActionButtons() {
  const { createVacancy, publishVacancy, isLoading, handleSubmit, isValid } = useVacancyFormContext();
  const { stages } = useNewVacancy();

  const validateForm = () => {
    if (!isValid) {
      toast.error('Por favor, preencha todos os campos obrigatórios corretamente');
      return false;
    }
    if (stages.length === 0) {
      toast.error('Por favor, adicione pelo menos uma etapa ao processo seletivo');
      return false;
    }
    return true;
  };

  const handleSaveDraft = async () => {
    try {
      await createVacancy();
      toast.success('Rascunho salvo com sucesso!');
    } catch (err) {
      console.error('Error saving draft:', err);
      toast.error('Erro ao salvar rascunho');
    }
  };

  const handlePublishVacancy = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const result = await createVacancy();
      if (result?.vacancy?.id) {
        await publishVacancy(result.vacancy.id);
        toast.success('Vaga publicada com sucesso!');
      }
    } catch (err) {
      console.error('Error publishing vacancy:', err);
      toast.error('Erro ao publicar vaga');
    }
  };

  return (
    <div className="flex gap-3 mt-8 sticky bottom-6 bg-white p-4 rounded-lg shadow-lg border">
      <Button variant="outline" className="flex-1" onClick={handleSaveDraft} disabled={isLoading}>
        {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileText className="w-4 h-4 mr-2" />}
        Salvar Rascunho
      </Button>
      <Button
        className="flex-1 bg-blue-600 hover:bg-blue-700"
        onClick={handleSubmit(handlePublishVacancy)}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
        Publicar Vaga
      </Button>
    </div>
  );
}
