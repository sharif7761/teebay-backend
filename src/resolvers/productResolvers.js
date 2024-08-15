const { AuthenticationError, UserInputError } = require('apollo-server-express');
const productService = require('../services/productService');
const { authenticate } = require('../utils/auth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const productResolvers = {
    Query: {
        // getProducts: async (_, __, { req }) => {
        //     const userId = verifyToken(req.headers.authorization);
        //     return await productService.getAllProducts(userId);
        // },

        //new
        userProducts: async (_, __, context) => {
            const user = authenticate(context);
            return prisma.product.findMany({
                where: { creatorId: user.userId },
            });
        },

        allProducts: async (_, __, context) => {
            const user = authenticate(context);
            if (!user) throw new AuthenticationError('You must be logged in.');
            return prisma.product.findMany();
        },

        boughtProducts: async (_, __, context) => {
            const user = authenticate(context);
            return prisma.productTransaction.findMany({
                where: {
                    userId: user.userId,
                    transactionType: 'PURCHASE',
                },
                include: {
                    product: true,
                },
            });
        },

        soldProducts: async (_, __, context) => {
            const user = authenticate(context);
            return prisma.product.findMany({
                where: {
                    creatorId: user.userId,
                    transactions: {
                        some: {
                            transactionType: 'PURCHASE',
                        },
                    },
                },
                include: {
                    transactions: true,
                },
            });
        },

        rentProducts: async (_, __, context) => {
            const user = authenticate(context);
            return prisma.productTransaction.findMany({
                where: {
                    userId: user.userId,
                    transactionType: 'RENT',
                },
                include: {
                    product: true,
                },
            });
        },

        lentProducts: async (_, __, context) => {
            const user = authenticate(context);
            return prisma.product.findMany({
                where: {
                    creatorId: user.userId,
                    transactions: {
                        some: {
                            transactionType: 'RENT',
                        },
                    },
                },
                include: {
                    transactions: true,
                },
            });
        },
    },
    Mutation: {
        createProduct: async (parent, { productInput }, context) => {
            const user = authenticate(context);
            return await productService.createProduct(user, productInput);
        },
        updateProduct: async (parent, { id, productInput }, context) => {
            const user = authenticate(context);
            const product = await productService.updateProduct(id, user.userId, productInput);
            if (!product) {
                throw new Error('Product not found or not authorized');
            }
            return product;
        },
        deleteProduct: async (_, { id }, context) => {
            const user = authenticate(context);
            const deleted = await productService.deleteProduct(id, user.userId);
            if (!deleted) {
                throw new Error('Product not found or not authorized');
            }
            return true;
        },
        buyProduct: async (parent, { productId }, context) => {
            const user = authenticate(context);
            const product = await prisma.product.findUnique({ where: { id: Number(productId) } });
            if (!product) throw new Error('Product not found');

            return prisma.productTransaction.create({
                data: {
                    productId: Number(productId),
                    userId: user.userId,
                    transactionType: 'PURCHASE',
                    price: product.purchasePrice,
                },
            });
        },

        rentProduct: async (parent, { productId }, context) => {
            const user = authenticate(context);
            const product = await prisma.product.findUnique({ where: { id: Number(productId) } });
            if (!product) throw new Error('Product not found');

            return prisma.productTransaction.create({
                data: {
                    productId: Number(productId),
                    userId: user.userId,
                    transactionType: 'RENT',
                    price: product.rentPrice,
                },
            });
        },
    },
};

module.exports = productResolvers;