import { Card, CardContent, CardHeader, CardTitle } from '@/shared';
import { BarChart3, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

const QuickStats = ({ dashboardStats }: { dashboardStats: any }) => {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="w-5 h-5" />
          Resumo Rápido
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div>
            <div className="text-sm text-gray-600">Taxa de Conversão</div>
            <div className="text-xl font-bold text-blue-600">{dashboardStats.conversionRate}%</div>
          </div>
          <TrendingUp className="w-8 h-8 text-blue-600" />
        </div>
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <div>
            <div className="text-sm text-gray-600">Tempo Médio</div>
            <div className="text-xl font-bold text-green-600">{dashboardStats.avgProcessTime} dias</div>
          </div>
          <Clock className="w-8 h-8 text-green-600" />
        </div>
        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
          <div>
            <div className="text-sm text-gray-600">Satisfação</div>
            <div className="text-xl font-bold text-purple-600">{dashboardStats.satisfaction}/5</div>
          </div>
          <CheckCircle2 className="w-8 h-8 text-purple-600" />
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStats;
