import { Link } from "react-router-dom";

const CategoriesMovil = () => {
  return (
    <div className="m-4 p-2 bg-white rounded-md shadow-lg shadow-gray-500/50 md:hidden">
      <h2 className="font-bold text-2xl p-2 my-4">Categorias</h2>
      <div className="border-y-2">
        <Link to="/categories/celulares" className="flex gap-2 border-b-2 p-4 text-decoration no-underline text-black">
          <span className="material-symbols-outlined">phone_iphone</span>
          <h3 className="font-bold text-base">Celulares</h3>
        </Link>
        <Link
          to="/categories/computacion"
          className="flex gap-2 border-b-2 p-4 text-decoration no-underline text-black"
        >
          <span className="material-symbols-outlined">computer</span>

          <h3 className="font-bold text-base">Computación</h3>
        </Link>
        <Link
          to="/categories/electronica"
          className="flex gap-2 border-b-2 p-4 text-decoration no-underline text-black"
        >
          <span className="material-symbols-outlined">keyboard_voice</span>

          <h3 className="font-bold text-base">Electrónica, Audio y Video</h3>
        </Link>
        <Link to="/categories/deporte" className="flex gap-2 p-4 border-b-2 text-decoration no-underline text-black">
          <span className="material-symbols-outlined">sports_soccer</span>
          <h3 className="font-bold text-base">Deportes y Fitness</h3>
        </Link>
        <Link
          to="/categories/ropa"
          className="flex gap-2 border-b-2 p-4 text-decoration no-underline text-black"
        >
          <span className="material-symbols-outlined">laundry</span>

          <h3 className="font-bold text-base">Ropa y otros</h3>
        </Link>
        <Link
          to="/categories/videojuegos"
          className="flex gap-2 border-b-2 p-4 text-decoration no-underline text-black"
        >
          <span className="material-symbols-outlined">stadia_controller</span>

          <h3 className="font-bold text-base">Consolas y Videojuegos</h3>
        </Link>
        <Link to="/categories/vehiculos" className="flex gap-2 border-b-2 p-4 text-decoration no-underline text-black">
          <span className="material-symbols-outlined">directions_car</span>

          <h3 className="font-bold text-base">Carros, Motos y otros</h3>
        </Link>
        <Link
          to="/categories/hogarymuebles"
          className="flex gap-2 border-b-2 p-4 text-decoration no-underline text-black"
        >
          <span className="material-symbols-outlined">weekend</span>

          <h3 className="font-bold text-base">Hogar y Muebles</h3>
        </Link>
      </div>
    </div>
  );
};

export default CategoriesMovil;
