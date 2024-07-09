import Item from "./DrawerItem";
import DrawerHeading from "./DrawerHeading";
import Loader from "../Loader";
import Error from "../Error";

import useSWR from "swr";
import { get } from "../../api";
import * as React from "react";

export default function DrawerClientItems() {
  const {
    data: amount,
    isLoading,
    error,
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

          <Item key="profile" url="/profile" text="My Profile" />

          <Item key="orders" url="/orders" text="My Orders" />

          <Item key="products" url="/products" text="Products" />

          <Item
            key="notifications"
            url="/me/notifications"
            text={`Notifications [${amount.unseen}]`}
          />

          <Item key="chatBox" url="/chatBox" text="ChatBox" />

          <Item key="logout" url="/logout" text="Logout" />
        </>
      )}
    </>
  );
}
