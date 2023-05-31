import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductProvider";
import { Link, useNavigate } from "react-router-dom";

const CartUser = () => {
 
  const { getProductsToCart, updateProductsTocart, deleteProductOfCart } =
    useContext(ProductContext);
  const [productsCart, setProductsCart] = useState([]);
  const [resultTotal, setResultTotal] = useState(0);
  const navigate = useNavigate();

  // funcion para calcular el total de todos los productos
  const calculateProductsValue = () => {
    const productsOfCart = getProductsToCart();
    setProductsCart(productsOfCart);
    const equationsResult = [];
    productsOfCart.map((equationProduct) => {
      equationsResult.push(
        (equationProduct.price -
          equationProduct.price * (equationProduct.discount / 100)) *
          equationProduct.quantity
      );
    });

    const resultTotalEquation = equationsResult.reduce((acum, value) => {
      return acum + value;
    }, 0);

    setResultTotal(resultTotalEquation);
  };

  useEffect(() => {
    calculateProductsValue();
  }, []);

  // operacion para llevar el conteo de la cantidad de productos en el inventario y actualizar total
  const SelectedQuantityValue = (e) => {
    const { value, name } = e.target;
    updateProductsTocart(name, value, true);
    calculateProductsValue();
  };

  // funcion para eliminar producto del carrito
  const deleteProduct = (idProduct) => {
    deleteProductOfCart(idProduct);
    calculateProductsValue();
  };

  // ir a la pagina de comprar
  const goToCart = () => {
    navigate("/buy-products/" + 2);
  };

  let countQuantity = 1;
  const prodCount = [];
  return (
    <div>
      <div className="m-4 bg-white rounded-md shadow-lg shadow-gray-500/50 w-11/12 sm:max-w-3xl mx-auto">
        <h2 className="font-bold p-2 border-b-2 capitalize text-2xl">
          Carrito de Compras
        </h2>
        {productsCart.map((product) => {
          const inventory = Number(product.stock);
          while (prodCount.length < inventory) {
            prodCount.push(countQuantity);
            countQuantity++;
          }
          return (
            <div key={product.id} className="border-b-2 py-2">
              <article className="flex justify-between py-4">
                <div className="">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.photo}
                      alt=""
                      className="w-40 h-40 object-contain mx-12"
                    />
                  </Link>
                </div>
                <div className="flex flex-col justify-between pr-2 sm:pr-4 grow">
                  <Link
                    to={`/product/${product.id}`}
                    className="text-decoration no-underline text-black"
                  >
                    <p className="font-semibold pb-4">{product.name}</p>
                  </Link>
                  <div className="flex justify-between">
                    {product.stock === 0 ? <p className="text-red-600 h-10 font-semibold bg-red-200 px-4 py-2 rounded">Agotado</p> : 
                    <div className="flex flex-col justify-around">
                      {" "}
                      <span className="font-semibold flex gap-2">
                        <span>
                          cantidad:
                          <select
                            onChange={SelectedQuantityValue}
                            name={product.id}
                            value={product.quantity}
                          >
                            {prodCount.map((val, key) => {
                              return (
                                <option key={key} value={val}>
                                  {val}
                                </option>
                              );
                            })}
                          </select>
                        </span>
                      </span>
                    </div>}
                    
                    <div className="flex flex-col justify-end">
                      {" "}
                      {/* precios */}
                      <s className={product.discount < 1 ? `hidden` : `block`}>
                        $ {product.price}
                      </s>
                      <p className="text-2xl">
                        ${" "}
                        {(
                          product.price -
                          product.price * (product.discount / 100)
                        ).toFixed(3)}
                      </p>
                      <p
                        className={
                          product.discount < 1
                            ? `hidden`
                            : `block text-green-500 font-bold`
                        }
                      >
                        {product.discount}% off
                      </p>
                    </div>
                  </div>
                </div>
              </article>
              <div>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-600 block w-28 py-2 px-4 ml-2 font-bold text-white text-center rounded hover:bg-red-400"
                >
                  Eliminar
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={resultTotal === 0 ? "hidden" : `w-full flex justify-center`}
      >
        <div className="bg-white rounded-md w-full h-32 p-4 fixed shadow-lg shadow-gray-500/50 sm:max-w-3xl bottom-4">
          <div className="flex justify-between">
            <h2 className="text-2xl">Total a Pagar:</h2>
            <p className="text-2xl">$ {Number(resultTotal).toFixed(3)}</p>
          </div>
          <button
            onClick={() => goToCart()}
            className="bg-blue-600 block w-full py-2 px-4 font-bold text-white text-center rounded hover:bg-blue-400"
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartUser;
