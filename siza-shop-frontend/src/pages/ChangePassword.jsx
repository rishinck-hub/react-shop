import { useState } from "react"
import TimedModal from "../components/TimedModal";

function ChangePassword(){

 const [oldPass,setOldPass] = useState("")
 const [newPass,setNewPass] = useState("")
 const [modal, setModal] = useState({ open: false, message: "", variant: "info" });

 const showModal = (message, variant = "info") => {
  setModal({ open: true, message, variant });
 };

 const handleSubmit=(e)=>{

  e.preventDefault()

  showModal("Password changed successfully", "success")

 }

 return(

  <>
   <TimedModal
    open={modal.open}
    message={modal.message}
    variant={modal.variant}
    onClose={() => setModal((prev) => ({ ...prev, open: false }))}
   />
   <form className="form-card glass-card" onSubmit={handleSubmit}>

   <input
   type="password"
   placeholder="Old password"
   onChange={(e)=>setOldPass(e.target.value)}
   />

   <input
   type="password"
   placeholder="New password"
   onChange={(e)=>setNewPass(e.target.value)}
   />

   <button>Update Password</button>

  </form>
  </>

 )

}

export default ChangePassword
