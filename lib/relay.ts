import { useMemo } from "react";
import {
  Environment,
  Network,
  RecordSource,
  Store,
  RequestParameters,
  Variables,
  CacheConfig,
  UploadableMap,
  ObservableFromValue,
  GraphQLResponse,
} from "relay-runtime";

let relayEnvironment: Environment;

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise
async function fetchQuery(request: RequestParameters, variables: Variables) {
  const response = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
    credentials: "same-origin",
  });

  return await response.json();
}

export type FetchFunction = (
  request: RequestParameters,
  variables: Variables,
  cacheConfig: CacheConfig,
  uploadables?: UploadableMap | null
) => ObservableFromValue<GraphQLResponse>;

function createEnvironment(initialRecords: any): Environment {
  return new Environment({
    // Create a network layer from the fetch function
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource(initialRecords)),
  });
}

export function initEnvironment(initialRecords?: any): Environment {
  // Create a network layer from the fetch function
  const environment = relayEnvironment ?? createEnvironment(initialRecords);

  // If your page has Next.js data fetching methods that use Relay, the initial records
  // will get hydrated here
  if (initialRecords) {
    environment.getStore().publish(new RecordSource(initialRecords));
  }
  // For SSG and SSR always create a new Relay environment
  if (typeof window === "undefined") return environment;
  // Create the Relay environment once in the client
  if (!relayEnvironment) relayEnvironment = environment;

  return relayEnvironment;
}

export function useEnvironment(initialRecords: any): Environment {
  const store = useMemo(() => initEnvironment(initialRecords), [
    initialRecords,
  ]);
  return store;
}
