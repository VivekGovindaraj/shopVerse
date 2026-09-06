import React, { createContext, useContext, useEffect, useState } from 'react'

let CartContext = createContext()

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading,setLoading] = useState(true)

    useEffect(() => {

        try{
            const savedCart = localStorage.getItem("cart")

            if(savedCart){
                setCartItems(JSON.parse(savedCart))
            }

            console.log(savedCart)
        }catch(error){
            console.error("Failed to Cart", error)
        }finally{
            setLoading(false)
        }
        
    }, [])

    // save cart items to local storage whenever cariTms gets change

    useEffect(() => {
        if(loading) return
        localStorage.setItem("cart" , JSON.stringify(cartItems))
    }, [cartItems, loading])

    const addToCart = (product, quantity=1) => {
        console.log(product,quantity)

        setCartItems((prevCartItems) => {
  
        const existingItem = prevCartItems.find(
            item => item.product === product._id
        );

        if(existingItem){
                return prevCartItems.map(item => {
                    return   item.product === product._id ? {...item, quantity:item.quantity + quantity} :item
                })
        }else{
            return[...prevCartItems,
                {
                product: product._id,
                name: product.name,
                price: product.price,
                // image: product.images[0]?.url,
                image: product.image,
                quantity,
                stock:product.stock
                }
            ]
        }

        
        });
    }

    const removeFromCart = (product) => {

        setCartItems( (prevCartItems) => {
           return prevCartItems.filter( item => item.product !== product )
        })
    }

    const updateQuantity = (product, quantity) => {

        const productItem =  cartItems.find(item => item.product === product)

        if(quantity <= 0){
            removeFromCart(product)
            return;
        }

        if(quantity > productItem.stock){
            return ;
        }
        setCartItems( prevCartItems => {
            return prevCartItems.map(item => item.product === product ? {...item, quantity} : item)
        })
    }

    const getTotalPrice= () => {
        return cartItems.reduce( (total, item) => total + (item.price * item.quantity), 0 )
    }

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + (item.quantity), 0 )
    }

    const clearCart = () => {
        setCartItems([])
    }

    let value = {
        cartItems,
    addToCart,
    loading,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    clearCart
    }
  return (
    <>
        <CartContext.Provider value={value}>
              {children}
        </CartContext.Provider>
    </>
  )
}

const useCart = () => {
    let context = useContext(CartContext)

    if(!context) {
        throw new Error ("Cart Context must be used with cart provider")
    }
        
    return context
}
export default useCart