import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Textarea,
  useApplicationCases,
  useAuthCases,
} from '@/shared';

import {
  ArrowLeft,
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  Star,
  Heart,
  FileText,
  Upload,
  Send,
  Target,
  TrendingUp,
  Award,
  X,
  Info,
} from 'lucide-react';
import { useDashboard } from '@features/home/hooks';
import { toast } from 'sonner';
import { VacancyType } from '@core/domain';
import { DateTime } from 'luxon';

export const getJobLabel = (type: string) => {
  const labels: Record<VacancyType, string> = {
    full_time: 'Tempo Integral',
    part_time: 'Meio Período',
    contract: 'Contrato',
    internship: 'Estágio',
    temporary: 'Temporário',
  };
  return labels[type as VacancyType] || 'Outro';
};

export default function VacancyApplication() {
  const { id } = useParams<{ id: string }>();

  const [isSaved, setIsSaved] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [selectedResume, setSelectedResume] = useState('current');

  const { publishedVacancies } = useDashboard();
  const job = publishedVacancies?.data.find(vacancy => vacancy.id === id);
  const { create } = useApplicationCases();
  const decodedToken = useAuthCases().getDecodedToken();

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Vaga não encontrada</h2>
            <p className="text-gray-600 mb-4">A vaga que você está procurando não existe ou foi removida.</p>
            <Button onClick={() => globalThis.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleApply = () => {
    setShowApplicationModal(true);
  };

  const confirmApplication = () => {
    create({
      vacancyId: job.id,
      applicantId: decodedToken?.profileId || '',
      coverLetter: coverLetter,
      resumeUrl: selectedResume,
    });
    setShowApplicationModal(false);
    toast.success('Candidatura enviada com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex gap-4 mb-4">
                  {/* <Avatar className="w-16 h-16 border-2">
                    <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700 font-bold text-lg">
                      {job.logo}
                    </AvatarFallback>
                  </Avatar> */}
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
                    <p className="text-lg text-gray-700 mb-3">{job.title}</p>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        {getJobLabel(job.type)}
                      </span>
                      <span className="flex items-center gap-1 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        {job.salaryMax}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    50% de compatibilidade
                  </Badge>
                  <Badge variant="outline" className="text-gray-600">
                    <Clock className="w-3 h-3 mr-1" />
                    {DateTime.fromISO(job.publicationDate ?? '').toLocaleString(DateTime.DATE_MED)}
                  </Badge>
                  <Badge variant="outline" className="text-gray-600">
                    <Users className="w-3 h-3 mr-1" />
                    {job.applications.length === 0 ? 'Nenhum candidato' : `${job.applications.length} candidatos`}
                  </Badge>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 text-base"
                  onClick={handleApply}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Candidatar-se Agora
                </Button>
              </CardContent>
            </Card>

            {/* Match Alert */}
            {/* {50 >= 90 && ( */}
            <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-teal-50">
              <CardContent className="p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Excelente compatibilidade!</h3>
                  <p className="text-sm text-gray-700">
                    Seu perfil tem 50% de match com esta vaga. Suas habilidades e experiência são muito alinhadas com o
                    que a empresa busca.
                  </p>
                </div>
              </CardContent>
            </Card>
            {/* )} */}

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre a Vaga</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{job.description}</p>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Responsabilidades
                  </h3>
                  <ul className="space-y-2">
                    {job.responsibilities.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Requisitos Obrigatórios
                  </h3>
                  <ul className="space-y-2">
                    {job.requirements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                    Diferenciais
                  </h3>
                  <ul className="space-y-2">
                    {job.requirements.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <span className="text-yellow-600 flex-shrink-0">+</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Benefícios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-2">
                  {job.benefits?.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* TODO: uncomment when backend supports it */}
            {/* About Company */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Sobre a Empresa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">job.aboutCompany</p>
              </CardContent>
            </Card> */}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Apply */}
            <Card className="border-2 border-blue-200 sticky top-20">
              <CardContent className="p-4">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mb-3"
                  onClick={handleApply}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Candidatar-se
                </Button>
                <Button
                  variant="outline"
                  className={`w-full ${isSaved ? 'border-orange-600 text-orange-600' : ''}`}
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isSaved ? 'fill-orange-600' : ''}`} />
                  {isSaved ? 'Salva' : 'Salvar Vaga'}
                </Button>
              </CardContent>
            </Card>

            {/* Process */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Processo Seletivo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* {job.process.map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold text-sm flex-shrink-0">
                          {idx + 1}
                        </div>
                        {idx < job.process.length - 1 && <div className="w-0.5 h-full bg-gray-200 my-1" />}
                      </div>
                      <div className="pb-3">
                        <div className="font-medium text-sm">{step.stage}</div>
                        <div className="text-xs text-gray-600">{step.duration}</div>
                      </div>
                    </div>
                  ))} */}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-gray-700">
                  <Info className="w-4 h-4 inline mr-1" />
                  Processo estimado: 3-4 semanas
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="text-base">💡 Dicas para se destacar</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Personalize sua carta de apresentação</p>
                <p>• Destaque projetos relevantes</p>
                <p>• Revise seu LinkedIn</p>
                <p>• Seja autêntico e honesto</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>Confirmar Candidatura</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowApplicationModal(false);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Job Summary */}
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                {/* <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700 font-bold">
                    {job.logo}
                  </AvatarFallback>
                </Avatar> */}
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company.user.name}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {job.location} • {getJobLabel(job.type)}
                  </p>
                </div>
              </div>

              {/* Resume Selection */}
              <div>
                <label className="block text-sm font-semibold mb-3">Currículo</label>
                <div className="space-y-2">
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedResume === 'current'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedResume('current')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-sm">Currículo Atual</div>
                          <div className="text-xs text-gray-600">curriculo-joao-silva.pdf • Atualizado há 2 dias</div>
                        </div>
                      </div>
                      {selectedResume === 'current' && <CheckCircle2 className="w-5 h-5 text-blue-600" />}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Enviar Outro Currículo
                  </Button>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-semibold mb-2">Carta de Apresentação (Opcional)</label>
                <Textarea
                  placeholder="Conte um pouco sobre você e por que se interessa por esta vaga..."
                  rows={6}
                  value={coverLetter}
                  onChange={e => setCoverLetter(e.target.value)}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  💡 Dica: Candidatos com carta de apresentação têm 40% mais chances de serem chamados para entrevista.
                </p>
              </div>

              {/* Consent */}
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    Ao se candidatar, você concorda em compartilhar suas informações de perfil e currículo com{' '}
                    <strong>job.company</strong>.
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowApplicationModal(false)}>
                  Cancelar
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={confirmApplication}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Confirmar Candidatura
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
