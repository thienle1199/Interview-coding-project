# Coding Project (React with TypeScript): Infinite Scrolling and Searchable Product List

You have been assigned a task to implement an infinite scrolling list of products in a **React project written in TypeScript**. The product data will be fetched from an API. Additionally, you need to provide a search functionality that allows users to search for products by name.

***Requirements***

**Using this [product api](https://dummyjson.com/docs/products) to implement the infinite scrolling list for display list of products.**

1. Each time the user **scrolls to the end of the list, fetch the next 20 products**.
2. **Display the list of products** with relevant information (e.g., name, price, image).
    1. Keep the design as simple as possible. Please note that the **design will not be evaluated.**
3. Implement an **input for searching product name** (using */products/search?q* ).
Whenever user typing, fetch data and update the product list.

**Your Task:**

Your task is to complete the implementation of the React component(s) necessary to achieve the above requirements. You are **free to use any additional libraries or tools as needed.**

Please **structure your code in a clean and maintainable manner**. It should demonstrate your understanding of React, TypeScript, API integration, and handling state updates efficiently.

## Getting Start
```
npm install && npm run dev
```

Libraries added:
```
"react-intersection-observer": "^9.5.1",
"react-query": "^3.39.3",
"usehooks-ts": "^2.9.1"
```
