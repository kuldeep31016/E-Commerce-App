import CartItem from './CartItem';

export default function Cart({ cart, onUpdate, onRemove, onClear, onCheckout, open, onClose }) {
  return (
    <div className={`fixed inset-0 z-40 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl p-4 transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Shopping Cart</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="mt-3 divide-y divide-gray-100 overflow-y-auto h-[65vh]">
          {(!cart?.items || cart.items.length === 0) && (
            <p className="text-gray-600 py-6 text-center">Your cart is empty</p>
          )}
          {cart?.items?.map((it) => (
            <CartItem key={it._id} item={it} onUpdate={onUpdate} onRemove={onRemove} />
          ))}
        </div>
        <div className="mt-4 border-t pt-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Total</span>
            <span className="text-xl font-semibold">${(cart?.total || 0).toFixed(2)}</span>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={onClear} className="w-1/2 rounded-lg border border-gray-200 py-2 hover:bg-gray-50">Clear Cart</button>
            <button onClick={onCheckout} className="w-1/2 rounded-lg bg-primary text-white py-2 hover:bg-primary-dark">Checkout</button>
          </div>
        </div>
      </aside>
    </div>
  );
}


