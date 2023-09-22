const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolvers");
require("dotenv").config({ path: ".env" });

async function startServer() {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("The database is connected");

    const serverApollo = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await serverApollo.listen();
    console.log(`Server ready in the URL ${url}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

startServer();
