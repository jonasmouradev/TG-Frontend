import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
} from '@/shared';
import {
  Briefcase,
  FileText,
  Award,
  DollarSign,
  X,
  Plus,
  GripVertical,
  Trash2,
  GitBranch,
  Sparkles,
  Copy,
  Edit2,
  Bell,
  BellOff,
  User,
  Download,
  BarChart3,
  TrendingDown,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { Section } from '../components';
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

      <Section id="basic" title="Informações Básicas" icon={Briefcase}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título da Vaga *</Label>
            <Input id="title" placeholder="Ex: Desenvolvedor Front-end Sênior" className="text-lg font-medium" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Departamento</Label>
              <Select>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Tecnologia</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Vendas</SelectItem>
                  <SelectItem value="hr">Recursos Humanos</SelectItem>
                  <SelectItem value="finance">Financeiro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contract">Tipo de Contrato</Label>
              <Select>
                <SelectTrigger id="contract">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clt">CLT</SelectItem>
                  <SelectItem value="pj">PJ</SelectItem>
                  <SelectItem value="intern">Estágio</SelectItem>
                  <SelectItem value="temp">Temporário</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Localização</Label>
              <Input id="location" placeholder="Ex: São Paulo, SP" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workmode">Modelo de Trabalho</Label>
              <Select>
                <SelectTrigger id="workmode">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">Remoto</SelectItem>
                  <SelectItem value="hybrid">Híbrido</SelectItem>
                  <SelectItem value="onsite">Presencial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Section>

      <Section id="description" title="Descrição da Vaga" icon={FileText}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Descrição Completa</Label>
            <Textarea
              id="description"
              rows={8}
              placeholder="Descreva as responsabilidades, desafios e o que torna esta posição especial..."
              className="resize-none"
            />
            <p className="text-sm text-gray-500">
              💡 Dica: Seja específico sobre o dia a dia e os projetos que o candidato irá trabalhar
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="responsibilities">Principais Responsabilidades</Label>
            <Textarea
              id="responsibilities"
              rows={4}
              placeholder="• Desenvolver e manter interfaces web&#10;• Colaborar com equipe de design&#10;• Participar de code reviews"
            />
          </div>
        </div>
      </Section>

      <Section id="requirements" title="Requisitos e Qualificações" icon={Award}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Habilidades Técnicas</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Digite uma habilidade e pressione Enter"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
              />
              <Button type="button" size="icon" onClick={addSkill}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <Badge key={skill} variant="secondary" className="px-3 py-1.5 text-sm">
                  {skill}
                  <X className="w-3 h-3 ml-2 cursor-pointer hover:text-red-600" onClick={() => removeSkill(skill)} />
                </Badge>
              ))}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="experience">Experiência Necessária</Label>
            <Select>
              <SelectTrigger id="experience">
                <SelectValue placeholder="Selecione o nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Júnior (0-2 anos)</SelectItem>
                <SelectItem value="mid">Pleno (2-5 anos)</SelectItem>
                <SelectItem value="senior">Sênior (5+ anos)</SelectItem>
                <SelectItem value="lead">Especialista/Lead (8+ anos)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="education">Escolaridade</Label>
            <Select>
              <SelectTrigger id="education">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">Ensino Médio</SelectItem>
                <SelectItem value="tech">Técnico</SelectItem>
                <SelectItem value="bachelor">Superior Completo</SelectItem>
                <SelectItem value="ongoing">Superior Cursando</SelectItem>
                <SelectItem value="post">Pós-graduação</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Section>

      <Section id="benefits" title="Remuneração e Benefícios" icon={DollarSign}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="salary">Faixa Salarial (opcional)</Label>
            <Input id="salary" placeholder="Ex: R$ 8.000 - R$ 12.000" />
            <p className="text-xs text-gray-500">Vagas com salário divulgado recebem 3x mais candidaturas</p>
          </div>
          <div className="space-y-3">
            <Label>Benefícios Oferecidos</Label>
            {[
              { key: 'remote', label: 'Trabalho Remoto/Híbrido', desc: 'Flexibilidade de local' },
              { key: 'health', label: 'Plano de Saúde', desc: 'Cobertura médica e hospitalar' },
              { key: 'dental', label: 'Plano Odontológico', desc: 'Cobertura odontológica' },
              { key: 'meal', label: 'Vale Refeição/Alimentação', desc: 'Cartão benefício' },
              { key: 'transport', label: 'Vale Transporte', desc: 'Auxílio locomoção' },
              { key: 'gym', label: 'Gympass/Wellhub', desc: 'Academias e bem-estar' },
              { key: 'education', label: 'Auxílio Educação', desc: 'Cursos e treinamentos' },
              { key: 'daycare', label: 'Auxílio Creche', desc: 'Suporte para filhos' },
            ].map(benefit => (
              <div
                key={benefit.key}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <div className="font-medium">{benefit.label}</div>
                  <div className="text-sm text-gray-500">{benefit.desc}</div>
                </div>
                <Switch />
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="process" title="Processo Seletivo" icon={GitBranch}>
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Configure as etapas do processo seletivo.</strong> Os candidatos poderão acompanhar seu progresso
              em cada fase.
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
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <Card className="w-full max-w-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Exportar como Template
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="templateName">Nome do Template *</Label>
                      <Input
                        id="templateName"
                        placeholder="Ex: Processo Tech Startup"
                        value={templateName}
                        onChange={e => setTemplateName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="templateDesc">Descrição</Label>
                      <Textarea
                        id="templateDesc"
                        placeholder="Descreva quando usar este template..."
                        rows={3}
                        value={templateDescription}
                        onChange={e => setTemplateDescription(e.target.value)}
                      />
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-800">
                        Este template salvará {stages.length} etapa{stages.length !== 1 ? 's' : ''} e poderá ser
                        reutilizado em futuras vagas.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setShowExportModal(false);
                        setTemplateName('');
                        setTemplateDescription('');
                      }}
                    >
                      Cancelar
                    </Button>
                    <Button className="flex-1" onClick={exportAsTemplate} disabled={!templateName.trim()}>
                      <Download className="w-4 h-4 mr-2" />
                      Salvar Template
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            {/* Estatísticas */}
            {showStats && stages.length > 0 && (
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BarChart3 className="w-5 h-5" />
                    Estatísticas do Processo
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="text-2xl font-bold text-blue-600">
                        {stageStats.reduce((acc, s) => acc + s.candidates, 0)}
                      </div>
                      <div className="text-xs text-gray-600">Total de Candidatos</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round(stageStats.reduce((acc, s) => acc + s.approvalRate, 0) / stageStats.length)}%
                      </div>
                      <div className="text-xs text-gray-600">Taxa de Aprovação Média</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="text-2xl font-bold text-purple-600">{stages.length}</div>
                      <div className="text-xs text-gray-600">Etapas Totais</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Performance por Etapa</Label>
                    {stageStats.map((stat, index) => (
                      <div key={stat.id} className="bg-white rounded-lg p-3 border">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-semibold">
                              {index + 1}
                            </div>
                            <span className="font-medium text-sm">{stat.name}</span>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              stat.approvalRate >= 70
                                ? 'bg-green-100 text-green-700'
                                : stat.approvalRate >= 50
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                            }
                          >
                            {stat.approvalRate}% aprovação
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div>
                            <div className="text-gray-500">Candidatos</div>
                            <div className="font-semibold">{stat.candidates}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Aprovados</div>
                            <div className="font-semibold text-green-600">{stat.approved}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Duração Média</div>
                            <div className="font-semibold">{stat.avgDuration}</div>
                          </div>
                        </div>
                        <div className="mt-2 bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              stat.approvalRate >= 70
                                ? 'bg-green-500'
                                : stat.approvalRate >= 50
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                            }`}
                            style={{ width: `${stat.approvalRate}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white rounded-lg p-4 border">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4" />
                      Principais Gargalos
                    </h4>
                    <div className="space-y-2">
                      {stageStats
                        .sort((a, b) => a.approvalRate - b.approvalRate)
                        .slice(0, 2)
                        .map(stat => (
                          <div key={stat.id} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">{stat.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-red-600 font-semibold">{stat.approvalRate}%</span>
                              <Badge variant="outline" className="text-xs bg-red-50 text-red-700">
                                Revisar processo
                              </Badge>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Tempo Médio do Processo
                    </h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-purple-600">{Math.floor(Math.random() * 15) + 10}</span>
                      <span className="text-gray-600">dias úteis</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Da candidatura até a contratação final</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {showTemplates && (
              <div className="grid grid-cols-1 gap-3">
                {/* Templates Padrão */}
                {processTemplates.map(template => {
                  const Icon = template.icon;
                  return (
                    <div
                      key={template.id}
                      className="border-2 border-dashed rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group"
                      onClick={() => applyTemplate(template)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors">
                            {template.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {template.stages.map((stage, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {stage.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Aplicar
                        </Button>
                      </div>
                    </div>
                  );
                })}

                {/* Templates Salvos */}
                {savedTemplates.length > 0 && (
                  <>
                    <div className="flex items-center gap-2 mt-4">
                      <div className="h-px bg-gray-300 flex-1" />
                      <span className="text-xs text-gray-500 font-semibold">SEUS TEMPLATES</span>
                      <div className="h-px bg-gray-300 flex-1" />
                    </div>
                    {savedTemplates.map(template => {
                      const Icon = template.icon;
                      return (
                        <div
                          key={template.id}
                          className="border-2 border-green-200 rounded-lg p-4 hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer group"
                          onClick={() => applyTemplate(template)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-lg group-hover:text-green-600 transition-colors">
                                  {template.name}
                                </h4>
                                <Badge variant="outline" className="text-xs bg-green-100 text-green-700">
                                  Personalizado
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {template.stages.map((stage, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {stage.name}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              Aplicar
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Etapas Existentes com Drag & Drop */}
          {stages.length > 0 && (
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
                          {stage.description && (
                            <p className="text-sm text-gray-600 line-clamp-2">{stage.description}</p>
                          )}
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
          )}

          {/* Adicionar Nova Etapa */}
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

      {/* Ações Finais */}
      <div className="flex gap-3 mt-8 sticky bottom-6 bg-white p-4 rounded-lg shadow-lg border">
        <Button variant="outline" className="flex-1">
          <FileText className="w-4 h-4 mr-2" />
          Salvar Rascunho
        </Button>
        <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Publicar Vaga
        </Button>
      </div>
    </div>
  );
}
