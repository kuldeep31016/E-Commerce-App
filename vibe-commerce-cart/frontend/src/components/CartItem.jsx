import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

export default function CartItem({ item, onUpdate, onRemove }) {
  const product = item.productId || {};
  const subtotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100">
      <img src={product.image} alt={product.name} className="w-16 h-16 rounded object-cover" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">{product.name}</h4>
          <span className="text-gray-700 font-semibold">${subtotal}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <button
            className="p-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            onClick={() => onUpdate(item._id, Math.max(1, item.quantity - 1))}
            disabled={item.quantity <= 1}
          >
            <FaMinus />
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            className="p-2 rounded bg-gray-100 hover:bg-gray-200"
            onClick={() => onUpdate(item._id, item.quantity + 1)}
          >
            <FaPlus />
          </button>
          <button
            className="ml-auto p-2 rounded bg-red-50 text-red-600 hover:bg-red-100"
            onClick={() => onRemove(item._id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}


