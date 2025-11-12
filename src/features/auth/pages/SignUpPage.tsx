import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Button,
  Input,
  Label,
  Checkbox,
  Badge,
  paths,
} from '@/shared';

import { Building2, Eye, EyeOff, ArrowRight, CheckCircle2, Users, Zap, Crown, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { container } from '@/core/infra/container';
import { SignUpUseCase } from '@/core/application/use-cases/auth/sign-up.use-case';

export default function SignupScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState<'COMPANY' | 'PERSON'>('COMPANY');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
    companyName: '',
    cnpj: '',
    companySize: '',
    industry: '',
    phone: '',
    fullName: '',
    cpf: '',
    birthDate: '',
    phoneCandidate: '',
  });

  const [passwordStrength, setPasswordStrength] = useState(0);

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    if (field === 'password' && typeof value === 'string') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthLabel = () => {
    const labels = ['Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte'];
    return labels[passwordStrength] || labels[0];
  };

  const getPasswordStrengthColor = () => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-600'];
    return colors[passwordStrength] || colors[0];
  };

  const plans = [
    {
      name: 'Starter',
      price: 'Grátis',
      description: 'Perfeito para começar',
      features: [
        { text: '3 vagas ativas simultaneamente', included: true },
        { text: '50 candidatos/mês', included: true },
        { text: 'Suporte por email', included: true },
        { text: 'Análises básicas', included: true },
        { text: 'API integrada', included: false },
        { text: 'IA para triagem', included: false },
      ],
      icon: Zap,
      popular: false,
    },
    {
      name: 'Professional',
      price: 'R$ xx',
      period: '/mês',
      description: 'Para empresas em crescimento',
      features: [
        { text: 'Vagas ilimitadas', included: true },
        { text: 'Candidatos ilimitados', included: true },
        { text: 'Suporte prioritário', included: true },
        { text: 'Análises avançadas', included: true },
        { text: 'API integrada', included: true },
        { text: 'IA para triagem', included: true },
      ],
      icon: Crown,
      popular: true,
    },
  ];

  const benefits = [
    'Templates adaptados para sua vaga',
    'Processo de recrutamento 3x mais rápido',
    'Dashboard completo de métricas',
    'Comunicação automatizada com candidatos',
    'Suporte dedicado para empresas',
  ];

  async function handleSubmit() {
    const useCase = new SignUpUseCase(container.authGateway);
    const response = await useCase.execute({
      email: formData.email,
      password: formData.password,
      type: accountType,
      name: formData.companyName,
      username: formData.companyName,
      // cnpj: formData.cnpj,
      // phone: formData.phone,
      // fullName: formData.fullName,
      // cpf: formData.cpf,
      // phoneCandidate: formData.phoneCandidate,
    });
    console.log(response);
    if (response.status === 201) {
      navigate(paths.SIGN_IN);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Seleto
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">Comece sua jornada de recrutamento inteligente</p>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {[1, 2, 3].map(s => (
              <React.Fragment key={s}>
                <div className={`flex items-center gap-2 ${step >= s ? 'opacity-100' : 'opacity-40'}`}>
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step >= s
                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white border-2 border-gray-300 text-gray-400'
                    }`}
                  >
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-gray-700">
                    {s === 1 && 'Tipo de Conta'}
                    {s === 2 && 'Informações'}
                    {s === 3 && 'Plano'}
                  </span>
                </div>
                {s < 3 && (
                  <div
                    className={`h-0.5 w-12 sm:w-24 transition-all ${step > s ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-300'}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <Card className="border-2 shadow-xl bg-white/80 backdrop-blur-sm">
              {step === 1 && (
                <>
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Escolha o tipo de conta</CardTitle>
                    <CardDescription>Selecione como você deseja usar a plataforma</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button
                        onClick={() => setAccountType('COMPANY')}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                          accountType === 'COMPANY'
                            ? 'border-blue-600 bg-blue-50 shadow-lg'
                            : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-lg ${
                            accountType === 'COMPANY' ? 'bg-blue-600' : 'bg-gray-200'
                          } flex items-center justify-center mb-4`}
                        >
                          <Building2
                            className={`w-6 h-6 ${accountType === 'COMPANY' ? 'text-white' : 'text-gray-600'}`}
                          />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Empresa</h3>
                        <p className="text-sm text-gray-600">
                          Publique vagas e encontre os melhores talentos para sua equipe
                        </p>
                        {accountType === 'COMPANY' && <Badge className="mt-3 bg-blue-600">Selecionado</Badge>}
                      </button>

                      <button
                        onClick={() => setAccountType('PERSON')}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                          accountType === 'PERSON'
                            ? 'border-purple-600 bg-purple-50 shadow-lg'
                            : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                        }`}
                      >
                        <div
                          className={`w-12 h-12 rounded-lg ${
                            accountType === 'PERSON' ? 'bg-purple-600' : 'bg-gray-200'
                          } flex items-center justify-center mb-4`}
                        >
                          <Users className={`w-6 h-6 ${accountType === 'PERSON' ? 'text-white' : 'text-gray-600'}`} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Candidato</h3>
                        <p className="text-sm text-gray-600">
                          Encontre oportunidades e candidate-se às melhores vagas do mercado
                        </p>
                        {accountType === 'PERSON' && <Badge className="mt-3 bg-purple-600">Selecionado</Badge>}
                      </button>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <strong>Dica:</strong> Você poderá alterar ou adicionar outro tipo de conta posteriormente nas
                        configurações.
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() => setStep(2)}
                    >
                      Continuar
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </>
              )}

              {step === 2 && (
                <>
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">
                      {accountType === 'COMPANY' ? 'Dados da Empresa' : 'Dados Pessoais'}
                    </CardTitle>
                    <CardDescription>
                      {accountType === 'COMPANY'
                        ? 'Preencha as informações da sua empresa'
                        : 'Preencha suas informações pessoais'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {accountType === 'COMPANY' ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Nome da Empresa</Label>
                          <Input
                            id="companyName"
                            placeholder="Ex: Tech Solutions Ltda"
                            value={formData.companyName}
                            onChange={e => updateFormData('companyName', e.target.value)}
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cnpj">CNPJ</Label>
                            <Input
                              id="cnpj"
                              placeholder="00.000.000/0000-00"
                              value={formData.cnpj}
                              onChange={e => updateFormData('cnpj', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Telefone</Label>
                            <Input
                              id="phone"
                              placeholder="(11) 98765-4321"
                              value={formData.phone}
                              onChange={e => updateFormData('phone', e.target.value)}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Nome Completo</Label>
                          <Input
                            id="fullName"
                            placeholder="João Silva Santos"
                            value={formData.fullName}
                            onChange={e => updateFormData('fullName', e.target.value)}
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cpf">CPF</Label>
                            <Input
                              id="cpf"
                              placeholder="000.000.000-00"
                              value={formData.cpf}
                              onChange={e => updateFormData('cpf', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phoneCandidate">Telefone</Label>
                            <Input
                              id="phoneCandidate"
                              placeholder="(11) 98765-4321"
                              value={formData.phoneCandidate}
                              onChange={e => updateFormData('phoneCandidate', e.target.value)}
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="border-t pt-4 mt-6">
                      <h3 className="font-semibold mb-4">Credenciais de Acesso</h3>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">E-mail</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={e => updateFormData('email', e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password">Senha</Label>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="••••••••"
                              value={formData.password}
                              onChange={e => updateFormData('password', e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                          {formData.password && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span>Força da senha:</span>
                                <span className="font-semibold">{getPasswordStrengthLabel()}</span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full transition-all ${getPasswordStrengthColor()}`}
                                  style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Voltar
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600" onClick={() => setStep(3)}>
                      Continuar
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </>
              )}

              {step === 3 && (
                <>
                  <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">
                      {accountType === 'COMPANY' ? 'Escolha seu plano' : 'Finalize seu cadastro'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {accountType === 'COMPANY' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {plans.map(plan => {
                          const Icon = plan.icon;
                          return (
                            <div
                              key={plan.name}
                              className={`relative p-6 border-2 rounded-xl ${
                                plan.popular ? 'border-gray-600 bg-purple-50' : 'border-gray-200'
                              }`}
                            >
                              {plan.popular && (
                                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gray-600">
                                  Em breve
                                </Badge>
                              )}
                              <div className="flex items-center gap-3 mb-4">
                                <div
                                  className={`w-10 h-10 rounded-lg ${
                                    plan.popular ? 'bg-gray-600' : 'bg-blue-600'
                                  } flex items-center justify-center`}
                                >
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-bold">{plan.name}</h3>
                                  <p className="text-xs text-gray-600">{plan.description}</p>
                                </div>
                              </div>

                              <div className="mb-4">
                                <span className="text-3xl font-bold">{plan.price}</span>
                                {plan.period && <span className="text-gray-600">{plan.period}</span>}
                              </div>

                              <div className="space-y-2 mb-4">
                                {plan.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-sm">
                                    {feature.included ? (
                                      <Check className="w-4 h-4 text-green-600" />
                                    ) : (
                                      <X className="w-4 h-4 text-gray-400" />
                                    )}
                                    <span>{feature.text}</span>
                                  </div>
                                ))}
                              </div>

                              <Button
                                disabled={plan.popular}
                                className="w-full hover:bg-transparent"
                                variant={plan.popular ? 'default' : 'outline'}
                              >
                                {plan.popular ? 'Em breve' : 'Selecionado'}
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Sua conta está quase pronta!</h4>
                          <p className="text-sm text-gray-700">Como candidato, você terá acesso a milhares de vagas</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.terms}
                        onCheckedChange={checked => updateFormData('terms', checked)}
                      />
                      <label htmlFor="terms" className="text-sm">
                        Concordo com os Termos de Uso
                      </label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Voltar
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                      disabled={!formData.terms}
                      onClick={handleSubmit}
                    >
                      Criar Conta
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardFooter>
                </>
              )}
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Por que Seleto?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {benefits.slice(0, 4).map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 bg-gradient-to-br from-green-50 to-teal-50">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-bold text-green-600">1</div>
                    <div className="text-xs">Empresas</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600">0</div>
                    <div className="text-xs">Candidatos</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="text-sm text-center text-gray-600">
              Já possui uma conta?{' '}
              <Button
                variant="link"
                className="p-0 h-auto font-semibold text-blue-600"
                onClick={() => navigate(paths.SIGN_IN)}
              >
                Entre novamente
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
