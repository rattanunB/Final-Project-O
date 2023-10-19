
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import CreateActivityPage from './pages/CreateActivityPage/CreateActivityPage';
import DashBoardPage from './pages/DashBoardPage/DashBoardPage';
import ActivitiesPage from './pages/ActivitiesPage/ActivitiesPage';
import ContactPage from './pages/ContactPage/ContactPage';
import EditActivitypage from './pages/EditActivitypage/EditActivitypage';
import CreateGoalPage from './pages/CreateGoalPage/CreateGoalPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import React, { useState } from 'react';

function App() {

  const [auth, setAuth] = useState(localStorage.getItem('accessToken') ? true : false)
  console.log('auth..',auth)
  const Layout = () => {
    return (
      <div className="app">
        <Navbar auth={auth} setAuth={setAuth}/>
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage auth={auth}/>,
        },
        {
          path: "/createactivity",
          element: <CreateActivityPage />,
        },
        {
          path: "/dashboard",
          element: <DashBoardPage />,
        },
        {
          path: "/activities",
          element: <ActivitiesPage />,
        },
        {
          path: "/editActivity",
          element: <EditActivitypage />,
        },
        {
          path: "/createGoal",
          element: <CreateGoalPage />,
        },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        {
          path: "/login",
          element: <LoginPage setAuth={setAuth}/>,
        },
        {
          path: "/signup",
          element: <SignUpPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
