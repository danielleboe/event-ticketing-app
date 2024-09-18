import { gql } from "@apollo/client";

//get all events
export const GET_EVENTS = gql`
  query GetEvents {
    events {
      name
      description
      venue
      location
      eventDate
      eventTime
      tags
      price
    }
  }
`;

//get a single event
export const GET_EVENT = gql`
  query GetEvent($id: ID!) {
    event(id: $id) {
      id
      name
      description
      venue
      location
      eventDate
      eventTime
      tags
      price
    }
  }
`;


export const SEARCH_EVENTS = gql`
  query SearchEvents($keyword: String!) {
    searchEvents(keyword: $keyword) {
      id
      name
      url
      purchaseDate
    }
  }
`;

// Add a query to fetch the user's purchase history
export const GET_USER_PURCHASE_HISTORY = gql`
  query GetUserPurchaseHistory($id: ID!) {
    user(id: $id) {
      purchaseHistory {
        id
        name
        date
        url
        purchaseDate
      }
      createdEventHistory {
        id
        name
        date
        url
      }
    }
  }
`;

 
// Mutation to create a new event
export const ADD_EVENT = gql`
  mutation AddEvent(
    $name: String!
    $description: String!
    $venue: String!
    $location: String!
    $eventDate: String!
    $eventTime: String!
    $tags: [String]
    $price: Number!
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
      createdby
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
    $price: Number
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
      createdby
    }
  }
`;

// Mutation to delete an event
export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;
