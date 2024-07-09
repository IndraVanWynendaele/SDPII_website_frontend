import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getAll } from "../../api/index";
import { useAuth } from "../../contexts/Auth.context";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { Edit } from "@mui/icons-material";
import EditClientProfile from "../../components/profile/EditClientProfile";
import EditSupplierProfile from "../../components/profile/EditSupplierProfile";

export default function EditProfile() {
  const { id } = useParams();
  const { type } = useAuth();
  const { data: gegevens = [], isLoading, error } = useSWR(`me`, getAll);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : type === "client" ? (
        <EditClientProfile gegevens={gegevens} />
      ) : (
        <EditSupplierProfile gegevens={gegevens} />
      )}
    </>
  );
}
