import { Link } from "react-router-dom";

const CategoriesDesktop = () => {
  return (
    <div className="hidden w-9/12 mx-auto md:block">
      <h2 className="font-bold text-center text-2xl p-2 my-4">Categorias</h2>
      <div className="flex justify-center flex-wrap gap-2 bg-gray-200">
        <Link  
          to="/categories/celulares"
          className="text-decoration no-underline text-black w-44 h-44 bg-white flex flex-col justify-center items-center gap-4"
        >
          <span className="material-symbols-outlined">phone_iphone</span>

          <h3 className="font-semibold text-center text-base">Celulares</h3>
        </Link>
        <Link 
          to="/categories/computacion"
          className="text-decoration no-underline text-black w-44 h-44 bg-white flex flex-col justify-center items-center gap-4"
        >
          <span className="material-symbols-outlined">computer</span>

          <h3 className="font-semibold text-center text-base">Computación</h3>
        </Link>
        <Link 
          to="/categories/electronica"
          className="text-decoration no-underline text-black w-44 h-44 bg-white flex flex-col justify-center items-center gap-4 text-center"
        >
          <span className="material-symbols-outlined">keyboard_voice</span>

          <h3 className="font-semibold text-center text-base">Electrónica, Audio y Video</h3>
        </Link>
        <Link 
          to="/categories/deporte"
          className="text-decoration no-underline text-black w-44 h-44 bg-white flex flex-col justify-center items-center gap-4"
        >
          <span className="material-symbols-outlined">sports_soccer</span>
          <h3 className="font-semibold text-center text-base">Deportes y Fitness</h3>
        </Link>
        <Link
          to="/categories/ropa"
          className="text-decoration no-underline text-black w-44 h-44 bg-white flex flex-col justify-center items-center gap-4"
        >
          <span className="material-symbols-outlined">laundry</span>

          <h3 className="font-semibold text-center text-base">Ropa y Accesorios</h3>
        </Link>
        <Link 
          to="/categories/videojuegos"
          className="text-decoration no-underline text-black w-44 h-44 bg-white flex flex-col justify-center items-center gap-4"
        >
          <span className="material-symbols-outlined">stadia_controller</span>

          <h3 className="font-semibold text-center text-base">Consolas y Videojuegos</h3>
        </Link>
        <Link 
          to="/categories/hogarymuebles"
          className="text-decoration no-underline text-black w-44 h-44 bg-white flex flex-col justify-center items-center gap-4"
        >
          <span className="material-symbols-outlined">chair</span>

          <h3 className="font-semibold text-center text-base">Hogar y Muebles</h3>
        </Link>
        <Link 
          to="/categories/vehiculos"
          className="text-decoration no-underline text-black w-44 h-44 bg-white flex flex-col justify-center items-center gap-4"
        >
          <span className="material-symbols-outlined">directions_car</span>

          <h3 className="font-semibold text-center text-base">Carros, Motos y otros</h3>
        </Link>
      </div>
    </div>
  );
};

export default CategoriesDesktop;
