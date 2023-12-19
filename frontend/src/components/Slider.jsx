import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";

export default function Slider({
  children,
  leftValue,
  rightValue,
  linkOne,
  linkTwo,
}) {
  const navigate = useNavigate();
  const [switchButton, setSwitchButton] = useState(false);

  const toggleSwitchButton = () => {
    setSwitchButton(!switchButton);
    navigate(switchButton ? linkOne : linkTwo);
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
        <Link to={switchButton ? linkOne : linkTwo}>{leftValue}</Link>
        <Link to={switchButton ? linkTwo : linkOne}>
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
  linkOne: PropTypes.string.isRequired,
  linkTwo: PropTypes.string.isRequired,
};
