import { Button, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Switch, Textarea } from '@/shared';
import { Bell, Plus } from 'lucide-react';

interface StageFormProps {
  newStage: {
    name: string;
    type: 'screening' | 'interview' | 'test' | 'custom';
    description: string;
    duration: string;
    responsible: string;
    autoNotify: boolean;
  };
  setNewStage: (stage: any) => void;
  addStage: () => void;
}

export default function StageForm({ newStage, setNewStage, addStage }: StageFormProps) {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 space-y-3">
      <Label className="text-base font-semibold">Adicionar Nova Etapa</Label>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="stageName">Nome da Etapa *</Label>
          <Input
            id="stageName"
            placeholder="Ex: Entrevista Técnica"
            value={newStage.name}
            onChange={e => setNewStage({ ...newStage, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stageType">Tipo</Label>
          <Select value={newStage.type} onValueChange={(v: any) => setNewStage({ ...newStage, type: v })}>
            <SelectTrigger id="stageType">
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
        <Label htmlFor="stageDesc">Descrição (opcional)</Label>
        <Textarea
          id="stageDesc"
          placeholder="Descreva o que acontece nesta etapa..."
          rows={2}
          value={newStage.description}
          onChange={e => setNewStage({ ...newStage, description: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="stageDuration">Duração Estimada</Label>
          <Input
            id="stageDuration"
            placeholder="Ex: 1 semana"
            value={newStage.duration}
            onChange={e => setNewStage({ ...newStage, duration: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stageResponsible">Responsável</Label>
          <Input
            id="stageResponsible"
            placeholder="Ex: João Silva"
            value={newStage.responsible}
            onChange={e => setNewStage({ ...newStage, responsible: e.target.value })}
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
          checked={newStage.autoNotify}
          onCheckedChange={checked => setNewStage({ ...newStage, autoNotify: checked })}
        />
      </div>
      <Button type="button" onClick={addStage} className="w-full" disabled={!newStage.name.trim()}>
        <Plus className="w-4 h-4 mr-2" />
        Adicionar Etapa
      </Button>
    </div>
  );
}
