import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { supabase } from "../supabase/supabaseClient";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buyError, setBuyError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();
        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    checkUser(); 
    fetchProduct();
  }, [id]);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleBuy = async () => {
    if (!user) {
      setBuyError("You must log in before you can buy.");
      return navigate("/auth/login"); 
    }

    try {
      const { data, error } = await supabase.from("orders").insert([
        {
          product_id: product.id,
          quantity,
          total_price: product.price * quantity,
          user_id: user.id, // Associate order with the logged-in user
        },
      ]);

      if (error) {
        console.error("Supabase Error:", error.message);
        throw error;
      }

      alert("Order placed successfully!");
      navigate("/orders"); 
    } catch (error) {
      console.error("Error placing order:", error);
      setBuyError("Failed to place the order. Please try again.");
    }
  };

  if (loading)
    return <div className="text-center mt-4">Loading product details...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-black mb-4 rounded text-center hover:text-blue-800"
      >
        <FaArrowAltCircleLeft /> Back
      </button>

      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
        <div className="md:ml-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl font-semibold text-green-600 mt-4">
            ${product.price}
          </p>

          {/* Quantity controls */}
          <div className="flex items-center mt-4">
            <button
              onClick={decrementQuantity}
              className="bg-blue-300 text-gray-800 px-4 py-2 rounded-l hover:bg-gray-400"
            >
              -
            </button>
            <span className="px-4 py-2 border text-lg">{quantity}</span>
            <button
              onClick={incrementQuantity}
              className="bg-blue-300 text-gray-800 px-4 py-2 rounded-r hover:bg-gray-400"
            >
              +
            </button>
          </div>

          {/* Buy button */}
          <button
            onClick={handleBuy}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Buy Now
          </button>

          {/* Display error message if any */}
          {buyError && <p className="text-red-500 mt-4">{buyError}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
