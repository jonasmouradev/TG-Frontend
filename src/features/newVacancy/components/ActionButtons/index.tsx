import { Button } from '@/shared';
import { CheckCircle2, FileText, Loader2 } from 'lucide-react';
import { useVacancyForm, useNewVacancy } from '../../hooks';
import { toast } from 'sonner';

export default function ActionButtons() {
  const { saveDraft, createAndPublish, isLoading, formData } = useVacancyForm();
  const { stages } = useNewVacancy();

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Por favor, preencha o título da vaga');
      return false;
    }
    if (!formData.description.trim()) {
      toast.error('Por favor, preencha a descrição da vaga');
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
      await saveDraft(stages);
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
      await createAndPublish(stages);
      toast.success('Vaga publicada com sucesso!');
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
        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        onClick={handlePublishVacancy}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle2 className="w-4 h-4 mr-2" />}
        Publicar Vaga
      </Button>
    </div>
  );
}
