// ProductDetails.jsx
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase.from("products").select("*").eq("id", id).single();

        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Quantity increment and decrement functions
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1)); // Prevent going below 1

  if (loading)
    return <div className="text-center mt-4">Loading product details...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-4">{error}</div>;

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 flex items-center gap-2 py-1 px-3 text-white mb-4 rounded text-center hover:text-blue-800"
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

          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-green-700">
            Add {quantity} to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
