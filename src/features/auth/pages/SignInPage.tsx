import { useState } from 'react';
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
} from '@/shared';
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Users,
  Briefcase,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const features = [
    { icon: Briefcase, title: 'Gestão de Vagas', description: 'Crie e gerencie vagas facilmente' },
    { icon: Users, title: 'Candidatos', description: 'Acompanhe todo o processo seletivo' },
    { icon: TrendingUp, title: 'Análises', description: 'Relatórios e estatísticas em tempo real' },
    { icon: Sparkles, title: 'Templates', description: 'Modelos pré-definidos para otimizar o processo' },
  ];

  const stats = [
    { value: '1', label: 'Empresas' },
    { value: '0', label: 'Candidatos' },
    { value: '100%', label: 'Satisfação' },
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding & Features */}
        <div className="hidden lg:block space-y-8">
          {/* Logo & Title */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Seleto
                </h1>
                <p className="text-gray-600">Sistema de Recrutamento Inteligente</p>
              </div>
            </div>
          </div>

          {/* Main Tagline */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Encontre os melhores talentos para sua empresa
            </h2>
            <p className="text-lg text-gray-600">
              Simplifique seu processo de recrutamento com tecnologia de ponta e inteligência artificial.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-8 py-6 border-y border-gray-200">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-1">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/60 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{feature.title}</div>
                    <div className="text-xs text-gray-600">{feature.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex flex-col items-center">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg mx-auto mb-4">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Seleto
            </h1>
            <p className="text-sm text-gray-600">Sistema de Recrutamento</p>
          </div>

          <Card className="w-full max-w-md border-2 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-center">Bem-vindo de volta!</CardTitle>
              <CardDescription className="text-center">
                Entre com suas credenciais para acessar sua conta
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Account Type Selector */}
              <div className="grid grid-cols-2 gap-3 p-1 bg-gray-100 rounded-lg">
                <Button variant="ghost" className="bg-white shadow-sm hover:bg-white border border-blue-200">
                  <Building2 className="w-4 h-4 mr-2" />
                  Empresa
                </Button>
                <Button variant="ghost" className="hover:bg-white/50">
                  <Users className="w-4 h-4 mr-2" />
                  Candidato
                </Button>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={checked => setRememberMe(checked as boolean)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Lembrar-me
                  </label>
                </div>
                <Button variant="link" className="text-sm p-0 h-auto">
                  Esqueceu a senha?
                </Button>
              </div>

              {/* Login Button */}
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                size="lg"
              >
                Entrar
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-gray-600">
                Não tem uma conta?{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto font-semibold text-blue-600"
                  onClick={() => navigate('/signup')}
                >
                  Cadastre-se gratuitamente
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Plataforma segura e confiável</span>
              </div>
            </CardFooter>
          </Card>

          {/* Mobile Stats */}
          <div className="lg:hidden mt-8 flex justify-center gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
