import PropTypes from "prop-types";

export default function Button({ children, className, color = "green" }) {
  let buttonClass = className;

  if (color === "red") {
    buttonClass += " red-button";
  } else if (color === "yellow") {
    buttonClass += " yellow-button";
  }

  return (
    <button className={buttonClass} type="button">
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  color: PropTypes.string,
};

Button.defaultProps = {
  color: "green",
};
