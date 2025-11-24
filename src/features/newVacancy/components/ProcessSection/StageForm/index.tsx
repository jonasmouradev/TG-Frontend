import { Step } from '@features/newVacancy/types';
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
} from '@shared/index';
import { Bell, Plus } from 'lucide-react';
import { Dispatch } from 'react';

interface StepFormProps {
  newStep: Step;
  setNewStep: Dispatch<React.SetStateAction<Step>>;
  addStep: () => void;
}

export default function StepForm({ newStep, setNewStep, addStep }: StepFormProps) {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 space-y-3">
      <Label className="text-base font-semibold">Adicionar Nova Etapa</Label>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="stepName">Nome da Etapa *</Label>
          <Input
            id="stepName"
            placeholder="Ex: Entrevista Técnica"
            value={newStep.name}
            onChange={e => setNewStep({ ...newStep, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stepType">Tipo</Label>
          <Select value={newStep.type} onValueChange={(v: Step['type']) => setNewStep({ ...newStep, type: v })}>
            <SelectTrigger id="stepType">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="screening">Triagem</SelectItem>
              <SelectItem value="interview">Entrevista</SelectItem>
              <SelectItem value="test">Teste/Desafio</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="stepDesc">Descrição (opcional)</Label>
        <Textarea
          id="stepDesc"
          placeholder="Descreva o que acontece nesta etapa..."
          rows={2}
          value={newStep.description}
          onChange={e => setNewStep({ ...newStep, description: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="stepDuration">Duração Estimada</Label>
          <Input
            id="stepDuration"
            placeholder="Ex: 1 semana"
            value={newStep.duration}
            onChange={e => setNewStep({ ...newStep, duration: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stepResponsible">Responsável</Label>
          <Input
            id="stepResponsible"
            placeholder="Ex: João Silva"
            value={newStep.responsible}
            onChange={e => setNewStep({ ...newStep, responsible: e.target.value })}
          />
        </div>
      </div>
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-gray-600" />
          <div>
            <div className="text-sm font-medium">Notificação Automática</div>
            <div className="text-xs text-gray-500">Candidatos serão notificados ao entrar nesta etapa</div>
          </div>
        </div>
        <Switch
          checked={newStep.autoNotify}
          onCheckedChange={checked => setNewStep({ ...newStep, autoNotify: checked })}
        />
      </div>
      <Button type="button" onClick={addStep} className="w-full" disabled={!newStep.name.trim()}>
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Etapa
      </Button>
    </div>
  );
}
