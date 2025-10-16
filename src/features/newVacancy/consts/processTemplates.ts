import { Code, Palette, TrendingUp } from 'lucide-react';
import { ProcessTemplate } from '../types';

const processTemplates: ProcessTemplate[] = [
  {
    id: 'tech',
    name: 'Tecnologia',
    description: 'Processo padrão para vagas de desenvolvimento',
    icon: Code,
    stages: [
      {
        name: 'Triagem de Currículos',
        type: 'screening',
        description: 'Análise inicial de perfil e experiência',
        duration: '2 dias',
      },
      {
        name: 'Entrevista com RH',
        type: 'interview',
        description: 'Alinhamento cultural e expectativas',
        duration: '1 semana',
      },
      { name: 'Desafio Técnico', type: 'test', description: 'Teste prático de programação', duration: '5 dias' },
      { name: 'Entrevista Técnica', type: 'interview', description: 'Conversa com time técnico', duration: '1 semana' },
      { name: 'Proposta', type: 'custom', description: 'Apresentação de oferta', duration: '3 dias' },
    ],
  },
  {
    id: 'design',
    name: 'Design/UX',
    description: 'Processo focado em criatividade e portfólio',
    icon: Palette,
    stages: [
      {
        name: 'Análise de Portfólio',
        type: 'screening',
        description: 'Avaliação de trabalhos anteriores',
        duration: '3 dias',
      },
      { name: 'Entrevista Inicial', type: 'interview', description: 'Conhecendo o candidato', duration: '1 semana' },
      { name: 'Case de Design', type: 'test', description: 'Desafio prático de UX/UI', duration: '1 semana' },
      {
        name: 'Apresentação do Case',
        type: 'interview',
        description: 'Candidato apresenta solução',
        duration: '5 dias',
      },
      { name: 'Entrevista Final', type: 'interview', description: 'Conversa com stakeholders', duration: '5 dias' },
    ],
  },
  {
    id: 'sales',
    name: 'Vendas/Comercial',
    description: 'Processo ágil focado em habilidades de comunicação',
    icon: TrendingUp,
    stages: [
      { name: 'Triagem', type: 'screening', description: 'Análise de experiência comercial', duration: '1 dia' },
      { name: 'Dinâmica em Grupo', type: 'test', description: 'Atividade de role-play', duration: '3 dias' },
      {
        name: 'Entrevista Individual',
        type: 'interview',
        description: 'Avaliação de fit cultural',
        duration: '5 dias',
      },
      { name: 'Proposta Comercial', type: 'custom', description: 'Apresentação de oferta', duration: '2 dias' },
    ],
  },
];
export default processTemplates;
