import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";

export default function BackButton({ defaultRedirect = "/" }) {
  const { search } = useLocation();

  const redirect = useMemo(() => {
    const urlParams = new URLSearchParams(search);
    if (urlParams.has("redirect")) return urlParams.get("redirect");
    return defaultRedirect;
  }, [search]);

  return (
    <Link to={redirect}>
      <Button data-cy="backButton" className="delawareButton">
        <Typography variant="subtitle1" component="div">
          Back
        </Typography>
      </Button>
    </Link>
  );
}
