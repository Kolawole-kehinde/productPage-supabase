import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(''); 

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*');

    if (error) {
      console.error('Error fetching products:', error);
      setErrorMessage('Failed to fetch products. Please try again later.');
    } else {
      setProducts(data);
    }
    setLoading(false); 
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">My Supabase Shop</h1>

        {/* Display Loading Indicator */}
        {loading && <p className="text-center text-lg text-gray-600">Loading products...</p>}

        {/* Display Error Message */}
        {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}

        {/* Display Products */}
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
