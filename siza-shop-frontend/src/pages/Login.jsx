import { useState } from "react";
import API from "../services/api";
import TimedModal from "../components/TimedModal";

function Login() {
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[type,setType] = useState("password")
    const [modal, setModal] = useState({ open: false, message: "", variant: "info" });

    const showModal = (message, variant = "info") => {
        setModal({ open: true, message, variant });
    };

    const handleLogin = async(e)=>{
        e.preventDefault()
        try {
            const res = await API.post("/auth/login",{email,password})

            localStorage.setItem("token",res.data.access_token)
            window.dispatchEvent(new Event("authChanged"))

            showModal("Login successful", "success")
        } catch(err) {
            showModal("Invalid credential", "error")
        }
    }
    const handleToggle = ()=>{
        if(type==='password'){
            setType('text')
        }else{
            setType('password')
        }

    }
    return (
        <>
            <TimedModal
                open={modal.open}
                message={modal.message}
                variant={modal.variant}
                onClose={() => setModal((prev) => ({ ...prev, open: false }))}
            />
            <form className="form-card glass-card" onSubmit={handleLogin}>
                <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type={type} placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
                <button type="button" onClick={handleToggle}>{type=='password' ? 'Show' : 'Hide'}</button>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login;
