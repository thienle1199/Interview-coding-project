import { useInfiniteQuery } from "react-query";
import { APIResponse } from "../../type";

const fetchProducts: (skip: number, search: string) => Promise<APIResponse> = (
  skip = 0,
  search = ""
) => {
  let fetchURL = `https://dummyjson.com/products?skip=${skip}&limit=20`;
  if (search.length > 0) {
    fetchURL = `https://dummyjson.com/products/search?q=${search}&skip=${skip}`;
  }
  return fetch(fetchURL).then((res) => res.json());
};

export const useProductQuery = (search: string) =>
  useInfiniteQuery<APIResponse, Error>({
    queryKey: ["products", search],
    queryFn: ({ pageParam, queryKey }) => {
      return fetchProducts(pageParam, queryKey[1] as string);
    },
    getNextPageParam: (lastPage) => {
      console.log("lastPage", lastPage);
      const newPage = lastPage.skip === 0 ? lastPage.limit : lastPage.skip + 20;
      if (newPage >= lastPage.total) return undefined;
      return newPage;
    },
  });
