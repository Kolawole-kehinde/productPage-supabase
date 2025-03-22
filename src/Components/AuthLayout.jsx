import React from 'react';
import { Outlet } from 'react-router';


const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <h2>Authentication</h2>
      <Outlet /> {/* This will render either LoginPage or Register */}
    </div>
  );
};

export default AuthLayout;
