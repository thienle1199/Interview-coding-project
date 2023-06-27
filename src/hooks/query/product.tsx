import { useInfiniteQuery } from "react-query";
import { APIResponse } from "../../type";

const fetchProducts: (skip: number, search: string) => Promise<APIResponse> = (
  skip = 0,
  search = ""
) => {
  // handle initial data loading
  let fetchURL = `https://dummyjson.com/products`;
  if (skip > 0) {
    fetchURL = `https://dummyjson.com/products?skip=${skip}&limit=20`;
  }

  // Handle search
  if (search.length > 0) {
    fetchURL = `https://dummyjson.com/products/search?q=${search}`;

    if (skip > 0) {
      fetchURL = `https://dummyjson.com/products/search?q=${search}&skip=${skip}&limit=20`;
    }
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
      const newPage = lastPage.skip === 0 ? lastPage.limit : lastPage.skip + 20;
      if (newPage >= lastPage.total) return undefined;
      return newPage;
    },
  });
