import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProductContext } from "../context/ProductProvider.jsx";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider.jsx";

const initialProduct = {
  name_product: "",
  description_product: "",
  price_product: "",
  category_product: "",
  stock_product: "",
  discount_product: "",
  img_product: "",
};

const FormSell = () => {
  
  const { saveProduct, loadingProduct } = useContext(ProductContext);
  const { userAuth } = useContext(UserContext);
  const [formProduct, setFormProduct ] = useState(initialProduct);
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm({defaultValues: formProduct});

  const onSubmit = async(data) => {
    const photos = [];
    for (let index = 0; index < data.img_product.length; index++) {
      const element = data.img_product[index];
      if (
        element.type === "image/jpg" ||
        element.type === "image/jpeg" ||
        element.type === "image/png"
      ) {
        // guardar fotos en array
        photos.push(element.name + "-" + Date.now());
        
      } else {
        // mostrar error
        setError("img_product", {
          message: "solo permite formato de imagen jpg, jpeg y png",
        });
      }
    }
    // se envia al ProductProvider los datos a procesar
    await saveProduct(data, data.img_product)

    reset(initialProduct);
    navigate(`/products-user/${userAuth.uid}`)
    
  };

  return (
    <div className="bg-gray-400 w-full h-screen flex flex-col justify-center">
      <div className="h-auto w-4/5 flex flex-col justify-center gap-4 m-auto md:w-96">
        <h2 className="font-medium text-2xl text-center">
          Ingresa un Producto
        </h2>
        <form id="imagenes" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="product_name" className="font-medium">
            Nombre del Producto
          </label>
          <input
            type="text"
            id="name_product"
            className="block w-full mb-2 rounded px-4 py-2"
            {...register("name_product", {
              required: {
                value: true,
                message: "el nombre del producto es requerido",
              },
              pattern: {
                value: /[\w]+/,
                message: "solo puede llevar letras de [a-z A-Z 0-9]",
              },
              minLength: {
                value: 6,
                message: "el nombre requiere minimo 6 caracteres",
              },
            })}
          />
          {errors?.name_product && (
            <p className="font-bold bg-red-600 px-4 py-2 my-2 text-center rounded">
              {errors.name_product.message}
            </p>
          )}
          <label htmlFor="description_product" className="font-medium">
            Descripcion del Producto
          </label>
          <textarea
            id="description_product"
            className="block w-full mb-4 rounded px-4 py-2"
            {...register("description_product", {
              required: {
                value: true,
                message: "la descripción es requerida",
              },
              minLength: {
                value: 6,
                message: "se requiere minimo 6 caracteres",
              },
            })}
          ></textarea>
          {errors?.description_product && (
            <p className="font-bold bg-red-600 px-4 py-2 my-2 text-center rounded">
              {errors.description_product.message}
            </p>
          )}

          <label htmlFor="price_product" className="font-medium">
            Precio del Producto
          </label>
          <input
            className="block w-full mb-4 rounded px-4 py-2"
            type="number"
            id="price_product"
            placeholder="Solo permite numeros"
            {...register("price_product", {
              required: {
                value: true,
                message: "El precio del producto es requerido",
              },
            })}
          />
          {errors?.price_product && (
            <p className="font-bold bg-red-600 px-4 py-2 my-2 text-center rounded">
              {errors.price_product.message}
            </p>
          )}

          <label className="font-medium">Categoria</label>
          <select
            className="block w-full mb-4 rounded px-4 py-2"
            {...register("category_product", {
              required: {
                value: true,
                message: "la categoria del producto es requerida",
              },
            })}
          >
            <option value="">--Seleccióne--</option>
            <option value="celulares">Celulares</option>
            <option value="computacion">Computacion</option>
            <option value="electronica">Electronica</option>
            <option value="deporte">Deporte</option>
            <option value="ropa">Ropa y otros</option>
            <option value="videojuegos">Videojuegos</option>
            <option value="hogarymuebles">Hogar y Muebles</option>
            <option value="vehiculos">Vehiculos</option>
          </select>
          {errors?.category_product && (
            <p className="font-bold bg-red-600 px-4 py-2 my-2 text-center rounded">
              {errors.category_product.message}
            </p>
          )}

          <label htmlFor="stock_product" className="font-medium">
            Cantidad en Stock
          </label>
          <input
            type="number"
            id="stock_product"
            className="block w-full mb-4 rounded px-4 py-2"
            placeholder="Solo permite numeros"
            {...register("stock_product", {
              required: {
                value: true,
                message: "el stock del producto es requerido",
              },
              min: {
                value: 1,
                message: "debes ingresar uno o mas en la cantidad de stock",
              },
            })}
          />
          {errors?.stock_product && (
            <p className="font-bold bg-red-600 px-4 py-2 my-2 text-center rounded">
              {errors.stock_product.message}
            </p>
          )}

          <label htmlFor="discount_product" className="font-medium">
            Descuento del Producto
          </label>
          <input
            type="number"
            id="discount_product"
            className="block w-full mb-4 rounded px-4 py-2"
            placeholder="Solo permite numeros"
            {...register("discount_product", {
              min: {
                value: 1,
                message: "debes ingresar el 1% o mas al descuento",
              },
            })}
          />
          {errors?.discount_product && (
            <p className="font-bold bg-red-600 px-4 py-2 my-2 text-center rounded">
              {errors.discount_product.message}
            </p>
          )}

          <div className="border-dashed border-2 border-gray-300 h-44">
            <input
              type="file"
              id="inputFile"
              multiple
              className="hidden w-4/5"
              {...register("img_product", {
                required: {
                  value: true,
                  message: "Debe subir al menos una imagen",
                },
              })}
            />
            <label
              htmlFor="inputFile"
              className="w-full h-full block rounded border-2 border-gray-400 border-dashed px-4 py-2 font-bold cursor-pointer text-center"
            >
              Click aqui y sube imagenes para tu producto
            </label>
          </div>
          {errors?.img_product && (
            <p className="font-bold bg-red-600 px-4 py-2 my-2 text-center rounded">
              {errors.img_product.message}
            </p>
          )}
          {loadingProduct ? (
            <button
              className="block w-full bg-blue-600 hover:opacity-60 transition-all duration-0 text-white font-bold rounded px-4 py-2 my-4 mx-auto"
              type="button"
              disabled
            >
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="block w-full bg-blue-600 hover:bg-blue-400 transition-all duration-75 text-white font-bold rounded px-4 py-2 my-4 mx-auto"
            >
              Vender
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default FormSell;
