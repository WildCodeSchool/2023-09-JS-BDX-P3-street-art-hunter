import PropTypes from "prop-types";

export default function Button({ children, className, color = "green" }) {
  return (
    <button
      className={`${className}${color === "red" ? " red-button" : ""}`}
      type="button"
    >
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
