import React from "react";
import CategoriesDesktop from "../components/CategoriesDesktop";
import CategoriesMovil from "../components/CategoriesMovil";

const CategoriesList = () => {
  return (
    <div>
      <CategoriesDesktop/>
      <CategoriesMovil/>
    </div>
  );
};

export default CategoriesList;
