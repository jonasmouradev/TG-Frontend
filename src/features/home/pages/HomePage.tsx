// import { useNavigate } from 'react-router';
import { Button } from '@/shared';
import useUserContext from '@/shared/contexts/UserContext';
import { useLocation } from 'react-router';
import { CirclePlus, ChevronRight } from 'lucide-react';
import LastActivities from '@/mock/LastActivities.json';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import ChartData from '@/mock/ChartData.json';

export default function HomePage() {
  const user = useUserContext();
  const location = useLocation();

  return (
    <main className="h-screen w-screen grid grid-cols-4 grid-rows-12">
      <header className="flex flex-col col-span-4 row-span-2 p-6 gap-2">
        <h3 className="text-sm text-zinc-400">{location.pathname}</h3>
        <h1 className="text-3xl">Olá, {user.name}!</h1>
        <h2 className="text-sm text-zinc-400">Bem-vindo de volta!</h2>
      </header>
      <article className="col-span-2 row-span-6 p-6 flex flex-col gap-4">
        <div className="border-2 rounded-sm border-zinc-800 p-6 flex justify-center items-center">
          <div className="flex flex-col gap-2 items-center w-full border-r border-zinc-800">
            <span className="text-sm text-zinc-400">Em Progresso</span>
            <span className="text-4xl">1</span>
          </div>
          <div className="flex flex-col gap-2 items-center w-full border-l border-zinc-800">
            <span className="text-sm text-zinc-400">Concluídos</span>
            <span className="text-4xl">0</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <Button className="bg-transparent border-2 border-zinc-800 text-white w-full flex justify-between flex-1 [&_svg]:size-7">
            <div className="flex flex-row gap-6 items-center">
              <CirclePlus size={64} />
              <div>
                <h1 className="text-xl text-left">Vaga</h1>
                <h3 className="text-sm text-zinc-400">Criar uma nova vaga</h3>
              </div>
            </div>
            <ChevronRight />
          </Button>
          <Button className="bg-transparent border-2 border-zinc-800 text-white w-full flex justify-between flex-1 [&_svg]:size-7">
            <div className="flex flex-row gap-6 items-center">
              <CirclePlus size={64} />
              <div>
                <h1 className="text-xl text-left">Andamento</h1>
                <h3 className="text-sm text-zinc-400">Visualizar processos</h3>
              </div>
            </div>
            <ChevronRight />
          </Button>
          <Button className="bg-transparent border-2 border-zinc-800 text-white w-full flex justify-between flex-1 [&_svg]:size-7">
            <div className="flex flex-row gap-6 items-center">
              <CirclePlus size={64} />
              <div>
                <h1 className="text-xl text-left">Estatísticas</h1>
                <h3 className="text-sm text-zinc-400">Acompanhar dados</h3>
              </div>
            </div>
            <ChevronRight />
          </Button>
        </div>
      </article>
      <article className="col-span-2 row-span-6 p-6">
        <div className="border-2 rounded-sm border-zinc-800 p-6 flex justify-between items-center h-full">
          <BarChart
            width={1000}
            height={500}
            data={ChartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
          </BarChart>
        </div>
      </article>
      <section className="col-span-4 row-span-4 p-6">
        <div className="border-2 rounded-sm border-zinc-800 p-4 flex flex-col h-full">
          <h3 className="text-2xl">Últimas Atividades</h3>
          <ul>
            {LastActivities.map((activity, index) => (
              <li key={index}>
                <span className="text-sm text-zinc-400">{activity}</span>
                {index < LastActivities.length - 1 && <hr className="my-2 border-zinc-800" />}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
