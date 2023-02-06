import { Link } from "react-router-dom";

const Redirect = ({ to, children, ...rest }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
};

export default Redirect;
