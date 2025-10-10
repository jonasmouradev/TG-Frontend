import { Button, Input, Label } from '@/shared';
import { Switch } from '@/shared/components/ui/Switch/switch';
import { Textarea } from '@/shared/components/ui/TextArea/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/Select/select';
import { Award, Badge, Briefcase, DollarSign, FileText } from 'lucide-react';
import Section from '../components/Section';

const NewVacancy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Nova Vaga</h1>
        <p className="text-gray-600">Preencha as informações abaixo para publicar uma nova oportunidade</p>
      </div>

      <Section id="basic" title="Informações Básicas" icon={Briefcase}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Título da Vaga *</Label>
            <Input placeholder="Ex: Desenvolvedor Front-end Sênior" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Departamento</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Tecnologia</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipo de Contrato</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clt">CLT</SelectItem>
                  <SelectItem value="pj">PJ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Section>

      <Section id="description" title="Descrição da Vaga" icon={FileText}>
        <Textarea rows={6} placeholder="Descreva as responsabilidades e o dia a dia..." />
      </Section>

      <Section id="requirements" title="Requisitos" icon={Award}>
        <div className="space-y-3">
          <Input placeholder="Adicionar requisito" />
          <div className="flex flex-wrap gap-2">
            {['React', 'TypeScript', 'Node.js'].map(skill => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </div>
      </Section>

      <Section id="benefits" title="Remuneração e Benefícios" icon={DollarSign}>
        <div className="space-y-4">
          <Input placeholder="Faixa salarial (opcional)" />
          <div className="space-y-2">
            {['Trabalho Remoto', 'Plano de Saúde', 'Vale Refeição'].map(b => (
              <div key={b} className="flex items-center justify-between p-3 border rounded-lg">
                <span>{b}</span>
                <Switch />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div className="flex gap-3 mt-6">
        <Button variant="outline" className="flex-1">
          Salvar Rascunho
        </Button>
        <Button className="flex-1">Publicar Vaga</Button>
      </div>
    </div>
  );
};

export default NewVacancy;
