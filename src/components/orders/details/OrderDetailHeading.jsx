import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

export default function OrderDetailHeading({ order }) {
  return (
    <Grid container spacing={2} className="orderGrid">
      <Grid item container justifyContent="space-evenly" m={2}>
        <Paper className="mr paper">
          <Grid item className="groepje">
            <h4 className="hoofding">Shipping address: </h4>

            <Grid item container>
              <p className="gridItem">
                {order.orderMeta.shippingAddressStreet}
              </p>
              <p className="gridItem">
                {order.orderMeta.shippingAddressStreetNr}
              </p>
            </Grid>
            <Grid item container>
              <p className="gridItem">
                {order.orderMeta.shippingAddressZipcode}
              </p>
              <p className="gridItem">{order.orderMeta.shippingAddressCity}</p>
            </Grid>
            <Grid item>
              <p className="gridItem">
                {order.orderMeta.shippingAddressCountry}
              </p>
            </Grid>
          </Grid>
        </Paper>
        <Paper className="mr paper">
          <Grid item className="groepje">
            <h4 className="hoofding">Billing address: </h4>

            <Grid item container>
              <p className="gridItem">{order.orderMeta.billingAddressStreet}</p>
              <p className="gridItem">
                {order.orderMeta.billingAddressStreetNr}
              </p>
            </Grid>
            <Grid item container>
              <p className="gridItem">
                {order.orderMeta.billingAddressZipcode}
              </p>
              <p className="gridItem">{order.orderMeta.billingAddressCity}</p>
            </Grid>
            <Grid item>
              <p className="gridItem">
                {order.orderMeta.billingAddressCountry}
              </p>
            </Grid>
          </Grid>
        </Paper>
        <Paper className="mr paper">
          <Grid item className="groepje">
            <h4 className="hoofding">Order details: </h4>
            <Grid item>
              <p className="gridItem">
                Payment period: {order.orderMeta.paymentPeriod}
              </p>
            </Grid>
            <Grid item>
              <p className="gridItem">
                Order status: {order.orderMeta.orderStatus.status}
              </p>
            </Grid>
            <Grid item>
              <p className="gridItem">
                Payment status: {order.orderMeta.paymentStatus.status}
              </p>
            </Grid>
            <Grid item>
              <p className="gridItem">
                Remark:{" "}
                {order.orderMeta.remark == null ? "/" : order.orderMeta.remark}
              </p>
            </Grid>{" "}
            <Grid item>
              <p className="gridItem">
                Total price: {order.orderMeta.fullPrice} €
              </p>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
