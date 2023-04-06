import React, { useContext, useEffect } from 'react'
import { CookiesProvider } from 'react-cookie';
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
  } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { observer } from 'mobx-react-lite';
import { Context } from './main';

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
  ]);

const App = () => {
    const {store} = useContext(Context)
  
    useEffect(() => {
      if (localStorage.getItem('isAuth')) {
        store.checkAuth()
        console.log(store.user)
      }
    }, [])

    if (store.isLoading) {
        return (
            <div>Checking auth...</div>
        )
    }

    if (!store.isAuth) {
        return (
            <Login/>
        )
    }

    return (
        <CookiesProvider>
            <RouterProvider router={router} fallbackElement={<div>Loading</div>}/>
        </CookiesProvider>
    )
}

export default observer(App)
