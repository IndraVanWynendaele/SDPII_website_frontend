import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function AccountRow(account) {
  const navigate = useNavigate();
  const onClick = async () => {
    navigate(`/admin/accounts/detail/${account.account.id}`);
  };
  return (
    <TableRow key={account.id}>
      <TableCell component="th" scope="row">
        <Button
          component="div"
          onClick={onClick}
          className="linktabel"
          color="inherit"
          data-cy="adminBusinessesRow"
        >
          {account.account.name}
        </Button>
      </TableCell>
      <TableCell style={{ width: 200 }}>{account.account.sector}</TableCell>
      <TableCell style={{ width: 160 }}>{account.account.country}</TableCell>
    </TableRow>
  );
}
