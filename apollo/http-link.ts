import { HttpLink } from "@apollo/client/link/http";

export default function httpLink() {
  return new HttpLink({
    uri: "/api/graphql",
    credentials: "same-origin",
  });
}
