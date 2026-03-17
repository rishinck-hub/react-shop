import { useState } from "react";
import API from "../services/api";
import TimedModal from "../components/TimedModal";

function Signup() {
    const[name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[type,setType] = useState("password")
    const [modal, setModal] = useState({ open: false, message: "", variant: "info" });

    const showModal = (message, variant = "info") => {
        setModal({ open: true, message, variant });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {await API.post("/users",{
            name,
            email,
            password,
            avatar:"https://i.pravatar.cc/300"
        })
        showModal("User created", "success")
        } catch(err) {
            console.error(err)
            showModal("Signup failed", "error")
        }
    };

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
            <form className="form-card glass-card" onSubmit={handleSubmit}>
                <h2>Signup</h2>
                <input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} />
                <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type={type} placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
                <button type="button" onClick={handleToggle}>{type=='password' ? 'Show' : 'Hide'}</button>
                <button type="submit">Signup</button>
            </form>
        </>
    )
}

export default Signup;
