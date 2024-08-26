import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export default function useProducts() {
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let response = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  return response;
}
