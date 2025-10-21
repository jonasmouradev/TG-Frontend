import { Badge, Button, Input, Label, Switch, Textarea } from '@shared/index';
import { Bell, BellOff, Copy, Edit2, GripVertical, Trash2, User } from 'lucide-react';
import { Stage } from '../../../types';

interface StageListProps {
  stages: Stage[];
  draggedItem: string | null;
  editingStage: string | null;
  handleDragStart: (e: React.DragEvent, id: string) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, targetId: string) => void;
  handleDragEnd: () => void;
  setEditingStage: (id: string | null) => void;
  updateStage: (id: string, updates: Partial<Stage>) => void;
  duplicateStage: (stage: Stage) => void;
  removeStage: (id: string) => void;
  getStageTypeColor: (type: string) => string;
  getStageTypeLabel: (type: string) => string;
}

export default function StageList({
  stages,
  draggedItem,
  editingStage,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
  setEditingStage,
  updateStage,
  duplicateStage,
  removeStage,
  getStageTypeColor,
  getStageTypeLabel,
}: StageListProps) {
  return (
    <div className="space-y-3">
      <Label>Etapas Configuradas ({stages.length})</Label>
      {stages.map((stage, index) => (
        <div
          key={stage.id}
          draggable
          onDragStart={e => handleDragStart(e, stage.id)}
          onDragOver={handleDragOver}
          onDrop={e => handleDrop(e, stage.id)}
          onDragEnd={handleDragEnd}
          role="button"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
            }
          }}
          className={`border rounded-lg bg-white hover:shadow-md transition-all group ${
            draggedItem === stage.id ? 'opacity-50 scale-95' : ''
          }`}
        >
          {editingStage === stage.id ? (
            // Modo de Edição
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between mb-3">
                <Label className="font-semibold">Editando Etapa</Label>
                <Button variant="ghost" size="sm" onClick={() => setEditingStage(null)}>
                  Cancelar
                </Button>
              </div>
              <div className="space-y-3">
                <Input
                  value={stage.name}
                  onChange={e => updateStage(stage.id, { name: e.target.value })}
                  placeholder="Nome da etapa"
                />
                <Textarea
                  value={stage.description}
                  onChange={e => updateStage(stage.id, { description: e.target.value })}
                  placeholder="Descrição"
                  rows={2}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={stage.duration || ''}
                    onChange={e => updateStage(stage.id, { duration: e.target.value })}
                    placeholder="Duração"
                  />
                  <Input
                    value={stage.responsible || ''}
                    onChange={e => updateStage(stage.id, { responsible: e.target.value })}
                    placeholder="Responsável"
                  />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    {stage.autoNotify ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                    <span className="text-sm">Notificar candidato automaticamente</span>
                  </div>
                  <Switch
                    checked={stage.autoNotify}
                    onCheckedChange={checked => updateStage(stage.id, { autoNotify: checked })}
                  />
                </div>
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
                    <h4 className="font-semibold truncate">{stage.name}</h4>
                    <Badge variant="outline" className={`text-xs ${getStageTypeColor(stage.type)}`}>
                      {getStageTypeLabel(stage.type)}
                    </Badge>
                    {stage.autoNotify && (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                        <Bell className="w-3 h-3 mr-1" />
                        Auto-notificação
                      </Badge>
                    )}
                  </div>
                  {stage.description && <p className="text-sm text-gray-600 line-clamp-2">{stage.description}</p>}
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    {stage.duration && <span>⏱️ {stage.duration}</span>}
                    {stage.responsible && (
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {stage.responsible}
                      </span>
                    )}
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
                    setEditingStage(stage.id);
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
                    duplicateStage(stage);
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
                    removeStage(stage.id);
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
