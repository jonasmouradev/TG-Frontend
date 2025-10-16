import { Input, Label, Switch } from '@/shared';
import { DollarSign } from 'lucide-react';
import Section from '../Section';

const benefits = [
  { key: 'remote', label: 'Trabalho Remoto/Híbrido', desc: 'Flexibilidade de local' },
  { key: 'health', label: 'Plano de Saúde', desc: 'Cobertura médica e hospitalar' },
  { key: 'dental', label: 'Plano Odontológico', desc: 'Cobertura odontológica' },
  { key: 'meal', label: 'Vale Refeição/Alimentação', desc: 'Cartão benefício' },
  { key: 'transport', label: 'Vale Transporte', desc: 'Auxílio locomoção' },
  { key: 'gym', label: 'Gympass/Wellhub', desc: 'Academias e bem-estar' },
  { key: 'education', label: 'Auxílio Educação', desc: 'Cursos e treinamentos' },
  { key: 'daycare', label: 'Auxílio Creche', desc: 'Suporte para filhos' },
];

export default function BenefitsSection() {
  return (
    <Section id="benefits" title="Remuneração e Benefícios" icon={DollarSign}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="salary">Faixa Salarial (opcional)</Label>
          <Input id="salary" placeholder="Ex: R$ 8.000 - R$ 12.000" />
          <p className="text-xs text-gray-500">Vagas com salário divulgado recebem 3x mais candidaturas</p>
        </div>
        <div className="space-y-3">
          <Label>Benefícios Oferecidos</Label>
          {benefits.map(benefit => (
            <div
              key={benefit.key}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div>
                <div className="font-medium">{benefit.label}</div>
                <div className="text-sm text-gray-500">{benefit.desc}</div>
              </div>
              <Switch />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
