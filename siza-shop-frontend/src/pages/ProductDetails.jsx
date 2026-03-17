import { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import TimedModal from "../components/TimedModal";
import { useNavigate } from "react-router-dom";


function ProductDetails(){

    const {id} = useParams()
    const token = localStorage.getItem("token")

    const { addToCart, updateQuantity, removeFromCart, cart } = useContext(CartContext)
    const navigate = useNavigate();
    const navTimerRef = useRef(null);

    const[product,setProduct] = useState(null)
    const[loading,setLoading] = useState(true)
    const [modal, setModal] = useState({ open: false, message: "", variant: "info" });

    const showModal = (message, variant = "info") => {
        setModal({ open: true, message, variant });
    };

    useEffect(()=>{
        API.get(`/products/${id}`)
        .then(res=>{
            setProduct(res.data)
            setLoading(false)
    })
    },[id])

    useEffect(() => {
        return () => {
            if (navTimerRef.current) {
                clearTimeout(navTimerRef.current);
            }
        };
    }, []);

    const handleClick = () => {
        if(!token) {
            showModal("Please login first", "error")
            navTimerRef.current = setTimeout(() => {
                navigate("/login");
            }, 1000);
            return
        }
        addToCart(product)
    }

    const itemInCart = cart.find((p) => p.id === product?.id)
    const quantity = itemInCart ? itemInCart.quantity : 0

    const handleIncrement = () => {
        if(!token) {
            showModal("Please login first", "error")
            navTimerRef.current = setTimeout(() => {
                navigate("/login");
            }, 1000);
            return
        }
        if (!itemInCart) {
            addToCart(product)
        } else {
            updateQuantity(product.id, quantity + 1)
        }
    }

    const handleDecrement = () => {
        if(!token) {
            showModal("Please login first", "error")
            navTimerRef.current = setTimeout(() => {
                navigate("/login");
            }, 1000);
            return
        }
        if (!itemInCart) return
        if (quantity <= 1) {
            removeFromCart(product.id)
        } else {
            updateQuantity(product.id, quantity - 1)
        }
    }

    if(loading) return <div className="spinner"></div>

    return(
        <>
            <TimedModal
                open={modal.open}
                message={modal.message}
                variant={modal.variant}
                onClose={() => setModal((prev) => ({ ...prev, open: false }))}
            />
            <div className="details">
                <img src={product.images[0]} width="300" />
                <img src={product.images[1]} width="300" />
                <img src={product.images[2]} width="300" />
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <h3>${product.price}</h3>
                <div className="qty-controls">
                    <button type="button" onClick={handleDecrement}>-</button>
                    <span className="qty-value">{quantity}</span>
                    <button type="button" onClick={handleIncrement}>+</button>
                </div>
                <button onClick={handleClick}>
                Add to Cart
                </button>
            </div>
        </>
    )
}
export default ProductDetails;
