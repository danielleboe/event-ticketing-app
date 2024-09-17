const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Event {
    id: ID!
    name: String!
    date: String!
    location: String!
  }

  type Query {
    events: [Event]
    searchEvents(keyword: String!): [Event]
  }
`;

module.exports = typeDefs;
