const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mockServer } = require('@graphql-tools/mock');
const { typeDefs } = require('./schemas'); // Import your typeDefs

const mocks = {
  Query: () => ({
    events: () => [
      { id: "1", name: "Concert A", location: "Venue A", date: "2024-09-30", price: 49.99 },
      { id: "2", name: "Concert B", location: "Venue B", date: "2024-10-05", price: 59.99 },
      { id: "3", name: "Concert C", location: "Venue C", date: "2024-10-10", price: 39.99 },
      { id: "4", name: "Concert D", location: "Venue D", date: "2024-10-15", price: 29.99 },
    ],
  }),
};

const schema = makeExecutableSchema({ typeDefs });

const server = new ApolloServer({
  schema: mockServer(schema, { mocks }),
});

server.listen().then(({ url }) => {
  console.log(`Mock GraphQL server ready at ${url}`);
});
