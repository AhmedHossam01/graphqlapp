const express = require("express");
const gqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

app.use("/graphql", gqlHTTP({ schema, graphiql: true }));

app.listen(3000, () => {
  console.log("SERVER OK");
});
