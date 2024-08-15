const { AuthenticationError, UserInputError } = require('apollo-server-express');
const productService = require('../services/productService');

const productResolvers = {
    Query: {
        getProducts: async (_, __, { userId }) => {
            if (!userId) {
                throw new AuthenticationError('Unauthenticated');
            }
            return await productService.getAllProducts(userId);
        },
    },
    Mutation: {
        createProduct: async (_, { productInput }, { userId }) => {
            if (!userId) {
                throw new AuthenticationError('Unauthenticated');
            }
            return await productService.createProduct(userId, productInput);
        },
        updateProduct: async (_, { id, productInput }, { userId }) => {
            if (!userId) {
                throw new AuthenticationError('Unauthenticated');
            }
            const product = await productService.updateProduct(id, userId, productInput);
            if (!product) {
                throw new UserInputError('Product not found or not authorized');
            }
            return product;
        },
        deleteProduct: async (_, { id }, { userId }) => {
            if (!userId) {
                throw new AuthenticationError('Unauthenticated');
            }
            const deleted = await productService.deleteProduct(id, userId);
            if (!deleted) {
                throw new UserInputError('Product not found or not authorized');
            }
            return true;
        },
    },
};

module.exports = productResolvers;