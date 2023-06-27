import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import debounce from "../helpers/debounce";
import { useProductQuery } from "../hooks/query/product";

export const ProductList = () => {
  const [searchString, setSearchString] = useState("");
  const productQuery = useProductQuery(searchString);

  const { ref, inView } = useInView();

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = productQuery;

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = debounce(
    (evt) => {
      setSearchString(evt.target.value);
    },
    500
  );

  if (error) return `An error has occurred: ${error.message}`;

  const noProductFound =
    status === "success" &&
    searchString.length > 0 &&
    data.pages.length === 1 &&
    data.pages[0].total === 0;

  return (
    <div className="product-list-container">
      <div className="search-group">
        <input onChange={handleSearch} placeholder="search product..." />
      </div>

      {noProductFound && <h1>No product found</h1>}
      {searchString.length > 0 && !noProductFound && (
        <h1>{`Search result for: ${searchString}`}</h1>
      )}
      {isLoading ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <>
          <ul className="product-list">
            {data?.pages.map((page) => (
              <React.Fragment key={page.skip}>
                {page.products.map((product) => (
                  <li className="product" key={product.id}>
                    <img
                      className="thumbnail"
                      src={product.thumbnail}
                      alt={product.title}
                      width={200}
                      height={200}
                      loading="lazy"
                    />
                    <div className="product-info">
                      <h2 className="product-title">{product.title}</h2>
                      <p>{product.id}</p>
                      <p>{product.description}</p>
                      <p>{product.price}</p>
                      <p>{product.rating}</p>
                    </div>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>

          <span ref={ref}>
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load Newer"
              : "Nothing more to load"}
          </span>
        </>
      )}
    </div>
  );
};
