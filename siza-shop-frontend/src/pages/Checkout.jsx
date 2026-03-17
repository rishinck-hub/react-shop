import { useState } from "react";
import TimedModal from "../components/TimedModal";

function Checkout(){
 const [modal, setModal] = useState({ open: false, message: "", variant: "info" });

 const showModal = (message, variant = "info") => {
  setModal({ open: true, message, variant });
 };

 const handleCheckout=()=>{

   showModal("Order placed successfully", "success")

 }

 return(
  <>
   <TimedModal
    open={modal.open}
    message={modal.message}
    variant={modal.variant}
    onClose={() => setModal((prev) => ({ ...prev, open: false }))}
   />
   <div className="page-section glass-card">

    <h2>Checkout</h2>

    <button onClick={handleCheckout}>
     Place Order
    </button>

   </div>
  </>

 )

}

export default Checkout
