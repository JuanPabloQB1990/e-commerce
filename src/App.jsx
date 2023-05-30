import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider.jsx";
import FormRegister from "./home/FormRegister";
import Home from "./home/Home";
import FormLogin from "./home/FormLogin";
import ProductCart from "./home/ProductCart";
import ProtectedAuth from "./middleware/ProtectedAuth";
import Profile from "./home/Profile";
import NotBackLogin from "./middleware/NotBackLogin";
import CategoriesList from "./home/CategoriesList";
import ProdCategoryList from "./home/ProdCategoryList";
import ProductView from "./home/ProductView";
import FormSell from "./home/FormSell";
import ProductsUser from "./home/ProductsUser";
import FormEdit from "./home/FormEdit";
import PageNotFound from "./home/PageNotFound";
import BuyProduct from "./home/BuyProduct";
import CartUser from "./home/CartUser";
import NavBar from "./components/NavBar";

function App() {
  const { userAuth } = useContext(UserContext);

  if (userAuth === false) {
    return <h3>Loading...</h3>;
  }

  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route element={<NotBackLogin />}>
          <Route path="/register" element={<FormRegister />}></Route>
          <Route path="/login" element={<FormLogin />}></Route>
        </Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route path="/categories" element={<CategoriesList />}></Route>
        <Route path="/categories/:name" element={<ProdCategoryList />}></Route>
        <Route path="/product/:id" element={<ProductView />}></Route>
        <Route element={<ProtectedAuth />}>
          <Route path="/products-cart" element={<ProductCart />}></Route>
          <Route
            path="/products-user/:idUser"
            element={<ProductsUser />}
          ></Route>
          <Route path="/sell" element={<FormSell />}></Route>
          <Route
            path="/product-edit/:idProductEdit"
            element={<FormEdit />}
          ></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/buy-products/:num" element={<BuyProduct />}></Route>
          <Route path="/cart-user" element={<CartUser />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
