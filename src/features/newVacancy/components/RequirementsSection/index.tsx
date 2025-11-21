import {
  Badge,
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/index';
import { Award, Plus, X } from 'lucide-react';
import Section from '../Section';
import { ExperienceLevel } from '@core/domain';
import { useVacancyFormContext } from '../../contexts/VacancyFormContext';
import { useState } from 'react';

interface RequirementsSectionProps {
  readonly skills: string[];
  readonly newSkill: string;
  readonly setNewSkill: (value: string) => void;
  readonly addSkill: () => void;
  readonly removeSkill: (skill: string) => void;
}

export default function RequirementsSection({ skills, setNewSkill, addSkill, removeSkill }: RequirementsSectionProps) {
  const { formData, updateFormData, errors } = useVacancyFormContext();
  const [localSkill, setLocalSkill] = useState('');

  const handleAddSkill = () => {
    if (localSkill.trim() && !formData.requirements.includes(localSkill.trim())) {
      updateFormData({ requirements: [...formData.requirements, localSkill.trim()] });
      setLocalSkill('');
    }
    // Também adiciona ao estado local do useNewVacancy
    if (localSkill.trim()) {
      setNewSkill(localSkill);
      addSkill();
      setLocalSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    updateFormData({ requirements: formData.requirements.filter(s => s !== skill) });
    removeSkill(skill);
  };

  const displaySkills = [...new Set([...skills, ...formData.requirements])];

  return (
    <Section id="requirements" title="Requisitos e Qualificações" icon={Award}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Habilidades Técnicas</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Digite uma habilidade e pressione Enter"
              value={localSkill}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocalSkill(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
            />
            <Button type="button" size="icon" onClick={handleAddSkill}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          {errors.requirements && <p className="text-sm text-red-500">{errors.requirements.message}</p>}
        </div>
        {displaySkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {displaySkills.map(skill => (
              <Badge key={skill} variant="outline" className="text-whit px-3 py-1.5 text-sm">
                {skill}
                <X
                  className="w-3 h-3 ml-2 cursor-pointer hover:text-red-600"
                  onClick={() => handleRemoveSkill(skill)}
                />
              </Badge>
            ))}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="experience">Experiência Necessária</Label>
          <Select value={formData.level} onValueChange={value => updateFormData({ level: value as ExperienceLevel })}>
            <SelectTrigger id="experience">
              <SelectValue placeholder="Selecione o nível" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ExperienceLevel.ENTRY}>Estagiário (0-1 ano)</SelectItem>
              <SelectItem value={ExperienceLevel.JUNIOR}>Júnior (1-2 anos)</SelectItem>
              <SelectItem value={ExperienceLevel.MID}>Pleno (2-5 anos)</SelectItem>
              <SelectItem value={ExperienceLevel.SENIOR}>Sênior (5+ anos)</SelectItem>
              <SelectItem value={ExperienceLevel.LEAD}>Especialista/Lead (8+ anos)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="education">Escolaridade</Label>
          <Select>
            <SelectTrigger id="education">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">Ensino Médio</SelectItem>
              <SelectItem value="tech">Técnico</SelectItem>
              <SelectItem value="bachelor">Superior Completo</SelectItem>
              <SelectItem value="ongoing">Superior Cursando</SelectItem>
              <SelectItem value="post">Pós-graduação</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Section>
  );
}
