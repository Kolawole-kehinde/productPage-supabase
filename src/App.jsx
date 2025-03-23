import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/login";
import Register from "./pages/auth/Register";
import AuthLayout from "./Components/AuthLayout";
import Dashboard from "./pages/dashboard";
import NavBar from "./Components/layout/NavBar";
import PrivateRoute from "./Components/route/PrivateRoute";
import ProductDetails from "./pages/ProductDeatils";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* Auth routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Private dashboard route */}
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
}
        />
           <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
};

export default App;
