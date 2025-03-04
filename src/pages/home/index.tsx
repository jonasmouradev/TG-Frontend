// import { useNavigate } from 'react-router';
import { useUserContext } from '@/contexts/UserContext';

export default function Home() {
  const user = useUserContext();

  return (
    <div className="bg-slate-50 h-screen w-screen flex flex-col justify-center items-center">
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
