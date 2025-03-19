import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/products.json");
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <figure className="relative h-64 overflow-hidden">
              <img
                src={product.product_images[0]}
                alt={product.product_name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
              {product.discount_percentage && (
                <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.discount_percentage}% OFF
                </div>
              )}
            </figure>

            <div className="card-body p-4">
              <h2 className="card-title text-3xl font-bold tracking-widest text-gray-800">
                {product.product_name}
              </h2>
              <p className="text-gray-600 tracking-wide text-lg line-clamp-2">
                {product.product_description}
              </p>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-secondary">
                    ${product.product_newPrice}
                  </span>
                  {product.product_oldPrice && (
                    <span className="text-gray-400 line-through text-2xl">
                      ${product.product_oldPrice}
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    {product.sold} sold
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="btn px-3 py-2 text-primary hover:scale-105 transition-transform duration-200 border-2 border-secondary outline-none rounded-lg tracking-wide"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
