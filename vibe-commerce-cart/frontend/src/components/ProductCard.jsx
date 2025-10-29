import { useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';

export default function ProductCard({ product, onAddToCart }) {
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    try {
      setAdding(true);
      await onAddToCart(product._id, 1);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow fade-in">
      <img src={product.image} alt={product.name} className="w-full h-44 object-cover" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
          <span className="text-primary font-semibold">${product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
        <button
          onClick={handleAdd}
          disabled={adding}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white py-2 hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          <FaCartPlus /> {adding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}


