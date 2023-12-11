import PropTypes from "prop-types";

export default function ItemList({ children, className }) {
  return <div className={`item-list ${className}`}>{children}</div>;
}

ItemList.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};
