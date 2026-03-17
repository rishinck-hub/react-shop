import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../context/CartContext";
import TimedModal from "./TimedModal";
import { useNavigate } from "react-router-dom";


function ProductCard({product}) {
    const { addToCart } = useContext(CartContext);
    const token = localStorage.getItem("token");
    const [modal, setModal] = useState({ open: false, message: "", variant: "info" });
    const navigate = useNavigate();
    const navTimerRef = useRef(null);
    const showModal = (message, variant = "info") => {
        setModal({ open: true, message, variant });
    };

    const handleAddToCart = () => {
        if (!token) {
            showModal("Please login first", "error");
            navTimerRef.current = setTimeout(() => {
                navigate("/login");
            }, 1000);
            return;
        }
        addToCart(product);
        showModal("Added to cart", "success");
    };

    useEffect(() => {
        return () => {
            if (navTimerRef.current) {
                clearTimeout(navTimerRef.current);
            }
        };
    }, []);

    return (
        <>
            <TimedModal
                open={modal.open}
                message={modal.message}
                variant={modal.variant}
                onClose={() => setModal((prev) => ({ ...prev, open: false }))}
            />
            <div className="card">
                <Link to={`/product/${product.id}`}>
                    <img src={product.images[0]} width="200" alt="product image" />
                    <h3>{product.title}</h3>
                    <p>${product.price}</p>
                    <p>Details</p>
                </Link>
                <button type="button" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </>
    )
}

export default ProductCard;
