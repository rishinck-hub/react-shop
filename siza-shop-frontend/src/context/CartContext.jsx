import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({children}) {
    
    const[cart,setCart] = useState([]);

    const addToCart = (product) => {
        const existing = cart.find(p => p.id === product.id);

        if(existing){
            setCart(cart.map(p =>
                p.id === product.id ? {...p,quantity:p.quantity + 1} : p
            ))
        } else {
            setCart([...cart,{...product,quantity:1}])
        }
    }

    const removeFromCart = (id) => {
        setCart(cart.filter(p=>p.id!==id))
    }

    const updateQuantity = (id,qty) => {
        setCart(cart.map(p =>
            p.id === id ? {...p,quantity:qty} : p
        ))
    }

    const clearCart = () => {
        setCart([])
    }

    return(
        <CartContext.Provider value={{cart,addToCart,removeFromCart,updateQuantity,clearCart}}>{children}</CartContext.Provider>
    )
}
