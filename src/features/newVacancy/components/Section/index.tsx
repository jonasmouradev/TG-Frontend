import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/Card/card';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const Section = ({
  id,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => {
  const [expanded, setExpanded] = useState<string>('basic');

  const isExpanded = expanded === id;
  return (
    <Card className="mb-4">
      <CardHeader
        className="cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(isExpanded ? '' : id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Icon className="w-5 h-5 text-blue-600" />
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </div>
      </CardHeader>
      {isExpanded && <CardContent className="space-y-4 pt-0">{children}</CardContent>}
    </Card>
  );
};

export default Section;
