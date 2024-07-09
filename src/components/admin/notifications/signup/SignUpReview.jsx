import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import "../../../../css/profiel.css";
import BusinessItem from "../../accounts/profileItems/BusinessItem";
import ClientItem from "../../accounts/profileItems/ClientItem";
import SupplierItem from "../../accounts/profileItems/SupplierItem";
import Stack from "@mui/material/Stack";
import ApproveButton from "../../../buttons/ApproveButton";
import DenyButton from "../../../buttons/DenyButton";
import { useParams } from "react-router-dom";
import BackButton from "../../../buttons/BackButton";

export default function SignUpReview({ details }) {
  const { id } = useParams();
  console.log(details);
  return (
    <>
      <BackButton defaultRedirect="/admin/notifications" />
      <Stack direction="row" spacing={2} justifyContent="center" mb={2} mr={2}>
        <ApproveButton type={details.notificationType.name} id={id} />
        <DenyButton type={details.notificationType.name} id={id} />
      </Stack>
      <Grid container spacing={2} justifyContent="center">
        <Grid component={Paper} padding={1} margin={2} className="sameSize">
          <BusinessItem account={details.data.account} />
        </Grid>
        <Grid component={Paper} padding={1} margin={2} className="sameSize">
          <ClientItem account={details.data.client} />
        </Grid>
        <Grid component={Paper} padding={1} margin={2} className="sameSize">
          <SupplierItem account={details.data.supplier} />
        </Grid>
      </Grid>
    </>
  );
}
