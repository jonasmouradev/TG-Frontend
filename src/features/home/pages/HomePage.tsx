// import { useNavigate } from 'react-router';
import { Button } from '@/shared';
import useUserContext from '@/shared/contexts/UserContext';
import { useLocation } from 'react-router';
import { CirclePlus, ChevronRight, Calendar, ChartColumnBig } from 'lucide-react';
import LastActivities from '@/mock/LastActivities.json';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import ChartData from '@/mock/ChartData.json';
import { ReactNode } from 'react';

export default function HomePage() {
  const user = useUserContext();
  const location = useLocation();

  const HomeButton = ({ icon, title, subtitle }: { icon: ReactNode; title: string; subtitle: string }) => (
    <Button className="bg-white dark:bg-zinc-950 border dark:border-gray-800 text-gray-800 dark:text-white w-full flex justify-between flex-1 [&_svg]:size-7 hover:bg-gray-50 dark:hover:bg-gray-900 shadow-md">
      <div className="flex flex-row gap-6 items-center">
        {icon}
        <div>
          <h1 className="text-xl text-left">{title}</h1>
          <h3 className="text-sm text-gray-600 dark:text-zinc-400">{subtitle}</h3>
        </div>
      </div>
      <ChevronRight className="dark:text-zinc-400" />
    </Button>
  );

  return (
    <main className="h-screen w-screen grid grid-cols-4 grid-rows-12">
      <header className="flex flex-col col-span-4 row-span-2 p-6 gap-2">
        <h3 className="text-sm text-gray-600 dark:text-gray-400">{location.pathname}</h3>
        <h1 className="text-3xl">Olá, {user.name}!</h1>
        <h2 className="text-sm text-gray-600 dark:text-gray-400">Bem-vindo de volta!</h2>
      </header>
      <article className="col-span-2 row-span-6 p-6 flex flex-col gap-4">
        <div className="dark:bg-zinc-950 border shadow-md rounded-sm dark:border-gray-800 p-6 flex justify-center items-center">
          <div className="flex flex-col gap-2 items-center w-full border-r dark:border-gray-800">
            <span className="text-sm dark:text-zinc-400">Em Progresso</span>
            <span className="text-4xl">1</span>
          </div>
          <div className="flex flex-col gap-2 items-center w-full border-l dark:border-gray-800">
            <span className="text-sm dark:text-zinc-400">Concluídos</span>
            <span className="text-4xl">0</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <HomeButton icon={<CirclePlus size={64} />} title="Vaga" subtitle="Criar uma nova vaga" />
          <HomeButton icon={<Calendar size={64} />} title="Andamento" subtitle="Visualizar processos" />
          <HomeButton icon={<ChartColumnBig size={64} />} title="Estatísticas" subtitle="Acompanhar dados" />
        </div>
      </article>
      <article className="col-span-2 row-span-6 p-6">
        <div className="dark:bg-zinc-950 border shadow-md rounded-sm dark:border-gray-800 p-6 flex justify-between items-center h-full">
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
            <Legend width={500} height={70} />
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
          </BarChart>
        </div>
      </article>
      <section className="col-span-4 row-span-4 p-6">
        <div className="dark:bg-zinc-950 border rounded-sm dark:border-gray-800 flex flex-col h-full">
          <h3 className=" p-4 text-2xl border-b dark:border-gray-800">Últimas Atividades</h3>
          <ul className="overflow-y-auto  p-4">
            {LastActivities.map((activity, index) => (
              <li key={index}>
                <span className="text-sm dark:text-zinc-400">{activity}</span>
                {index < LastActivities.length - 1 && <hr className="my-2 dark:border-gray-800" />}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
