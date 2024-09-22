// Mutation to create a new event
import { gql } from '@apollo/client';



//USERS AUTH
export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        _id
        username
        email
      }
      token
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

///EVENTS

export const ADD_EVENT = gql`
  mutation AddEvent(
    $name: String!
    $description: String!
    $venue: String!
    $location: String!
    $eventDate: String!
    $eventTime: String!
    $tags: [String!]
    $price: Float!
    $url: String
  ) {
    addEvent(
      name: $name
      description: $description
      venue: $venue
      location: $location
      eventDate: $eventDate
      eventTime: $eventTime
      tags: $tags
      price: $price
      url: $url
    ) {
      id
      name
      description
      venue
      location
      eventDate
      eventTime
      tags
      price
      url
    }
  }
`;



// Mutation to update an existing event
export const UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!
    $name: String
    $description: String
    $venue: String
    $location: String
    $eventDate: String
    $eventTime: String
    $tags: [String]
    $price: Float
    $url: String
  ) {
    updateEvent(
      id: $id
      name: $name
      description: $description
      venue: $venue
      location: $location
      eventDate: $eventDate
      eventTime: $eventTime
      tags: $tags
      price: $price
      url: $url
    ) {
      id
      name
      description
      venue
      location
      eventDate
      eventTime
      tags
      price
      url
    }
  }
`;


// Mutation to delete an event
export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;
  
//Cart & Purchase

export const ADD_TO_CART = gql`
  mutation AddToCart($eventId: ID!, $quantity: Int!) {
    addToCart(eventId: $eventId, quantity: $quantity) {
      id
      tickets {
        eventId
        quantity
      }
    }
  }
`
