import {
  Button,
  Card,
  CardContent,
  Input,
  Badge,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  useVacancyCases,
} from '@/shared';
import { DeleteVacancyInput } from '@core/application';
import { Vacancy, VacancyStatus } from '@core/domain';
import {
  Plus,
  Search,
  Filter,
  Building2,
  MapPin,
  Clock,
  MoreVertical,
  Users,
  CheckCircle2,
  Eye,
  Edit,
  TrashIcon,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const ActiveVacancies = ({ recentJobs }: { recentJobs: Vacancy[] }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedVacancyId, setSelectedVacancyId] = useState<string | null>(null);

  const handleDeleteClick = (vacancyId: string) => {
    setSelectedVacancyId(vacancyId);
    setDeleteDialogOpen(true);
  };

  const vacancy = useVacancyCases();
  const handleConfirmDelete = async () => {
    if (!selectedVacancyId) {
      return;
    }
    try {
      await vacancy.delete({ id: selectedVacancyId } as DeleteVacancyInput);
    } catch (error) {
      console.error('Failed to delete vacancy:', error);
    }
    setDeleteDialogOpen(false);
    setSelectedVacancyId(null);
  };

  const getStatusColor = (status: VacancyStatus) => {
    const colors = {
      [VacancyStatus.PUBLISHED]: 'bg-green-100 text-green-700 border-green-200',
      [VacancyStatus.DRAFT]: 'bg-gray-100 text-gray-700 border-gray-200',
      [VacancyStatus.CLOSED]: 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusLabel = (status: VacancyStatus) => {
    const labels = {
      [VacancyStatus.PUBLISHED]: 'Ativa',
      [VacancyStatus.DRAFT]: 'Rascunho',
      [VacancyStatus.CLOSED]: 'Fechada',
    };
    return labels[status as keyof typeof labels];
  };

  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold mb-1">Vagas Abertas</h3>
          <p className="text-sm text-gray-600">
            {recentJobs.filter(j => j.status === 'published').length} vagas publicadas
          </p>
        </div>
        <Button onClick={() => navigate('/vacancies/new')} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Nova Vaga
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Buscar vagas..."
            className="pl-10"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="sm:w-auto">
          <Filter className="w-4 h-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Jobs List */}
      <div className="space-y-3">
        {recentJobs?.map(job => (
          <Card key={job.id} className="hover:shadow-lg transition-all border-2">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{job.title}</h4>
                    <Badge variant="outline" className={getStatusColor(job.status)}>
                      {getStatusLabel(job.status)}
                    </Badge>
                    {/* TODO implement new candidates count */}
                    {/* {job.newCandidates > 0 && (
                      <Badge className="bg-red-500 text-white">{job.newCandidates} novos</Badge>
                    )} */}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      {job.level}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />5 dias aberta
                    </span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleDeleteClick(job.id)}
                      className="cursor-pointer text-red-600 flex items-center gap-2 py-1 px-3"
                    >
                      <TrashIcon className="w-4 h-4" />
                      Excluir vaga
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="font-semibold text-gray-900">10</span>
                    <span className="text-gray-600">candidatos</span>
                  </div>
                  {job.status === 'published' && (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="font-semibold">Recebendo</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Ver</span>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Editar</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" className="w-full">
        Ver Todas as Vagas
      </Button>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esta vaga? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => handleConfirmDelete()}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActiveVacancies;
