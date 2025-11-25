import { useNewVacancy } from '@features/newVacancy/hooks';
import { Badge, Button, useTemplateCases } from '@shared/index';

export default function ProcessTemplates() {
  const { useGetProcessTemplates } = useTemplateCases();
  const { data: processTemplates } = useGetProcessTemplates({
    input: {},
    enabled: true,
  });

  const templates = processTemplates?.templates || [];
  const { applyTemplate, savedTemplates } = useNewVacancy();

  return (
    <div className="grid grid-cols-1 gap-3">
      {templates.map(template => {
        return (
          <div
            key={template.id}
            className="border-2 border-dashed rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer group"
            onClick={() => applyTemplate(template)}
          >
            <div className="flex items-start gap-3">
              {/* <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Icon className="w-6 h-6 text-white" />
              </div> */}
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors">
                  {template.name}
                </h4>
                <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                <div className="flex flex-wrap gap-1">
                  {template.stages?.map((stage, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {stage.name}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
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
            // const Icon = template.icon;
            return (
              <div
                key={template.id}
                className="border-2 border-green-200 rounded-lg p-4 hover:border-green-500 hover:bg-green-50 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 pt-2">
                      <h4 className="font-semibold text-lg group-hover:text-green-600 transition-colors">
                        {template.name}
                      </h4>
                      <Badge variant="outline" className="text-xs bg-green-100 text-green-700">
                        Personalizado
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {template.stages?.map((stage, idx) => (
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
                    onClick={() => applyTemplate(template)}
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
  );
}
