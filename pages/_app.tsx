import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/client";

import "tailwindcss/tailwind.css";

export default function App({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
