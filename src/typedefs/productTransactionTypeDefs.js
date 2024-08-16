const { gql } = require('apollo-server-express');

const productTransactionTypeDefs = gql`
  enum TransactionType {
    PURCHASE
    RENT
  }
  type SoldProduct {
    id: ID!
    title: String!
    description: String
    purchasePrice: Float!
    rentPrice: Float
    rentType: RentType
    categories: [Category!]!
    views: Float
  }
  

  type ProductTransaction {
    id: ID!
    product: SoldProduct!
    user: User!
    transactionType: TransactionType!
    transactionDate: String!
    price: Float!
  }

  type Query {
    boughtProducts: [ProductTransaction!]!
    rentProducts: [ProductTransaction!]!
  }

  type Mutation {
    buyProduct(productId: ID!): ProductTransaction!
    rentProduct(productId: ID!): ProductTransaction!
  }
`;

module.exports = productTransactionTypeDefs;