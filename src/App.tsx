import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <>
      <ThemeProvider theme={{ mode: "dark" }}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
