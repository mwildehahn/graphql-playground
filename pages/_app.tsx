import { ReactRelayContext } from "react-relay";
import { useEnvironment } from "../lib/relay";
import { Suspense } from "react";

import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const environment = useEnvironment(pageProps.initialRecords);

  return (
    <Suspense
      fallback={<div className="container flex justify-center">loading...</div>}
    >
      <ReactRelayContext.Provider value={{ environment }}>
        <div>
          <a onClick={() => router.back()}>Back</a>
        </div>
        <Component {...pageProps} />
      </ReactRelayContext.Provider>
    </Suspense>
  );
}
