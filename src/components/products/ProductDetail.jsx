import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "../../css/products.css";
import Button from "@mui/material/Button";
import cart from "../../assets/cart_white.png";
import BackButton from "../buttons/BackButton";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { useLocation } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});
export default function ProductDetail({ product }) {
  const {
    name,
    imageUrl,
    productAvailability,
    category,
    productDescription,
    productPrice,
    supplier,
  } = product;

  const { pathname, search } = useLocation();
  const path = pathname + search;
  const detailPath = path.includes("profile")
    ? `/profile/products`
    : `/products`;
  return (
    <div>
      <h1>ProductDetail</h1>
      <Paper className="detail_product">
        <Grid container>
          <Grid item>
            <Grid item>
              <div className="detail_image">
                <Img src={imageUrl} data-cy="productDetailImg" />
              </div>
            </Grid>
            <Grid item>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                className="detailName"
                data-cy="productDetailName"
              >
                {name}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs
            container
            direction="column"
            spacing={2}
            className="detail_tekst"
          >
            <Grid item xs>
              <Typography
                variant="body1"
                gutterBottom
                data-cy="productDetailShortDescription"
              >
                {productDescription[0].shortDescription}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                data-cy="productDetailLongDescription"
              >
                {productDescription[0].longDescription}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Typography
                    variant="body1"
                    gutterBottom
                    data-cy="productDetailSupplierName"
                  >
                    Supplier: {supplier.account.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    data-cy="productDetailCategorie"
                  >
                    Category: {category.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    gutterBottom
                    data-cy="productDetailPrice"
                  >
                    Price: € {productPrice[0].price}
                  </Typography>
                </Grid>
                <Grid item className="cart">
                  {productAvailability ? (
                    <Button className="delawareButton">
                      <img src={cart} className="cartimg" />
                      in cart
                    </Button>
                  ) : (
                    <Button variant="outlined" disabled>
                      <DoNotDisturbIcon className="cartimg" />
                      Out of stock
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <BackButton defaultRedirect={detailPath} />
    </div>
  );
}
