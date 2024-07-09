import OrderDetailHeading from "./OrderDetailHeading";
import BackButton from "../../buttons/BackButton";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function OrderDetailSupplier({ order }) {

  const { pathname } = useLocation();
  return (
    <div>
      <Grid container justifyContent="space-between">
        <h1 className="order">Order: {order.orderMeta.id} </h1>
        <h1 className="order mr">Client: {order.orderMeta.accountName} </h1>
      </Grid>

      <BackButton defaultRedirect={"/orders"} className="mr" />
      <OrderDetailHeading order={order} />
      <h3 className="hoofding">Products: </h3>
      <Paper className="mr">
        <Grid
          item
          container
          justifyContent="space-around"
          m={2}
          key={order.orderMeta.id}
        >
          {order.products.map((item, index) => (
            <Grid container item key={index} className="products">
              <Link to={`/products/detail/${item.id}?redirect=${pathname}`} data-cy="orderProduct">
                <img src={item.imageUrl} className="img" />
              </Link>

              <Grid item>
                <p className="gridItem mt">Product: {item.productName}</p>
                <p className="gridItem">Quantity: {item.quantity}</p>
                <p className="gridItem">Price: {item.fullPrice} €</p>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
}
