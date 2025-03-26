import React from "react";
import { UseAuth } from "../../hooks/useAuth";
import { Link } from "react-router";

const AuthMenu = ({ toggleMenu }) => {
  const { loading, handleLogout } = UseAuth();

  return (
    <menu className="flex flex-col lg:flex-row items-start gap-4 text-blue-600 text-lg py-6"> 
      <li>
        <Link onClick={toggleMenu} to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li>
        <button
          onClick={() => {
            handleLogout();
            toggleMenu();
          }}
        >
          {loading ? "Loading..." : "Logout"}
        </button>
      </li>
    </menu>
  );
};

export default AuthMenu;
