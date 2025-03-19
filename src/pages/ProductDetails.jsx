import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get("/products.json");
      const foundProduct = data.find((p) => p.id === parseInt(id));
      setProduct(foundProduct);
      setSelectedImage(0);
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );
  }

  const calculateDiscount = () => {
    if (!product.product_oldPrice) return 0;
    const discount =
      ((product.product_oldPrice - product.product_newPrice) /
        product.product_oldPrice) *
      100;
    return Math.round(discount);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-center items-center gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="w-1/2 space-y-4">
          <div className="aspect-square overflow-hidden rounded-xl relative">
            <img
              src={product.product_images[selectedImage]}
              alt={product.product_name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
            {product.product_images.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  selectedImage === index
                    ? "ring-2 ring-primary scale-95"
                    : "hover:scale-95"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.product_name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-8 lg:px-6">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bebas tracking-wide text-gray-800">
              {product.product_name}
            </h1>

            <div className="flex justify-between items-center gap-4 flex-wrap">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-4xl md:text-5xl font-bebas text-secondary">
                    ${product.product_newPrice.toFixed(2)}
                  </span>
                  {product.product_oldPrice && (
                    <span className="text-2xl md:text-3xl font-bebas text-gray-400 line-through">
                      ${product.product_oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
              <div>
                {calculateDiscount() > 0 && (
                  <div className=" bg-primary text-white px-4 py-2 rounded-full font-bebas text-lg">
                    {calculateDiscount()}% OFF
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 font-poppins leading-relaxed">
              {product.product_description}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-gray-500 bg-gray-50 p-4 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
              <span className="font-poppins text-lg">
                {product.sold} products sold
              </span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="btn btn-primary w-full bg-secondary text-white font-bebas tracking-wider text-xl py-3 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
