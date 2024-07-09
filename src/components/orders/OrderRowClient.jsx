import { Link } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ButtonBase from "@mui/material/ButtonBase";

export default function OrderRowClient({ order }) {
  const datum = new Date(order.createdAt);

  return (
    <TableRow key={order.id} data-cy="orderClient">
      <TableCell component="th" scope="row" data-cy="orderid">
        <Link to={`/orders/${order.uuid}`} className="linkUuid" data-cy="orderLink">
          {order.uuid}
        </Link>
      </TableCell>

      <TableCell style={{ width: 160 }} align="right" data-cy="ordercreate">
        {datum.toLocaleDateString()}
      </TableCell>
      <TableCell>
        {order.paymentStatus?.status == "Unpaid" ? (
          <Link to={`${order.uuid}/payment`}>
            <ButtonBase
              sx={{
                padding: "10px",
                color: "error.main",
                boxShadow: 1,
                borderRadius: "2px",
              }}
              data-cy="payOrderButton"
            >
              Pay order
            </ButtonBase>
          </Link>
        ) : (
          ""
        )}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right" data-cy="orderstatus">
        {order.orderStatus?.status}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right" data-cy="orderstatus">
        <span className={`${order.paymentStatus?.status}`}>
          {order.paymentStatus?.status}{" "}
        </span>
      </TableCell>
    </TableRow>
  );
}
