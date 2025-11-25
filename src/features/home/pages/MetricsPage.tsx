import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '@/shared';
import {
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  BarChart3,
  Target,
  Award,
  AlertCircle,
  Filter,
} from 'lucide-react';

interface ProcessMetric {
  id: string;
  processName: string;
  totalCandidates: number;
  activeStage: string;
  averageTime: number;
  conversionRate: number;
  approvalRate: number;
  dropoffRate: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

interface StageMetric {
  name: string;
  candidates: number;
  approved: number;
  rejected: number;
  pending: number;
  averageTime: number;
  conversionRate: number;
}

export default function MetricsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);

  // Mock data - substituir por dados reais do backend
  const globalMetrics = {
    totalProcesses: 12,
    activeProcesses: 8,
    totalCandidates: 245,
    averageTime: 18,
    overallConversionRate: 32.5,
    topPerformingProcess: 'Desenvolvedor Full Stack',
    improvementNeeded: 2,
  };

  const processMetrics: ProcessMetric[] = [
    {
      id: '1',
      processName: 'Desenvolvedor Full Stack',
      totalCandidates: 52,
      activeStage: 'Entrevista Técnica',
      averageTime: 15,
      conversionRate: 42.3,
      approvalRate: 65,
      dropoffRate: 12.5,
      status: 'excellent',
    },
    {
      id: '2',
      processName: 'Designer UX/UI',
      totalCandidates: 38,
      activeStage: 'Análise de Portfólio',
      averageTime: 12,
      conversionRate: 38.5,
      approvalRate: 58,
      dropoffRate: 15.2,
      status: 'good',
    },
    {
      id: '3',
      processName: 'Product Manager',
      totalCandidates: 28,
      activeStage: 'Entrevista Final',
      averageTime: 22,
      conversionRate: 28.6,
      approvalRate: 45,
      dropoffRate: 25,
      status: 'warning',
    },
    {
      id: '4',
      processName: 'Analista de Dados',
      totalCandidates: 45,
      activeStage: 'Teste Técnico',
      averageTime: 25,
      conversionRate: 22.2,
      approvalRate: 38,
      dropoffRate: 32.5,
      status: 'critical',
    },
  ];

  const stageMetrics: StageMetric[] = [
    {
      name: 'Triagem de Currículos',
      candidates: 245,
      approved: 180,
      rejected: 45,
      pending: 20,
      averageTime: 2,
      conversionRate: 73.5,
    },
    {
      name: 'Entrevista com RH',
      candidates: 180,
      approved: 125,
      rejected: 35,
      pending: 20,
      averageTime: 5,
      conversionRate: 69.4,
    },
    {
      name: 'Teste Técnico',
      candidates: 125,
      approved: 85,
      rejected: 30,
      pending: 10,
      averageTime: 7,
      conversionRate: 68,
    },
    {
      name: 'Entrevista Técnica',
      candidates: 85,
      approved: 55,
      rejected: 20,
      pending: 10,
      averageTime: 6,
      conversionRate: 64.7,
    },
    {
      name: 'Entrevista Final',
      candidates: 55,
      approved: 35,
      rejected: 12,
      pending: 8,
      averageTime: 5,
      conversionRate: 63.6,
    },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      excellent: 'bg-green-100 text-green-700 border-green-200',
      good: 'bg-blue-100 text-blue-700 border-blue-200',
      warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      critical: 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      excellent: CheckCircle2,
      good: TrendingUp,
      warning: AlertCircle,
      critical: XCircle,
    };
    const Icon = icons[status as keyof typeof icons];
    return Icon ? <Icon className="w-4 h-4" /> : null;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      excellent: 'Excelente',
      good: 'Bom',
      warning: 'Atenção',
      critical: 'Crítico',
    };
    return labels[status as keyof typeof labels];
  };

  const getConversionBadgeColor = (rate: number) => {
    if (rate >= 70) return 'bg-green-100 text-green-700';
    if (rate >= 50) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Period Selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Período:</span>
            <div className="flex gap-2">
              {[
                { value: '7days', label: '7 dias' },
                { value: '30days', label: '30 dias' },
                { value: '90days', label: '90 dias' },
                { value: 'year', label: 'Ano' },
              ].map(period => (
                <Button
                  key={period.value}
                  variant={selectedPeriod === period.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPeriod(period.value)}
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros Avançados
          </Button>
        </div>

        {/* Global Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-2 hover:shadow-lg transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <Badge className="bg-blue-100 text-blue-700">Ativo</Badge>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{globalMetrics.activeProcesses}</div>
              <div className="text-xs text-gray-600">Processos Ativos</div>
              <div className="text-xs text-blue-600 mt-2">{globalMetrics.totalProcesses} no total</div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{globalMetrics.totalCandidates}</div>
              <div className="text-xs text-gray-600">Total de Candidatos</div>
              <div className="text-xs text-purple-600 mt-2">Em análise</div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{globalMetrics.overallConversionRate}%</div>
              <div className="text-xs text-gray-600">Taxa de Conversão</div>
              <div className="text-xs text-green-600 mt-2">+5% vs. período anterior</div>
            </CardContent>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{globalMetrics.averageTime}d</div>
              <div className="text-xs text-gray-600">Tempo Médio</div>
              <div className="text-xs text-orange-600 mt-2">Por processo completo</div>
            </CardContent>
          </Card>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <Card className="border-2 bg-gradient-to-br from-green-50 to-teal-50">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base mb-1">Melhor Desempenho</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    O processo "{globalMetrics.topPerformingProcess}" está com desempenho excelente, mantendo alta taxa
                    de conversão e tempo otimizado.
                  </p>
                  <Badge className="bg-green-600 hover:bg-green-600">Taxa de conversão: 42.3%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-600 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-base mb-1">Atenção Necessária</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {globalMetrics.improvementNeeded} processos precisam de atenção devido a baixa taxa de conversão ou
                    tempo prolongado.
                  </p>
                  <Button variant="outline" size="sm" className="bg-white">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Process Performance */}
        <Card className="border-2 mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Desempenho por Processo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {processMetrics.map(process => (
                <button
                  key={process.id}
                  type="button"
                  className="w-full text-left p-4 border-2 rounded-lg hover:shadow-md transition-all cursor-pointer"
                  onClick={() => setSelectedProcess(process.id === selectedProcess ? null : process.id)}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-base">{process.processName}</h4>
                        <Badge variant="outline" className={getStatusColor(process.status)}>
                          {getStatusIcon(process.status)}
                          <span className="ml-1">{getStatusLabel(process.status)}</span>
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        Etapa atual: <span className="font-medium">{process.activeStage}</span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-xs text-gray-500">Candidatos</div>
                          <div className="text-lg font-bold text-gray-900">{process.totalCandidates}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Tempo Médio</div>
                          <div className="text-lg font-bold text-gray-900">{process.averageTime}d</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Conversão</div>
                          <div className="text-lg font-bold text-green-600">{process.conversionRate}%</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Taxa Aprovação</div>
                          <div className="text-lg font-bold text-blue-600">{process.approvalRate}%</div>
                        </div>
                      </div>

                      {selectedProcess === process.id && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="text-gray-600">Taxa de Desistência:</span>
                              <span className="font-semibold text-red-600">{process.dropoffRate}%</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="text-gray-600">Candidatos Ativos:</span>
                              <span className="font-semibold text-blue-600">
                                {Math.round(process.totalCandidates * 0.6)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stage Funnel Analysis */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg">Análise do Funil por Etapa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stageMetrics.map((stage, index) => {
                const totalProcessed = stage.approved + stage.rejected;
                const approvalRate = totalProcessed > 0 ? (stage.approved / totalProcessed) * 100 : 0;

                return (
                  <div key={stage.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{stage.name}</h4>
                          <p className="text-xs text-gray-500">
                            {stage.candidates} candidatos • {stage.averageTime}d médio
                          </p>
                        </div>
                      </div>
                      <Badge className={getConversionBadgeColor(stage.conversionRate)}>
                        {stage.conversionRate.toFixed(1)}% conversão
                      </Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-xs">
                      <div className="text-center p-2 bg-green-50 rounded">
                        <div className="font-bold text-green-700">{stage.approved}</div>
                        <div className="text-gray-600">Aprovados</div>
                      </div>
                      <div className="text-center p-2 bg-red-50 rounded">
                        <div className="font-bold text-red-700">{stage.rejected}</div>
                        <div className="text-gray-600">Reprovados</div>
                      </div>
                      <div className="text-center p-2 bg-yellow-50 rounded">
                        <div className="font-bold text-yellow-700">{stage.pending}</div>
                        <div className="text-gray-600">Pendentes</div>
                      </div>
                      <div className="text-center p-2 bg-blue-50 rounded">
                        <div className="font-bold text-blue-700">{approvalRate.toFixed(0)}%</div>
                        <div className="text-gray-600">Taxa</div>
                      </div>
                    </div>

                    <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full bg-green-500 transition-all"
                        style={{ width: `${(stage.approved / stage.candidates) * 100}%` }}
                      />
                      <div
                        className="absolute h-full bg-red-500 transition-all"
                        style={{
                          left: `${(stage.approved / stage.candidates) * 100}%`,
                          width: `${(stage.rejected / stage.candidates) * 100}%`,
                        }}
                      />
                      <div
                        className="absolute h-full bg-yellow-500 transition-all"
                        style={{
                          left: `${((stage.approved + stage.rejected) / stage.candidates) * 100}%`,
                          width: `${(stage.pending / stage.candidates) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
