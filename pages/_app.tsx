import { ReactRelayContext } from "react-relay";
import { useEnvironment } from "../lib/relay";
import { Suspense } from "react";

import "tailwindcss/tailwind.css";

export default function App({ Component, pageProps }) {
  const environment = useEnvironment(pageProps.initialRecords);

  return (
    <Suspense
      fallback={<div className="container flex justify-center">loading...</div>}
    >
      <ReactRelayContext.Provider value={{ environment }}>
        <Component {...pageProps} />
      </ReactRelayContext.Provider>
    </Suspense>
  );
}
