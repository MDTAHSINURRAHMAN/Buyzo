import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  //   const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get("/products.json");
      // For demo, getting first product. In real app, get from cart/query params
      setProduct(data[0]);
    };
    fetchProduct();
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-secondary"></span>
      </div>
    );
  }

  const subtotal = product.product_newPrice * quantity;
  const shipping = 5.99;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-4xl font-bebas text-gray-800 mb-8">Checkout Form</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Product Details */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-none shadow-md p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 font-poppins">Product</th>
                  <th className="text-center py-4 font-poppins">Price</th>
                  <th className="text-center py-4 font-poppins">Quantity</th>
                  <th className="text-right py-4 font-poppins">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.product_images[0]}
                        alt={product.product_name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-poppins font-medium">
                          {product.product_name}
                        </h3>
                        <p className="text-sm text-gray-500 font-poppins">
                          {product.product_description.substring(0, 60)}...
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-center font-poppins">
                    ${product.product_newPrice.toFixed(2)}
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center">
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="select select-bordered w-24 font-poppins"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {!num ? 1 : num}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td className="text-right font-poppins">
                    ${(product.product_newPrice * quantity).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-none shadow-md p-6">
            <h2 className="text-2xl font-poppins font-bold mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between font-poppins">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-poppins">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-poppins">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-poppins font-semibold">
                  <span>Total</span>
                  <span className="text-secondary">${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                className="btn btn-secondary w-full text-white font-bebas tracking-wider text-xl"
                onClick={() => {
                  // Handle checkout logic here
                  alert("Proceeding to payment...");
                }}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
