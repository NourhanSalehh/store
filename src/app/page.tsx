"use client";

import { useState } from "react";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import SearchFilter from "./components/SearchFilter";
import productsData from "../../products.json"; // عدلي المسار حسب مكان الملف عندك

export default function Home() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("title");
  const [selectedCategory, setSelectedCategory] = useState("");

  const toggleWishlist = (id: number) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

 const addToCart = (product: any) => {
  if (!product) return;     

  setCartItems(prev => {
    const exists = prev.find(i => i.product.id === product.id);
    if (exists) {
      return prev.map(i =>
        i.product.id === product.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    }
    return [...prev, { id: Date.now().toString(), product, quantity: 1 }];
  });
};

  const updateQuantity = (productId: string, quantity: number) => {
  if (quantity <= 0) {
    setCartItems(prev => prev.filter(item => item.product?.id !== productId));
    return;
  }
  setCartItems(prev =>
    prev.map(item =>
      item.product?.id === productId ? { ...item, quantity } : item
    )
  );
};


  const toggleCart = () => setIsCartOpen(prev => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  // فلترة المنتجات حسب البحث والدروب داون
  const filteredProducts = productsData.filter(product => {
    const matchesSearch =
      searchType === "title"
        ? product.name.toLowerCase().includes(searchQuery.toLowerCase())
        : product.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

 const cartTotal = cartItems.reduce(
  (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 1),
  0
);



  return (
    <main>
      <Header
        cartItems={cartItems}
        toggleCart={toggleCart}
        isCartOpen={isCartOpen}
        cartTotal={cartTotal}
        updateQuantity={updateQuantity}
      />

      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchType={searchType}
        setSearchType={setSearchType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <ProductGrid
        products={filteredProducts}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        addToCart={addToCart}
        cartItems={cartItems}
      />
    </main>
  );
}
