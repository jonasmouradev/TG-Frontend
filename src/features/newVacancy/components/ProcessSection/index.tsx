import { Button, Label } from '@/shared';
import { BarChart3, Download, GitBranch, Sparkles } from 'lucide-react';
import Section from '../Section';
import ProcessTemplates from './ProcessTemplates';
import ProcessStats from './ProcessStats';
import StageList from './StageList';
import StageForm from './StageForm';
import ExportTemplateModal from './ExportTemplateModal';
import { useNewVacancy } from '../../hooks';
import { ProcessTemplate } from '../../types';

export default function ProcessSection({ processTemplates }: { readonly processTemplates: ProcessTemplate[] }) {
  const {
    stages,
    newStage,
    setNewStage,
    addStage,
    duplicateStage,
    editingStage,
    setEditingStage,
    updateStage,
    removeStage,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    draggedItem,
    getStageTypeColor,
    getStageTypeLabel,
    showTemplates,
    setShowTemplates,
    showStats,
    setShowStats,
    showExportModal,
    setShowExportModal,
    templateName,
    setTemplateName,
    templateDescription,
    setTemplateDescription,
    savedTemplates,
    applyTemplate,
    exportAsTemplate,
    stageStats,
  } = useNewVacancy();

  return (
    <Section id="process" title="Processo Seletivo" icon={GitBranch}>
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Configure as etapas do processo seletivo.</strong> Os candidatos poderão acompanhar seu progresso em
            cada fase.
          </p>
        </div>

        {/* Templates */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Templates de Processo</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowStats(!showStats)}>
                <BarChart3 className="w-4 h-4 mr-2" />
                {showStats ? 'Ocultar' : 'Ver'} Estatísticas
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowExportModal(true)}
                disabled={stages.length === 0}
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar como Template
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowTemplates(!showTemplates)}>
                <Sparkles className="w-4 h-4 mr-2" />
                {showTemplates ? 'Ocultar' : 'Ver'} Templates
              </Button>
            </div>
          </div>

          {/* Modal de Exportação */}
          {showExportModal && (
            <ExportTemplateModal
              templateName={templateName}
              setTemplateName={setTemplateName}
              templateDescription={templateDescription}
              setTemplateDescription={setTemplateDescription}
              stagesCount={stages.length}
              onCancel={() => {
                setShowExportModal(false);
                setTemplateName('');
                setTemplateDescription('');
              }}
              onExport={exportAsTemplate}
            />
          )}

          {/* Estatísticas */}
          {showStats && stages.length > 0 && <ProcessStats stageStats={stageStats} totalStages={stages.length} />}

          {showTemplates && (
            <ProcessTemplates
              processTemplates={processTemplates}
              savedTemplates={savedTemplates}
              applyTemplate={applyTemplate}
            />
          )}
        </div>

        {/* Etapas Existentes com Drag & Drop */}
        {stages.length > 0 && (
          <StageList
            stages={stages}
            draggedItem={draggedItem}
            editingStage={editingStage}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragEnd={handleDragEnd}
            setEditingStage={setEditingStage}
            updateStage={updateStage}
            duplicateStage={duplicateStage}
            removeStage={removeStage}
            getStageTypeColor={getStageTypeColor}
            getStageTypeLabel={getStageTypeLabel}
          />
        )}

        {/* Adicionar Nova Etapa */}
        <StageForm newStage={newStage} setNewStage={setNewStage} addStage={addStage} />

        {stages.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              ✅ {stages.length} etapa{stages.length !== 1 ? 's' : ''} configurada{stages.length !== 1 ? 's' : ''}.
              Arraste para reordenar.
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}
