import React from "react";
import PropTypes from "prop-types";
import { OverlayViewF, OverlayView } from "@react-google-maps/api";

function CustomCircle({ lat, lng, zoom }) {
  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  });

  const calculateSize = (zoomLevel) => {
    const baseSize = 5;
    return `${baseSize + zoomLevel}px`;
  };

  return (
    <OverlayViewF
      position={{ lat, lng }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <div
        style={{
          width: calculateSize(zoom), // Size of the circle
          height: calculateSize(zoom), // Size of the circle
          backgroundColor: "#f44242", // Red color
          borderRadius: "50%", // Circular shape
          border: "2px solid #FFFFFF", // White border
          boxShadow: "0px 0px 5px 2px rgba(66,133,244,0.6)", // Outline
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white", // Text color
          fontSize: "12px", // Text size
          fontWeight: "bold", // Text weight
        }}
      >
        <span style={{ textAlign: "center" }} />
      </div>
    </OverlayViewF>
  );
}

CustomCircle.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
};

export default CustomCircle;
