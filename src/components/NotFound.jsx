import { Link, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <>
      <Alert severity="error">
        <h3 className="notFoundHeading">Not found</h3>
        <div className="">
          There is nothing at {pathname},{" "}
          <Link to="/" replace className="notFoundLink">
            Go back home
          </Link>
          .
        </div>
      </Alert>
    </>
  );
}
