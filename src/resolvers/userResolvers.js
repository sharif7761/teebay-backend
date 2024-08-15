const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
const userService = require('../services/userService');

const userResolvers = {
    Query: {
    },
    Mutation: {
        login: async (_, { email, password }) => {
            const user = await userService.findUserByEmail(email);
            if (!user) {
                throw new AuthenticationError('User does not exist');
            }
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) {
                throw new AuthenticationError('Password is incorrect');
            }
            const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '24h',
            });
            return { userId: user.id, token: token };
        },
        register: async (_, { registerInput }) => {
            const hashedPassword = await bcrypt.hash(registerInput.password, 12);
            const user = await userService.createUser({
                email: registerInput.email,
                password: hashedPassword,
                firstName: registerInput.firstName,
                lastName: registerInput.lastName,
                address: registerInput.address,
                phone: registerInput.phone,
            });
            return user;
        },
    },
};

module.exports = userResolvers;