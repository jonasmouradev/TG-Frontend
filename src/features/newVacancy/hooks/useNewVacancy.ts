import { useState } from 'react';
import { ProcessTemplate, Stage } from '../types';
import { Sparkles } from 'lucide-react';
import { ProcessTemplateDto } from '@core/domain';

const useNewVacancy = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [stages, setStages] = useState<Stage[]>([
    {
      id: '1',
      name: 'Triagem de Currículos',
      type: 'screening',
      description: 'Análise inicial dos candidatos',
      duration: '2 dias',
      responsible: '',
      autoNotify: true,
    },
    {
      id: '2',
      name: 'Entrevista com RH',
      type: 'interview',
      description: 'Alinhamento cultural e expectativas',
      duration: '1 semana',
      responsible: '',
      autoNotify: true,
    },
  ]);
  const [newStage, setNewStage] = useState({
    name: '',
    type: 'interview' as const,
    description: '',
    duration: '',
    responsible: '',
    autoNotify: false,
  });
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [editingStage, setEditingStage] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [savedTemplates, setSavedTemplates] = useState<ProcessTemplateDto[]>([]);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const addStage = () => {
    if (newStage.name.trim()) {
      setStages([
        ...stages,
        {
          id: Date.now().toString(),
          name: newStage.name,
          type: newStage.type,
          description: newStage.description,
          duration: newStage.duration,
          responsible: newStage.responsible,
          autoNotify: newStage.autoNotify,
        },
      ]);
      setNewStage({ name: '', type: 'interview', description: '', duration: '', responsible: '', autoNotify: false });
    }
  };

  const duplicateStage = (stage: Stage) => {
    const newStage = {
      ...stage,
      id: Date.now().toString(),
      name: `${stage.name} (cópia)`,
    };
    setStages([...stages, newStage]);
  };

  const updateStage = (id: string, updates: Partial<Stage>) => {
    setStages(stages.map(s => (s.id === id ? { ...s, ...updates } : s)));
    setEditingStage(null);
  };

  const exportAsTemplate = () => {
    if (!templateName.trim() || stages.length === 0) return;

    const newTemplate: ProcessTemplate = {
      id: Date.now().toString(),
      name: templateName,
      description: templateDescription || 'Template personalizado',
      icon: Sparkles,
      stages: stages.map(({ ...stage }) => stage),
    };

    setSavedTemplates([...savedTemplates, newTemplate]);
    setShowExportModal(false);
    setTemplateName('');
    setTemplateDescription('');
  };

  // Estatísticas simuladas - em produção viriam do backend
  const stageStats = stages.map(stage => ({
    ...stage,
    candidates: Math.floor(Math.random() * 50) + 10,
    approved: Math.floor(Math.random() * 30) + 5,
    avgDuration: `${Math.floor(Math.random() * 7) + 1} dias`,
    approvalRate: Math.floor(Math.random() * 40) + 50,
  }));

  const removeStage = (id: string) => {
    setStages(stages.filter(s => s.id !== id));
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();

    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = stages.findIndex(s => s.id === draggedItem);
    const targetIndex = stages.findIndex(s => s.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newStages = [...stages];
    const [removed] = newStages.splice(draggedIndex, 1);
    newStages.splice(targetIndex, 0, removed);

    setStages(newStages);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const applyTemplate = (template: ProcessTemplateDto) => {
    const newStages = template.stages.map((stage, index) => ({
      ...stage,
      id: `${Date.now()}-${index}`,
    }));
    setStages(newStages);
    setShowTemplates(false);
  };

  const getStageTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      screening: 'Triagem',
      interview: 'Entrevista',
      test: 'Teste/Desafio',
      custom: 'Personalizado',
    };
    return types[type] || type;
  };

  const getStageTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      screening: 'bg-purple-100 text-purple-700',
      interview: 'bg-blue-100 text-blue-700',
      test: 'bg-orange-100 text-orange-700',
      custom: 'bg-gray-100 text-gray-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return {
    showTemplates,
    setShowTemplates,
    skills,
    newSkill,
    setNewSkill,
    addSkill,
    removeSkill,
    stages,
    newStage,
    setNewStage,
    addStage,
    duplicateStage,
    editingStage,
    setEditingStage,
    updateStage,
    exportAsTemplate,
    showExportModal,
    setShowExportModal,
    templateName,
    setTemplateName,
    templateDescription,
    setTemplateDescription,
    savedTemplates,
    stageStats,
    showStats,
    setShowStats,
    removeStage,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    draggedItem,
    applyTemplate,
    getStageTypeLabel,
    getStageTypeColor,
  };
};

export default useNewVacancy;
