import React from "react";
import DisplayStreetArt from "../components/DisplayStreetArt";
import ChangeStreetArt from "../components/ChangeStreetArt";

function UpdateStreetArt() {
  return (
    <div className="admin-page allow-scroll-container ">
      <h1>Administration</h1>
      <div className="container d-flex d-flex-center of-hidden">
        <div className="admin-buttons allow-scroll">
          <div className="container">
            <div className="admin-split  ">
              <div className="admin-split-child ">
                <DisplayStreetArt />
              </div>

              <div className="mt-20 ml-20 admin-split-child ">
                <ChangeStreetArt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateStreetArt;
