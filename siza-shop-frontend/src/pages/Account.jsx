import { Link } from "react-router-dom"

function Account(){

 return(
  <div className="page-section glass-card">
   <h2>My Account</h2>
   <Link to="/cart">My Orders</Link>
  </div>
 )

}

export default Account
