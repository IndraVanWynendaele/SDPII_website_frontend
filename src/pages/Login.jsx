import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { useAuth } from "../contexts/Auth.context";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import Stack from "@mui/material/Stack";
import "../css/login.css";
import "../css/index.css";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Link } from "react-router-dom";

export default function Login() {
  const { login, loginError, loading } = useAuth();

  const { handleSubmit, register } = useForm();

  const navigate = useNavigate();

  const { search } = useLocation();

  const redirect = useMemo(() => {
    const urlParams = new URLSearchParams(search);
    if (urlParams.has("redirect")) return urlParams.get("redirect");
    return "/";
  }, [search]);

  const handleLogin = useCallback(
    async ({ email, password }) => {
      const loggedIn = await login(email, password);
      if (loggedIn) {
        navigate({
          pathname: redirect,
          replace: true,
        });
      }
    },
    [login, navigate, redirect]
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container component="main">
          <CssBaseline />
          <Box>
            <div className="slotje">
              <Avatar>
                <LockOutlinedIcon />
              </Avatar>

              <h1 className="hoofding">Login</h1>
            </div>

            <div className="login">
              <form onSubmit={handleSubmit(handleLogin)}>
                <Stack spacing={1}>
                  <TextField
                    {...register("email")}
                    label="Email"
                    placeholder="Email"
                    required
                    id="email"
                    name="email"
                    data-cy="emailInput"
                    className="maxWidth"
                  />
                  <TextField
                    {...register("password")}
                    label="Password"
                    placeholder="Password"
                    required
                    id="password"
                    name="password"
                    type="password"
                    data-cy="passwordInput"
                    className="maxWidth"
                  />
                  <Button
                    type="submit"
                    className="delawareButton maxWidth"
                    data-cy="submitBtn"
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
              <Link to="/register" className="linkregister">
                <p>Sign-up</p>
              </Link>
            </div>

            <Error error={loginError} />
          </Box>
        </Container>
      )}
    </>
  );
}
