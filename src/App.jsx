import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard";
import NavBar from "./Components/layout/NavBar";
import ProductDetails from "./pages/ProductsDetails";
import LoginPage from "./pages/auth/login";
import { ProtectedRoute } from "./Components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/">
         
            {/* Unprotected Pages/Routes */}
        <Route path="/auth" element={<ProtectedRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route index element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="dashboard" element={<Dashboard />} />

        </Route>
      </Routes>
    </>
  );
};

export default App;
