import CategoriesDesktop from "../components/CategoriesDesktop.jsx";
import CategoriesMovil from "../components/CategoriesMovil.jsx";
import HistorialDesktop from "../components/HistorialDesktop.jsx";
import RelationFavorites from "../components/RelationFavorites.jsx";
import RelationHistorial from "../components/RelationHistorial.jsx";

const Home = () => {
  

  return (
    <div>
      <RelationHistorial />
      <RelationFavorites />
      <HistorialDesktop />
      <CategoriesDesktop />
      <CategoriesMovil />
    </div>
  );
};

export default Home;
