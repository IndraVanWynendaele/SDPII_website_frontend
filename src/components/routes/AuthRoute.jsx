import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/Auth.context";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function AuthRoute({ typeMeegegeven }) {
  const { ready, type, isAuthed } = useAuth();
  const { pathname } = useLocation();

  const loginPath = `/login?redirect=${pathname}`;

  if (!ready) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (isAuthed) {
    if (typeMeegegeven.includes(type)) {
      return <Outlet />;
    }
    return (
      <>
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          You are not authorized to view this page
        </Alert>
      </>
    );
  }

  return <Navigate replace to={loginPath} />;
}
