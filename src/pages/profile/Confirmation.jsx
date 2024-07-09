import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Confirmation() {
  return (
    <>
      <h1>
        Request successfull <CheckCircleOutlineOutlinedIcon fontSize="large" />
      </h1>
      <div>
        <p className="center thanksdescription">
          Your account changes have been successfully sent. An administrator
          will review and approve your information.
          <br />
          Thank you for your patience !
        </p>
      </div>
      <Link to="/profile">
        <Button type="submit" className="delawareButton">
          Back
        </Button>
      </Link>
    </>
  );
}
