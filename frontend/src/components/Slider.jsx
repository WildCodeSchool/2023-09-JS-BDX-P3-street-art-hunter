import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

export default function Slider({ children, leftValue, rightValue }) {
  const navigate = useNavigate();
  const [switchButton, setSwitchButton] = useState(false);

  const toggleSwitchButton = () => {
    setSwitchButton(!switchButton);
    // Utiliser useNavigate pour changer l'URL lors du clic sur le bouton
    navigate(switchButton ? "/galerie/arts" : "/galerie/artistes");
  };

  return (
    <div
      className={`slider-container ${
        switchButton ? "right-active" : "left-active"
      }`}
    >
      <button
        onClick={toggleSwitchButton}
        type="button"
        className={`switch-button${switchButton ? " active" : ""}`}
      >
        <Link to={switchButton ? "/galerie/arts" : "/galerie/artistes"}>
          {leftValue}
        </Link>
        <Link to={switchButton ? "/galerie/artistes" : "/galerie/arts"}>
          <span>{rightValue}</span>
        </Link>
        <div className="switch-item" />
      </button>
      <div className="slider-wrapper">{children}</div>
    </div>
  );
}

Slider.propTypes = {
  children: PropTypes.node.isRequired,
  leftValue: PropTypes.string.isRequired,
  rightValue: PropTypes.string.isRequired,
};
