import React, { useState } from "react";
import PropTypes from "prop-types";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";
import markerIcon from "../assets/map-marker.png";

function CustomMarker({ lat, lng, text }) {
  const [infowindowOpen, setInfowindowOpen] = useState(false);

  const toggleInfoWindow = () => {
    setInfowindowOpen(!infowindowOpen);
  };

  const finalIcon = {
    url: markerIcon,
    scaledSize: new window.google.maps.Size(40, 40),
  };

  return (
    <>
      <MarkerF
        position={{ lat, lng }}
        onClick={toggleInfoWindow}
        options={{
          strokeColor: "#1FA055",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#1FA055",
          fillOpacity: 0.35,
          icon: finalIcon,
        }}
      />
      {infowindowOpen && (
        <InfoWindowF position={{ lat, lng }} onCloseClick={toggleInfoWindow}>
          <div className="info-window-text">{text}</div>
        </InfoWindowF>
      )}
    </>
  );
}

CustomMarker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  text: PropTypes.node.isRequired,
};

export default CustomMarker;
