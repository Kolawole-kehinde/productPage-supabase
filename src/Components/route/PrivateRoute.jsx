// src/components/PrivateRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { supabase } from '../../supabase/supabaseClient';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session); // If session exists, user is authenticated
      setIsLoading(false); // Stop loading once the session is checked
    };

    checkSession();
  }, []);

  if (isLoading) return <p>Loading...</p>; // Prevent rendering before auth check completes

  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
