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
import styled from 'styled-components'
import History from './pages/History';

const FlexLayount = styled.div`
  display: flex;
  width: 100vw;
`

const AppLayout = () => (
    <FlexLayount>
      <Navbar />
      <Outlet />
    </FlexLayount>
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
          path: "/history",
          element: <History/>,
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
      }
    }, [])

    if (store.isLoading) {
        return (
            <div>Checking auth...</div>
        )
    }

    if (!store.isAuth && localStorage.getItem('isAuth') === null) {
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
