import { gql } from "@apollo/client";

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
