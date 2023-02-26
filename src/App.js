import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './routes/Home';
import Callback from './routes/Callback';
import Aaa from './routes/aaa';
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
    path: "/aaa",
    element: <Aaa />,
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

