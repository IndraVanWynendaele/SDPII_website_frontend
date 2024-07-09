import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Link } from "react-router-dom";
export default function Item({ id, url, text }) {
  return (
    <ListItem key={id}>
      <Link to={url} className="navlink">
        <ListItemButton alignItems="center">
          <span className="navbutton">{text}</span>
        </ListItemButton>
      </Link>
    </ListItem>
  );
}
