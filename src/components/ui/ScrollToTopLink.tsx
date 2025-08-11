import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ScrollToDropProps {
  to: string;
  children: ReactNode;
  className?: string;
}

const ScrollToTopLink = ({ to, children, ...rest }: ScrollToDropProps) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
};

export default ScrollToTopLink;
