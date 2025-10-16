import {
  BasicInfoSection,
  DescriptionSection,
  RequirementsSection,
  BenefitsSection,
  ProcessSection,
  ActionButtons,
} from '../components';
import { processTemplates } from '../consts';
import { useNewVacancy } from '../hooks';

export default function NewVacancy() {
  const {
    addSkill,
    removeSkill,
    skills,
    newSkill,
    setNewSkill,
    addStage,
    applyTemplate,
    draggedItem,
    duplicateStage,
    editingStage,
    exportAsTemplate,
    getStageTypeColor,
    getStageTypeLabel,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    handleDrop,
    newStage,
    removeStage,
    setEditingStage,
    setNewStage,
    setShowExportModal,
    setShowStats,
    setShowTemplates,
    showExportModal,
    showStats,
    showTemplates,
    stageStats,
    stages,
    templateDescription,
    templateName,
    updateStage,
    savedTemplates,
    setTemplateDescription,
    setTemplateName,
  } = useNewVacancy();

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Nova Vaga
        </h1>
        <p className="text-gray-600">Preencha as informações abaixo para publicar uma nova oportunidade</p>
      </div>

      <BasicInfoSection />

      <DescriptionSection />

      <RequirementsSection
        skills={skills}
        newSkill={newSkill}
        setNewSkill={setNewSkill}
        addSkill={addSkill}
        removeSkill={removeSkill}
      />

      <BenefitsSection />

      <ProcessSection
        stages={stages}
        newStage={newStage}
        setNewStage={setNewStage}
        addStage={addStage}
        duplicateStage={duplicateStage}
        editingStage={editingStage}
        setEditingStage={setEditingStage}
        updateStage={updateStage}
        removeStage={removeStage}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        handleDragEnd={handleDragEnd}
        draggedItem={draggedItem}
        getStageTypeColor={getStageTypeColor}
        getStageTypeLabel={getStageTypeLabel}
        showTemplates={showTemplates}
        setShowTemplates={setShowTemplates}
        showStats={showStats}
        setShowStats={setShowStats}
        showExportModal={showExportModal}
        setShowExportModal={setShowExportModal}
        templateName={templateName}
        setTemplateName={setTemplateName}
        templateDescription={templateDescription}
        setTemplateDescription={setTemplateDescription}
        processTemplates={processTemplates}
        savedTemplates={savedTemplates}
        applyTemplate={applyTemplate}
        exportAsTemplate={exportAsTemplate}
        stageStats={stageStats}
      />

      <ActionButtons />
    </div>
  );
}
