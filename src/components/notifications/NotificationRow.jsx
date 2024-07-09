import { Link } from "react-router-dom";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { get } from "../../api/index";
import useSWRMutation from "swr/mutation";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  justifyContent: "center",
  alignItems: "center",
};

export default function NotificationRow({ notification, setStatus }) {
  const { trigger: seen } = useSWRMutation(
    `me/notifications/${notification.id}`,
    get
  );

  const datum = new Date(notification.createdAt);
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setStatus(true);
  };

  const onClick = async () => {
    await seen();
    setStatus(false);
    handleOpen();
  };

  const orderTypes = [3, 4, 5, 6, 7];
  const correctId = orderTypes.includes(notification.notificationType.id);

  return (
    <TableRow key={notification.id} data-cy="notifications">
      <TableCell style={{ minWidth: 160 }} component="th" scope="row">
        <Button
          component="div"
          onClick={onClick}
          className="linktabel"
          color="inherit"
          data-cy="notificationButton"
        >
          {notification.text}
        </Button>
      </TableCell>
      <TableCell style={{ minWidth: 160 }} align="right">
        {datum.toLocaleDateString()}
      </TableCell>
      <TableCell style={{ minWidth: 160 }} align="right">
        {notification.data.orderId}
      </TableCell>
      <TableCell
        style={{
          minWidth: 160,
          color: notification.seen === 0 ? "#ec4842" : "inherit",
          fontWeight: notification.seen === 0 ? "bold" : "none",
        }}
        align="right"
        data-cy="seenNotification"
      >
        {notification.seen === 0 ? "Unread" : "Read"}
      </TableCell>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {notification.notificationType.name}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {notification.text}
              <br />
              {correctId ? (
                <>
                  Go to this order{" "}
                  <Link
                    data-cy="notificationPopup"
                    to={`/orders/${notification.data.orderId}?redirect=${pathname}`}
                  >
                    here
                  </Link>
                </>
              ) : (
                <>
                  View your profile <Link to={`/profile`}>here</Link>
                </>
              )}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </TableRow>
  );
}
