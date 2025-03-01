import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import login_bg from "@/assets/login_bg.svg";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  }

  return (
    <form onSubmit={handleSubmit(handleSignUpForm)}>
      <div className="flex items-center justify-center h-screen w-screen bg-slate-50">
        <img src={login_bg} alt="background" className="h-full w-full" />
        <div className="h-screen w-full bg-white rounded-md flex items-center justify-center">
          <div className="h-fit w-96 space-y-2 drop-shadow-md">
            <h1 className="text-2xl font-bold">Cadastro</h1>
            <Input type="name" placeholder="Nome" {...register("name")} />
            <Input type="email" placeholder="E-mail" {...register("email")} />
            <Button>Enviar confirmação</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
