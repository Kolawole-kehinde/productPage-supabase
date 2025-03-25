import React from "react";
import { Link } from "react-router";
import { UseAuth } from "../../hooks/useAuth";

const AuthMenu = () => {
    const {loading, handleLogout} = UseAuth()
  return (
    <menu className="flex space-x-4 text-blue-500">
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <button  onClick={() => {
            handleLogout();
          }}>
            {loading ? "Loading..." : "Logout"}
            </button>
      </li>
    </menu>
  );
};

export default AuthMenu;
