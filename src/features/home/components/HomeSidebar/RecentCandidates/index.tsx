import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared';
import { Candidate } from '@features/home/hooks/useDashboard';

const RecentCandidates = ({ recentCandidates }: { recentCandidates: Candidate[] }) => {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-lg">Candidatos Recentes</CardTitle>
        <CardDescription>Últimas candidaturas recebidas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {(recentCandidates || []).map(candidate => (
          <div
            key={candidate.id}
            className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          >
            <Avatar className="w-10 h-10 border-2 border-blue-200">
              <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold text-sm">
                {candidate.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-gray-900 truncate">{candidate.name}</div>
              <div className="text-xs text-gray-600 truncate">{candidate.job}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {candidate.stage}
                </Badge>
                <span className="text-xs text-gray-500">{candidate.time}</span>
              </div>
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full text-sm">
          Ver Todos os Candidatos
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecentCandidates;
