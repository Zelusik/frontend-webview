import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import store from "./src/store";

const queryClient = new QueryClient();

function AppWrapper() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  );
}

export default AppWrapper;
