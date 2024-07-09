import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import useSWR from "swr";
import { get } from "../../api";
import Loader from "../Loader";
import Error from "../Error";

export default function DrawerHeading() {
    const { data: gebruiker, isLoading, error } = useSWR("me", get);

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Error error={error} />
            ) : (
                <>
                    <Link to="/">
                        <img src={logo} className="logo" />
                    </Link>

                    <Divider />
                    <div className="navbarWelkom" data-cy="hello-user">
                        HELLO {gebruiker.firstname.toUpperCase()}{" "}
                        {gebruiker.lastname.toUpperCase()[0]}.
                    </div>
                    <Divider />
                </>
            )}
        </div>
    )
}