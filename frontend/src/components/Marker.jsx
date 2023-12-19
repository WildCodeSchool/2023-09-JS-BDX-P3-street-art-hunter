import React, { useState } from "react";
import { Marker, InfoWindow, useMarkerRef } from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";

function CustomMarker({ lat, lng, text }) {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useMarkerRef();
  return (
    <>
      <Marker
        position={{ lat, lng }}
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
      />
      {infowindowOpen && (
        <InfoWindow
          onCloseClick={() => setInfowindowOpen(false)}
          anchor={marker}
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
