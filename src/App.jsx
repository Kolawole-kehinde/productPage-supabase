import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/login';
import Register from './pages/auth/Register';
import AuthLayout from './Components/AuthLayout';
import Dashboard from './pages/dashboard';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Auth Route with nested children */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
