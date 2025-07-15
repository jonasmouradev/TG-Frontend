// import { useNavigate } from 'react-router';
import useUserContext from '@/shared/contexts/UserContext';
import { useLocation } from 'react-router';

export default function HomePage() {
  const user = useUserContext();
  const location = useLocation();

  return (
    <main className="bg-zinc-950 h-screen w-screen grid grid-cols-4 grid-rows-10">
      <header className="col-span-4 row-span-1 p-6">
        <h3 className="text-sm">{location.pathname}</h3>
        <h1 className="text-3xl">Olá, {user.name}!</h1>
        <h2 className="text-sm">Bem-vindo de volta!</h2>
      </header>
      <article className="col-span-2 row-span-2 p-6">
        <div className="border-2 rounded-sm border-zinc-800 p-6 flex justify-center items-center">
          <div className="flex flex-col gap-2 items-center w-full border-r border-zinc-800">
            <p className="text-sm">Em Progresso</p>
            <p className="text-4xl">1</p>
          </div>
          <div className="flex flex-col gap-2 items-center w-full border-l border-zinc-800">
            <p className="text-sm">Concluídos</p>
            <p className="text-4xl">0</p>
          </div>
        </div>
      </article>
      <article className="col-span-2 row-span-0 p-6">
        <div className="border-2 rounded-sm border-zinc-800 p-6 flex justify-between items-center">Teste</div>
      </article>
    </main>
  );
}
