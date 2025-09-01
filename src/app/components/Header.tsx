"use client";

import Image from "next/image";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

interface HeaderProps {
  cartItems: any[];
  toggleCart: () => void;
  isCartOpen: boolean;
  cartTotal: number;
  updateQuantity: (productId: string, quantity: number) => void;
}

export default function Header({ cartItems, toggleCart, isCartOpen, cartTotal, updateQuantity }: HeaderProps) {
  const { data: session } = useSession();

  return (
    <header className="bg-blue-600 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/images/logo.jpg" alt="logo" width={50} height={50} />
        </div>

        {/* Desktop Nav */}
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-2">
              {session.user?.image && (
                <img src={session.user.image} alt="profile" className="w-8 h-8 rounded-full" />
              )}
              <span className="text-white">{session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="bg-white text-blue-600 px-4 py-1 rounded w-25"
            >
              Login
            </button>
          )}

          {/* Cart */}
          <div className="relative">
            <button onClick={toggleCart} className="flex items-center text-white">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            {isCartOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50 p-4">
                <h3 className="font-semibold text-lg mb-4">Shopping Cart</h3>
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                ) : (
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-800">{item.product.name}</h4>
                          <p className="text-sm text-gray-600">EGP {item.product.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded">
                            <Minus size={12} />
                          </button>
                          <span className="text-sm w-8 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="border-t pt-4 mt-4 flex justify-between">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold">EGP {cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
