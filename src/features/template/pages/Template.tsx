import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/components/ui';
import { useTemplates } from '../hooks/useTemplates';

export default function Template() {
  const { templates, defaultTemplates, isLoading, error } = useTemplates();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full p-4">
        <div className="text-lg">Carregando templates...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full h-full p-4">
        <div className="text-lg text-red-500">Erro: {error}</div>
      </div>
    );
  }

  const renderStageType = (type: string) => {
    const typeLabels: Record<string, string> = {
      screening: 'Triagem',
      interview: 'Entrevista',
      test: 'Teste',
      custom: 'Personalizado',
    };
    return typeLabels[type] || type;
  };

  const renderCategoryBadge = (category?: string) => {
    if (!category) return null;

    const categoryColors: Record<string, string> = {
      technology: 'bg-blue-100 text-blue-800',
      design: 'bg-purple-100 text-purple-800',
      sales: 'bg-green-100 text-green-800',
    };

    const categoryLabels: Record<string, string> = {
      technology: 'Tecnologia',
      design: 'Design',
      sales: 'Vendas',
    };

    return (
      <Badge className={categoryColors[category] || 'bg-gray-100 text-gray-800'}>
        {categoryLabels[category] || category}
      </Badge>
    );
  };

  const pluralizeStages = (count: number) => {
    return count === 1 ? 'etapa' : 'etapas';
  };

  const hasCustomTemplates = templates.some(t => !t.isDefault);

  return (
    <div className="w-full h-full p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Templates de Processo</h1>
      </div>

      {/* Default Templates Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Templates Padrão</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {defaultTemplates.map(template => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  {renderCategoryBadge(template.category)}
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Etapas do Processo:</h4>
                  <div className="space-y-1">
                    {template.stages.map((stage, index) => (
                      <div
                        key={stage.id || index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-md text-sm"
                      >
                        <span className="font-medium">{stage.name}</span>
                        <span className="text-gray-600">{renderStageType(stage.type)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 text-xs text-gray-500">
                    {template.stages.length} {pluralizeStages(template.stages.length)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Custom Templates Section */}
      {hasCustomTemplates && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Meus Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates
              .filter(t => !t.isDefault)
              .map(template => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      {renderCategoryBadge(template.category)}
                    </div>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Etapas do Processo:</h4>
                      <div className="space-y-1">
                        {template.stages.map((stage, index) => (
                          <div
                            key={stage.id || index}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded-md text-sm"
                          >
                            <span className="font-medium">{stage.name}</span>
                            <span className="text-gray-600">{renderStageType(stage.type)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 text-xs text-gray-500">
                        {template.stages.length} {pluralizeStages(template.stages.length)}
                        {template.createdAt && ` • Criado em ${new Date(template.createdAt).toLocaleDateString()}`}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}

      {templates.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum template encontrado</h3>
          <p className="text-gray-600">Comece criando seu primeiro template de processo seletivo.</p>
        </div>
      )}
    </div>
  );
}
