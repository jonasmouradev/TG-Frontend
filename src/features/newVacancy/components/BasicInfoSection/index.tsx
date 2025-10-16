import { Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared';
import { Briefcase } from 'lucide-react';
import Section from '../Section';

export default function BasicInfoSection() {
  return (
    <Section id="basic" title="Informações Básicas" icon={Briefcase}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título da Vaga *</Label>
          <Input id="title" placeholder="Ex: Desenvolvedor Front-end Sênior" className="text-lg font-medium" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="department">Departamento</Label>
            <Select>
              <SelectTrigger id="department">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">Tecnologia</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Vendas</SelectItem>
                <SelectItem value="hr">Recursos Humanos</SelectItem>
                <SelectItem value="finance">Financeiro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="contract">Tipo de Contrato</Label>
            <Select>
              <SelectTrigger id="contract">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clt">CLT</SelectItem>
                <SelectItem value="pj">PJ</SelectItem>
                <SelectItem value="intern">Estágio</SelectItem>
                <SelectItem value="temp">Temporário</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Localização</Label>
            <Input id="location" placeholder="Ex: São Paulo, SP" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="workmode">Modelo de Trabalho</Label>
            <Select>
              <SelectTrigger id="workmode">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remoto</SelectItem>
                <SelectItem value="hybrid">Híbrido</SelectItem>
                <SelectItem value="onsite">Presencial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Section>
  );
}
