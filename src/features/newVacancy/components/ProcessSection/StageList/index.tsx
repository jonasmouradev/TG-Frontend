import { Step } from '@core/domain';
import { Badge, Button, Input, Label, Textarea } from '@shared/index';
// import { Switch } from '@shared/index';
import { Copy, Edit2, GripVertical, Trash2 } from 'lucide-react';
// import { Bell, BellOff, User } from 'lucide-react';

interface StepListProps {
  steps: Step[];
  draggedItem: string | null;
  editingStep: string | null;
  handleDragStart: (e: React.DragEvent, id: string) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, targetId: string) => void;
  handleDragEnd: () => void;
  setEditingStep: (id: string | null) => void;
  updateStep: (id: string, updates: Partial<Step>) => void;
  duplicateStep: (step: Step) => void;
  removeStep: (id: string) => void;
  getStepTypeColor: (type: string) => string;
  getStepTypeLabel: (type: string) => string;
}

export default function StepList({
  steps,
  draggedItem,
  editingStep,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
  setEditingStep,
  updateStep,
  duplicateStep,
  removeStep,
  getStepTypeColor,
  getStepTypeLabel,
}: StepListProps) {
  return (
    <div className="space-y-3">
      <Label>Etapas Configuradas ({steps.length})</Label>
      {steps.map((step, index) => (
        <div
          key={step.id}
          draggable
          onDragStart={e => handleDragStart(e, step.id)}
          onDragOver={handleDragOver}
          onDrop={e => handleDrop(e, step.id)}
          onDragEnd={handleDragEnd}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
            }
          }}
          className={`border rounded-lg bg-white hover:shadow-md transition-all group ${
            draggedItem === step.id ? 'opacity-50 scale-95' : ''
          }`}
        >
          {editingStep === step.id ? (
            // Modo de Edição
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between mb-3">
                <Label className="font-semibold">Editando Etapa</Label>
                <Button variant="ghost" size="sm" onClick={() => setEditingStep(null)}>
                  Cancelar
                </Button>
              </div>
              <div className="space-y-3">
                <Input
                  value={step.name}
                  onChange={e => updateStep(step.id, { name: e.target.value })}
                  placeholder="Nome da etapa"
                />
                <Textarea
                  value={step.description}
                  onChange={e => updateStep(step.id, { description: e.target.value })}
                  placeholder="Descrição"
                  rows={2}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={step.estimatedDuration || ''}
                    onChange={e => updateStep(step.id, { estimatedDuration: e.target.value })}
                    placeholder="Duração"
                  />
                  {/* TODO: enable when integrate responsible */}
                  {/* <Input
                    value={step.responsible || ''}
                    onChange={e => updateStep(step.id, { responsible: e.target.value })}
                    placeholder="Responsável"
                  /> */}
                </div>
                {/* TODO: enable when has notifications */}
                {/* <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    {step.autoNotify ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                    <span className="text-sm">Notificar candidato automaticamente</span>
                  </div>
                  <Switch
                    checked={step.autoNotify}
                    onCheckedChange={checked => updateStep(step.id, { autoNotify: checked })}
                  />
                </div> */}
              </div>
            </div>
          ) : (
            // Modo de Visualização
            <div className="flex items-start gap-3 p-4 cursor-move">
              <div className="flex items-center gap-3 flex-1">
                <GripVertical className="w-5 h-5 text-gray-400 cursor-grab active:cursor-grabbing" />
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-semibold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-semibold truncate">{step.name}</h4>
                    <Badge variant="outline" className={`text-xs ${getStepTypeColor(step.type)}`}>
                      {getStepTypeLabel(step.type)}
                    </Badge>
                    {/* {step.autoNotify && (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                        <Bell className="w-3 h-3 mr-1" />
                        Auto-notificação
                      </Badge>
                    )} */}
                  </div>
                  {step.description && <p className="text-sm text-gray-600 line-clamp-2">{step.description}</p>}
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    {step.estimatedDuration && <span>⏱️ {step.estimatedDuration}</span>}
                    {/* {step.responsible && (
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {step.responsible}
                      </span>
                    )} */}
                  </div>
                </div>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={e => {
                    e.stopPropagation();
                    setEditingStep(step.id);
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={e => {
                    e.stopPropagation();
                    duplicateStep(step);
                  }}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={e => {
                    e.stopPropagation();
                    removeStep(step.id);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
