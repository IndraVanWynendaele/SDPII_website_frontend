import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Thanks() {
  return (
    <>
      <h1>
        Registration successfull{" "}
        <CheckCircleOutlineOutlinedIcon fontSize="large" />
      </h1>
      <div>
        <p className="center thanksdescription">
          Thank you for signing up! Your registration has been successfully
          received and is currently being processed by our team. An
          administrator will review and approve your information, after which an
          account will be created for you. We aim to complete this process as
          swiftly as possible. Thank you for your patience and welcome to our
          community!
        </p>
      </div>
      <Link to="/products">
        <Button type="submit" className="delawareButton">
          Back
        </Button>
      </Link>
    </>
  );
}
