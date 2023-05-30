import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserProvider";
import fotoDefault from "../../public/products/fotoDefault.jpg";

const Profile = () => {
  const [ActiveName, setActiveName] = useState(false);
  const { userAuth, updateUserName, updateImageProfile, loading } =
    useContext(UserContext);
  const [inputName, setInputName] = useState("");
  const [inputFile, setInputFile] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorFile, setErrorFile] = useState("");

  useEffect(() => {
    console.log("render profile");
    
    if (userAuth) {
      console.log(userAuth.displayName);
      setInputName(userAuth.displayName);
    }
  }, [userAuth]);
  
  const onSubmitName = async() => {
    if (!inputName.trim()) {
      setErrorName("escriba un nombre de usuario");
    } else {
      await updateUserName(inputName);
      if (!loading) {
        setActiveName(false);
        
      }
    }
  };

  console.log(inputFile.type);
  const onSubmitImage = async(e) => {
    if (!inputFile) {
      setErrorFile("debes seleccionar una imagen");
    }
    if (
      inputFile.type !== "image/png" &
      inputFile.type !== "image/jpg" &
      inputFile.type !== "image/jpeg"
    ) {
      setErrorFile("Solo se permite foto formato jpg, jpeg o png");
      
    }else {
      updateImageProfile(inputFile);

    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="h-4/5 w-4/5 md:w-96">
        <h1 className="font-bold text-2xl text-center">Perfil de Usuario</h1>
        <div className="w-auto">
          <div className="my-4">
            <img
              src={userAuth.photoURL ? userAuth.photoURL : fotoDefault}
              alt=""
              className="w-44 h-44 mx-auto rounded-full object-cover"
            />
          </div>
          <h2 className="font-bold text-center my-2">
            <span className="font-normal"></span> {userAuth.displayName}
          </h2>
          <div className="w-4/5 mx-auto my-4">
            <button
              onClick={() => setActiveName(true)}
              className="w-full bg-blue-600 hover:bg-blue-400 transition-all duration-75 text-white rounded px-4 py-2 font-bold mx-auto"
            >
              Cambiar Nombre
            </button>
          </div>
        </div>
        <div className="w-full">
          {ActiveName && (
            <div className="w-full mx-auto my-8">
              {errorName ? (
                <p className="w-4/5 font-bold bg-red-600 px-4 py-2 mb-2 mx-auto text-center rounded">
                  {errorName}
                </p>
              ) : null}
              <input
                type="text"
                name=""
                id=""
                className="block w-4/5 mb-2 rounded px-4 py-2 mx-auto"
                placeholder="Escribe tu nombre"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
              {loading ? <button className="block w-4/5 bg-blue-600 hover:opacity-60 transition-all duration-0 text-white font-bold rounded px-4 py-2 mx-auto" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
              </button>: <button
                onClick={(e) => onSubmitName(e)}
                className="block w-4/5 bg-blue-600 hover:bg-blue-400 transition-all duration-75 text-white font-bold rounded px-4 py-2 mx-auto"
              >
                Editar Nombre
              </button>}
              
              
            </div>
          )}

          <div className="w-full mx-auto my-8">
            {errorFile ? (
              <p className="w-4/5 font-bold bg-red-600 px-4 py-2 mb-2 mx-auto text-center rounded">
                {errorFile}
              </p>
            ) : null}
            <input
              type="file"
              name=""
              id="inputFile"
              className="hidden w-4/5"
              onChange={(e) => setInputFile(e.target.files[0])}
            />
            <label
              htmlFor="inputFile"
              className="w-4/5 h-24 block rounded border-2 border-gray-400 border-dashed px-4 py-2 font-bold mx-auto mb-2 cursor-pointer text-center"
            >
              Click aqui y selecciona una Imagen
            </label>
            {loading ? <button className="block w-4/5 bg-blue-600 hover:opacity-60 transition-all duration-0 text-white font-bold rounded px-4 py-2 mx-auto" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
              </button>: <button
                onClick={() => onSubmitImage()}
                className="block w-4/5 bg-blue-600 hover:bg-blue-400 transition-all duration-75 text-white font-bold rounded px-4 py-2 mx-auto"
              >
                Editar Imagen
              </button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
