import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider.jsx";

const initialForm = {
  email: "",
  password: "",
};

const FormLogin = () => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const { loginUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(form);
      setForm(initialForm);
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode);
      switch (errorCode) {
        case "auth/wrong-password":
          setError("Contraseña Incorrecta");
          break;
        case "auth/user-not-found":
          setError("Usuario no registrado");
          break;
        case "auth/missing-password":
          setError("Password es requerida");
          break;
        case "auth/invalid-email":
          setError("Email es requerido");
          break;

        default:
          setError("error en el servidor");
          break;
      }
    }
  };

  return (
    <div className="bg-gray-400 py-4 w-full h-full flex flex-col justify-center">
      <div className="h-4/6 w-4/5 flex flex-col justify-center gap-4 m-auto md:w-96">
        <h2 className="font-medium text-2xl">
          Si Deseas comprar Artículos de lujo{" "}
          <span className="text-blue-600 font-bold text-3xl"> Inicia Sesión</span>
        </h2>
        {error && <p className="font-bold bg-red-600 px-4 py-2 text-center rounded">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="font-medium">Correo</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            value={form.email}
            className="block w-full mb-4 rounded px-4 py-2"
          />
          <label htmlFor="password" className="font-medium">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={form.password}
            className="block w-full mb-4 rounded px-4 py-2"
          />
          <button className="w-full bg-blue-600 rounded px-4 py-2 font-bold text-2xl text-white mb-2" type="sumbit">Iniciar</button>
          <Link className="font-medium no-underline" to="/register">Crear cuenta</Link>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
