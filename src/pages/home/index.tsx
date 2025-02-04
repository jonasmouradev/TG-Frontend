import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Home</h1>
      <button onClick={() => navigate("/configs")}>Go to Configs</button>
    </>
  );
}
