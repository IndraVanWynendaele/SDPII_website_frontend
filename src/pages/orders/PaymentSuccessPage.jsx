import { useParams } from "react-router-dom";
import BackButton from "../../components/buttons/BackButton";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

export default function PaymentSuccessPage() {
  const { uuid } = useParams();

  return (
    <div>
      <h1>
        Payment Success{" "}
        <CheckCircleOutlineOutlinedIcon color="success" fontSize="large" />
      </h1>
      <p className="center">
        Your order with ID {uuid} has been successfully processed. Thank you for
        your business.
      </p>
      <BackButton defaultRedirect="/orders" />
    </div>
  );
}
