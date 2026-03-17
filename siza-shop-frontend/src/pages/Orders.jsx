function Orders(){

 const orders =
 JSON.parse(localStorage.getItem("orders")) || []

 return(

  <div className="page-section glass-card">

   <h2>My Orders</h2>

   {orders.map((order,index)=>(
    <div className="order-item" key={index}>

     <p>Total: ${order.total}</p>

    </div>
   ))}

  </div>

 )

}

export default Orders
