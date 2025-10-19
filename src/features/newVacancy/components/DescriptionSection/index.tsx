import { Label, Textarea } from '@/shared';
import { FileText } from 'lucide-react';
import Section from '../Section';

export default function DescriptionSection() {
  return (
    <Section id="description" title="Descrição da Vaga" icon={FileText}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Descrição Completa</Label>
          <Textarea
            id="description"
            rows={8}
            placeholder="Descreva as responsabilidades, desafios e o que torna esta posição especial..."
            className="resize-none"
          />
          <p className="text-sm text-gray-500">
            💡 Dica: Seja específico sobre o dia a dia e os projetos que o candidato irá trabalhar
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="responsibilities">Principais Responsabilidades</Label>
          <Textarea
            id="responsibilities"
            rows={4}
            placeholder="• Desenvolver e manter interfaces web&#10;• Colaborar com equipe de design&#10;• Participar de code reviews"
          />
        </div>
      </div>
    </Section>
  );
}
