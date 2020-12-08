require("dotenv").config();

module.exports = {
  schema: "./generated/schema.graphql",
  extensions: {
    endpoints: {
      default: {
        url: "http://localhost:3000/api/graphql",
        headers: { Authorization: process.env.LOCAL_API_TOKEN },
      },
    },
  },
};
