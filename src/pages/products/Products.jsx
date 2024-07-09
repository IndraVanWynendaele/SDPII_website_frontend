import ProductRaster from "../../components/products/ProductRaster";
import useSWR from "swr";
import { getAll } from "../../api/index";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Loader from "../../components/Loader";
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
import Slider from "@mui/material/Slider";
import Error from "../../components/Error";
import "../../css/filters.css";

export default function Producten() {
  const [page, setPage] = useState(1);
  const [category, setcategory] = React.useState(null);
  const [supplier, setSupplier] = React.useState(null);
  const [name, setName] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { data: categories = [] } = useSWR("categories", getAll);
  const { data: suppliers = [] } = useSWR("accounts", getAll);
  const [price, setPrice] = React.useState([0, 1000]);
  const minPrice = price[0];
  const maxPrice = price[1];
  const [orderBy, setOrderBy] = React.useState(null);
  const [order, setOrder] = React.useState(null);
  const [state, setState] = React.useState({
    right: false,
  });
  const [buttonClicked, setButtonClicked] = React.useState(false);

  let filters = location.pathname + location.search;
  filters = filters.substring(1);

  const {
    data: producten = [],
    isLoading,
    error,
  } = useSWR(filters === null ? `products?page=${page}` : `${filters}`, getAll);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (category) queryParams.set("category", category);
    if (name) queryParams.set("name", name);
    if (minPrice) queryParams.set("minPrice", minPrice);
    if (maxPrice) queryParams.set("maxPrice", maxPrice);
    if (supplier) queryParams.set("supplier", supplier);
    if (orderBy) queryParams.set("orderBy", orderBy);
    if (order) queryParams.set("order", order);
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

  const handleChangeCategory = (event) => {
    setcategory(event.target.value);
  };

  const handleChangeText = (event) => {
    setName(event.target.value);
  };

  const handleChangePrice = (event, newValue) => {
    setPrice(newValue);
  };

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleChangeSupplier = (event) => {
    setSupplier(event.target.value);
  };

  const marks = [
    {
      value: 0,
      label: "MIN",
    },
    {
      value: 1000,
      label: "MAX",
    },
  ];

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
            className="delawareButton "
            data-cy="applyButtonProducts"
          >
            Apply
          </Button>
          <Button
            onClick={(event) => {
              toggleDrawer(anchor, false)(event);
              setOrder(null);
              setOrderBy(null);
              setcategory(null);
              setSupplier(null);
              setName(null);
              setPrice([0, 1000]);
              setButtonClicked(true);
            }}
            className="delawareButton marginButton"
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
              data-cy="orderByCategorieProducts"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="price">Price</MenuItem>
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
              data-cy="orderProducts"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </ListItem>

        <ListItem>
          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id="category">Categories</InputLabel>
            <Select
              labelId="category"
              id="category"
              value={category}
              label="category"
              onChange={handleChangeCategory}
              data-cy="categoryProducts"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>

        <ListItem>
          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id="supplier">Suppliers</InputLabel>
            <Select
              labelId="supplier"
              id="supplier"
              value={supplier}
              label="supplier"
              onChange={handleChangeSupplier}
              data-cy="supplierProducts"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {suppliers.map((supplier) => (
                <MenuItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>

        <ListItem>
          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <TextField
              id="outlined-basic"
              label="Search by name"
              variant="outlined"
              value={name}
              onChange={handleChangeText}
              data-cy="searchNameProducts"
            />
          </FormControl>
        </ListItem>
        <ListItem>
          <p>Filter by price</p>
        </ListItem>
        <ListItem>
          <Box sx={{ width: 300 }} margin="15px">
            <Slider
              getAriaLabel={() => "Price range"}
              value={price}
              onChange={handleChangePrice}
              valueLabelDisplay="on"
              max={1000}
              marks={marks}
            />
          </Box>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <h1>Products</h1>
      <Box className="filterknop">
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button
              onClick={toggleDrawer(anchor, true)}
              className="delawareButton"
              data-cy="filterButtonProducts"
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
      <div>
        {!producten.products ? (
          <p className="center">No products found</p>
        ) : null}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error error={error} />
        ) : (
          <>
            <div className="productenContainer">
              <ProductRaster producten={producten.products} />
            </div>
            <div className="productencentreren">
              <div className="productenPaginas">
                <Stack spacing={2} className="wit">
                  <Pagination
                    page={producten.meta.currentPage}
                    count={producten.meta.lastPage}
                    shape="rounded"
                    onChange={handleChangePage}
                  />
                </Stack>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
