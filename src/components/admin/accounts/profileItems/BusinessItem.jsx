import Divider from "@mui/material/Divider";
import "../../../../css/admin.css"
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";

export default function BusinessItem({ account }) {
    return (
        <>
            <Stack direction="row" justifyContent="space-between">
                <h3 className="nopaddingheading">Business</h3>
                <Avatar className="smallImage" src={account.imageUrl} alt="businessImage" sx={{ width: 56, height: 56 }} />
            </Stack>
            <Divider />
            <p>Name: {account.name}</p>
            <p>Sector: {account.sector}</p>
            <p>VatNumber: {account.vatNumber}</p>
            <p>Address: <br />{account.street} {account.streetNr} {account.streetNr}<br /> {account.zipcode} {account.country}</p>
        </>
    );
}