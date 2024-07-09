import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import "../css/register.css";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useCallback } from "react";
import { useAuth } from "../contexts/Auth.context";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
import BusinessForm from "../components/profile/forms/BusinessForm";
import ClientForm from "../components/profile/forms/ClientForm";
import SupplierForm from "../components/profile/forms/SupplierForm";
import { FormProvider } from "react-hook-form";
import FormError from "../components/profile/forms/FormError";

export default function Register() {
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const { sign_up, registerError, loading } = useAuth();
  const navigate = useNavigate();
  const hasclientPhoneError = "clientPhone" in errors;
  const hassupplierPhoneError = "supplierPhone" in errors;

  const handelSubmit = useCallback(
    async ({
      name,
      image_url,
      vat_number,
      country,
      zipcode,
      street,
      city,
      streetNr,
      sector,
      supplierEmail,
      supplierFirstname,
      supplierLastname,
      supplierPhone,
      supplierPassword,
      clientEmail,
      clientFirstname,
      clientLastname,
      clientPassword,
      clientPhone,
    }) => {
      const antwoord = await sign_up({
        name,
        image_url,
        vat_number,
        country,
        zipcode,
        street,
        city,
        streetNr,
        sector,
        supplierEmail,
        supplierFirstname,
        supplierLastname,
        supplierPhone,
        supplierPassword,
        clientEmail,
        clientFirstname,
        clientLastname,
        clientPassword,
        clientPhone,
      });
      if (antwoord) {
        navigate({
          pathname: "/thanks",
          replace: true,
        });
      }
    },
    [sign_up, navigate]
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="hoofding">
            Request your customer and supplier accounts here:
          </h1>
          {hasclientPhoneError || hassupplierPhoneError ? (
            <FormError error={errors.clientPhone || errors.supplierPhone} />
          ) : null}

          <Error error={registerError} />
          <div className=" formpaper">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(handelSubmit)}>
                <Grid container spacing={2} className="center">
                  <BusinessForm register={register} />
                  <ClientForm register={register} />
                  <SupplierForm register={register}>
                    <Box mt={7} mb={4}>
                      <Button
                        type="submit"
                        className="delawareButton submitknop"
                        data-cy="submitRegister"
                      >
                        Submit
                      </Button>
                    </Box>
                  </SupplierForm>
                </Grid>
              </form>
            </FormProvider>
          </div>
        </div>
      )}
    </>
  );
}
