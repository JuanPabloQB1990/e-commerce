import { useNavigate, useParams } from "react-router-dom";
import ProductsList from "../components/ProductsList";
import { UserContext } from "../context/UserProvider";
import { ProductContext } from "../context/ProductProvider";
import { useContext, useEffect } from "react";

const ProductsUser = () => {
  
  const { idUser } = useParams();
  const { userAuth } = useContext(UserContext);
  const { getProductsUser, ProductsUser } = useContext(ProductContext);
  const navigate = useNavigate();

  ProductsUser.map((product) => {
    if (product.id_user !== userAuth.uid) {
      navigate("/*");
    }
  });

  useEffect(() => {
    getProductsUser(idUser);
  }, [idUser]);

  return (
    <div>
      <ProductsList title="Mis Productos" products={ProductsUser} />
    </div>
  );
};

export default ProductsUser;
