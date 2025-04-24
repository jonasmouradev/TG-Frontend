import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import login_bg from '@/assets/login_bg.svg';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router';

const signUpSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const { register, handleSubmit } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  function handleSignUpForm(data: SignUpSchema) {
    console.log(data);
    toast('Confirmação enviada');
  }

  const navigate = useNavigate();

  return (
    <form onSubmit={handleSubmit(handleSignUpForm)}>
      <div className='flex items-center justify-center h-screen w-screen bg-slate-50'>
        <Toaster position='bottom-right' />
        <img src={login_bg} alt='background' className='h-full w-full' />
        <div className='h-screen w-full bg-white rounded-md flex items-center justify-center'>
          <div className='h-fit w-96 space-y-2 drop-shadow-md flex flex-col'>
            <h1 className='text-2xl font-bold'>Cadastro</h1>
            <Input type='name' placeholder='Nome' {...register('name')} />
            <Input type='email' placeholder='E-mail' {...register('email')} />
            <Button className='w-1/2'>Enviar confirmação</Button>
            <button
              className='text-blue-800 underline'
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
