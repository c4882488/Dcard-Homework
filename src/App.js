import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './routes/Home';
import Callback from './routes/Callback';
import TaskPage from "./routes/TaskPage";
import { SnackbarProvider } from "notistack";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/callback",
    element: <Callback handleClickVariant />,
  },
  {
    path: "/Backhome",
    element: <TaskPage />,
  },
]);

function App() {
    return (
    <SnackbarProvider maxSnack={4}>
      <RouterProvider router={router} />
    </SnackbarProvider>
    );
}

export default App;

