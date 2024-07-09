import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import "../../../css/profiel.css";
import BusinessItem from "./profileItems/BusinessItem";
import ClientItem from "./profileItems/ClientItem";
import SupplierItem from "./profileItems/SupplierItem";
import BackButton from "../../buttons/BackButton";

export default function AccountProfile({ account }) {
    return (
        <>
            <h1 data-cy="adminBusinessDetail">Profile details</h1>
            <BackButton defaultRedirect="/admin/accounts" />
            <Grid container spacing={3} justifyContent="center">
                <Grid xs={3} component={Paper} padding={1} margin={2} minWidth="200px">
                    <BusinessItem account={account} />
                </Grid>
                <Grid xs={3} component={Paper} padding={1} margin={2} minWidth="200px">
                    <ClientItem account={account.client} />
                </Grid>
                <Grid xs={3} component={Paper} padding={1} margin={2} minWidth="200px">
                    <SupplierItem account={account.supplier} />
                </Grid>
            </Grid>
        </ >
    );
}
