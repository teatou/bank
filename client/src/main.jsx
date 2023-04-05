import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Log from './pages/Log'
import History from './pages/History'
import Store from './store/store';

const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "history",
        element: <History />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "log",
    element: <Log />,
  },
]);

const store = new Store()

export const Context = createContext({
  store
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context.Provider value={{store}}>
      <RouterProvider router={router} />
    </Context.Provider>
  </React.StrictMode>,
)
