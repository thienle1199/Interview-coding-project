import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useProductQuery } from "../hooks/query/product";
import { useDebounce } from "usehooks-ts";

export const ProductList = () => {
  const [searchString, setSearchString] = useState("");
  const debouncedSearchString = useDebounce<string>(searchString, 500);

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useProductQuery(debouncedSearchString);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    setSearchString(evt.target.value.trimStart());
  };

  if (error) return `An error has occurred: ${error.message}`;

  const noProductFound =
    status === "success" &&
    debouncedSearchString.length > 0 &&
    data.pages.length === 1 &&
    data.pages[0].total === 0;

  return (
    <div className="product-list-container">
      <div className="search-group">
        <input
          value={searchString}
          onChange={handleSearch}
          placeholder="search product..."
        />
      </div>

      {noProductFound && <h1>No product found</h1>}
      {debouncedSearchString.length > 0 && !noProductFound && !isLoading && (
        <h1>{`Search result for: ${debouncedSearchString}`}</h1>
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
                      <p>
                        <b>Description</b>: {product.description}
                      </p>
                      <p>
                        <b>Rating</b>: {product.rating}
                      </p>
                      <p>
                        <b>Price</b>: ${product.price}
                      </p>
                      <p>
                        <b>Category</b>: {product.category}
                      </p>
                      <p>
                        <b>Stock</b>: {product.stock}
                      </p>
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
