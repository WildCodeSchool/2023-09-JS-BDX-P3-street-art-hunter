import React from "react";
import DisplayStreetArt from "../components/DisplayStreetArt";
import ChangeStreetArt from "../components/ChangeStreetArt";

function UpdateStreetArt() {
  return (
    <div className="admin-page ">
      <h1>Administration</h1>
      <div className="container ">
        <div className="admin-buttons ">
          <div className="admin-split ">
            <div className="admin-split-child allow-scroll pos-r">
              <DisplayStreetArt />
            </div>

            <div className="mt-20 ml-20 admin-split-child allow-scroll pos-r">
              <ChangeStreetArt />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateStreetArt;
