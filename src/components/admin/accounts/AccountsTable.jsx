import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AccountRow from "./AccountsRow";
import "../../../css/admin.css";

const columns = [
  { id: "name", label: "Business", minWidth: 170 },
  { id: "sector", label: "Sector", minWidth: 100 },
  { id: "country", label: "Country", minWidth: 170 },
];

export default function accountTable({ accounts }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - accounts.length) : 0;

  return (
    <div className="tabelcenter" data-cy="adminBusinessesTable">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead className="tabelhead" data-cy="adminBusinessesTableHead">
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className="headtext"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts ? (
              accounts.accounts.map((account) => (
                <AccountRow key={account.id} account={account} />
              ))
            ) : (
              <TableCell colSpan={6} />
            )}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
