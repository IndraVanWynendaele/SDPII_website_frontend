import { isAxiosError } from "axios";
import { useAuth } from "../contexts/Auth.context";
import { useNavigate } from "react-router-dom";
import React from "react";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function Error({ error }) {
  if (isAxiosError(error)) {
    if (Array.isArray(error.response?.data?.errors)) {
      return (
        <Alert severity="error" className="error">
          <AlertTitle>Oops, something went wrong</AlertTitle>

          {error.response.data.errors.map((element) => {
            return <p data-cy="errorMessage">{element.message}</p>;
          })}
        </Alert>
      );
    } else if (error.response?.data?.message) {
      return (
        <Alert severity="error" className="error" data-cy="errorAlert">
          <AlertTitle>Oops, something went wrong</AlertTitle>
          <p data-cy="errorMessage">{error.response.data.message}</p>
        </Alert>
      );
    }
    return (
      <Alert severity="error" className="error">
        <AlertTitle>Oops, something went wrong</AlertTitle>
        <p data-cy="errorMessage">
          {error.response?.data || error.message}
          {error.response?.data?.details && (
            <>
              :
              <br />
              {JSON.stringify(error.response.data.details)}
            </>
          )}
        </p>
      </Alert>
    );
  }

  if (error) {
    return (
      <div>
        <h2>An unexpected error happened</h2>
        {error.message || JSON.stringify(error)}
      </div>
    );
  }

  return null;
}
