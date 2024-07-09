import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import DownloadPdf from "../DownloadPdf";
import { useLocation } from "react-router-dom";
import OrderDetailHeading from "./OrderDetailHeading";
import BackButton from "../../buttons/BackButton";
import Box from "@mui/system/Box";

export default function OrderDetailClient({ order }) {

  const { pathname } = useLocation();
  return (
    <div>
      <h1 className="order">Order: {order.orderMeta.id} </h1>

      <Grid justifyContent="space-between" container>
        <BackButton defaultRedirect={"/orders"} className="mr" />
        <DownloadPdf order={order} />
      </Grid>

      <Box sx={{ mt: "10px" }}>
        {order.orderMeta.paymentStatus.status == "Unpaid" ? (
          <Link to={`payment`}>
            <Button className="delawareButton">Pay order</Button>
          </Link>
        ) : null}
      </Box>

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
                <p className="gridItem">Product: {item.productName}</p>
                <p className="gridItem">Quantity: {item.quantity}</p>
                <p className="gridItem">Price: {item.unitPrice} €</p>
                <p className="gridItem">Supplier: {item.supplier} </p>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
}
