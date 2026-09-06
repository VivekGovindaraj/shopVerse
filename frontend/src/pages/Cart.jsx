import React, { useEffect, useState } from 'react'
import api from '../services/api.js'
import useAuthContext from '../context/AuthContext.jsx'
import {Link, useNavigate} from 'react-router-dom'
import useCart from '../context/CartContext.jsx'
import {showSuccess,showInfo,showError,showWarning} from '../Utils/toast.js'


const Cart = () => {

  const {cartItems, removeFromCart, updateQuantity,  getTotalPrice, clearCart} = useCart();
  const {user} = useAuthContext();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  

  const handleCheckout = async() => {

    if(!user){

      navigate("/login")
      return;
    }

    setProcessing(true)

    const orderData = {
      orderItems:cartItems,
      itemsPrice: getTotalPrice(),
      totalAmount:getTotalPrice(),
      taxAmount:0,
      shippingAmount:0,
      paymentMethod:"COD",
      shippingInfo:{
        address: "2/27 Pookar Street, Melmoil",
        city: "Vellore",
        phoneNo: "7094025396",
        zipcode: "632203",
        country: "India"
      }
    }

    try{
      const {data} = await api.post("/order", orderData)
      clearCart();
      showSuccess("Order Placed Succesfully")
     
      navigate("/")
    }catch(error){
      showError("Failed to Place Order, PLease try again")
      console.log("order not placed", error)
      
    
    }finally{
      setProcessing(false)
    }
  }

  if(cartItems.length === 0){

    return (
      <div className="container mx-auto px-4 py-20 text-center">
              <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm p-12">
                <div className="text-7xl mb-6">🛒</div>
                <h1 className="text-2xl font-bold text-slate-900 mb-3">
                  Your cart is empty
                </h1>
                <p className="text-slate-500 mb-8">
                  Looks like you haven&apos;t added anything yet
                </p>
                <Link
                  to="/"
                  className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
    )
  }
  return (
    <>
       <div className="container mx-auto px-4 py-8 sm:py-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>
      
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.product}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <img
                        src={item?.image}
                        alt={item.name}
                        className="w-full sm:w-24 h-24 object-cover rounded-xl"
                      />
      
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product}`}
                          className="text-lg font-semibold text-slate-900 hover:text-indigo-600 transition line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-indigo-600 font-bold mt-1">
                          ${item.price?.toFixed(2)}
                        </p>
                      </div>
      
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(item.product, item.quantity - 1)
                             }
                            className="px-3 py-2 hover:bg-slate-50 transition"
                          >
                            −
                          </button>
                          <span className="px-3 py-2 font-semibold min-w-[2.5rem] text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() =>{
                               if(item.quantity >= item.stock){

                                alert("Product quantity reached stock limit")
                                return
                              }
                              updateQuantity(item.product, item.quantity + 1)
                             
                            }
                             }
                            className="px-3 py-2 hover:bg-slate-50 transition"
                          >
                            +
                          </button>
                        </div>
      
                        <button 
                           onClick={() => removeFromCart(item.product)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
      
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Order Summary
                  </h2>
      
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span className="font-medium text-slate-900">
                         &#8377; {getTotalPrice().toFixed(2)} 
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <div>Shipping <br/>
                      <div className='mt-2'>Free shipping on order above &#8377;2000</div>
                      </div>
                      
                      <span className="text-emerald-600 font-medium">Free</span>
                    </div>
                    <div className="border-t border-slate-100 pt-3 mt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-slate-900">Total</span>
                        <span className="text-indigo-600">
                           &#8377;{getTotalPrice().toFixed(2)} 
                        </span>
                      </div>
                    </div>
                  </div>
      
                  <button
                    // onClick={handleCheckout}
                    disabled={processing}
                    onClick={handleCheckout}
                    className={`w-full py-3.5 rounded-xl font-semibold mt-6 transition ${
                      processing
                        ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]"
                    }`}
                  >
                    {processing ? "Processing..." : "Proceed to Checkout"}
                  </button>

                  { !user && <div className="bg-yellow-100 border border-yellow-400 font-medium text-sm text-yellow-700 text-center py-2 rounded mt-2" role="alert">
                 
                    Please login to proceed Checkout.
                  </div>}
      
                  <Link
                    to="/"
                    className="block text-center text-sm text-indigo-600 hover:underline mt-4 font-medium"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default Cart