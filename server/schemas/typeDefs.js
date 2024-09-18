const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    purchaseHistory: [Purchase] 
    createdEventHistory: [Event]
    cart: [Event]
    createdAt: String
    updatedAt: String
  }

type Purchase {  
    eventId: ID!
    name: String!
    date: String!
    url: String!
    purchaseDate: String!
  }

  type Event {
    id: ID!
    name: String!
    description: String!
    venue: String!
    location: String!
    eventDate: String!
    eventTime: String!
    tags: [String!]
    price: Float!
    createdBy: [User]
    createdAt: String
    updatedAt: String
url: String!
  }

  type Query {
    events: [Event]
    event(id: ID!): Event
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
    ): User

    addEvent(
     id: ID!
      name: String!
      description: String!
      venue: String!
      location: String!
      eventDate: String!
      eventTime: String!
      tags: [String!]
      price: Float!
      url: String!
    ): Event

    updateEvent(
      id: ID!
      name: String
      description: String
      venue: String
      location: String
      eventDate: String
      eventTime: String
      tags: [String!]
      price: Float
      url: String
    ): Event

    deleteEvent(
      id: ID!
    ): Event

    addToCart(
      userId: ID!, 
      eventId: ID!
    ): User

    removeFromCart(
      userId: ID!,
      eventId: ID!
    ): User

    purchaseCart(
      userId: ID!
    ): User
  }
`;

module.exports = typeDefs;
