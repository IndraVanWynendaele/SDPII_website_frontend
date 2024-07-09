import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function FormError({ error }) {
  return (
    <Alert severity="error" className="error">
      <AlertTitle>Oops, something went wrong</AlertTitle>
      {error.message}
    </Alert>
  );
}
