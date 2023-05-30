import React from 'react'
import balon from "../../public/products/balon.jpg";
import { Link } from "react-router-dom";

const RelationFavorites = () => {
  return (
    <div>
      <h2 className="font-bold text-2xl p-2 my-4">Relacionado a tus favoritos</h2>
      <div className="container-card xl:overflow-hidden xl:flex justify-center">
        <Link to="product/:id">
          <article className="bg-white rounded-md shadow-lg shadow-gray-500/50">
            <div className="py-2">
              <img src={balon} alt="" />
            </div>
            <hr />
            <div className="p-2">
              <s>$ 600.000</s>
              <div className="flex justify-start items-center">
                <p className="text-2xl mr-2">$ 500.000</p>
                <p className="text-green-500 font-bold">50% off</p>
              </div>
              <p className="mt-2">lorem6</p>
            </div>
          </article>
        </Link>
        <Link to="product/:id">
          <article className="bg-white rounded-md shadow-lg shadow-gray-500/50">
            <div className="py-2">
              <img src={balon} alt="" />
            </div>
            <hr />
            <div className="p-2">
              <s>$ 600.000</s>
              <div className="flex justify-start items-center">
                <p className="text-2xl mr-2">$ 500.000</p>
                <p className="text-green-500 font-bold">50% off</p>
              </div>
              <p className="mt-2">nombre</p>
            </div>
          </article>
        </Link>
        <article className="bg-white rounded-md shadow-lg shadow-gray-500/50">
          <div className="py-2">
            <img src={balon} alt="" />
          </div>
          <hr />
          <div className="p-2">
            <s>$ 600.000</s>
            <div className="flex justify-start items-center">
              <p className="text-2xl mr-2">$ 500.000</p>
              <p className="text-green-500 font-bold">50% off</p>
            </div>
            <p className="mt-2">nombre</p>
          </div>
        </article>
        <article className="bg-white rounded-md shadow-lg shadow-gray-500/50">
          <div className="py-2">
            <img src={balon} alt="" />
          </div>
          <hr />
          <div className="p-2">
            <s>$ 600.000</s>
            <div className="flex justify-start items-center">
              <p className="text-2xl mr-2">$ 500.000</p>
              <p className="text-green-500 font-bold">50% off</p>
            </div>
            <p className="mt-2">nombre</p>
          </div>
        </article>
        <article className="bg-white rounded-md shadow-lg shadow-gray-500/50">
          <div className="py-2">
            <img src={balon} alt="" />
          </div>
          <hr />
          <div className="p-2">
            <s>$ 600.000</s>
            <div className="flex justify-start items-center">
              <p className="text-2xl mr-2">$ 500.000</p>
              <p className="text-green-500 font-bold">50% off</p>
            </div>
            <p className="mt-2">nombre</p>
          </div>
        </article>
      </div>
    </div>
  )
}

export default RelationFavorites
