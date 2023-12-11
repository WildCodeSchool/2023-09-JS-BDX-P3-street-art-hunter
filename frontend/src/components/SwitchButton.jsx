import PropTypes from "prop-types";

export default function SwitchButton({ children }) {
  return <div>{children}</div>;
}

SwitchButton.propTypes = {
  children: PropTypes.node.isRequired,
};
