import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements
} from "react-router-dom";
import RootLayout from './layouts/RootLayout.jsx';
import LoginUser from './pages/LoginUser.jsx';
import RegisterUser from './pages/RegisterUser.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/accounts/login" element={<LoginUser />} />
      <Route path="/accounts/register" element={<RegisterUser />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
