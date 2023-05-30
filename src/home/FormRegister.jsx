import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider.jsx";
import { useNavigate } from "react-router-dom";

const initialForm = {
  email: "",
  password: "",
  repeat_password: "",
};

const FormRegister = () => {
  const [form, setForm] = useState(initialForm);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setError,
    formState: { errors },
  } = useForm(form);

  const { registerUser } = useContext(UserContext);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      setForm(initialForm);
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      console.log(errorCode);
      switch (errorCode) {
        case "auth/email-already-in-use":
          setError("email", { message: "Email ya esta registrado" });
          break;

        default:
          setError("ocurrio un error en el servidor");
          break;
      }
    }
  };

  return (
    <div className="bg-gray-400 w-full h-full flex flex-col justify-center py-4">
      <div className="h-4/6 w-4/5 flex flex-col justify-center gap-4 m-auto md:w-96">
        <h2 className="font-medium text-2xl text-center">Crea tu Cuenta</h2>
        {errors?.email && <p className="font-bold bg-red-600 px-4 py-2 text-center rounded">{errors.email.message}</p>}
        {errors?.password && <p className="font-bold bg-red-600 px-4 py-2 text-center rounded">{errors.password.message}</p>}
        {errors?.repassword && <p className="font-bold bg-red-600 px-4 py-2 text-center rounded">{errors.repassword.message}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="font-medium" htmlFor="email">Correo:</label>
          <input
            type="email"
            id="email"
            className="block w-full mb-4 rounded px-4 py-2"
            {...register("email", {
              required: { value: true, message: "Email es obligatorio" },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "formato email invalido",
              },
            })}
          />

          <label className="font-medium" htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            className="block w-full mb-4 rounded px-4 py-2"
            {...register("password", {
              required: { value: true, message: "Password es obligatoria" },
              minLength: { value: 6, message: "se requiere minimo 6 caracteres" },
              pattern: {
                value: /^[\S]+[\w\-\@\.\+\/\*]+[\S]+$/,
                message: "no se permiten espacios en la password",
              },
            })}
          />

          <label className="font-medium" htmlFor="repeat_password">Repetir Contraseña:</label>
          <input
            type="password"
            id="repeat_password"
            className="block w-full mb-4 rounded px-4 py-2"
            {...register("repassword", {
              validate: {
                equals: (v) =>
                  v === getValues("password") || "Las Password no coinciden",
              },
            })}
          />

          <button className="w-full bg-blue-600 rounded px-4 py-2 font-bold text-2xl text-white mb-2" type="submit">Registrar</button>
          <Link className="font-medium no-underline " to="/login">Inicia Sesión</Link>
        </form>
      </div>
        
      </div>
  );
};

export default FormRegister;
