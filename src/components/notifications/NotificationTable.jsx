import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NotificationRow from "./NotificationRow";
import "../../css/products.css";

const columns = [
  { id: "description", label: "Description", minWidth: 170 },
  { id: "createdAt", label: "Date", minWidth: 100, align: "right" },
  { id: "orderId", label: "Order ID", minWidth: 170, align: "right" },
  { id: "status", label: "Status", minWidth: 50, align: "right" },
];

export default function NotificationTable({ notifications, setStatus }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  return (
    <>
      <div className="tabelcenter">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead className="tabelhead">
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
              {notifications.notifications ? (
                notifications.notifications.map((notification) => (
                  <NotificationRow
                    key={notification.id}
                    notification={notification}
                    setStatus={setStatus}
                    
                  />
                ))
              ) : (
                <TableCell>No notifications to show</TableCell>
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
    </>
  );
}
