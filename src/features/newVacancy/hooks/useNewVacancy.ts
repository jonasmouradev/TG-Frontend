import { useState, useEffect } from 'react';
import { Stage as Step } from '../types';
import { ProcessTemplateDto, StepType } from '@core/domain';
import { useStepCases } from '@shared/hooks/step';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GetStepsUseCase } from '@core/application';
import { useCase } from '@shared/contexts/UseCaseContext';

const useNewVacancy = (templateId?: string) => {
  const { useGetSteps, ...stepCases } = useStepCases();
  const queryClient = useQueryClient();
  const { stepGateway } = useCase();

  // Buscar steps existentes do template
  const { data: stepsData, isLoading } = useGetSteps({
    input: { filters: templateId ? { templateId } : undefined },
    enabled: true,
  });

  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);

  // Sincronizar steps com dados do backend
  useEffect(() => {
    if (stepsData?.data?.data) {
      const mappedSteps: Step[] = stepsData.data.data.map(step => ({
        id: step.id,
        name: step.name,
        type: mapStepTypeToLocal(step.type),
        description: step.description || '',
        duration: step.estimatedDuration ? `${step.estimatedDuration} dias` : '',
        responsible: '',
        autoNotify: false,
      }));
      setSteps(mappedSteps);
    }
  }, [stepsData]);

  // Helper functions para conversão de tipos
  const mapStepTypeToLocal = (type: string): Step['type'] => {
    const typeMap: Record<string, Step['type']> = {
      screening: 'screening',
      interview: 'interview',
      technical_test: 'test',
      application: 'screening',
      background_check: 'custom',
      offer: 'custom',
      onboarding: 'custom',
    };
    return typeMap[type] || 'custom';
  };

  const mapLocalTypeToStepType = (type: Step['type']) => {
    const typeMap: Record<Step['type'], (typeof StepType)[keyof typeof StepType]> = {
      screening: StepType.SCREENING,
      interview: StepType.INTERVIEW,
      test: StepType.TECHNICAL_TEST,
      custom: StepType.APPLICATION,
    };
    return typeMap[type];
  };

  const parseDuration = (duration: string): number | undefined => {
    if (!duration) return undefined;
    const match = duration.match(/\d+/);
    return match ? parseInt(match[0], 10) : undefined;
  };

  // Mutations
  const createStepMutation = useMutation({
    mutationFn: stepCases.create,
    onSuccess: () => {
      // Invalida a query com os mesmos parâmetros usados no useGetSteps
      queryClient.invalidateQueries({
        queryKey: GetStepsUseCase.queryKey({
          filters: templateId ? { templateId } : undefined,
        }),
      });
    },
  });

  const updateStepMutation = useMutation({
    mutationFn: stepCases.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GetStepsUseCase.queryKey({
          filters: templateId ? { templateId } : undefined,
        }),
      });
    },
  });

  const deleteStepMutation = useMutation({
    mutationFn: stepCases.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GetStepsUseCase.queryKey({
          filters: templateId ? { templateId } : undefined,
        }),
      });
    },
  });

  const reorderStepsMutation = useMutation({
    mutationFn: stepCases.reorder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GetStepsUseCase.queryKey({
          filters: templateId ? { templateId } : undefined,
        }),
      });
    },
  });
  const [newStep, setNewStep] = useState({
    name: '',
    type: 'interview' as const,
    description: '',
    duration: '',
    responsible: '',
    autoNotify: false,
  });
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [editingStep, setEditingStep] = useState<string | null>(null);
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

  const addStep = async () => {
    if (newStep.name.trim()) {
      try {
        await createStepMutation.mutateAsync({
          templateId: '',
          name: newStep.name,
          type: mapLocalTypeToStepType(newStep.type),
          description: newStep.description,
          order: steps.length,
          isRequired: false,
          estimatedDuration: parseDuration(newStep.duration),
        });
        setNewStep({ name: '', type: 'interview', description: '', duration: '', responsible: '', autoNotify: false });
      } catch (error) {
        console.error('Erro ao adicionar step:', error);
      }
    } else {
      // Fallback para modo local (sem templateId)
      setSteps([
        ...steps,
        {
          id: Date.now().toString(),
          name: newStep.name,
          type: newStep.type,
          description: newStep.description,
          duration: newStep.duration,
          responsible: newStep.responsible,
          autoNotify: newStep.autoNotify,
        },
      ]);
      setNewStep({ name: '', type: 'interview', description: '', duration: '', responsible: '', autoNotify: false });
    }
  };

  const duplicateStep = async (step: Step) => {
    if (templateId) {
      try {
        await createStepMutation.mutateAsync({
          templateId,
          name: `${step.name} (cópia)`,
          type: mapLocalTypeToStepType(step.type),
          description: step.description,
          order: steps.length,
          isRequired: false,
          estimatedDuration: step.duration ? parseDuration(step.duration) : undefined,
        });
      } catch (error) {
        console.error('Erro ao duplicar step:', error);
      }
    } else {
      const newStep = {
        ...step,
        id: Date.now().toString(),
        name: `${step.name} (cópia)`,
      };
      setSteps([...steps, newStep]);
    }
  };

  const updateStep = async (id: string, updates: Partial<Step>) => {
    if (templateId && id) {
      try {
        await updateStepMutation.mutateAsync({
          id,
          data: {
            name: updates.name,
            type: updates.type ? mapLocalTypeToStepType(updates.type) : undefined,
            description: updates.description,
            estimatedDuration: updates.duration ? parseDuration(updates.duration) : undefined,
          },
        });
        setEditingStep(null);
      } catch (error) {
        console.error('Erro ao atualizar step:', error);
      }
    } else {
      setSteps(steps.map(s => (s.id === id ? { ...s, ...updates } : s)));
      setEditingStep(null);
    }
  };

  const exportAsTemplate = () => {
    if (!templateName.trim() || steps.length === 0) return;

    const newTemplate: ProcessTemplateDto = {
      id: Date.now().toString(),
      name: templateName,
      description: templateDescription || 'Template personalizado',
      stages: steps.map(({ ...step }) => step),
    };

    setSavedTemplates([...savedTemplates, newTemplate]);
    setShowExportModal(false);
    setTemplateName('');
    setTemplateDescription('');
  };

  // Estatísticas simuladas - em produção viriam do backend
  const stepStats = steps.map(step => ({
    ...step,
    candidates: Math.floor(Math.random() * 50) + 10,
    approved: Math.floor(Math.random() * 30) + 5,
    avgDuration: `${Math.floor(Math.random() * 7) + 1} dias`,
    approvalRate: Math.floor(Math.random() * 40) + 50,
  }));

  const removeStep = async (id: string) => {
    if (templateId && id) {
      try {
        await deleteStepMutation.mutateAsync({ id });
      } catch (error) {
        console.error('Erro ao remover step:', error);
      }
    } else {
      setSteps(steps.filter(s => s.id !== id));
    }
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e: React.DragEvent, targetId: string) => {
    e.preventDefault();

    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = steps.findIndex(s => s.id === draggedItem);
    const targetIndex = steps.findIndex(s => s.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newSteps = [...steps];
    const [removed] = newSteps.splice(draggedIndex, 1);
    newSteps.splice(targetIndex, 0, removed);

    if (templateId) {
      try {
        await reorderStepsMutation.mutateAsync({
          templateId,
          stepIds: newSteps.map(s => s.id),
        });
      } catch (error) {
        console.error('Erro ao reordenar steps:', error);
      }
    } else {
      setSteps(newSteps);
    }
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const applyTemplate = async (template: ProcessTemplateDto) => {
    if (template.id) {
      try {
        // Busca os steps do template selecionado
        const result = await queryClient.fetchQuery({
          queryKey: GetStepsUseCase.queryKey({ filters: { templateId: template.id } }),
          queryFn: () => new GetStepsUseCase(stepGateway).execute({ filters: { templateId: template.id } }),
        });

        if (result?.data?.data) {
          const stepsArray = Array.isArray(result.data.data) ? result.data.data : [];
          const mappedSteps: Step[] = stepsArray.map(step => ({
            id: step.id,
            name: step.name,
            type: mapStepTypeToLocal(step.type),
            description: step.description || '',
            duration: step.estimatedDuration ? `${step.estimatedDuration} dias` : '',
            responsible: '',
            autoNotify: false,
          }));
          setSteps(mappedSteps);
        }
      } catch (error) {
        console.error('Erro ao buscar steps do template:', error);
      }
    } else if (template.stages) {
      // Fallback para templates locais sem ID
      setSteps(
        template.stages.map(stage => ({
          ...stage,
          id: Date.now().toString() + Math.random(),
        })),
      );
    }
    setShowTemplates(false);
  };

  const getStepTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      screening: 'Triagem',
      interview: 'Entrevista',
      test: 'Teste/Desafio',
      custom: 'Personalizado',
    };
    return types[type] || type;
  };

  const getStepTypeColor = (type: string) => {
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
    stepsData,
    stages: steps, // Alias para compatibilidade
    newStep,
    newStage: newStep, // Alias para compatibilidade
    setNewStep,
    setNewStage: setNewStep, // Alias para compatibilidade
    addStep,
    addStage: addStep, // Alias para compatibilidade
    duplicateStep,
    duplicateStage: duplicateStep, // Alias para compatibilidade
    editingStep,
    editingStage: editingStep, // Alias para compatibilidade
    setEditingStep,
    setEditingStage: setEditingStep, // Alias para compatibilidade
    updateStep,
    updateStage: updateStep, // Alias para compatibilidade
    exportAsTemplate,
    showExportModal,
    setShowExportModal,
    templateName,
    setTemplateName,
    templateDescription,
    setTemplateDescription,
    savedTemplates,
    stepStats,
    stageStats: stepStats, // Alias para compatibilidade
    showStats,
    setShowStats,
    removeStep,
    removeStage: removeStep, // Alias para compatibilidade
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    draggedItem,
    applyTemplate,
    getStepTypeLabel,
    getStageTypeLabel: getStepTypeLabel, // Alias para compatibilidade
    getStepTypeColor,
    getStageTypeColor: getStepTypeColor, // Alias para compatibilidade
    isLoading,
  };
};

export default useNewVacancy;
