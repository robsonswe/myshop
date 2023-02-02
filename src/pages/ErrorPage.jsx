import { useRouteError } from "react-router-dom";
import Head from "./components/head";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <>
      <Head title={`${error.statusText}`} />
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error .message}</i>
        </p>
      </div>
    </>
  );
}
