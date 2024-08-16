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
  
  type ProductTransactions {
  id: ID!
  transactionType: String! 
}

  type Product {
    id: ID!
    title: String!
    description: String
    purchasePrice: Float!
    rentPrice: Float
    views: Float
    rentType: RentType
    categories: [Category!]!
    creator: User!
    transactions: [ProductTransactions!]!
  }

  input ProductInput {
    title: String!
    categories: [Category!]!
    description: String!
    purchasePrice: Float!
    rentPrice: Float!
    rentType: RentType!
    status: String
  }

  type Query {
    userProducts: [Product!]!
    allProducts: [Product!]!
    productDetails(id: ID!): Product!
    soldProducts: [Product!]!
    lentProducts: [Product!]!
  }

  type Mutation {
    createProduct(productInput: ProductInput): Product!
    updateProduct(id: ID!, productInput: ProductInput): Product!
    deleteProduct(id: ID!): Boolean!
  }
`;

module.exports = productTypeDefs;