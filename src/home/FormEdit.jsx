import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductProvider";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const FormEdit = () => {
  const { idProductEdit } = useParams();
  const { product, editProduct } = useContext(ProductContext);
  const { userAuth } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (product.id_user !== userAuth.uid) {
      
      navigate("/*");
    }
  }, [idProductEdit]);

  const { name, description, price, stock, discount, category } = product;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name_product: name,
      description_product: description,
      price_product: price,
      stock_product: stock,
      category_product: category,
      discount_product: discount,
    },
  });

  useEffect(() => {
    setValue("name_product", name);
    setValue("description_product", description);
    setValue("price_product", price);
    setValue("stock_product", stock);
    setValue("category_product", category);
    setValue("discount_product", discount);
  }, [name]);

  const onSubmit = async (data) => {
    
    await editProduct(data)

    reset({
      name_product: "",
      description_product: "",
      price_product: "",
      stock_product: "",
      category_product: "",
      discount_product: "",
    });

    navigate(`/product/${idProductEdit}`);
  };
  
  return (
    <div className="bg-gray-400 w-full h-full flex flex-col justify-center">
      <div className="h-auto w-4/5 flex flex-col justify-center gap-4 m-auto md:w-96">
        <h2 className="font-medium text-2xl text-center">Edita el Producto</h2>
        <form id="imagenes" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name_product" className="font-medium">
            Nombre del Producto
          </label>
          <input
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

          <button
            className="w-full bg-blue-600 rounded px-4 py-2 font-bold text-2xl my-4 hover:bg-blue-500"
            type="submit"
          >
            Editar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormEdit;
