import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { Link } from "react-router";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch Products from Supabase
  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.error("Error fetching products:", error);
      setErrorMessage("Failed to fetch products.");
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  // Function to Place Order
  const placeOrder = async (product_id) => {
    const { data: { user } } = await supabase.auth.getUser(); // Get the logged-in user

    if (!user) {
      alert("You must be logged in to place an order.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("orders")
        .insert([{ user_id: user.id, product_id, quantity: 1 }]); // Insert order with user_id and product_id

      if (error) {
        console.error("Error placing order:", error);
        alert("Failed to place order: " + error.message);
      } else {
        console.log("Order placed successfully!", data);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  // Handle Buy Now Button Click
  const handleBuyNow = async (productId) => {
    try {
      await placeOrder(productId); // Call placeOrder with productId
    } catch (error) {
      console.error("Error in handleBuyNow:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* Login and Register Buttons */}
        <div className="flex justify-end space-x-4 mb-6">
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
        </div>

        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Products</h1>

        {loading && <p className="text-center text-lg text-gray-600">Loading products...</p>}
        {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}

        {!loading && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white shadow-lg rounded-lg p-6">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg mb-4"
                />
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-lg font-bold text-blue-600 mt-4">Price: ${product.price}</p>

                <button
                  onClick={() => handleBuyNow(product.id)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p className="text-center text-gray-700">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
