import React, { useContext, useEffect } from 'react'
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
  } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Login from './pages/Login'
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
        <div>Loading...</div>
      )
    } else if (!store.isAuth && localStorage.getItem('isAuth') === null) {
        return (
          <Login/>
        )
    } else {
      return (
        <RouterProvider router={router} fallbackElement={<div>Error</div>}/>
      )
    }

    
}

export default observer(App)
