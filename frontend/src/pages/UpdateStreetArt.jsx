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
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateStreetArt;
