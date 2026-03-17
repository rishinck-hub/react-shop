import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../context/CartContext"

function Navbar(){

 const { cart } = useContext(CartContext)

 const [token, setToken] = useState(localStorage.getItem("token"))

 useEffect(() => {
  const syncToken = () => setToken(localStorage.getItem("token"))
  window.addEventListener("authChanged", syncToken)
  window.addEventListener("storage", syncToken)
  return () => {
    window.removeEventListener("authChanged", syncToken)
    window.removeEventListener("storage", syncToken)
  }
 }, [])

 const handleLogout = ()=>{
  localStorage.removeItem("token")
  setToken(null)
  window.dispatchEvent(new Event("authChanged"))
 }

 const cartCount = cart.reduce((sum,item)=> sum + item.quantity,0)

 return(
  <nav className="navbar">
   <h2>
     <Link to="/">React Shop</Link>
   </h2>

   <div className="nav-links">
    <Link to="/">Products</Link>
    {token && (
      <>
        <Link to="/cart">Cart ({cartCount})</Link>
        <Link to="/account">Account</Link>
      </>
    )}
    {!token && (
      <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </>
    )}
    {token && (
      <button onClick={handleLogout}>Logout</button>
    )}
   </div>
  </nav>
 )

}

export default Navbar
