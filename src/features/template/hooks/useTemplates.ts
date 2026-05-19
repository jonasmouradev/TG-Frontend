import { useState, useEffect } from 'react';

interface ProcessTemplate {
  id: string;
  name: string;
  description: string;
  category?: string;
  isDefault?: boolean;
  stages: Array<{
    id?: string;
    name: string;
    type: 'screening' | 'interview' | 'test' | 'custom';
    description: string;
    duration?: string;
    responsible?: string;
    autoNotify?: boolean;
    order?: number;
  }>;
  companyId?: string;
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const useTemplates = () => {
  const [templates, setTemplates] = useState<ProcessTemplate[]>([]);
  const [defaultTemplates, setDefaultTemplates] = useState<ProcessTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTemplates = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Using mock data - use cases are ready but API endpoints may not be configured
      const mockTemplates: ProcessTemplate[] = [
        {
          id: 'tech-template',
          name: 'Processo Tecnologia',
          description: 'Template padrão para vagas de desenvolvimento',
          category: 'technology',
          isDefault: true,
          stages: [
            {
              id: 'stage-1',
              name: 'Triagem de Currículos',
              type: 'screening',
              description: 'Análise inicial de perfil e experiência',
              duration: '2 dias',
              order: 1,
            },
            {
              id: 'stage-2',
              name: 'Entrevista com RH',
              type: 'interview',
              description: 'Alinhamento cultural e expectativas',
              duration: '1 semana',
              order: 2,
            },
            {
              id: 'stage-3',
              name: 'Desafio Técnico',
              type: 'test',
              description: 'Teste prático de programação',
              duration: '5 dias',
              order: 3,
            },
            {
              id: 'stage-4',
              name: 'Entrevista Técnica',
              type: 'interview',
              description: 'Conversa com time técnico',
              duration: '1 semana',
              order: 4,
            },
          ],
        },
        {
          id: 'design-template',
          name: 'Processo Design/UX',
          description: 'Template focado em criatividade e portfólio',
          category: 'design',
          isDefault: true,
          stages: [
            {
              id: 'stage-5',
              name: 'Análise de Portfólio',
              type: 'screening',
              description: 'Avaliação de trabalhos anteriores',
              duration: '3 dias',
              order: 1,
            },
            {
              id: 'stage-6',
              name: 'Case de Design',
              type: 'test',
              description: 'Desafio prático de UX/UI',
              duration: '1 semana',
              order: 2,
            },
          ],
        },
        {
          id: 'sales-template',
          name: 'Processo Comercial',
          description: 'Template ágil focado em vendas',
          category: 'sales',
          isDefault: true,
          stages: [
            {
              id: 'stage-7',
              name: 'Dinâmica em Grupo',
              type: 'test',
              description: 'Atividade de role-play',
              duration: '3 dias',
              order: 1,
            },
            {
              id: 'stage-8',
              name: 'Entrevista Individual',
              type: 'interview',
              description: 'Avaliação de fit cultural',
              duration: '5 dias',
              order: 2,
            },
          ],
        },
      ];

      setTemplates(mockTemplates);
      setDefaultTemplates(mockTemplates.filter(t => t.isDefault));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load templates');
    } finally {
      setIsLoading(false);
    }
  };

  const createTemplate = async (templateData: {
    name: string;
    description: string;
    category?: string;
    stages: Array<{
      name: string;
      type: 'screening' | 'interview' | 'test' | 'custom';
      description: string;
      duration?: string;
    }>;
  }) => {
    setIsLoading(true);
    try {
      // Mock implementation
      const newTemplate: ProcessTemplate = {
        id: `template-${Date.now()}`,
        ...templateData,
        isDefault: false,
        stages: templateData.stages.map((stage, index) => ({
          ...stage,
          id: `stage-${Date.now()}-${index}`,
          order: index + 1,
        })),
        createdAt: new Date().toISOString(),
      };

      setTemplates(prev => [...prev, newTemplate]);
      return newTemplate;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create template');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  return {
    templates,
    defaultTemplates,
    isLoading,
    error,
    createTemplate,
    refetch: loadTemplates,
  };
};

export default useTemplates;
