import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function AdminNotificationRow({ notification, setStatus }) {
  const datum = new Date(notification.createdAt);
  const navigate = useNavigate();

  const onClick = async () => {
    setStatus(true);
    navigate(`/admin/notifications/detail/${notification.id}`);
  };

  return (
    <TableRow key={notification.id} data-cy="adminNotifsRow">
      <TableCell component="th" scope="row">
        <Button
          component="div"
          onClick={onClick}
          className="linktabel"
          color="inherit"
          data-cy="adminNotifsRowText"
        >
          {notification.text}
        </Button>
      </TableCell>
      <TableCell
        style={{ width: 160 }}
        align="right"
        data-cy="adminNotifsRowDate"
      >
        {datum.toLocaleDateString()}
      </TableCell>
      <TableCell
        style={{
          width: 160,
          color: notification.seen === 0 ? "#ec4842" : "inherit",
          fontWeight: notification.seen === 0 ? "bold" : "none",
        }}
        align="right"
        data-cy="adminNotifsRowStatus"
      >
        {notification.seen === 0 ? "Unread" : "Read"}
      </TableCell>
    </TableRow>
  );
}
