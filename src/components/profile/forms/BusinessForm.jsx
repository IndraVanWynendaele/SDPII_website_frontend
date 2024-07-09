import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { useFormContext } from "react-hook-form";

export default function BusinessForm() {
  const { register } = useFormContext();
  return (
    <Grid item>
      <Paper>
        <div className="paper">
          <h3>Business</h3>
          <Stack spacing={3}>
            <TextField
              {...register("name")}
              label="Name"
              placeholder="Hanssens BVBA"
              required
              id="name"
              name="name"
              data-cy="registerName"
            />
            <TextField
              {...register("sector")}
              label="Sector"
              placeholder="Construction"
              required
              id="sector"
              name="sector"
              data-cy="registerSector"
            />
            <TextField
              {...register("street")}
              label="Street"
              placeholder="Arbeidstraat"
              required
              id="street"
              name="street"
              data-cy="registerStreet"
            />
            <Grid container justifyContent="space-between">
              <Grid item xs={5}>
                <TextField
                  {...register("streetNr")}
                  label="Number"
                  placeholder="11"
                  required
                  id="streetNr"
                  name="streetNr"
                  data-cy="registerStreetNr"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  {...register("city")}
                  label="City"
                  placeholder="Aalst"
                  required
                  id="city"
                  name="city"
                  data-cy="registerCity"
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item xs={5}>
                <TextField
                  {...register("zipcode")}
                  label="Zipcode"
                  placeholder="9300"
                  required
                  id="zipcode"
                  name="zipcode"
                  data-cy="registerZipcode"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  {...register("country")}
                  label="Country"
                  placeholder="Belgium"
                  required
                  id="country"
                  name="country"
                  data-cy="registerCountry"
                />
              </Grid>
            </Grid>

            <TextField
              {...register("image_url")}
              label="Image URL"
              placeholder="https://www.example.com/image.png"
              required
              type="url"
              id="image_url"
              name="image_url"
              data-cy="registerImageUrl"
            />
            <TextField
              {...register("vat_number")}
              label="VAT Number"
              placeholder="BE0123456789"
              required
              id="vat_number"
              name="vat_number"
              data-cy="registerVatNumber"
            />
          </Stack>
        </div>
      </Paper>
    </Grid>
  );
}
