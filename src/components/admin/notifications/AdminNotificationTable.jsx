import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AdminNotificationRow from "./AdminNotificationRow";

const columns = [
  { id: "description", label: "Description", minWidth: 170 },
  { id: "createdAt", label: "Date", minWidth: 100, align: "right" },
  { id: "status", label: "Status", minWidth: 50, align: "right" },
];

export default function AdminotificationTable({ notifications, setStatus }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  return (
    <div>
      <div className="tabelcenter" data-cy="adminNotifsTable">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead className="tabelhead" data-cy="adminNotifsTableHead">
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className="headtext"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications.notifications ? (
                notifications.notifications.map((notification) => (
                  <AdminNotificationRow
                    key={notification.id}
                    notification={notification}
                    setStatus={setStatus}
                  />
                ))
              ) : (
                <TableCell colSpan={6}>No notifications to show</TableCell>
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
    </div>
  );
}
