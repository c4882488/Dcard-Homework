import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from './routes/Home';
import Callback from './routes/Callback';
import Backhome from './routes/Backhome';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/callback",
    element: <Callback />,
  },
  {
    path: "/Backhome",
    element: <Backhome />,
  },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;

