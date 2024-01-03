import React, { useState } from "react";
import PropTypes from "prop-types";
import { MarkerF, InfoWindow } from "@react-google-maps/api";

function CustomMarker({ lat, lng, text }) {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);

  const onMarkerClick = (marker) => {
    setInfowindowOpen(true);
    setAnchor(marker);
  };

  return (
    <>
      <MarkerF
        position={{ lat, lng }}
        onClick={(e) => onMarkerClick(e)}
        options={{
          strokeColor: "#1FA055",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#1FA055",
          fillOpacity: 0.35,
        }}
      />
      {infowindowOpen && anchor && (
        <InfoWindow
          position={{ lat, lng }}
          onCloseClick={() => setInfowindowOpen(false)}
        >
          <div className="info-window-text">{text}</div>
        </InfoWindow>
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
