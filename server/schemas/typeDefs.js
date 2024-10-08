const typeDefs = `
  type Users {
    _id: ID!
    username: String!
    email: String!
    password: String!
    purchaseHistory: [Purchase]
    createdEventHistory: [Event]
    cart: [Cart]
    createdAt: String
    updatedAt: String
  }

type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    purchaseHistory: [Purchase]
    createdEventHistory: [Event]
    cart: [Cart]
    createdAt: String
    updatedAt: String
  }

type Cart {
  eventId: ID!
  quantity: Int!
}


type Purchase {  
    eventId: ID!
    name: String!
    date: String!
    url: String,
    quantity: Int!
    purchaseDate: String!
  }

  type CartItem {
  eventId: Event!
  quantity: Int!
  price: Float!
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
    createdBy: User # Changed from [User] to User, assuming one user creates an event
    createdAt: String
    updatedAt: String
    url: String
  }

  type AuthPayload {
    token: String
    user: User
  }
  
  type Auth {
    token: String!
    user: User!
  }

  type Query {
    events: [Event]
    event(id: ID!): Event
    users: [User]
    user(id: ID!): User
  }


  type Query {
    users: [User]
    user(id: ID!): User
     events: [Event]
    event(id: ID!): Event
    userCart(id: ID!): [CartItem]
  }


  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
    ): User

    createUser(
      username: String!
      email: String!
      password: String!
    ): AuthPayload

    loginUser(
      email: String!, 
      password: String!
      ): AuthPayload

    addEvent(
      name: String!
      description: String!
      venue: String!
      location: String!
      eventDate: String!
      eventTime: String!
      tags: [String!]
      price: Float!
      url: String
    ): Event

    updateEvent(
      id: ID!
      name: String
      description: String
      venue: String
      location: String
      eventDate: String
      eventTime: String
      tags: [String]
      price: Float
      url: String
    ): Event

    deleteEvent(
      eventId: ID!
    ): Event
    

    addToCart(
      userId: ID!, 
      eventId: ID!, 
      quantity: Int!
    ): Users

    removeFromCart(
      id: ID!
      eventId: ID!
    ): User

    purchaseCart(
      id: ID!
    ): User

  }

type Mutation {
  createCheckoutSession(cart: [CartInput!]!): CheckoutSession!
}

input CartInput {
  eventName: String!
  price: Float!
  quantity: Int!
}

input OrderInput {
  userId: ID!
  items: [CartInput]!
  totalAmount: Float!
  paymentStatus: String!
}

type Order {
  id: ID!
  userId: ID!
  items: [CartItem]!
  totalAmount: Float!
  paymentStatus: String!
}

 input CartItemInput {
    price: String!
    quantity: Int!
  }

  type CheckoutSession {
    sessionId: String!
  }
  
type Mutation {
  saveOrder(
  orderInput: OrderInput!
  ): Order
}


`;



module.exports = typeDefs;
