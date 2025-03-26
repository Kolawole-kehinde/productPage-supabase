import React, { useState } from "react";
import { FiMenu, FiX, FiShoppingCart, FiUser, FiBox } from "react-icons/fi";
import { Link } from "react-router";

const Dashboard = () => {
  
  return (
    <div className="flex bg-gray-100 container mx-auto max-w-7xl min-h-screen">
      {/* Sidebar */}
      <aside
        className="bg-blue-700 text-white transition-all duration-300 md:w-64 w-30">
        <nav className="mt-10">
          <Link to="/" className="block py-2 px-4 hover:bg-blue-600">
            <FiBox className="inline-block mr-2" />
          Products
          </Link>

          <Link to="/dashboard/orders" className="block py-2 px-4 hover:bg-blue-600">
            <FiShoppingCart className="inline-block mr-2" />
          Orders
          </Link>

          <Link to="/dashboard/profile" className="block py-2 px-4 hover:bg-blue-600">
            <FiUser className="inline-block mr-2" />
          Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <header className="flex items-center justify-center p-4 shadow-lg mb-6 ">
          <h2 className="text-xl md:text-2xl font-bold  text-center">Welcome to Your Dashboard</h2>
        </header>

        <section>
          <h3 className="text-xl font-semibold mb-4">Products Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Product Card (You can replace with dynamic data) */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h4 className="text-lg font-bold">Product Name</h4>
              <p className="text-gray-600">Description of the product goes here...</p>
              <p className="text-blue-600 font-bold">Price: $99</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                View Details
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
