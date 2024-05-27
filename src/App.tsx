import "@/App.css";
import { Provider } from "@/providers";
import { Routes } from "@/routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter(Routes);
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
