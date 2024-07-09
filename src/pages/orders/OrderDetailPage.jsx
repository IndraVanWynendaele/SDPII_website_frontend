import { useParams } from "react-router-dom";
import OrderDetailClient from "../../components/orders/details/OrderDetailClient";
import OrderDetailSupplier from "../../components/orders/details/OrderDetailSupplier";
import useSWR from "swr";
import { getById } from "../../api/index";
import Loader from "../../components/Loader";

export default function OrderDetailPage() {

  const { uuid } = useParams();
  const type = localStorage.getItem("type");
  const {
    data: order = {},
    isLoading,
    error,
  } = useSWR(`orders/${uuid}`, getById);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <>
          {type === "supplier" ? (
            <OrderDetailSupplier order={order} />
          ) : (
            <OrderDetailClient order={order} />
          )}
        </>
      )}
    </>
  );
}
