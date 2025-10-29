export default function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-lg bg-white rounded-xl p-5 shadow-xl fade-in">
          <div className="text-center">
            <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-green-100 text-green-600 grid place-items-center text-2xl">✓</div>
            <h3 className="text-xl font-semibold">Order Confirmation</h3>
            <p className="text-gray-600">Thank you, {receipt.customerName}!</p>
          </div>
          <div className="mt-4 text-sm text-gray-700">
            <div className="flex items-center justify-between">
              <span>Order ID</span>
              <span className="font-mono">{receipt.orderId}</span>
            </div>
            <div className="mt-2 max-h-52 overflow-y-auto border rounded">
              {receipt.items.map((it, idx) => (
                <div key={idx} className="flex items-center justify-between px-3 py-2 border-b last:border-0">
                  <span>Qty {it.quantity}</span>
                  <span className="font-medium">${(it.price * it.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3 text-base">
              <span className="font-medium">Total</span>
              <span className="font-semibold">${receipt.total.toFixed(2)}</span>
            </div>
            <div className="text-right text-xs text-gray-500 mt-1">{new Date(receipt.timestamp).toLocaleString()}</div>
          </div>
          <div className="mt-4">
            <button onClick={onClose} className="w-full rounded-lg bg-primary text-white py-2 hover:bg-primary-dark">Done</button>
          </div>
        </div>
      </div>
    </div>
  );
}


