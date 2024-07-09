import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { useAuth } from "../../../contexts/Auth.context";
import { useFormContext } from "react-hook-form";

export default function SupplierForm({ children }) {
  const { isAuthed } = useAuth();
  const { register } = useFormContext();

  const validationRules = {
    supplierPhone: {
      pattern: {
        value: /^\d{4}\/\d{2}\.\d{2}\.\d{2}$/,
        message: "Please enter a valid format (xxxx/xx.xx.xx)",
      },
    },
  };

  return (
    <Grid item>
      <Paper>
        <div className="paper">
          <h3>Supplier</h3>
          <Stack spacing={3}>
            <TextField
              {...register("supplierLastname")}
              label="Last Name"
              placeholder="Hanssens"
              required
              id="supplierLastname"
              name="supplierLastname"
              data-cy="registerSLastname"
            />
            <TextField
              {...register("supplierFirstname")}
              label="First Name"
              placeholder="Han"
              required
              id="supplierFirstname"
              name="supplierFirstname"
              data-cy="registerSFirstname"
            />
            <TextField
              {...register("supplierEmail")}
              label="Email"
              placeholder="han.hanssens@dfghj.be"
              required
              type="email"
              id="supplierEmail"
              name="supplierEmail"
              data-cy="registerSEmail"
            />
            <TextField
              {...register("supplierPhone", validationRules.supplierPhone)}
              label="Phone (xxxx/xx.xx.xx)"
              placeholder="1234/12.12.12"
              required
              id="supplierPhone"
              name="supplierPhone"
              data-cy="registerSPhone"
            />
            {isAuthed ? null : (
              <TextField
                {...register("supplierPassword")}
                label="Password"
                placeholder="**************"
                required
                id="supplierPassword"
                type="password"
                name="supplierPassword"
                data-cy="registerSPassword"
              />
            )}
          </Stack>
        </div>
      </Paper>
      {children}
    </Grid>
  );
}
