import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductProvider";
import { Link, useNavigate } from "react-router-dom";

const CartUser = () => {
  console.log("render carrito");
  const { getProductsToCart, updateProductsTocart, deleteProductOfCart } =
    useContext(ProductContext);
  const [productsCart, setProductsCart] = useState([]);
  const [resultTotal, setResultTotal] = useState(0);
  const navigate = useNavigate();

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
    console.log("render productos de carrito");
    calculateProductsValue();
  }, []);

  // operacion para llevar el conteo de la cantidad de productos en el inventario y actualizar total
  const SelectedQuantityValue = (e) => {
    const { value, name } = e.target;
    console.log("actualiza precio");
    updateProductsTocart(name, value);
    calculateProductsValue();
  };

  const deleteProduct = (idProduct) => {
    deleteProductOfCart(idProduct);
    calculateProductsValue();
  };

  const goToCart = () => {
    navigate("/buy-products/" + 2);
  };

  let countQuantity = 1;
  const prodCount = [];
  return (
    <div>
      <div className="bg-white shadow-lg shadow-gray-500/50 w-full mb-44 mt-6 md:p-2 md:max-w-3xl md:rounded-md mx-auto">
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
              <article className="flex justify-between py-2">
                <div className="w-1/4">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.photo}
                      alt=""
                      className="h-full object-contain"
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
                    <div className="flex flex-col justify-around">
                      {" "}
                      {/* cantidad */}
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
                    </div>
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
