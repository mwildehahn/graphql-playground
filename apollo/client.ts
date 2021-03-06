import { useMemo } from "react";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

import httpLink from "./http-link";

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient({ link }: { link?: ApolloLink } = {}) {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: link || httpLink(),
    cache: new InMemoryCache(),
    credentials: "same-origin",
  });
}

export function initializeApollo({
  initialState,
  link,
}: {
  initialState?: NormalizedCacheObject;
  link?: ApolloLink;
}) {
  const _apolloClient = apolloClient ?? createApolloClient({ link });

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState?: NormalizedCacheObject) {
  const store = useMemo(() => initializeApollo({ initialState }), [
    initialState,
  ]);
  return store;
}
