import ProductDetail from "../../components/products/ProductDetail";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getById } from "../../api/index";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

export default function ProductDetailPage() {
  const { id } = useParams();

  const { data: product, isLoading, error } = useSWR(`products/${id}`, getById);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <ProductDetail product={product} />
      )}
    </>
  );
}
