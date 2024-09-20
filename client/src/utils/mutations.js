import { gql } from '@apollo/client';

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
`;