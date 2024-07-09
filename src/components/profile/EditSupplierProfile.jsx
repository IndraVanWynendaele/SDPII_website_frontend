import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Error from "../Error";
import BusinessForm from "./forms/BusinessForm";
import { FormProvider } from "react-hook-form";
import SupplierForm from "./forms/SupplierForm";
import { useAuth } from "../../contexts/Auth.context";
import Loader from "../Loader";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FormError from "./forms/FormError";

export default function EditSupplierProfile({ gegevens }) {
  const methods = useForm();
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;
  const { edit, editError, editLoading } = useAuth();
  const navigate = useNavigate();
  const hasError = "supplierPhone" in errors;

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
    }) => {
      const antwoord = await edit({
        name,
        image_url,
        vat_number,
        country,
        zipcode,
        street,
        city,
        streetNr,
        sector,
        email: supplierEmail,
        firstname: supplierFirstname,
        lastname: supplierLastname,
        phone: supplierPhone,
      });
      if (antwoord) {
        navigate({
          pathname: "/profile/confirmation",
          replace: true,
        });
      }
    },
    [edit, navigate]
  );

  useEffect(() => {
    setValue("name", gegevens.account.name);
    setValue("image_url", gegevens.account.imageUrl);
    setValue("vat_number", gegevens.account.vatNumber);
    setValue("country", gegevens.account.country);
    setValue("zipcode", gegevens.account.zipcode);
    setValue("street", gegevens.account.street);
    setValue("city", gegevens.account.city);
    setValue("streetNr", gegevens.account.streetNr);
    setValue("sector", gegevens.account.sector);

    setValue("supplierEmail", gegevens.email);
    setValue("supplierFirstname", gegevens.firstname);
    setValue("supplierLastname", gegevens.lastname);
    setValue("supplierPhone", gegevens.supplierPhone);

    setValue("supplierPhone", gegevens.phoneNumber);
  }, [gegevens, setValue]);

  return (
    <>
      {editLoading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="hoofding">Edit your profile</h1>
          {hasError ? <FormError error={errors.supplierPhone} /> : null}
          <Error error={editError} />
          <div className=" formpaper">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(handelSubmit)}>
                <Grid container spacing={2} className="center">
                  <BusinessForm />
                  <SupplierForm>
                    <Box mt={7} mb={4}>
                      <Button
                        type="submit"
                        className="delawareButton submitknop"
                        data-cy="submitEdit"
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
