import { useState } from 'react';
import { motion } from 'framer-motion';
import { LuShoppingCart, LuEye } from 'react-icons/lu';

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
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
      <div className="relative h-64 overflow-hidden bg-slate-700/50">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
          {product.category}
        </span>
        <button className="absolute top-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <LuEye className="w-5 h-5 text-slate-900" />
        </button>
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold text-slate-100 line-clamp-2 group-hover:text-indigo-400 transition-colors">{product.name}</h3>
        <p className="text-sm text-slate-400 line-clamp-3">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-3xl font-bold gradient-text">${product.price.toFixed(2)}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            disabled={adding}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/50 transition-all disabled:opacity-60"
          >
            <LuShoppingCart className="w-4 h-4" /> {adding ? 'Adding...' : 'Add'}
          </motion.button>
        </div>
      </div>
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 pointer-events-none" />
    </motion.div>
  );
}


