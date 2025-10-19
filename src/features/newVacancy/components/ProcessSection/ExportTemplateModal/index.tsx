import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, Input, Label, Textarea } from '@/shared';
import { Download } from 'lucide-react';

interface ExportTemplateModalProps {
  templateName: string;
  setTemplateName: (name: string) => void;
  templateDescription: string;
  setTemplateDescription: (desc: string) => void;
  stagesCount: number;
  onCancel: () => void;
  onExport: () => void;
}

export default function ExportTemplateModal({
  templateName,
  setTemplateName,
  templateDescription,
  setTemplateDescription,
  stagesCount,
  onCancel,
  onExport,
}: ExportTemplateModalProps) {
  return (
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
              Este template salvará {stagesCount} etapa{stagesCount !== 1 ? 's' : ''} e poderá ser reutilizado em
              futuras vagas.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onCancel}>
            Cancelar
          </Button>
          <Button className="flex-1" onClick={onExport} disabled={!templateName.trim()}>
            <Download className="w-4 h-4 mr-2" />
            Salvar Template
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
