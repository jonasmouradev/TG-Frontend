import { Button } from '@/styles/styledComponents/Button';
import { Input } from '@/styles/styledComponents/Input';
import login_bg from '@/assets/login_bg.svg';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router';
import RedirectLink from '@/components/sign/Redirect';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type SignInSchema = z.infer<typeof signInSchema>;

export default function SignUp() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  function handleSignInForm(data: SignInSchema) {
    console.log(data);
    toast('Logado com sucesso');
    navigate('/home');
  }

  return (
    <form onSubmit={handleSubmit(handleSignInForm)}>
      <div className='flex items-center justify-center h-screen w-screen bg-slate-50'>
        <Toaster position='bottom-right' />
        <img src={login_bg} alt='background' className='h-full w-full' />
        <div className='h-screen w-full bg-white rounded-md flex items-center justify-center'>
          <div className='h-fit w-96 space-y-2 drop-shadow-md flex flex-col'>
            <h1 className='text-2xl font-bold'>Login</h1>
            <Input placeholder='E-mail' {...register('email')} />
            <Input
              type='password'
              placeholder='Senha'
              {...register('password')}
            />
            <Button $backgroundColor='#3d3d3d'>Entrar</Button>
            <RedirectLink
              navigate={() => navigate('/signUp')}
              path='Cadastro'
              text='Ainda não possui uma conta? Cadastre-se'
            ></RedirectLink>
          </div>
        </div>
      </div>
    </form>
  );
}
