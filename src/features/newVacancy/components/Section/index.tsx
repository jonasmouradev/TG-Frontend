import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui';
import { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronRight } from 'lucide-react';

const Section = ({
  id,
  title,
  icon: Icon,
  children,
  completed = false,
}: {
  id: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  completed?: boolean;
}) => {
  const [expanded, setExpanded] = useState<string>('basic');

  const isExpanded = expanded === id;
  return (
    <Card className="mb-4 transition-all hover:shadow-md">
      <CardHeader
        className="cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(isExpanded ? '' : id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg ${completed ? 'bg-green-100' : 'bg-blue-100'} flex items-center justify-center`}
            >
              {completed ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <Icon className="w-5 h-5 text-blue-600" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              {completed && <span className="text-xs text-green-600">Concluído</span>}
            </div>
          </div>
          {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </div>
      </CardHeader>
      {isExpanded && <CardContent className="space-y-4 pt-0">{children}</CardContent>}
    </Card>
  );
};

export default Section;
