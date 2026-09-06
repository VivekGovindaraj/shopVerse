import React, { useEffect, useState } from 'react'
import useCart from '../context/CartContext';
import { Link, useParams } from 'react-router-dom';
import { showError, showSuccess, showWarning, showInfo } from '../Utils/toast';
import api from '../services/api';


const ProductDetails = () => {

    const {id} = useParams();

      
      const [product, setProduct] = useState([]);
      const [loading, setLoading] = useState(true);
      const [quantity,setQuantity]= useState(0);
      const {addToCart} = useCart(); 

      const fetchProducts = async () =>{
        setLoading(true)
        try{
             const {data} = await api.get(`/product/${id}`)
             setProduct(data.product || data)
        }catch{
            showError("Product Not found")
        }finally{
            setLoading(false)
        }
       
      }
       


   const outOfStock = product?.stock === 0;  
    
   
   const handleAddToCart = () => {
        if(!product || outOfStock){
            showWarning("Product out of stock")
            // console.log("Product out of stock")
            return 
        }
        addToCart(product, quantity)
        showSuccess("Product Added to Cart")

      }



     useEffect(() => {
      fetchProducts()
      setQuantity(1)
     }, [id])
  return (
    <>
        <div className="container mx-auto px-4 py-8 sm:py-12">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 text-sm font-medium mb-8 border border-1 px-4 py-3 rounded-md transition"
      >
        ← Back to products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-72 sm:h-96 lg:h-[480px] object-cover"
          />
        </div>

        <div className="flex flex-col">
          {product?.category && (
            <span className="inline-block w-fit bg-indigo-50 text-indigo-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
              {product?.category}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {product?.name}
          </h1>

          <p className="text-slate-600 leading-relaxed mb-6">
            {product?.description}
          </p>

          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl font-bold text-indigo-600">
              ${product?.price?.toFixed(2)}
            </span>
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                outOfStock
                  ? "bg-red-50 text-red-700"
                  : product?.stock <= 10
                    ? "bg-amber-50 text-amber-700"
                    : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {outOfStock ? "Out of stock" : `${product?.stock} in stock`}
            </span>
          </div>

          {!outOfStock && (
            <div className="flex items-center gap-4 mb-8">
              <label className="text-sm font-medium text-slate-700">
                Quantity
              </label>
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 hover:bg-slate-50 transition text-lg"
                >
                  −
                </button>
                <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  }
                  className="px-4 py-2 hover:bg-slate-50 transition text-lg"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-auto">
            <button
             onClick={handleAddToCart}
              disabled={outOfStock}
              className={`flex-1 py-3.5 rounded-xl font-semibold transition ${
                outOfStock
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]"
              }`}
            >
              Add to Cart
            </button>
            <Link
              to="/cart"
              className="flex-1 py-3.5 rounded-xl font-semibold text-center border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ProductDetails