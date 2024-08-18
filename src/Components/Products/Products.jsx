import useProducts from "../../Hooks/useProducts";
import Loading from "../Loading/Loading";
import RecentProducts from "../RecentProducts/RecentProducts";

export default function Products() {
  let { data, isLoading } = useProducts();
  return (
    <>
      {isLoading ? (
        <div className="center h-screen">
          <Loading />
        </div>
      ) : (
        <div className="center flex-wrap ">
          {data?.data.data.map((product) => (
            <RecentProducts key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
