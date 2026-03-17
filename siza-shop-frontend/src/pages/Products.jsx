import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";
import CategoryFilter from "../components/CategoryFilter";

function Products() {
    const[products,setProducts] = useState([]);
    const[categories,setCategories] = useState([]);
    const[search, setSearch] = useState("");
    const[category,setCategory] = useState("")
    const[loading,setLoading] = useState(true)
    const[error,setError] = useState(null)

    useEffect(()=>{

        async function fetchData(){
            try {
            await API.get("/products").then(res => setProducts(res.data));
            await API.get("/categories").then(res => setCategories(res.data));

            } catch(err) {
                setError("Failed to load product",err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    },[])

    if(loading) return <div className="spinner"></div>
    if(error) return <h2>{error}</h2>

    const filteredProducts = products.filter((p)=> p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p)=> category ? p.category.id == category : true)

    return (
        <div>
            <div className="toolbar glass-card">
                <SearchBar search={search} setSearch={setSearch}/>
                <CategoryFilter categories={categories} setCategory={setCategory}/>
            </div>
            <div className="grid">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </div>

    );
}

export default Products;
