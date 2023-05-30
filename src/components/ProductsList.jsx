import React, { memo } from "react";
import { Link } from "react-router-dom";

const ProductsList = ({ title, products }) => {
  return (
    <div className="m-4 bg-white  rounded-md shadow-lg shadow-gray-500/50 w-11/12 sm:max-w-3xl mx-auto">
      
      {products.map((product) => {
        return (
          <div key={product.id} className="border-y-2 border-gray-300">
            <Link to={`/product/${product.id}`} className="text-decoration no-underline text-black">
              <article className="flex items-start py-4">
                <div>
                  <img
                    src={product.photos[0]}
                    alt=""
                    className="w-40 h-40 object-contain mx-12"
                  />
                </div>
                <div className="grow p-2 ">
                  <p className="font-semibold pb-4">{product.name}</p>
                  <s className={product.discount < 1 ? `hidden` : `block`}>
                    $ {product.price}
                  </s>
                  <div className="flex gap-4 justify-self-center">
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
                          : `block text-green-500 font-bold self-center`
                      }
                    >
                      {product.discount}% off
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default memo(ProductsList)
