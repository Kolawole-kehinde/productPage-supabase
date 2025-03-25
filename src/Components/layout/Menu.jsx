import React from 'react';
import { UseAuth } from '../../hooks/useAuth';
import AuthMenu from './AuthMenu';
import { Link } from 'react-router';

const Menu = ({ menuStyle, toggleMenu }) => {
  const { user } = UseAuth();
  
  return (
    <menu className={menuStyle}>
      {user ? (
        <AuthMenu />
      ) : (
        <>
          <Link to="/auth/login" onClick={toggleMenu}>  
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
              Login
            </button>
          </Link>
          <Link to="/auth/register" onClick={toggleMenu}> 
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Register
            </button>
          </Link>
        </>
      )}
    </menu>
  );
};

export default Menu;
