import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Item from "./DrawerItem";

export default function DrawerItems() {
  return (
    <div>
      <Link to="/">
        <img src={logo} className="logo" />
      </Link>

      <Divider />
      <div className="navbarWelkom">WELCOME</div>
      <Divider />

      <Item key="login" url="/login" text="Login" />

      <Item key="products" url="/products" text="Products" />

      <Item key="chatBox" url="/chatBox" text="ChatBox" />
    </div>
  );
}
