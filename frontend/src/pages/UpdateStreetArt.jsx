import React from "react";
import DisplayStreetArt from "../components/DisplayStreetArt";
import ChangeStreetArt from "../components/ChangeStreetArt";

function UpdateStreetArt() {
  return (
    <div className="admin-split ">
      <div className="admin-split-child">
        <DisplayStreetArt />
      </div>

      <div className="admin-split-child">
        <ChangeStreetArt />
      </div>
    </div>
  );
}

export default UpdateStreetArt;
