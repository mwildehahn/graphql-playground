module.exports = {
  src: "./",
  schema: "./generated/schema.graphql",
  language: "typescript",
  exclude: [
    "**/node_modules/**",
    "**/__mocks__/**",
    "**/__generated__/**",
    "**/.next/**",
    "**/schema/**",
    "**/lib/**",
  ],
};
