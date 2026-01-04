import React from 'react';

// Sample order data
const sampleOrders = [
  {
    id: 'ORD001',
    date: '2026-01-04',
    items: [
      { name: 'Cheese Pizza', qty: 2, price: 10 },
      { name: 'Coke', qty: 2, price: 2 },
    ],
    total: 24,
    status: 'Delivered',
  },
  {
    id: 'ORD002',
    date: '2026-01-03',
    items: [
      { name: 'Burger', qty: 1, price: 5 },
      { name: 'Fries', qty: 1, price: 3 },
    ],
    total: 8,
    status: 'Preparing',
  },
];

export const MyOrder = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h1>

      <div className="space-y-6">
        {sampleOrders.map((order) => (
          <div key={order.id} className="bg-white shadow-md rounded-lg p-5">
            <div className="flex justify-between mb-3">
              <span className="font-semibold text-gray-700">Order ID: {order.id}</span>
              <span className="text-gray-500 text-sm">{order.date}</span>
            </div>

            <div className="border-t border-b border-gray-200 py-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between mb-2">
                  <span>{item.name} x {item.qty}</span>
                  <span>${item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-3 items-center">
              <span className="font-semibold text-gray-800">Total: ${order.total}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium
                ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                  order.status === 'Preparing' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
