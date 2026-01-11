import { gql } from "@apollo/client";

// User Queries
export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      email
      firstName
      lastName
    }
  }
`;

// Event Queries
export const GET_MY_EVENTS = gql`
  query GetMyEvents {
    myEvents {
      id
      title
      description
      date
      location
      createdBy {
        id
        firstName
        lastName
        email
      }
      invitedEmails
      createdAt
      updatedAt
    }
  }
`;

export const GET_INVITED_EVENTS = gql`
  query GetInvitedEvents {
    invitedEvents {
      id
      title
      description
      date
      location
      createdBy {
        id
        firstName
        lastName
        email
      }
      invitedEmails
      createdAt
      updatedAt
    }
  }
`;

export const GET_EVENT_BY_ID = gql`
  query GetEventById($id: ID!) {
    event(id: $id) {
      id
      title
      description
      date
      location
      createdBy {
        id
        firstName
        lastName
        email
      }
      invitedEmails
      createdAt
      updatedAt
    }
  }
`;
