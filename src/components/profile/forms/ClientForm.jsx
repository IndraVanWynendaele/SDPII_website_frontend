import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { useFormContext } from "react-hook-form";
import { useAuth } from "../../../contexts/Auth.context";

export default function ClientForm({ children }) {
  const { register } = useFormContext();
  const { isAuthed } = useAuth();

  const validationRules = {
    clientPhone: {
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
          <h3>Client</h3>
          <Stack spacing={3}>
            <TextField
              {...register("clientLastname")}
              label="Last Name"
              placeholder="Hanssens"
              required
              id="clientLastname"
              name="clientLastname"
              data-cy="registerCLastname"
            />
            <TextField
              {...register("clientFirstname")}
              label="First Name"
              placeholder="Han"
              required
              id="clientFirstname"
              name="clientFirstname"
              data-cy="registerCFirstname"
            />
            <TextField
              {...register("clientEmail")}
              label="Email"
              placeholder="han.hanssens@dfghj.be"
              required
              type="email"
              id="clientEmail"
              name="clientEmail"
              data-cy="registerCEmail"
            />
            <TextField
              {...register("clientPhone", validationRules.clientPhone)}
              label="Phone (xxxx/xx.xx.xx)"
              placeholder="1234/12.12.12"
              required
              id="clientPhone"
              name="clientPhone"
              data-cy="registerCPhone"
            />

            {isAuthed ? null : (
              <TextField
                {...register("clientPassword")}
                label="Password"
                placeholder="**************"
                required
                id="clientPassword"
                type="password"
                name="clientPassword"
                data-cy="registerCPassword"
              />
            )}
          </Stack>
        </div>
      </Paper>
      {children}
    </Grid>
  );
}
