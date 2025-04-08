import React from 'react'

const Cart = () => {
  return (
    <>
      <div className="cart-container p-6 bg-gray-100 min-h-screen pt-24">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="cart-items space-y-4">
          {/* Example of a cart item */}
          <div className="cart-item flex items-center bg-white shadow-md rounded-lg p-4">
            <img
              src="property-image.jpg"
              alt="Property"
              className="cart-item-image w-24 h-24 object-cover rounded-md mr-4"
            />
            <div className="cart-item-details flex-1">
              <h2 className="text-xl font-semibold">Property Name</h2>
              <p className="text-gray-600">Location: City, Country</p>
              <p className="text-gray-800 font-medium">Price: $100/night</p>
            </div>
            <button className="remove-item-button bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
              Remove
            </button>
          </div>
        </div>
        <div className="cart-summary mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <p className="text-gray-700">Total Properties: 1</p>
          <p className="text-gray-700">Total Price: $100</p>
          <button className="checkout-button mt-4 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  )
}

export default Cart