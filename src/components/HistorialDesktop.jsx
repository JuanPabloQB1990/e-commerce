import React from "react";
import { Link } from "react-router-dom";
import balon from "../../public/products/balon.jpg";

const HistorialDesktop = () => {
  return (
    <div className="m-4 p-2 bg-white rounded-md shadow-lg shadow-gray-500/50 w-11/12 sm:max-w-3xl mx-auto">
      <h2 className="font-bold p-2 border-b-2 capitalize">Historial</h2>
      <div className="">
        <article className="flex items-start border-b-2 py-2">
          <div>
            <img src={balon} alt="" className="w-24" />
          </div>
          <div className="grow p-2">
            <s className="">$ 500.000</s>
            <p>Balon</p>
            <div className="flex gap-4">
              <p>$ 300.000</p>
              <p className="">10 % off</p>
            </div>
          </div>
        </article>
        <article className="flex items-start border-b-2 py-2">
          <div>
            <img src={balon} alt="" className="w-24" />
          </div>
          <div className="grow p-2">
            <s className="">$ 500.000</s>
            <p>Balon</p>
            <div className="flex gap-4">
              <p>$ 300.000</p>
              <p className="">10 % off</p>
            </div>
          </div>
        </article>
        <article className="flex items-start border-b-2 py-2">
          <div>
            <img src={balon} alt="" className="w-24" />
          </div>
          <div className="grow p-2">
            <s className="">$ 500.000</s>
            <p>Balon</p>
            <div className="flex gap-4">
              <p>$ 300.000</p>
              <p className="">10 % off</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default HistorialDesktop;
