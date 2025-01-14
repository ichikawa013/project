import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import About from './pages/AboutUs.jsx';
import Profile from './pages/Profile.jsx';
import SignUp from './pages/SignUp.jsx';
import NearByHospital from './pages/NearByHospitals.jsx';
import AppointmentBooking from './pages/AppointmentBooking.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import Chatbot from './pages/Chatbot';
import AdminPage from './pages/Admin.jsx';

const router = createBrowserRouter([
  
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/maphospital',
    element: <NearByHospital />
  },
  {
    path: '/booking',
    element: <AppointmentBooking />
  },
  {
    path: '/change-password',
    element: <ChangePassword />
  },
  {
    path: '/chatbot',
    element: <Chatbot />
  },
  {
    path: '/admin',
    element: <AdminPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
