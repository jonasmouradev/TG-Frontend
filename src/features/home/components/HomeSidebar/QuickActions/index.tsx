import { Button, Card, CardContent, CardHeader, CardTitle } from '@/shared';
import { Plus, Users, BarChart3, Settings } from 'lucide-react';

const QuickActions = () => {
  return (
    <Card className="border-2 bg-gradient-to-br from-blue-50 to-purple-50">
      <CardHeader>
        <CardTitle className="text-lg">Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button variant="outline" className="w-full justify-start bg-white">
          <Plus className="w-4 h-4 mr-2" />
          Criar Nova Vaga
        </Button>
        <Button variant="outline" className="w-full justify-start bg-white">
          <Users className="w-4 h-4 mr-2" />
          Buscar Candidatos
        </Button>
        <Button variant="outline" className="w-full justify-start bg-white">
          <BarChart3 className="w-4 h-4 mr-2" />
          Ver Relatórios
        </Button>
        <Button variant="outline" className="w-full justify-start bg-white">
          <Settings className="w-4 h-4 mr-2" />
          Configurações
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
