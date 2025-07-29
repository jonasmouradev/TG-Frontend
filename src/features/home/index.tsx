import { Button } from '@/shared';
import useUserContext from '@/shared/contexts/UserContext';
import { useLocation } from 'react-router';
import { CirclePlus, ChevronRight, Calendar, ChartColumnBig } from 'lucide-react';
import LastActivities from '@/mock/LastActivities.json';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import ChartData from '@/mock/ChartData.json';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function HomePage() {
  const user = useUserContext();
  const location = useLocation();
  const { t } = useTranslation();

  const HomeButton = ({
    icon,
    title,
    subtitle,
    style,
    whiteSubtitle,
  }: {
    icon: ReactNode;
    title: string;
    subtitle: string;
    style?: string;
    whiteSubtitle?: boolean;
  }) => {
    const baseStyle =
      'bg-background border border-border text-primary w-full flex justify-between flex-1 [&_svg]:size-7 hover:bg-gray-50 dark:hover:bg-gray-900 shadow-lg';

    return (
      <Button className={`${baseStyle} ${style}`}>
        <div className="flex flex-row gap-6 items-center">
          {icon}
          <div>
            <h1 className="text-xl text-left">{title}</h1>
            <h3 className={`text-sm ${whiteSubtitle ? 'text-white' : 'text-secondary'}`}>{subtitle}</h3>
          </div>
        </div>
        <ChevronRight className={whiteSubtitle ? 'text-white' : 'dark:text-zinc-400'} />
      </Button>
    );
  };

  return (
    <div className="flex flex-col">
      <motion.main
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="h-screen w-screen lg:w-auto lg:grid grid-cols-4 grid-rows-12"
      >
        <header className="flex flex-col col-span-4 row-span-2 p-6 gap-2 lg:pt-16">
          <h3 className="text-sm text-secondary">{location.pathname}</h3>
          <h1 className="text-3xl">{`${t('hello')}, ${user.name}`}</h1>
        </header>
        <article className="col-span-2 row-span-6 p-6 flex flex-col gap-4">
          <div className="dark:bg-zinc-950 border shadow-lg rounded-sm dark:border-gray-800 p-6 flex justifty-center items-center">
            <div className="flex flex-col gap-2 items-center w-full border-r dark:border-gray-800">
              <span className="text-sm text-secondary">{t('in_progress')}</span>
              <span className="text-4xl">1</span>
            </div>
            <div className="flex flex-col gap-2 items-center w-full border-l dark:border-gray-800">
              <span className="text-sm text-secondary">{t('completed')}</span>
              <span className="text-4xl">0</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <HomeButton
              icon={<CirclePlus size={64} />}
              title={t('vacancy')}
              subtitle={t('create_vacancy')}
              style="bg-blue-500 text-white hover:bg-blue-600 dark:hover:bg-blue-600 border border-blue-500 dark:border-blue-600"
              whiteSubtitle={true}
            />
            <HomeButton icon={<Calendar size={64} />} title={t('process')} subtitle={t('view_process')} />
            <HomeButton icon={<ChartColumnBig size={64} />} title={t('statistics')} subtitle={t('track_data')} />
          </div>
        </article>
        <article className="hidden lg:block col-span-2 lg:row-span-6 p-6">
          <div className="dark:bg-zinc-950 border shadow-lg rounded-sm dark:border-gray-800 p-6 flex justify-between items-center h-full">
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
          <div className="bg-background border rounded-sm dark:border-gray-800 flex flex-col h-full">
            <h3 className=" p-4 text-2xl border-b dark:border-gray-800">{t('last_activities')}</h3>
            <ul className="overflow-y-auto  p-4 h-36">
              {LastActivities.map((activity, index) => (
                <li key={index}>
                  <span className="text-sm text-secondary">{activity}</span>
                  {index < LastActivities.length - 1 && <hr className="my-2 dark:border-gray-800" />}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </motion.main>
    </div>
  );
}
