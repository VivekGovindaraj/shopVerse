import React from 'react'
import { Link } from 'react-router-dom'
import useCart from '../context/CartContext';
import { showError, showInfo, showWarning, showSuccess } from '../Utils/toast';



const ProductCard = ({product}) => {

 

      const outOfStock = product.stock === 0;  
      
      const {addToCart} = useCart(); 


      const handleAddToCart = () => {
        if(outOfStock){
            showWarning("Product out of stock")
            // console.log("Product out of stock")
            return 
        }
        addToCart(product)
        showSuccess("Product Added to Cart")

      }
    
  return (
   <>
   <Link to={`/product/${product._id}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col">
        <div className="relative overflow-hidden">
            {/* <img src={product.images[0]?.url} alt={product.name} loading='lazy' */}
            <img src={product.image} alt={product.name} loading='lazy'
            className='w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500'/>

            {product.category && (
            <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-indigo-700 px-2.5 py-1 rounded-full">
                {product.category}
            </span>
            )}
            {outOfStock && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                Sold Out
            </span>
            )}
          

          </div>


          <div className='flex flex-col flex-1 p-5'>
            <h3 className="font-semibold text-slate-900 text-lg mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {product.name}
            </h3>

            <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
                {product.description}
            </p>

            <div className='flex items-center justify-between mb-4'>
                <span className='text-2xl font-bold text-indigo-600'>
                    {product?.price?.toFixed(2)}
                </span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    product.stock > 10
                        ? "bg-emerald-50 text-emerald-700"
                        : product.stock > 0
                        ? "bg-amber-50 text-amber-700"
                        : "bg-red-50 text-red-700"
                    }`}>
                        { outOfStock? "Out of stock " : `${product.stock} left`}
                </span>
            </div>
             <button
                onClick={handleAddToCart}
                 disabled={outOfStock}
                className={`w-full py-2.5 rounded-xl  font-semibold text-sm transition ${
                    outOfStock
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]"
                }`}
                >
                {outOfStock ? "Out of Stock" : "Add to Cart"}
                </button>
         </div>
        
   </Link>
   </>
  )
}

export default ProductCard
