import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import "../../css/profiel.css";
import EditAccountButton from "../buttons/EditAccountButton";
import Chip from '@mui/material/Chip';

export default function LeverancierProfiel({ gegevens }) {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: '20px',
    textAlign: "left",
    color: theme.palette.text.secondary,
    margin: "15px",
  }));

  const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  return (
    <div>
      <h1 data-cy="supplierProfileHeading">Profile details</h1>
      <Grid container spacing={0} columns={3} className="gridProfile profielgegevens center">
        <Grid xs={2} minWidth={'200px'} className="gridItemProfile">
          <Item>
            <img src={gegevens.account.imageUrl} className="profielImage" />
          </Item>
          <div className="center" >
            <EditAccountButton />
          </div>
        </Grid>
        <Grid xs={2} minWidth={'250px'} className="gridItemProfile">
          <Item>
            <h3>Business</h3>
            <p className="profielTitel">Name</p>
            <p data-cy="supplierProfileBName">{gegevens.account.name}</p>
            <p className="profielTitel">VAT number</p>
            <p data-cy="supplierProfileBVN">{gegevens.account.vatNumber}</p>
            <p className="profielTitel">Address</p>
            <p data-cy="supplierProfileBstreet">{gegevens.account.street} {gegevens.account.streetNr}</p>
            <p data-cy="supplierProfileBplace">
              {gegevens.account.zipcode} {gegevens.account.country}
            </p>
            <p className="profielTitel">Sector</p>
            <p data-cy="supplierProfileBsector">{gegevens.account.sector}</p>
            <p className="profielTitel">Payment methods</p>
            <Stack direction="row" spacing={1}>
              <Paper
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  listStyle: 'none',
                  p: 0.5,
                  m: 0,
                }}
                component="ul"
              >
                {gegevens.paymentMethods.map((data) => {
                  let icon;

                  return (
                    <ListItem key={data.id}>
                      <Chip
                        icon={icon}
                        label={data.method}
                      />
                    </ListItem>
                  );
                })}
              </Paper>
            </Stack>
          </Item>
        </Grid>
        <Grid xs={2} minWidth={'250px'} className="gridItemProfile">
          <Item>
            <h3>Contact person</h3>
            <p className="profielTitel">Firstname</p>
            <p data-cy="supplierProfilefn">{gegevens.firstname}</p>
            <p className="profielTitel">Lastname</p>
            <p data-cy="supplierProfileln">{gegevens.lastname}</p>
            <p className="profielTitel">Email</p>
            <p data-cy="supplierProfileemail">{gegevens.email}</p>
            <p className="profielTitel">Phone</p>
            <p data-cy="supplierProfilepnumber">{gegevens.phoneNumber}</p>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}
