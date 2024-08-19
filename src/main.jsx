import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login.jsx';
import Admin from './Admin.jsx';
import Employee from './Employee.jsx';
import './index.css';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const root = createRoot(document.getElementById('root'));

function Logout(){
  localStorage.clear()
  return  <Navigate to="/"/>
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register />
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        } />
        <Route path="/employee" element={
          <ProtectedRoute>
            <Employee />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
