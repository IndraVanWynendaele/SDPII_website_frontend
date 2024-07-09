import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import OrderRowClient from "./OrderRowClient";
import OrderRowSupplier from "./OrderRowSupplier";

const columnsClient = [
  { id: "id", label: "Order ID", minWidth: 170 },
  { id: "createdAt", label: "Date", minWidth: 100, align: "right" },
  { id: "paymentButton", label: "", minWidth: 50, align: "right" },
  {
    id: "orderStatus",
    label: "Order status",
    minWidth: 100,
    align: "right",
  },
  {
    id: "paymentStatus",
    label: "Payment status",
    minWidth: 100,
    align: "right",
  },
];

const columnsSupplier = [
  { id: "id", label: "Order ID", minWidth: 170 },
  { id: "createdAt", label: "Date", minWidth: 100, align: "right" },
  { id: "paymentButton", label: "", minWidth: 150, align: "right" },
  {
    id: "orderStatus",
    label: "Order status",
    minWidth: 100,
    align: "right",
  },
  {
    id: "paymentStatus",
    label: "Payment status",
    minWidth: 100,
    align: "right",
  },
  {
    id: "nameBuyer",
    label: "Name buyer",
    minWidth: 100,
    align: "right",
  },
];

export default function OrderTable({ orders }) {
  const type = localStorage.getItem("type");
  const columns = type === "client" ? columnsClient : columnsSupplier;

  return (
    <div className="tabelcenter">
      <TableContainer component={Paper}>
        <Table aria-label="custom pagination table" data-cy="order-row">
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
            {orders ? (
              type === "client" ? (
                orders.data.map((order, index) => (
                  <OrderRowClient key={index} order={order} />
                ))
              ) : (
                orders.data.map((order, index) => (
                  <OrderRowSupplier key={index} order={order} />
                ))
              )
            ) : (
              <TableCell>No orders to show</TableCell>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
