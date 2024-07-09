import Item from "./DrawerItem";
import DrawerHeading from "./DrawerHeading";
import Loader from "../Loader";
import Error from "../Error";

import * as React from "react";
import useSWR from "swr";
import { get } from "../../api";

export default function DrawerAdminItems() {

    const {
        data: amount,
        isLoading,
        error
    } = useSWR("me/notifications/unseen", get, { refreshInterval: 1000 });

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Error error={error} />
            ) : (
                <>
                    <DrawerHeading />

                    <Item key="notifications" url="/admin/notifications" text={`Notifications [${amount.unseen}]`} />

                    <Item key="accounts" url="/admin/accounts" text="Businesses" />

                    <Item key="products" url="/products" text="Products" />

                    <Item key="chatBox" url="/chatBox" text="ChatBox" />

                    <Item key="logout" url="/logout" text="Logout" />
                </>
            )}
        </>
    )
};
