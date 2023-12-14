import PropTypes from "prop-types";

export default function Button({
  children,
  className,
  onClick,
  color = "green",
}) {
  return (
    <button
      className={`${className}${color === "red" ? " red-button" : ""}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
};

Button.defaultProps = {
  color: "green",
};
