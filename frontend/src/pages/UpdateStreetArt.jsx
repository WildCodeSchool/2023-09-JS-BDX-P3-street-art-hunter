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
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateStreetArt;
