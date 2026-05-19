import { useTranslation } from 'react-i18next';
import { CircleX } from 'lucide-react';
import { paths } from '@shared/utils/constants';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center text-center h-screen w-screen">
      <CircleX size={48} className="mb-4" />
      <h1 className="text-4xl font-bold text-primary">{t('page_not_found')}</h1>
      <p className="mt-4 text-secondary">{t('page_does_not_exist')}</p>
      <a href={paths.HOME} className="mt-4 text-blue-500 hover:underline">
        {t('go_back_home')}
      </a>
    </div>
  );
};

export default NotFound;
