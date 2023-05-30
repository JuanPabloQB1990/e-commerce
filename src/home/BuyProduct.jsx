import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductProvider";
import { UserContext } from "../context/UserProvider";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";

const BuyProduct = () => {
  
  const { getProductBuy, getProductsToCart, editStockProduct, loadingProduct } =
    useContext(ProductContext);
  const { userAuth } = useContext(UserContext);
  const [Products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [ModalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const { num } = useParams();

  useEffect(() => {
    if (Number(num) === 1) {
      const product = getProductBuy();
      setProducts(product);
    } else {
      const productsOfCart = getProductsToCart();
      setProducts(productsOfCart);
    }
  }, []);

  let date = new Date();
  
  const sumTotalProducts = () => {
    let arrTotalProd = [];
    Products.map((prod) => {
      let totalProd =
        prod.price - prod.price * (prod.discount / 100) * prod.quantity;
      arrTotalProd.push(totalProd);
      setTotalProducts(arrTotalProd);
    });

    const totalSumaProducts = arrTotalProd.reduce((acc, prod) => {
      return acc + prod;
    }, 0);

    setTotalProducts(totalSumaProducts);
  };

  useEffect(() => {
    sumTotalProducts();
  }, [Products]);

  const productPay = async (modal) => {
    await editStockProduct(Products);
    modalHandler(modal);
  };

  const modalHandler = (modal) => {
    if (modal) {
      setModalIsOpen(modal);
      
    }else{
      navigate("/");

    }
  };

  return (
    <div>
      <div className="max-w-[500px] h-auto mx-auto bg-white p-2">
        <div>
          <p>
            Fecha: <span className="font-semibold">{date.toLocaleString()}</span>{" "}
          </p>
          <p className="mt-2">
            Cliente: <span className="mt-2 font-semibold">{userAuth.displayName}</span>
          </p>
        </div>
        <div className="mt-4">
          <table className="w-full">
            <thead>
              <tr>
                <th>cant</th>
                <th>Nombre</th>
                <th>valor</th>
              </tr>
            </thead>
            <tbody>
              {Products.map((prod) => {
                let totalProd =
                  prod.price -
                  prod.price * (prod.discount / 100) * prod.quantity;
                return (
                  <tr key={prod.id}>
                    <td>{prod.quantity}</td>
                    <td>{prod.name}</td>
                    <td>{totalProd.toFixed(3)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan=""></td>
                <td className="float-right pr-4 font-semibold">Total =</td>
                <td className="font-semibold">{totalProducts.toFixed(3)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div>
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
              Procesando pago...
            </button>
          ) : (
            <button
              className="block w-full bg-blue-600 hover:opacity-60 transition-all duration-0 text-white font-bold rounded px-4 py-2 my-4 mx-auto"
              onClick={() => productPay(true)}
            >
              Pagar
            </button>
          )}
        </div>
        <Modal
          className="flex justify-center items-center w-1/2 h-52 m-[25%] bg-lime-200 gap-4"
          isOpen={ModalIsOpen}
          ariaHideApp={true}
        >
          <div>
            <h2 className="font-bold text-center mb-2">
              Compra realizada satisfactoriamente
            </h2>
            <button
              className="block text-center text-blue-700 mx-auto"
              onClick={() => modalHandler(false)}
            >
              regresar al Comercio
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default BuyProduct;
