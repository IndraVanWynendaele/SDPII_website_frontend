import { Outlet } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function PaymentSuccessRoute() {
  const data = localStorage.getItem("payment_success");

  if (data) {
    const parsedItem = JSON.parse(data);
    const currentTime = new Date().getTime();

    if (currentTime < parsedItem.expirationTime) {
      return <Outlet />;
    }
  }
  localStorage.removeItem("payment_success");

  return (
    <>
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        You do not have access to this page.
      </Alert>
    </>
  );
}
