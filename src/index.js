const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const userTypeDefs = require('./typedefs/userTypeDefs');
const userResolvers = require('./resolvers/userResolvers');
const authenticate = require('./auth');

dotenv.config();

const app = express();

app.use(authenticate);

const server = new ApolloServer({
    typeDefs: [userTypeDefs],
    resolvers: [userResolvers],
    context: ({ req }) => {
        return { isAuth: req.isAuth, userId: req.userId };
    },
});

server.start().then(() => {
    server.applyMiddleware({ app });

    app.listen({ port: 4001 }, () =>
        console.log(`Server is running on http://localhost:4001${server.graphqlPath}`)
    );
});