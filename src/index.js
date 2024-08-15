const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const userTypeDefs = require('./typedefs/userTypeDefs');
const productTypeDefs = require('./typedefs/productTypeDefs');
const productTransactionTypeDefs = require('./typedefs/productTransactionTypeDefs');
const userResolvers = require('./resolvers/userResolvers');
const productResolvers = require('./resolvers/productResolvers');

dotenv.config();

const app = express();

const server = new ApolloServer({
    typeDefs: [userTypeDefs, productTypeDefs, productTransactionTypeDefs],
    resolvers: [userResolvers, productResolvers],
    context: ({ req }) => ({ req }),
});

server.start().then(() => {
    server.applyMiddleware({ app });

    app.listen({ port: 4001 }, () =>
        console.log(`Server is running on http://localhost:4001${server.graphqlPath}`)
    );
});