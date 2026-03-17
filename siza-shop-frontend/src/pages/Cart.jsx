import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function Cart(){

 const {cart,removeFromCart,updateQuantity,clearCart} =
 useContext(CartContext)

 const total = cart.reduce(
  (sum,item)=> sum + item.price * item.quantity
 ,0)

 return(

  <div className="page-section glass-card">

   <h2>Your Cart</h2>

   {cart.map(item=>(
    <div className="cart-item" key={item.id}>

     <h3>{item.title}</h3>

     <div className="qty-controls">
      <button
       type="button"
       onClick={() => {
        if (item.quantity <= 1) {
         removeFromCart(item.id)
        } else {
         updateQuantity(item.id, item.quantity - 1)
        }
       }}
      >
       -
      </button>
      <span className="qty-value">{item.quantity}</span>
      <button
       type="button"
       onClick={() => updateQuantity(item.id, item.quantity + 1)}
      >
       +
      </button>
     </div>

     <button onClick={()=>
      removeFromCart(item.id)
     }>
      Remove
     </button>

    </div>
   ))}

   <h3>Total: ${total}</h3>

   <button type="button" onClick={clearCart}>
    Place Order
   </button>

  </div>

 )

}

export default Cart
