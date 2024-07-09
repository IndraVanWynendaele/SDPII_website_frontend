import { Link } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import useSWRMutation from "swr/mutation";
import { post } from "../../api/index";

export default function OrderRowSupplier({ order }) {
  const datum = new Date(order.order?.createdAt);

  const { trigger: reminder } = useSWRMutation(`orders/${order.uuid}`, post);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    reminder();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <TableRow key={order.id} data-cy="orderSupplier">
      <TableCell component="th" scope="row" data-cy="orderid">
        <Link to={`/orders/${order.uuid}`} className="linkUuid" data-cy="orderLink">
          {order.uuid}
        </Link>
      </TableCell>

      <TableCell style={{ width: 160 }} align="right" data-cy="ordercreate">
        {datum.toLocaleDateString()}
      </TableCell>
      <TableCell>
        {order.order?.paymentStatus.status == "Unpaid" ? (
          <>
            <Button
              onClick={handleClick}
              sx={{
                padding: "10px",
                color: "error.main",
                boxShadow: 1,
                borderRadius: "2px",
              }}
              data-cy="payOrderReminder"
            >
              Send payment reminder
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              data-cy="reminderPopover"
            >
              <Typography sx={{ p: 2 }}>
                {" "}
                {order.order?.account.name} has been notified{" "}
                <NotificationsActiveIcon fontSize="medium" />{" "}
              </Typography>
            </Popover>
          </>
        ) : (
          ""
        )}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right" data-cy="orderstatus">
        {order.orderStatus?.status}
      </TableCell>
      <TableCell style={{ width: 160 }} align="right" data-cy="orderstatus">
        <span className={`${order.order?.paymentStatus.status}`}>
          {order.order?.paymentStatus.status}{" "}
        </span>
      </TableCell>
      <TableCell style={{ width: 160 }} align="right" data-cy="orderstatus">
        {order.order?.account.name}
      </TableCell>
    </TableRow>
  );
}
