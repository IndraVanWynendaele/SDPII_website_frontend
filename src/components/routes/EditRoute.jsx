import { Outlet } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function RegisterhRoute() {
  const data = localStorage.getItem("edit");
  if (data) {
    const parsedItem = JSON.parse(data);
    const currentTime = new Date().getTime();

    if (currentTime < parsedItem.expirationTime) {
      return <Outlet />;
    }
  }
  localStorage.removeItem("edit");
  return (
    <>
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        You do not have access to this page.
      </Alert>
    </>
  );
}
