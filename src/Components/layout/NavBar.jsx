import React, { useState, useEffect } from 'react';
import { BiMenu, BiX } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router';
import { supabase } from '../../supabase/supabaseClient';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check the initial session when the component mounts
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkSession();

    // Listen for auth state changes and update login state accordingly
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session); // Set based on whether there's a session
    });

    // Clean up the subscription properly on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth/login');
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto max-w-7xl flex justify-between items-center py-4 px-4">
        <Link to="/" className="text-3xl font-bold text-gray-800">
          E-Commerce
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex space-x-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/auth/login">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
                  Login
                </button>
              </Link>
              <Link to="/auth/register">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <BiX size={24} /> : <BiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gray-100 border-t">
          <div className="flex flex-col items-center py-4 space-y-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/auth/login" onClick={toggleMenu}>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
                    Login
                  </button>
                </Link>
                <Link to="/auth/register" onClick={toggleMenu}>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
