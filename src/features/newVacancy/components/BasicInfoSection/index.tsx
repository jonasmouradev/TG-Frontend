import { Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shared/index';
import { Briefcase } from 'lucide-react';
import Section from '../Section';
import { useVacancyFormContext } from '../../contexts/VacancyFormContext';
import { ContractType, WorkModeType } from '@core/domain';

export default function BasicInfoSection() {
  const { register, formData, updateFormData, errors } = useVacancyFormContext();

  return (
    <Section id="basic" title="Informações Básicas" icon={Briefcase}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título da Vaga *</Label>
          <Input
            id="title"
            placeholder="Ex: Desenvolvedor Front-end Sênior"
            className="text-lg font-medium"
            {...register('title')}
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="area">Departamento</Label>
            <Input id="area" placeholder="Ex: Tecnologia" {...register('area')} />
            {errors.area && <p className="text-sm text-red-500">{errors.area.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="contract">Tipo de Contrato</Label>
            <Select
              value={formData.contract}
              onValueChange={value => updateFormData({ contract: value as ContractType })}
            >
              <SelectTrigger id="contract">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ContractType.CLT}>CLT</SelectItem>
                <SelectItem value={ContractType.PJ}>PJ</SelectItem>
                <SelectItem value={ContractType.INTERN}>Estágio</SelectItem>
                <SelectItem value={ContractType.TEMPORARY}>Temporário</SelectItem>
                <SelectItem value={ContractType.FREELANCE}>Freelancer</SelectItem>
              </SelectContent>
            </Select>
            {errors.contract && <p className="text-sm text-red-500">{errors.contract.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <Input id="location" placeholder="Ex: São Paulo, SP" {...register('location')} />
            {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="workmode">Modelo de Trabalho</Label>
            <Select
              value={formData.workMode}
              onValueChange={value => updateFormData({ workMode: value as WorkModeType })}
            >
              <SelectTrigger id="workmode">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={WorkModeType.REMOTE}>Remoto</SelectItem>
                <SelectItem value={WorkModeType.HYBRID}>Híbrido</SelectItem>
                <SelectItem value={WorkModeType.ONSITE}>Presencial</SelectItem>
              </SelectContent>
            </Select>
            {errors.workMode && <p className="text-sm text-red-500">{errors.workMode.message}</p>}
          </div>
        </div>
      </div>
    </Section>
  );
}
