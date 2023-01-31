import favicon from "../assets/vite.svg";
import { Helmet } from "react-helmet";

export default function Head(props) {
  const { title } = props;
  return (
    <Helmet>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href={favicon} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title} | Test Shop</title>
    </Helmet>
  );
}
