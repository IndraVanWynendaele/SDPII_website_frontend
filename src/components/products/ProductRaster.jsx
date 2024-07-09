import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Product from "./Product";

export default function NestedGrid({ producten }) {
  return (
    <>
      <Box>
        <Grid container spacing={2} className="productenBox">
          {producten.map((product) => (
            <div key={product.id}>
              <Grid className="productenGrid" data-cy="products" />
              <Product props={product} />
            </div>
          ))}
        </Grid>
      </Box>
    </>
  );
}
