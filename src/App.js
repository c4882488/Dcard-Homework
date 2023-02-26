import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './routes/Home';
import Callback from './routes/Callback';
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
]);

function App() {
    return (
    <SnackbarProvider maxSnack={4}>
      <RouterProvider router={router} />
    </SnackbarProvider>
    );
}

export default App;

