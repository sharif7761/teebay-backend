const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    address: String
    email: String!
    phone: String
    createdAt: String!
    updatedAt: String!
  }

  type AuthData {
    userId: ID!
    token: String!
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    address: String
    email: String!
    phone: String
    password: String!
  }

  type Mutation {
    login(email: String!, password: String!): AuthData!
    register(registerInput: RegisterInput): User!
  }
`;

module.exports = userTypeDefs;