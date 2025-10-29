import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ onAddToCart, products, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-white rounded-xl border border-gray-100 p-4 h-64" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} onAddToCart={onAddToCart} />)
      )}
    </div>
  );
}


