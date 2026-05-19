import { Button, Label } from '@shared/index';
import { BarChart3, GitBranch, Sparkles, Upload } from 'lucide-react';
import Section from '../Section';
import ProcessTemplates from './ProcessTemplates';
import ProcessStats from './ProcessStats';
import StepList from './StageList';
import StepForm from './StepForm';
import ExportTemplateModal from './ExportTemplateModal';
import { useNewVacancy } from '../../hooks';

export default function ProcessSection() {
  const {
    steps,
    newStep,
    setNewStep,
    addStep,
    duplicateStep,
    editingStep,
    setEditingStep,
    updateStep,
    removeStep,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    draggedItem,
    getStepTypeColor,
    getStepTypeLabel,
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
    exportAsTemplate,
    stepStats,
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
                disabled={steps.length === 0}
              >
                <Upload className="w-4 h-4 mr-2" />
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
              stagesCount={steps.length}
              onCancel={() => {
                setShowExportModal(false);
                setTemplateName('');
                setTemplateDescription('');
              }}
              onExport={exportAsTemplate}
            />
          )}

          {/* Estatísticas */}
          {showStats && steps.length > 0 && (
            <ProcessStats
              stepStats={stepStats.map((stat, index) => ({
                ...stat,
                id: steps[index]?.id || index.toString(),
                name: steps[index]?.name || `Etapa ${index + 1}`,
              }))}
              totalSteps={steps.length}
            />
          )}

          {showTemplates && <ProcessTemplates />}
        </div>

        {/* Etapas Existentes com Drag & Drop */}
        {steps.length > 0 && (
          <StepList
            steps={steps}
            draggedItem={draggedItem}
            editingStep={editingStep}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragEnd={handleDragEnd}
            setEditingStep={setEditingStep}
            updateStep={updateStep}
            duplicateStep={duplicateStep}
            removeStep={removeStep}
            getStepTypeColor={getStepTypeColor}
            getStepTypeLabel={getStepTypeLabel}
          />
        )}

        {/* Adicionar Nova Etapa */}
        <StepForm newStep={newStep} setNewStep={setNewStep} addStep={addStep} />

        {steps.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              ✅ {steps.length} etapa{steps.length !== 1 ? 's' : ''} configurada{steps.length !== 1 ? 's' : ''}. Arraste
              para reordenar.
            </p>
          </div>
        )}
      </div>
    </Section>
  );
}
