const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const verifyToken = (authHeader) => {
    if (!authHeader) {
        throw new AuthenticationError('No token provided');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new AuthenticationError('Malformed token');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userId; // return userId
    } catch (error) {
        throw new AuthenticationError('Invalid or expired token');
    }
};

module.exports = { verifyToken };