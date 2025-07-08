import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import login_bg from '@/assets/login_bg.svg';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster } from 'sonner';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks';

const signUpSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signUp, isLoading } = useAuth();

  const { register, handleSubmit } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  function handleSignUpForm(data: SignUpSchema) {
    signUp({
      ...data,
      type: 'PERSON',
    });
  }

  return (
    <form onSubmit={handleSubmit(handleSignUpForm)}>
      <div className="flex items-center justify-center h-screen w-screen bg-slate-50">
        <Toaster position="bottom-right" />
        <img src={login_bg} alt="background" className="h-full w-full" />
        <div className="h-screen w-full bg-white rounded-md flex items-center justify-center">
          <div className="h-fit w-96 space-y-2 drop-shadow-md flex flex-col">
            <h1 className="text-2xl font-bold">Cadastro</h1>
            <Input type="text" placeholder="Nome" {...register('name')} />
            <Input
              type="text"
              placeholder="Nome de usuário"
              {...register('username')}
            />
            <Input type="email" placeholder="E-mail" {...register('email')} />
            <Input
              type="password"
              placeholder="Senha"
              {...register('password')}
            />
            <Button className="w-1/2" disabled={isLoading}>
              {isLoading ? 'Criando conta...' : 'Criar conta'}
            </Button>
            <button
              type="button"
              className="text-blue-800 underline"
              onClick={() => navigate('/')}
            >
              Já tem uma conta? Faça login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
