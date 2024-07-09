import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Box from "@mui/material/Box";
import * as React from "react";
import Fab from "@mui/material/Fab";
import EmailIcon from "@mui/icons-material/Email";
import Badge from "@mui/material/Badge";
import useSWR from "swr";
import { useAuth } from "../contexts/Auth.context";
import { get } from "../api";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Loader from "./Loader";
import Error from "./Error";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import NotificationPopup from "./notifications/NotificationPopup";

export default function Layout() {
  const { isAuthed, type } = useAuth();

  const {
    data: amount,
    isLoading,
    error,
  } = useSWR(isAuthed ? "me/notifications/unseen" : null, get, {
    refreshInterval: 12000,
  });

  const {
    data: notifications,
    isLoading: notifLoading,
    error: notifErrors,
  } = useSWR(isAuthed ? "me/notifications?page=1&max=5" : null, get, {
    refreshInterval: 12000,
  });

  const {
    data: newNotifications,
    isLoading: newNotifLoading,
    error: newNotifErrors,
  } = useSWR(isAuthed ? "me/notifications?received=0" : null, get, {
    refreshInterval: 10000,
  });

  const style = {
    margin: 0,
    top: 20,
    right: 20,
    bottom: "auto",
    left: "auto",
    position: "fixed",
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
        className="bg"
      >
        <Navbar className="nav-bg" />
        <div className="Outlet">
          <Outlet />
        </div>

        {!isAuthed ? (
          <></>
        ) : isLoading ? (
          <Loader />
        ) : error ? (
          <Error error={error} />
        ) : (
          <Fab color="error" aria-label="notifications" style={style}>
            <Badge
              badgeContent={amount.unseen == 0 ? null : amount.unseen}
              color="primary"
              onClick={handleClick}
            >
              <EmailIcon />
            </Badge>
          </Fab>
        )}
      </Box>

      {isAuthed ? (
        <>
          <Menu
            key="account-menu"
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            align="center"
            PaperProps={{
              elevation: 0,
              sx: {
                px: "30px",
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {notifLoading ? (
              <Loader />
            ) : notifErrors ? (
              <Error error={notifErrors} />
            ) : notifications ? (
              notifications.notifications.map((notification) => (
                <div key={notification.id}>
                  <p>{notification.text}</p>
                  <Divider />
                </div>
              ))
            ) : (
              <MenuItem>No notifications</MenuItem>
            )}
            <Link
              href={
                type == "admin" ? "/admin/notifications" : "/me/notifications"
              }
            >
              <Button className="delawareButton top-margin">
                All notifications
              </Button>
            </Link>
          </Menu>
          {notifLoading ? (
            <Loader />
          ) : notifErrors ? (
            <Error error={notifErrors} />
          ) : newNotifications?.notifications > 0 ? (
            newNotifications?.notifications.map((notification) => (
              <NotificationPopup notification={notification} />
            ))
          ) : null}
        </>
      ) : null}
    </>
  );
}
