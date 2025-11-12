import { useProfile } from '@features/profile';
import CompanyHome from '../entities/company/CompanyHome';
import PersonHome from '../entities/person';

const HomePage = () => {
  const { user } = useProfile();
  const userType = user?.type;
  return userType !== 'PERSON' ? <CompanyHome /> : <PersonHome />;
};

export default HomePage;
