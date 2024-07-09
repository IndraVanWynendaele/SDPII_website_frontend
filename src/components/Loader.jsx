import CircularProgress from "@mui/material/CircularProgress";
export default function Loader() {
  return (
    <div className="center" data-cy="loader">
      <CircularProgress color="secondary" />
      <h1>Loading...</h1>
    </div>
  );
}
