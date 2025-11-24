import { Badge, Card, CardContent, CardHeader, CardTitle, Label } from '@shared/index';
import { BarChart3, Clock, TrendingDown } from 'lucide-react';

interface StepStats {
  id: string;
  name: string;
  candidates: number;
  approved: number;
  avgDuration: string;
  approvalRate: number;
}

interface ProcessStatsProps {
  stepStats: StepStats[];
  totalSteps: number;
}

export default function ProcessStats({ stepStats, totalSteps }: ProcessStatsProps) {
  return (
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
              {stepStats.reduce((acc, s) => acc + s.candidates, 0)}
            </div>
            <div className="text-xs text-gray-600">Total de Candidatos</div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(stepStats.reduce((acc, s) => acc + s.approvalRate, 0) / stepStats.length)}%
            </div>
            <div className="text-xs text-gray-600">Taxa de Aprovação Média</div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-2xl font-bold text-purple-600">{totalSteps}</div>
            <div className="text-xs text-gray-600">Etapas Totais</div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold">Performance por Etapa</Label>
          {stepStats.map((stat, index) => (
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
                    stat.approvalRate >= 70 ? 'bg-green-500' : stat.approvalRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
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
            {stepStats
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
  );
}
