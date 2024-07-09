import Loader from "../../components/Loader";
import Error from "../../components/Error";
import useSWR from "swr";
import { get } from "../../api/index";
import AdminNotificationTable from "../../components/admin/notifications/AdminNotificationTable";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";
import "../../css/products.css";
import { useLocation, useNavigate } from "react-router-dom";
import * as React from "react";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Drawer from "@mui/material/Drawer";

export default function AdminNotifications() {
  const [status, setStatus] = useState(false);
  const [page, setPage] = useState(1);
  const [buttonClicked, setButtonClicked] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = React.useState(null);
  const [orderBy, setOrderBy] = React.useState(null);
  const [seen, setFilterSeen] = React.useState(null);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [state, setState] = React.useState({
    right: false,
  });

  let filters = location.pathname + location.search;
  filters = filters
    .substring(1)
    .replace("admin/notifications?", "me/notifications?");

  const {
    data: notifications = [],
    isLoading,
    error,
    mutate,
  } = useSWR(
    filters === null ? `/me/notifications?page=${page}` : `${filters}`,
    get
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await get(
          filters === null ? `/notifications?page=${page}` : `${filters}`
        );
        mutate(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (status) {
      fetchData();
    }
  }, [status, page, filters, mutate]);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (order) queryParams.set("order", order);
    if (orderBy) queryParams.set("orderBy", orderBy);
    if (seen) queryParams.set("seen", seen);
    if (startDate) queryParams.set("startDate", startDate);
    if (endDate) queryParams.set("endDate", endDate);
    queryParams.set("page", page.toString());
    navigate({ search: queryParams.toString() });
    setButtonClicked(false);
  }, [buttonClicked, page]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  const handleFilterSeenChange = (event) => {
    setFilterSeen(event.target.value);
  };

  const list = (anchor) => (
    <Box sx={{ width: 300 }} role="presentation" className="center">
      <List width="300" className="center">
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
              setFilterSeen(null);
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
          <FormControl sx={{ m: 1, minWidth: 150 }}>
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
              <MenuItem value="seen">Seen</MenuItem>
              <MenuItem value="id"> Order ID</MenuItem>
            </Select>
          </FormControl>
        </ListItem>

        <ListItem>
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="">Sort by</InputLabel>
            <Select
              labelId="sortBy"
              id="order"
              value={order}
              label="sort by"
              onChange={handleOrderChange}
              defaultValue={"desc"}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </ListItem>

        <ListItem>
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <InputLabel id="">Seen</InputLabel>
            <Select
              labelId="Seen status"
              id="seen"
              value={seen}
              label="Seen"
              onChange={handleFilterSeenChange}
              data-cy="seenSelectAdmin"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="1">Seen</MenuItem>
              <MenuItem value="0">Not seen</MenuItem>
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
            onChange={(newValue) =>
              setStartDate(
                newValue.$d.toISOString().split("T")[0].split("/").join("-")
              )
            }
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
      <h1>Notifications</h1>
      <Box className="filterknop">
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button
              onClick={toggleDrawer(anchor, true)}
              className="delawareButton"
              data-cy="filterButtonAdmin"
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
          <AdminNotificationTable
            notifications={notifications}
            setStatus={setStatus}
            data-cy="adminNotifications"
          />
          <div className="productencentreren">
            <Stack spacing={2} className="wit">
              <Pagination
                page={notifications.meta.currentPage}
                count={notifications.meta.lastPage}
                onChange={handleChangePage}
                shape="rounded"
              />
            </Stack>
          </div>
        </>
      )}
    </>
  );
}
