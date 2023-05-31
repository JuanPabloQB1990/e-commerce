import { useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductProvider";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProductView = () => {
  
  const { userAuth } = useContext(UserContext);
  const {
    product,
    images,
    getProduct,
    loadingProduct,
    deleteProduct,
    addToCartProduct,
    saveProductBuy,
  } = useContext(ProductContext);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getProduct(id);
  }, [id]);

  //funcion que lleva al formulario editar
  const goToProduct = useCallback(async(idProduct) => {
    await getProduct(idProduct);
    navigate("/product-edit/" + idProduct);
  }, []);

  // operacion para llevar el conteo de la cantidad de productos en el inventario
  let countCantProd = 0;
  let cantProd = [];
  for (let i = 0; i < product.stock; i++) {
    cantProd.push([i]);
  }

  // funcion para encapsular la cantidad de productos escogidos
  const SelectedQuantityValue = (e) => {
    const quantitySell = Number(e.target.value);
    setSelectedQuantity(quantitySell);
  };

  // funcccion para eliminar producto
  const deleteProductUser = async (productDelete) => {
    const confirmatioDelete = confirm(
      "deseas eliminar este producto de tu lista?"
    );
    if (confirmatioDelete) {
      await deleteProduct(productDelete);
      navigate("/products-user/" + userAuth.uid);
    }
  };

  // funcion para comprar producto
  const buyProduct = async(productToBuy) => {
    const productOnlyBuy = [{ ...productToBuy, quantity: selectedQuantity }];
    await saveProductBuy(productOnlyBuy);
    navigate("/buy-products/"+1);
  };

  // funcion para agrega producto al carrito
  const addToCart = (productAdd) => {
    console.log(selectedQuantity);
    addToCartProduct(productAdd, selectedQuantity);
  };

  const spinner = (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-20 h-20">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );

  // funcion para cambiar la imagen ccon tocar
  useEffect(() => {
    let imageLinks = document.querySelectorAll(".image-link");
    let image = document.querySelector(".image");

    for (let index = 0; index < imageLinks.length; index++) {
      const firstImage = imageLinks[0].getAttribute("src");
      image.setAttribute("src", firstImage);
      const element = imageLinks[index];
      element.addEventListener("mousemove", () => {
        let attribute = element.getAttribute("src");
        image.setAttribute("src", attribute);
      });
    }
  });

  // funcion para encapsular wl ancho de viewport
  window.addEventListener("resize", () => {
    setScreenWidth(window.innerWidth);
  });

  const Imagen = styled.div`
    display: ${screenWidth > 640 ? "none" : "grid"};
    grid-template-columns: repeat(${images.length}, 100%);
    overflow: auto;
    scroll-snap-type: x mandatory;
  `;

  return (
    <div className="xl:max-w-[1200px] min-h-[90vh] mx-auto bg-white p-2 sm:flex justify-around mt-2">
      <div className="sm:w-3/5 sm:m-4 mx-auto">
        {loadingProduct ? (
          spinner
        ) : (
          <Imagen className="">
            {images.map((key, img) => {
              return (
                <img
                  key={key}
                  className="w-full h-full object-contain snap-center"
                  src={images[img]}
                  alt={images[img]}
                />
              );
            })}
          </Imagen>
        )}

        <div className="hidden sm:flex flex-col w-full h-full">
          <div className="max-w-[700px] h-[500px]">
            <img className="image w-full h-full object-contain" alt="" />
          </div>
          <div className="flex gap-2 ">
            {images.map((key, img) => {
              return (
                <img
                  key={key}
                  className="image-link w-14 h-14 object-contain border-2 border-black hover:border-none"
                  src={images[img]}
                  alt={images[img]}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="sm:w-2/6 sm:mx-2 sm:border-2 border-gray-400 rounded-md">
        {loadingProduct ? (
          spinner
        ) : (
          <div>
            <div className="ml-4 mt-14">
              <p className="font-semibold text-xl mb-4">{product.name}</p>
              <s className={product.discount < 1 ? `hidden` : `block text-xs`}>
                <span>$</span> {product.price}
              </s>
            </div>
            <div className="flex gap-4 ml-4">
              <p className="text-4xl font-light">
                <span>$</span>
                {(
                  product.price -
                  product.price * (product.discount / 100)
                ).toFixed(3)}
              </p>
              <p
                className={
                  product.discount < 1
                    ? `hidden`
                    : `block text-green-500 font-bold self-center text-sm`
                }
              >
                {product.discount}% off
              </p>
            </div>
            {product.stock ===  0 ?  <p className="text-red-600 h-10 w-[12ch] rounded font-semibold bg-red-200 px-4 py-2 ml-2">Agotado</p> : 
            <div className="mt-6">
              <div>
                <p className="font-semibold text-base ml-4">Stock disponible</p>
                <span className="font-semibold ml-4 mt-2 flex gap-2">
                  <span>
                    cantidad:
                    <select
                      onChange={SelectedQuantityValue}
                      name="selectedQuantity"
                    >
                      {cantProd.map((cant, key) => {
                        countCantProd++;

                        return (
                          <option key={key} value={countCantProd}>
                            {countCantProd}
                          </option>
                        );
                      })}
                    </select>
                  </span>
                  <span>({product.stock} disponibles)</span>
                </span>
              </div>
            </div>}
            
            <div className="m-2">
              {userAuth.uid !== product.id_user && (
                <div>
                  <button
                    onClick={() => buyProduct(product)}
                    className="bg-blue-600 block w-full py-2 px-4 font-bold text-white rounded my-4 hover:bg-blue-400"
                  >
                    Comprar ahora
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-200 block w-full py-2 px-4 font-bold text-blue-500 rounded hover:bg-blue-300"
                  >
                    Agregar al carrito
                  </button>
                </div>
              )}

              <div className="p-2 my-4">
                <h2 className="font-bold text-2xl ">Informacón del Producto</h2>
                <p className="pl-4 text-xl font-semibold">
                  {product.description}
                </p>
              </div>
              {userAuth.uid === product.id_user && (
                <div>
                  <button
                    onClick={() => goToProduct(product.id)}
                    className="bg-blue-600 block w-full py-2 px-4 font-bold text-white text-center rounded my-4 hover:bg-blue-400"
                  >
                    Editar
                  </button>
                  {loadingProduct ? (
                    <button
                      className="bg-red-600 block w-full py-2 px-4 font-bold text-white text-center rounded my-4 hover:bg-blue-400"
                      type="button"
                      disabled
                    >
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Eliminando...
                    </button>
                  ) : (
                    <button
                      onClick={() => deleteProductUser(product)}
                      className="bg-red-600 block w-full py-2 px-4 font-bold text-white text-center rounded my-4 hover:bg-blue-400"
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductView;
