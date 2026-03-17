import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./App.css"
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar/>
        <main className="page-shell">
          <Routes>
            <Route path="/" element={<Products/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/product/:id" element={<ProductDetails/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/account" element={<Account/>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
