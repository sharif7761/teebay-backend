const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
  }

  type AuthData {
    userId: ID!
    token: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    name: String
  }

  type Mutation {
    login(email: String!, password: String!): AuthData!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;

module.exports = userTypeDefs;