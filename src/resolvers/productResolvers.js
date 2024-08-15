const { AuthenticationError, UserInputError } = require('apollo-server-express');
const productService = require('../services/productService');
const { verifyToken } = require('../utils/auth');

const productResolvers = {
    Query: {
        getProducts: async (_, __, { req }) => {
            const userId = verifyToken(req.headers.authorization);
            return await productService.getAllProducts(userId);
        },
    },
    Mutation: {
        createProduct: async (_, { productInput }, { req }) => {
            const userId = verifyToken(req.headers.authorization);
            return await productService.createProduct(userId, productInput);
        },
        updateProduct: async (_, { id, productInput }, { req }) => {
            const userId = verifyToken(req.headers.authorization);
            const product = await productService.updateProduct(id, userId, productInput);
            if (!product) {
                throw new Error('Product not found or not authorized');
            }
            return product;
        },
        deleteProduct: async (_, { id }, { req }) => {
            const userId = verifyToken(req.headers.authorization);
            const deleted = await productService.deleteProduct(id, userId);
            if (!deleted) {
                throw new Error('Product not found or not authorized');
            }
            return true;
        },
    },
};

module.exports = productResolvers;