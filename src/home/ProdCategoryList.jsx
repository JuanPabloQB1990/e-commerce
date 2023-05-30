import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ProductsList from "../components/ProductsList";
import { ProductContext } from "../context/ProductProvider";

const ProdCategoryList = () => {
  console.log("lista categorias");
  const { getProductsCategoryList, productsCategoryList } = useContext(ProductContext);
  const { name } = useParams();

  useEffect(() => {
    getProductsCategoryList(name);
  }, [name]);

  return (
    <div>
      <ProductsList title={`${name}`} products={productsCategoryList} />
    </div>
  );
};

export default ProdCategoryList;
