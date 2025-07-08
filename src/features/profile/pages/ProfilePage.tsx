import { useProfile } from '../hooks';

export default function ProfilePage() {
  const { user, isLoading, error } = useProfile();

  if (isLoading) {
    return <div>Carregando perfil...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <h1>Perfil do Usuário</h1>
      {user && (
        <div>
          <p><strong>Nome:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Status:</strong> {user.status}</p>
          <p><strong>Tipo:</strong> {user.type}</p>
        </div>
      )}
    </div>
  );
}
