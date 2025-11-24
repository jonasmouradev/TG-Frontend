import { useProfile } from '@features/profile';
import CompanyHome from '../entities/company/CompanyHome';
import PersonHome from '../entities/person';

const HomePage = () => {
  const { user } = useProfile();
  const userType = user?.type;
  const options = { COMPANY: <CompanyHome />, PERSON: <PersonHome /> };
  return options[userType as keyof typeof options] || <div>Tipo de usuário desconhecido</div>;
};

export default HomePage;
