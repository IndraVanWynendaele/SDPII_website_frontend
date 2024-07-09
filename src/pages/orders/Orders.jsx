import useSWR from "swr";
import { get } from "../../api/index";
import OrderTable from "../../components/orders/OrderTable";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import "../../css/orders.css";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import { getAll } from "../../api/index";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Orders() {
  const [page, setPage] = useState(1);
  const type = localStorage.getItem("type");
  const [buttonClicked, setButtonClicked] = React.useState(false);
  const [state, setState] = React.useState({
    right: false,
  });
  const [order, setOrder] = React.useState(null);
  const [orderStatus, setOrderStatus] = React.useState(null);
  const [paymentstatus, setpaymentstatus] = React.useState(null);
  const [orderBy, setOrderBy] = React.useState(null);
  const [uuid, setUuid] = React.useState(null);
  const [startDate, setStartDate] = React.useState(null);
  const todayDate = new Date();
  const [endDate, setEndDate] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { data: orderStatuses = [] } = useSWR("orderstatus", getAll);
  const { data: paymentstatuses = [] } = useSWR("paymentstatus", getAll);

  let filters = location.pathname + location.search;
  filters = filters.substring(1);

  const {
    data: orders = [],
    isLoading,
    error,
  } = useSWR(filters === null ? `orders?page=${page}` : `${filters}`, get);

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (order) queryParams.set("order", order);
    if (orderStatus) queryParams.set("orderstatus", orderStatus);
    if (paymentstatus) queryParams.set("paymentstatus", paymentstatus);
    if (orderBy) queryParams.set("orderBy", orderBy);
    if (uuid) queryParams.set("uuid", uuid);
    if (startDate) queryParams.set("startDate", startDate);
    if (endDate) queryParams.set("endDate", endDate);
    queryParams.set("page", page.toString());
    navigate({ search: queryParams.toString() });
    setButtonClicked(false);
  }, [buttonClicked, page]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleOrderStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };

  const handlepaymentstatusChange = (event) => {
    setpaymentstatus(event.target.value);
  };

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  const handleIdChange = (event) => {
    setUuid(event.target.value);
  };

  const list = (anchor) => (
    <Box sx={{ width: 300 }} role="presentation">
      <List>
        <ListItem>
          <Button
            onClick={(event) => {
              toggleDrawer(anchor, false)(event);
              setButtonClicked(true);
              setPage(1);
            }}
            className="delawareButton"
            data-cy="applyButton"
          >
            Apply
          </Button>
          <Button
            onClick={(event) => {
              toggleDrawer(anchor, false)(event);
              setOrder(null);
              setOrderBy(null);
              setOrderStatus(null);
              setpaymentstatus(null);
              setUuid(null);
              setStartDate(null);
              setEndDate(null);
              setButtonClicked(true);
            }}
            className="delawareButton marginButton"
            data-cy="resetButton"
          >
            Reset
          </Button>
        </ListItem>
        <Divider />

        <ListItem>
          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id="">Order by</InputLabel>
            <Select
              labelId="orderBy"
              id="orderBy"
              value={orderBy}
              label="order by"
              onChange={handleOrderByChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="created_at">Date</MenuItem>
              <MenuItem value="paymentStatus">Payment status</MenuItem>
              <MenuItem value="orderStatus">Order status</MenuItem>
            </Select>
          </FormControl>
        </ListItem>

        <ListItem>
          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id="">Sort by</InputLabel>
            <Select
              labelId="sortBy"
              id="order"
              value={order}
              label="sort by"
              onChange={handleOrderChange}
              defaultValue={"asc"}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </ListItem>

        <ListItem>
          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <TextField
              id="uuid"
              label="search by id"
              variant="outlined"
              value={uuid}
              onChange={handleIdChange}
            />
          </FormControl>
        </ListItem>

        <ListItem>
          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id="">Order status</InputLabel>
            <Select
              labelId="Order status"
              id="orderstatus"
              value={orderStatus}
              label="Order status"
              onChange={handleOrderStatusChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {orderStatuses.map((status) => (
                <MenuItem key={status.id} value={status.id}>
                  {status.status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>

        <ListItem>
          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id="">Payment status</InputLabel>
            <Select
              labelId="Payment status"
              id="paymentstatus"
              value={paymentstatus}
              label="Payment status"
              onChange={handlepaymentstatusChange}
              data-cy="paymentSelect"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {paymentstatuses.map((status) => (
                <MenuItem key={status.id} value={status.id}>
                  {status.status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>

        <Divider />
        <ListItem>
          <p>Start date</p>
        </ListItem>
        <ListItem>
          <DatePicker
            format="DD/MM/YYYY"
            onChange={(newValue) => setStartDate(newValue.$d.toISOString().split("T")[0].split("/").join("-"))}
          />
        </ListItem>

        <ListItem>
          <p>End date</p>
        </ListItem>
        <ListItem>
          <DatePicker
            format="DD/MM/YYYY"
            onChange={(newValue) =>
              setEndDate(
                newValue.$d.toISOString().split("T")[0].split("/").join("-")
              )
            }
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <h1>Orders</h1>

      <Box className="filterknop">
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button
              onClick={toggleDrawer(anchor, true)}
              className="delawareButton"
              data-cy="filterButton"
            >
              filters
            </Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </Box>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <>
          <OrderTable orders={orders} />

          <div className="paginationcentreren">
            <Stack spacing={2} className="paginatoion">
              <Pagination
                page={orders.meta.currentPage}
                count={orders.meta.lastPage}
                shape="rounded"
                onChange={handleChangePage}
              />
            </Stack>
          </div>
        </>
      )}
    </>
  );
}
