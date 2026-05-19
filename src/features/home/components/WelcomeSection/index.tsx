import { useProfile } from '@features/profile';

const WelcomeSection = () => {
  const { user } = useProfile();

  return (
    <div className="mb-6 sm:mb-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Bem-vindo de volta, {user?.username}!</h2>
      <p className="text-sm sm:text-base text-gray-600">Aqui está um resumo das suas atividades de recrutamento</p>
    </div>
  );
};

export default WelcomeSection;
