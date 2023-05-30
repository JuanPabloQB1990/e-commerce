import { memo, useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider.jsx";

const NavBar = () => {
  const { userAuth, userOut } = useContext(UserContext);
  const [activeMenu, setActiveMenu] = useState(false);
  const navigate = useNavigate();

  const closeSession = () => {
    userOut();
    navigate("/");
  };

  const handleChekbox = (e) => {
    console.log("checked");
    setActiveMenu(e.target.checked);
  };

  return (
    <nav
      className={`w-full flex flex-col bg-yellow-500 justify-start ${
        activeMenu ? "h-auto" : "h-16"
      }`}
    >
      <div className="relative sm:hidden m-2">
        <input
          id="checked"
          type="checkbox"
          onChange={handleChekbox}
          className="w-12 h-12 opacity-0 absolute z-10 hover:cursor-pointer"
        />
        <div
          id="toggle"
          className="absolute flex flex-col justify-between w-12 h-12"
        >
          <div
            className={`w-12 border-2 border-black origin-top-left ${
              activeMenu && "rotate-45 w-16"
            } transition duration-300`}
          ></div>
          <div
            className={`w-12 border-2 border-black ${activeMenu && "hidden"} `}
          ></div>
          <div
            className={`w-12 border-2 border-black origin-bottom-left ${
              activeMenu && "-rotate-45 w-16"
            } transition duration-300`}
          ></div>
        </div>
      </div>
      {userAuth !== null ? (
        <div
          className={`${
            activeMenu ? "flex flex-col" : "hidden"
          } transition duration-300 sm:flex sm:flex-row justify-end gap-4`}
        >
          <NavLink
            className="w-full text-center py-2 no-underline text-black font-medium"
            to="/"
          >
            Inicio
          </NavLink>
          <Link
            className="w-full text-center py-2 no-underline text-black font-medium"
            to="/cart-user"
          >
            Carrito
          </Link>
          <Link
            className="w-full text-center py-2 no-underline text-black font-medium"
            to="/profile"
          >
            Perfil
          </Link>
          <Link
            className="w-full text-center py-2 no-underline text-black font-medium"
            to="/sell"
          >
            Vender
          </Link>
          <Link
            className="w-full text-center py-2 no-underline text-black font-medium"
            to={userAuth && `/products-user/${userAuth.uid}`}
          >
            Mis Productos
          </Link>
          <Link
            className="w-full text-center py-2 no-underline text-black font-medium"
            to="/categories"
          >
            Categorias
          </Link>
          <div className="w-full px-2 text-center">
            <button
              className="py-2 px-4 my-2 hover:border-red-500 hover:text-red-500 w-1/3 sm:w-full h-10/12 border-2 border-black rounded font-semibold"
              onClick={closeSession}
            >
              Salir
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`${
            activeMenu ? "flex flex-col" : "hidden"
          } transition duration-300 sm:flex sm:flex-row justify-end gap-4`}
        >
          <Link
            className="text-center py-2 no-underline text-black font-medium"
            to="/login"
          >
            Ingresar
          </Link>
          <Link
            className="text-center py-2 no-underline text-black font-medium mr-2"
            to="/register"
          >
            Registrarse
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
