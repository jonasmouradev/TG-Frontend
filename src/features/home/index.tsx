import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import useUserContext from '@/shared/contexts/UserContext';
import { useLocation, useNavigate } from 'react-router';
import { CirclePlus, ChevronRight, Calendar, ChartColumnBig } from 'lucide-react';
import LastActivities from '@/mock/LastActivities.json';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartData from '@/mock/ChartData.json';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { paths } from '@/shared/utils/constants';

export default function HomePage() {
  const user = useUserContext();
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const HomeButton = ({
    icon,
    title,
    subtitle,
    variant = 'default',
    navigateTo,
  }: {
    icon: ReactNode;
    title: string;
    subtitle: string;
    variant?: 'default' | 'primary';
    navigateTo?: string;
  }) => {
    const isPrimary = variant === 'primary';

    return (
      <Button
        variant={isPrimary ? 'default' : 'outline'}
        className="w-full h-auto py-4 px-6 justify-between"
        onClick={() => navigate(navigateTo || '')}
      >
        <div className="flex flex-row gap-4 items-center">
          <div className={isPrimary ? 'text-primary-foreground' : 'text-primary'}>{icon}</div>
          <div className="text-left">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className={`text-sm ${isPrimary ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
              {subtitle}
            </p>
          </div>
        </div>
        <ChevronRight className={isPrimary ? 'text-primary-foreground' : 'text-muted-foreground'} />
      </Button>
    );
  };

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)]">
      <motion.main
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto p-6 space-y-6"
      >
        <header className="space-y-2">
          <p className="text-sm text-muted-foreground">{location.pathname}</p>
          <h1 className="text-3xl font-bold">{`${t('hello')}, ${user.name}`}</h1>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center space-y-2 border-r">
                    <span className="text-sm text-muted-foreground">{t('in_progress')}</span>
                    <span className="text-4xl font-bold">1</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <span className="text-sm text-muted-foreground">{t('completed')}</span>
                    <span className="text-4xl font-bold">0</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <HomeButton
                icon={<CirclePlus size={32} />}
                title={t('vacancy')}
                subtitle={t('create_vacancy')}
                variant="primary"
                navigateTo={paths.NEW_VACANCY}
              />
              <HomeButton icon={<Calendar size={32} />} title={t('process')} subtitle={t('view_process')} />
              <HomeButton icon={<ChartColumnBig size={32} />} title={t('statistics')} subtitle={t('track_data')} />
            </div>
          </div>

          <Card className="hidden lg:block">
            <CardHeader>
              <CardTitle>{t('statistics')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={ChartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="pv" stackId="a" fill="hsl(var(--primary))" />
                  <Bar dataKey="uv" stackId="a" fill="hsl(var(--chart-2))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('last_activities')}</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <ul className="space-y-4">
              {LastActivities.map((activity, index) => (
                <li key={index}>
                  <p className="text-sm text-muted-foreground">{activity}</p>
                  {index < LastActivities.length - 1 && <Separator className="mt-4" />}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.main>
    </div>
  );
}
