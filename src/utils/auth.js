const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

// Function to get the user from the token
const getUser = (token) => {
    try {
        if (token) {
            return jwt.verify(token, process.env.JWT_SECRET);
        }
        return null;
    } catch (err) {
        return null;
    }
};
const authenticate = (context) => {
    const token = context.req.headers.authorization || '';
    const user = getUser(token.replace('Bearer ', ''));
    if (!user) throw new AuthenticationError('You must be logged in');
    return user;
};

module.exports = { getUser, authenticate };