import { Button } from '@/shared';
import { CheckCircle2, FileText } from 'lucide-react';

export default function ActionButtons() {
  return (
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
  );
}
