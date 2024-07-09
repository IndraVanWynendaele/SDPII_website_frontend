import useSWR from "swr";
import { getAll } from "../../api/index";
import { useAuth } from "../../contexts/Auth.context";
import ClientProfile from "../../components/profile/ClientProfile";
import SupplierProfile from "../../components/profile/SupplierProfile";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

export default function Profiel() {
  const { data: gegevens = {}, isLoading, error } = useSWR(`me`, getAll);

  const { type } = useAuth();

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : type === "client" ? (
        <ClientProfile gegevens={gegevens} />
      ) : (
        <SupplierProfile gegevens={gegevens} />
      )}
    </div>
  );
}
