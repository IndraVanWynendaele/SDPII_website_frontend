import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import useSWRMutation from "swr/mutation";
import { post } from "../../api/index";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/Auth.context";
import qrCodeImage from "../../assets/qr.png";

export default function PaymentPage() {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const { setItemWithExpiration } = useAuth();
  const { trigger: pay } = useSWRMutation(`orders/${uuid}/pay`, post);

  const handleClick = (event) => {
    pay();
    setItemWithExpiration("payment_success", true, 2);
    navigate({
      pathname: "success",
      replace: true,
    });
  };

  return (
    <div>
      <h1>Payment </h1>
      <Paper
        sx={{
          textAlign: "center",
          margin: "50px",
          padding: "20px",
          pb: "50px",
        }}
      >
        <p>Use the QR-code to pay your order {uuid} securely</p>
        <Button onClick={handleClick}>
          <img
            src={qrCodeImage}
            alt="QR-code"
          />
        </Button>
      </Paper>

      <Link to="/orders">
        <Button data-cy="backButton" className="delawareButton">
          <Typography variant="subtitle1" component="div">
            Cancel
          </Typography>
        </Button>
      </Link>
    </div>
  );
}
