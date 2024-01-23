import React from "react";
import { useLoaderData } from "react-router-dom";

function UpdateStreetArt() {
  const loaderData = useLoaderData();

  return (
    <div className="admin-streetarts">
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
            <p className="mb-10">Artiste: {selectedStreetArt.author}</p>
            <p className="mb-10">Adresse: {selectedStreetArt.address}</p>{" "}
            <p className="mb-10">Créé le: {selectedStreetArt.creation_date}</p>
            <p className="mb-10">Lng: {selectedStreetArt.longitude}</p>
            <p className="mb-10">Lat: {selectedStreetArt.latitude}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateStreetArt;
