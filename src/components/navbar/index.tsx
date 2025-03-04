import { useUserContext } from '@/contexts/UserContext';

export default function Navbar() {
  const user = useUserContext();

  return (
    <>
      {user.id && (
        <nav className="w-screen h-16 bg-slate-900 text-white">
          <ul className=" h-full flex justify-around items-center">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/configs">Configs</a>
            </li>
            <li>
              <a href="/profile">{user.name}</a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
