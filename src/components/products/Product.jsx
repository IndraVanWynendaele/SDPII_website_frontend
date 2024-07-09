import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { memo } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default memo(function Product({ props }) {
  const { name, id, imageUrl, productDescription, productPrice } = props;
  const { pathname, search } = useLocation();
  const path = pathname + search;
  const detailPath = path.includes("profile")
    ? `/profile/products/detail/${id}`
    : `/products/detail/${id}`;

  return (
    <>
      <Paper className="product">
        <Grid container spacing={2}>
          <Grid item>
            <Link to={detailPath}>
              <ButtonBase className="productImg" data-cy="productsButton">
                <Img src={imageUrl} data-cy="productsImg" />
              </ButtonBase>
            </Link>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  data-cy="productsName"
                >
                  {name}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  data-cy="productsShoprtDescription"
                >
                  {productDescription[0].shortDescription.length <= 100
                    ? productDescription[0].shortDescription
                    : productDescription[0].shortDescription.substring(0, 100) +
                      "..."}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                component="div"
                data-cy="productsPrice"
              >
                € {productPrice[0].price}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
});
