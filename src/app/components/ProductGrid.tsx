"use client";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  wishlist = [], 
  products = [],         
  toggleWishlist,
  addToCart,
  cartItems,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product: any) => {
        if (!product) return null;
        
        const safeProduct = { ...product, image: product.image.replace("/public", "") };

        return (
          <ProductCard
            key={safeProduct.id}
            product={safeProduct}
            wishlist={wishlist}  
            toggleWishlist={toggleWishlist}
            addToCart={addToCart}
            inCart={!!cartItems.find((i: any) => i.id === safeProduct.id)}
          />
        );
      })}
    </div>
  );
}
