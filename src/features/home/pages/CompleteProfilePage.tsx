import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Input,
  Label,
  Textarea,
  Badge,
  useAuthCases,
} from '@/shared';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  User,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Save,
  Plus,
  X,
  Calendar,
  MapPin,
  Building2,
  Link as LinkIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { usePersonCases } from '@shared/hooks/person';
import { PersonCompetenceLevel } from '@core/domain';

export default function CompleteProfilePage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const { getToken, decodeToken } = useAuthCases();
  const token = getToken();
  const decodedToken = token ? decodeToken(token) : null;
  console.log('Decoded Token:', decodedToken);
  const { useGetPerson, ...personCases } = usePersonCases();

  const { data } = useGetPerson({ input: { id: decodedToken?.profileId ?? '' } });

  const workExperiences = data?.person.experiences ?? [];
  const educations = data?.person.formations ?? [];
  const skills = data?.person.competences ?? [];

  // Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    location: '',
    bio: '',
    linkedinProfile: '',
    githubProfile: '',
    portfolioUrl: '',
  });

  // Work Experience
  const [newWorkExperience, setNewWorkExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
  });

  // Education
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    gpa: undefined as number | undefined,
  });

  // Skills
  const [newSkill, setNewSkill] = useState({
    competenceId: '',
    level: 'intermediate' as PersonCompetenceLevel,
    yearsOfExperience: 0,
  });

  // Professional Summary
  const [professionalSummary, setProfessionalSummary] = useState('');
  const [desiredPosition, setDesiredPosition] = useState('');
  const [desiredSalary, setDesiredSalary] = useState('');

  const calculateProgress = () => {
    let completedFields = 0;
    const totalFields = 8;

    if (personalInfo.firstName && personalInfo.lastName) completedFields++;
    if (personalInfo.phone) completedFields++;
    if (personalInfo.bio) completedFields++;
    if (workExperiences.length > 0) completedFields++;
    if (educations.length > 0) completedFields++;
    if (skills.length > 0) completedFields++;
    if (professionalSummary) completedFields++;
    if (desiredPosition) completedFields++;

    return Math.round((completedFields / totalFields) * 100);
  };

  const addWorkExperience = () => {
    if (newWorkExperience.company && newWorkExperience.position) {
      personCases.addWorkExperience({ id: decodedToken?.profileId ?? '', payload: newWorkExperience });
      setNewWorkExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        description: '',
      });
    }
  };

  const removeWorkExperience = (workExperienceId: string) => {
    personCases.removeWorkExperience({ id: decodedToken?.profileId ?? '', workExperienceId });
  };

  const addEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      personCases.addEducation({ id: decodedToken?.profileId ?? '', payload: newEducation });
      setNewEducation({
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        gpa: undefined,
      });
    }
  };

  const removeEducation = (educationId: string) => {
    personCases.removeEducation({ id: decodedToken?.profileId ?? '', educationId });
  };

  const addSkill = () => {
    if (newSkill.competenceId) {
      personCases.addCompetence({ id: decodedToken?.profileId ?? '', payload: newSkill });
      setNewSkill({
        competenceId: '',
        level: 'intermediate' as PersonCompetenceLevel,
        yearsOfExperience: 0,
      });
    }
  };

  const removeSkill = (competenceId: string) => {
    personCases.removeCompetence({ id: decodedToken?.profileId ?? '', competenceId });
  };

  const handleSaveProfile = async () => {
    // TODO: Integrate with use case to save profile
    console.log('Saving profile...', {
      personalInfo,
      workExperiences,
      educations,
      skills,
      professionalSummary,
      desiredPosition,
      desiredSalary,
    });
    navigate('/home');
  };

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return User;
      case 2:
        return Briefcase;
      case 3:
        return GraduationCap;
      case 4:
        return Award;
      case 5:
        return FileText;
      default:
        return User;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Informações Pessoais</h3>
              <p className="text-sm text-gray-600">Preencha seus dados básicos</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Nome *</Label>
                <Input
                  id="firstName"
                  value={personalInfo.firstName}
                  onChange={e => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Sobrenome *</Label>
                <Input
                  id="lastName"
                  value={personalInfo.lastName}
                  onChange={e => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                  placeholder="Seu sobrenome"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Data de Nascimento</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={personalInfo.dateOfBirth}
                  onChange={e => setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone *</Label>
                <Input
                  id="phone"
                  value={personalInfo.phone}
                  onChange={e => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Localização</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="location"
                  className="pl-10"
                  value={personalInfo.location}
                  onChange={e => setPersonalInfo({ ...personalInfo, location: e.target.value })}
                  placeholder="Cidade, Estado"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio / Resumo Profissional *</Label>
              <Textarea
                id="bio"
                rows={4}
                value={personalInfo.bio}
                onChange={e => setPersonalInfo({ ...personalInfo, bio: e.target.value })}
                placeholder="Conte um pouco sobre você, suas experiências e objetivos profissionais..."
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">{personalInfo.bio.length}/500 caracteres</p>
            </div>

            <div className="space-y-3">
              <Label>Links Profissionais</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  className="pl-10"
                  value={personalInfo.linkedinProfile}
                  onChange={e => setPersonalInfo({ ...personalInfo, linkedinProfile: e.target.value })}
                  placeholder="LinkedIn (https://linkedin.com/in/...)"
                />
              </div>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  className="pl-10"
                  value={personalInfo.githubProfile}
                  onChange={e => setPersonalInfo({ ...personalInfo, githubProfile: e.target.value })}
                  placeholder="GitHub (https://github.com/...)"
                />
              </div>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  className="pl-10"
                  value={personalInfo.portfolioUrl}
                  onChange={e => setPersonalInfo({ ...personalInfo, portfolioUrl: e.target.value })}
                  placeholder="Portfólio (https://...)"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Experiência Profissional</h3>
              <p className="text-sm text-gray-600">Adicione suas experiências de trabalho</p>
            </div>

            {/* List of added experiences */}
            {workExperiences.length > 0 && (
              <div className="space-y-3">
                {workExperiences.map(exp => (
                  <Card key={exp.personId} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-base">{exp.position}</h4>
                          <p className="text-sm text-gray-600">{exp.companyName}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {exp.startDate.toFormat('MM/yyyy')} -{' '}
                            {exp.isCurrent ? 'Atual' : (exp.endDate?.toFormat('MM/yyyy') ?? '')}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeWorkExperience(exp.personId)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      {exp.description && <p className="text-sm text-gray-700 mt-2">{exp.description}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Add new experience form */}
            <Card className="border-2 border-dashed border-blue-300">
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="position">Cargo *</Label>
                    <Input
                      id="position"
                      value={newWorkExperience.position}
                      onChange={e => setNewWorkExperience({ ...newWorkExperience, position: e.target.value })}
                      placeholder="Ex: Desenvolvedor Full Stack"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Empresa *</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="company"
                        className="pl-10"
                        value={newWorkExperience.company}
                        onChange={e => setNewWorkExperience({ ...newWorkExperience, company: e.target.value })}
                        placeholder="Nome da empresa"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Data de Início</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="startDate"
                        type="month"
                        className="pl-10"
                        value={newWorkExperience.startDate}
                        onChange={e => setNewWorkExperience({ ...newWorkExperience, startDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="endDate">Data de Término</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="endDate"
                        type="month"
                        className="pl-10"
                        value={newWorkExperience.endDate}
                        onChange={e => setNewWorkExperience({ ...newWorkExperience, endDate: e.target.value })}
                        disabled={newWorkExperience.isCurrent}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isCurrent"
                    checked={newWorkExperience.isCurrent}
                    onChange={e =>
                      setNewWorkExperience({ ...newWorkExperience, isCurrent: e.target.checked, endDate: '' })
                    }
                    className="w-4 h-4"
                  />
                  <Label htmlFor="isCurrent" className="cursor-pointer">
                    Trabalho atualmente nesta empresa
                  </Label>
                </div>

                <div>
                  <Label htmlFor="description">Descrição das Atividades</Label>
                  <Textarea
                    id="description"
                    rows={3}
                    value={newWorkExperience.description}
                    onChange={e => setNewWorkExperience({ ...newWorkExperience, description: e.target.value })}
                    placeholder="Descreva suas principais responsabilidades e conquistas..."
                  />
                </div>

                <Button onClick={addWorkExperience} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Experiência
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Formação Acadêmica</h3>
              <p className="text-sm text-gray-600">Adicione sua educação formal</p>
            </div>

            {/* List of added education */}
            {educations.length > 0 && (
              <div className="space-y-3">
                {educations.map(edu => {
                  let endDateText = '';
                  if (edu.isCurrent) {
                    endDateText = 'Cursando';
                  } else if (edu.endDate) {
                    endDateText = new Date(edu.endDate).toLocaleDateString('pt-BR', {
                      month: '2-digit',
                      year: 'numeric',
                    });
                  }

                  return (
                    <Card key={edu.id} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-base">{edu.degree}</h4>
                            <p className="text-sm text-gray-600">{edu.fieldOfStudy}</p>
                            <p className="text-sm text-gray-600">{edu.institutionName}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(edu.startDate).toLocaleDateString('pt-BR', {
                                month: '2-digit',
                                year: 'numeric',
                              })}{' '}
                              - {endDateText}
                            </p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeEducation(edu.id)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Add new education form */}
            <Card className="border-2 border-dashed border-blue-300">
              <CardContent className="p-4 space-y-4">
                <div>
                  <Label htmlFor="institution">Instituição *</Label>
                  <Input
                    id="institution"
                    value={newEducation.institution}
                    onChange={e => setNewEducation({ ...newEducation, institution: e.target.value })}
                    placeholder="Nome da instituição"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="degree">Grau *</Label>
                    <Input
                      id="degree"
                      value={newEducation.degree}
                      onChange={e => setNewEducation({ ...newEducation, degree: e.target.value })}
                      placeholder="Ex: Bacharelado, Tecnólogo, Mestrado..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="fieldOfStudy">Área de Estudo *</Label>
                    <Input
                      id="fieldOfStudy"
                      value={newEducation.fieldOfStudy}
                      onChange={e => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
                      placeholder="Ex: Ciência da Computação"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eduStartDate">Data de Início</Label>
                    <Input
                      id="eduStartDate"
                      type="month"
                      value={newEducation.startDate}
                      onChange={e => setNewEducation({ ...newEducation, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="eduEndDate">Data de Término</Label>
                    <Input
                      id="eduEndDate"
                      type="month"
                      value={newEducation.endDate}
                      onChange={e => setNewEducation({ ...newEducation, endDate: e.target.value })}
                      disabled={newEducation.isCurrent}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isCurrentEdu"
                    checked={newEducation.isCurrent}
                    onChange={e => setNewEducation({ ...newEducation, isCurrent: e.target.checked, endDate: '' })}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="isCurrentEdu" className="cursor-pointer">
                    Estou cursando atualmente
                  </Label>
                </div>

                <Button onClick={addEducation} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Formação
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Habilidades e Competências</h3>
              <p className="text-sm text-gray-600">Adicione suas principais habilidades técnicas e comportamentais</p>
            </div>

            {/* List of added skills */}
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map(skill => (
                  <Badge
                    key={skill.competence_id}
                    className="bg-blue-100 text-blue-700 px-3 py-2 text-sm flex items-center gap-2"
                  >
                    {skill.competence_id}
                    <span className="text-xs px-2 py-0.5 bg-blue-200 rounded">
                      {skill.proficiency_level === 'beginner' && 'Iniciante'}
                      {skill.proficiency_level === 'intermediate' && 'Intermediário'}
                      {skill.proficiency_level === 'advanced' && 'Avançado'}
                      {skill.proficiency_level === 'expert' && 'Especialista'}
                    </span>
                    <button onClick={() => removeSkill(skill.competence_id)} className="hover:text-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Add new skill form */}
            <Card className="border-2 border-dashed border-blue-300">
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="skillName">Habilidade *</Label>
                    <Input
                      id="skillName"
                      value={newSkill.competenceId}
                      onChange={e => setNewSkill({ ...newSkill, competenceId: e.target.value })}
                      placeholder="Ex: React, JavaScript, Gestão de Projetos..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="skillLevel">Nível *</Label>
                    <select
                      id="skillLevel"
                      className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm"
                      value={newSkill.level}
                      onChange={e =>
                        setNewSkill({
                          ...newSkill,
                          level: e.target.value as PersonCompetenceLevel,
                        })
                      }
                    >
                      <option value="beginner">Iniciante</option>
                      <option value="intermediate">Intermediário</option>
                      <option value="advanced">Avançado</option>
                      <option value="expert">Especialista</option>
                    </select>
                  </div>
                </div>

                <Button onClick={addSkill} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Habilidade
                </Button>
              </CardContent>
            </Card>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Dica:</strong> Adicione habilidades relevantes para as vagas que você deseja. Seja específico e
                honesto sobre seu nível de conhecimento.
              </p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Objetivos Profissionais</h3>
              <p className="text-sm text-gray-600">Defina suas preferências e objetivos de carreira</p>
            </div>

            <div>
              <Label htmlFor="professionalSummary">Resumo Profissional</Label>
              <Textarea
                id="professionalSummary"
                rows={5}
                value={professionalSummary}
                onChange={e => setProfessionalSummary(e.target.value)}
                placeholder="Descreva seus objetivos profissionais, áreas de interesse e o que você busca em uma oportunidade de trabalho..."
                maxLength={1000}
              />
              <p className="text-xs text-gray-500 mt-1">{professionalSummary.length}/1000 caracteres</p>
            </div>

            <div>
              <Label htmlFor="desiredPosition">Cargo Desejado</Label>
              <Input
                id="desiredPosition"
                value={desiredPosition}
                onChange={e => setDesiredPosition(e.target.value)}
                placeholder="Ex: Desenvolvedor Full Stack Sênior"
              />
            </div>

            <div>
              <Label htmlFor="desiredSalary">Pretensão Salarial</Label>
              <Input
                id="desiredSalary"
                value={desiredSalary}
                onChange={e => setDesiredSalary(e.target.value)}
                placeholder="Ex: R$ 8.000 - R$ 12.000"
              />
            </div>

            <Card className="border-2 bg-gradient-to-br from-green-50 to-teal-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Perfil {calculateProgress()}% Completo!</h4>
                    <p className="text-sm text-gray-700 mb-4">
                      Seu perfil está quase pronto. Clique em "Salvar Perfil" para finalizar e começar a se candidatar
                      às vagas.
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-600 to-teal-600 transition-all"
                          style={{ width: `${calculateProgress()}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{calculateProgress()}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map(step => {
              const StepIcon = getStepIcon(step);
              const isCompleted = step < currentStep;
              const isCurrent = step === currentStep;

              const getStepColor = () => {
                if (isCompleted) return 'bg-green-600';
                if (isCurrent) return 'bg-blue-600';
                return 'bg-gray-200';
              };

              return (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${getStepColor()}`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : (
                        <StepIcon className={`w-6 h-6 ${isCurrent ? 'text-white' : 'text-gray-500'}`} />
                      )}
                    </div>
                    <div className="text-xs mt-2 text-center">
                      {step === 1 && 'Pessoal'}
                      {step === 2 && 'Experiência'}
                      {step === 3 && 'Educação'}
                      {step === 4 && 'Habilidades'}
                      {step === 5 && 'Objetivos'}
                    </div>
                  </div>
                  {step < totalSteps && (
                    <div className={`flex-1 h-1 mx-2 ${step < currentStep ? 'bg-green-600' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-2 shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                {(() => {
                  const Icon = getStepIcon(currentStep);
                  return <Icon className="w-5 h-5 text-blue-600" />;
                })()}
              </div>
              <div>
                <CardTitle className="text-xl">
                  Etapa {currentStep} de {totalSteps}
                </CardTitle>
                <CardDescription>Preencha as informações abaixo</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          {currentStep < totalSteps ? (
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
            >
              Próximo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleSaveProfile}>
              <Save className="w-4 h-4 mr-2" />
              Salvar Perfil
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
