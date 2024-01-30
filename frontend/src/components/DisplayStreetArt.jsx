import React from "react";
import { useLoaderData } from "react-router-dom";

function DisplayStreetArt() {
  const loaderData = useLoaderData();

  return (
    <div className="container-extra-small">
      <div className="admin-item-list">
        <div key={loaderData?.streetArt?.id} className="admin-item">
          <div className="admin-item-infos">
            <img
              src={loaderData?.streetArt?.image}
              alt={`Button ${loaderData?.streetArt?.id}`}
            />
            <p>
              {loaderData?.streetArt?.title}
              <br />
              Par {loaderData?.streetArt?.author}
            </p>
            <p className="mb-10">Adresse: {loaderData?.streetArt?.address}</p>

            <p className="mb-10">Lng: {loaderData?.streetArt?.longitude}</p>
            <p className="mb-10">Lat: {loaderData?.streetArt?.latitude}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayStreetArt;
