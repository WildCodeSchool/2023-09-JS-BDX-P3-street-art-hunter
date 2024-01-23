import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAdminContext } from "../context/AdminContext";

function UpdateStreetArt() {
  const { selectedStreetArt, fetchOneStreetArt } = useAdminContext();

  const idP = useParams();

  useEffect(() => {
    fetchOneStreetArt(idP.id);
  }, []);

  return (
    <div className="admin-streetarts">
      <div className="admin-item-list">
        <div key={selectedStreetArt?.id} className="admin-item">
          <div className="admin-item-infos">
            <img
              src={selectedStreetArt?.image}
              alt={`Button ${selectedStreetArt?.id}`}
            />
            <p>
              {selectedStreetArt?.title}
              <br />
              Par {selectedStreetArt?.author}
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
