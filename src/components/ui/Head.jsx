import { Helmet } from "react-helmet";
import favicon from "@/assets/logo.svg";

export default function Head(props) {
  const { title } = props;
  return (
    <Helmet>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href={favicon} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {title === "Home" ? (
        <title>MyShop</title>
      ) : (
        <title>{title} | MyShop</title>
      )}
    </Helmet>
  );
}
