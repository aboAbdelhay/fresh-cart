// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// export default function useAddToCart() {
//   function addToCart(productId) {
//     return axios.post(`https://ecommerce.routemisr.com/api/v1/cart${productId}`, {
//       headers: { token: localStorage.getItem("userToken") },
//     });
//   }
//   let {} = useQuery({
//     queryKey: ["AddToCart"],
//     queryFn: addToCart,
//   });
//   return response;
// }
// // import { useMutation } from "@tanstack/react-query";
// // import axios from "axios";

// // export default function useAddToCart() {
// //   // Define the mutation function that will be used to add items to the cart
// //   const mutation = useMutation({
// //     mutationFn: (productId) => {
// //       return axios.post(
// //         `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
// //         {}, // Send an empty object if your API requires a request body
// //         {
// //           headers: { token: localStorage.getItem("userToken") },
// //         }
// //       );
// //     },
// //   });
// //   // The mutation function to be called when you want to add a product to the cart
// //   const addToCart = (productId) => {
// //     mutation.mutate(productId);
// //   };

// //   return { addToCart, isLoading: mutation.isLoading, error: mutation.error };
// // }
