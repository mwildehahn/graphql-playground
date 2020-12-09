import { ReactRelayContext } from "react-relay";
import { useEnvironment } from "../lib/relay";

import "tailwindcss/tailwind.css";
import { Suspense } from "react";

export default function App({ Component, pageProps }) {
  const environment = useEnvironment(pageProps.initialRecords);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <ReactRelayContext.Provider value={{ environment }}>
        <Component {...pageProps} />
      </ReactRelayContext.Provider>
    </Suspense>
  );
}
