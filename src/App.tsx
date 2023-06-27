import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProductList } from "./components/ProductList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductList />
    </QueryClientProvider>
  );
}

export default App;
