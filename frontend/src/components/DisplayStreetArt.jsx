import React from "react";
import { useLoaderData } from "react-router-dom";

function DisplayStreetArt() {
  const loaderData = useLoaderData();

  return (
    <div className="container-extra-small admin-streetarts">
      <div className="admin-item-list">
        <div key={loaderData?.streetArt?.id} className="admin-item">
          <div className="admin-item-infos">
            <img
              className="mb-20"
              src={loaderData?.streetArt?.image}
              alt={`Button ${loaderData?.streetArt?.id}`}
            />
            <p className="mb-10">Titre: {loaderData?.streetArt?.title}</p>
            <p className="mb-10">Par: {loaderData?.streetArt?.author}</p>
            <p className="mb-10">Adresse : {loaderData?.streetArt?.address}</p>
            <p className="mb-10">
              Longitude: {loaderData?.streetArt?.longitude}
            </p>
            <p className="mb-10">Latitude: {loaderData?.streetArt?.latitude}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayStreetArt;
