import { Badge, Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared';
import { Award, Plus, X } from 'lucide-react';
import Section from '../Section';

interface RequirementsSectionProps {
  skills: string[];
  newSkill: string;
  setNewSkill: (value: string) => void;
  addSkill: () => void;
  removeSkill: (skill: string) => void;
}

export default function RequirementsSection({
  skills,
  newSkill,
  setNewSkill,
  addSkill,
  removeSkill,
}: RequirementsSectionProps) {
  return (
    <Section id="requirements" title="Requisitos e Qualificações" icon={Award}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Habilidades Técnicas</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Digite uma habilidade e pressione Enter"
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
            />
            <Button type="button" size="icon" onClick={addSkill}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <Badge key={skill} variant="secondary" className="px-3 py-1.5 text-sm">
                {skill}
                <X className="w-3 h-3 ml-2 cursor-pointer hover:text-red-600" onClick={() => removeSkill(skill)} />
              </Badge>
            ))}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="experience">Experiência Necessária</Label>
          <Select>
            <SelectTrigger id="experience">
              <SelectValue placeholder="Selecione o nível" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Júnior (0-2 anos)</SelectItem>
              <SelectItem value="mid">Pleno (2-5 anos)</SelectItem>
              <SelectItem value="senior">Sênior (5+ anos)</SelectItem>
              <SelectItem value="lead">Especialista/Lead (8+ anos)</SelectItem>
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
