import React from 'react';
import { NavLink } from 'react-router';


const Logo = ({ toggleMenu }) => {
  return (
    <div>
      <NavLink to="/" onClick={toggleMenu}>
        <h2 className="text-3xl font-semibold text-gray-800">
          Store
        </h2>
      </NavLink>
    </div>
  );
};

export default Logo;
