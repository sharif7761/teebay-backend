const { gql } = require('apollo-server-express');

const productTypeDefs = gql`
  enum RentType {
    PER_DAY
    PER_HOUR
  }

  enum Category {
    ELECTRONICS
    FURNITURE
    HOME_APPLIANCES
    SPORTING_GOODS
    OUTDOOR
    TOYS
  }

  type Product {
    id: ID!
    title: String!
    description: String
    purchasePrice: Float!
    rentPrice: Float
    rentType: RentType
    categories: [Category!]!
    user: User!
  }

  input ProductInput {
    title: String!
    description: String
    purchasePrice: Float!
    rentPrice: Float
    rentType: RentType
    categories: [Category!]!
  }

  type Query {
    getProducts: [Product!]!
  }

  type Mutation {
    createProduct(productInput: ProductInput): Product!
    updateProduct(id: ID!, productInput: ProductInput): Product!
    deleteProduct(id: ID!): Boolean!
  }
`;

module.exports = productTypeDefs;