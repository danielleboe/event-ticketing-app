import { gql } from "@apollo/client";

//Events
// get all events
export const GET_EVENTS = gql`
  query GetEvents {
    events {
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

// get a single event
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
      url
    }
  }
`;


export const SEARCH_EVENTS = gql`
  query SearchEvents($keyword: String!) {
    searchEvents(keyword: $keyword) {
      id
      name
      purchaseDate
    }
  }
`;


//cart and purchase
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



//Users
// get all users
export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      username
      email
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

//get a single user
export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      _id
      username
      email
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
// client/src/utils/queries.js
export const GET_USER_CART = gql`
  query GetUserCart($id: ID!) {
    user(id: $id) {
      cart {
        eventId {
          id
          name
          url
        }
        quantity
        price
      }
    }
  }
`;