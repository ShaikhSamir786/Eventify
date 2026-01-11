import { gql } from "@apollo/client";

// User Mutations
export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      message
      success
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      message
      success
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      message
      success
      token
      user {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
      success
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      message
      success
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($input: ForgotPasswordInput!) {
    forgotPassword(input: $input) {
      message
      success
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      message
      success
    }
  }
`;

// Event Mutations
export const CREATE_EVENT = gql`
  mutation CreateEvent($input: EventInput!) {
    createEvent(input: $input) {
      message
      success
      event {
        id
        title
        description
        date
        location
        invitedEmails
        createdAt
      }
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($id: ID!, $input: UpdateEventInput!) {
    updateEvent(id: $id, input: $input) {
      message
      success
      event {
        id
        title
        description
        date
        location
        invitedEmails
        updatedAt
      }
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      message
      success
    }
  }
`;

export const INVITE_PARTICIPANTS = gql`
  mutation InviteParticipants($input: InviteParticipantsInput!) {
    inviteParticipants(input: $input) {
      message
      success
      event {
        id
        invitedEmails
      }
    }
  }
`;
