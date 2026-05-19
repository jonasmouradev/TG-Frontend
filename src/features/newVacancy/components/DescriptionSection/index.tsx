import { Label, Textarea } from '@shared/index';
import { FileText } from 'lucide-react';
import Section from '../Section';
import { useVacancyFormContext } from '../../contexts/VacancyFormContext';

export default function DescriptionSection() {
  const { register, errors } = useVacancyFormContext();

  return (
    <Section id="description" title="Descrição da Vaga" icon={FileText}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Descrição Completa *</Label>
          <Textarea
            id="description"
            rows={8}
            placeholder="Descreva as responsabilidades, desafios e o que torna esta posição especial..."
            className="resize-none"
            {...register('description')}
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          <p className="text-sm text-gray-500">
            💡 Dica: Seja específico sobre o dia a dia e os projetos que o candidato irá trabalhar
          </p>
        </div>
      </div>
    </Section>
  );
}
