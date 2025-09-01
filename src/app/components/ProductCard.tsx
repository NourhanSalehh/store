"use client";

import { Heart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldprice?: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  addToCart: (product: Product) => void;
  inCart: boolean;
}

export default function ProductCard({
  product,
  wishlist,
  toggleWishlist,
  addToCart,
  inCart,
}: ProductCardProps) {
  if (!product) return null;    

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img
          src={product.image || "/images/placeholder.png"}    
          alt={product.name || "No Name"}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            wishlist.includes(product.id)
              ? "bg-red-500 text-white"
              : "bg-white text-gray-600 hover:text-red-500"
          }`}
        >
          <Heart
            size={20}
            fill={wishlist.includes(product.id) ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm">{product.category}</p>

        <div className="flex items-center space-x-2 mb-4">
          {product.oldprice && (
            <span className="text-gray-400 line-through text-sm">
              EGP {product.oldprice.toFixed(2)}
            </span>
          )}
          <span className="text-xl font-bold text-gray-800">
            EGP {product.price.toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {inCart ? "Update Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
