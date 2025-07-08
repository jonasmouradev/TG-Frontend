// import { useNavigate } from 'react-router';
import { useUserContext } from '@/shared/contexts/UserContext';

export default function HomePage() {
  const user = useUserContext();

  return (
    <div className="bg-white h-screen w-screen flex flex-col justify-center items-center">
      <ul className="">
        <li>Nome: {user.name}</li>
        <li>E-mail: {user.email}</li>
        <li>Password: {user.password}</li>
        <li>User Type {user.userType}</li>
        <li>User ID: {user.id}</li>
      </ul>
    </div>
  );
}
