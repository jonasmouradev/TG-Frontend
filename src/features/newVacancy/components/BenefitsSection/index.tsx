import { Input, Label, Switch } from '@shared/index';
import { DollarSign } from 'lucide-react';
import Section from '../Section';
import { useVacancyFormContext } from '../../contexts/VacancyFormContext';

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
  const { formData, updateFormData, errors } = useVacancyFormContext();

  const handleBenefitToggle = (benefitKey: string) => {
    const currentBenefits = formData.benefits || [];
    const isSelected = currentBenefits.includes(benefitKey);

    if (isSelected) {
      updateFormData({ benefits: currentBenefits.filter(b => b !== benefitKey) });
    } else {
      updateFormData({ benefits: [...currentBenefits, benefitKey] });
    }
  };

  const handleSalaryChange = (field: 'min' | 'max', value: string) => {
    const numValue = parseFloat(value) || 0;
    const currentRange = formData.salaryRange || { min: 0, max: 0 };
    updateFormData({
      salaryRange: {
        min: field === 'min' ? numValue : currentRange.min,
        max: field === 'max' ? numValue : currentRange.max,
      },
    });
  };

  return (
    <Section id="benefits" title="Remuneração e Benefícios" icon={DollarSign}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="salary">Faixa Salarial (opcional)</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="salary-min" className="text-xs text-gray-500">
                Mínimo
              </Label>
              <Input
                id="salary-min"
                type="number"
                placeholder="Ex: 8000"
                value={formData.salaryRange?.min || ''}
                onChange={e => handleSalaryChange('min', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="salary-max" className="text-xs text-gray-500">
                Máximo
              </Label>
              <Input
                id="salary-max"
                type="number"
                placeholder="Ex: 12000"
                value={formData.salaryRange?.max || ''}
                onChange={e => handleSalaryChange('max', e.target.value)}
              />
            </div>
          </div>
          {errors.salaryRange && <p className="text-sm text-red-500">{errors.salaryRange.message}</p>}
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
              <Switch
                checked={formData.benefits?.includes(benefit.key) || false}
                onCheckedChange={() => handleBenefitToggle(benefit.key)}
              />
            </div>
          ))}
          {errors.benefits && <p className="text-sm text-red-500">{errors.benefits.message}</p>}
        </div>
      </div>
    </Section>
  );
}
