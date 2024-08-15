const { AuthenticationError, UserInputError } = require('apollo-server-express');
const productService = require('../services/productService');
const { authenticate } = require('../utils/auth');

const productResolvers = {
    Query: {
        // getProducts: async (_, __, { req }) => {
        //     const userId = verifyToken(req.headers.authorization);
        //     return await productService.getAllProducts(userId);
        // },

        //new
        userProducts: async (_, __, { user }) => {
            if (!user) throw new AuthenticationError('You must be logged in.');
            return prisma.product.findMany({
                where: { creatorId: user.id },
            });
        },

        allProducts: async () => {
            return prisma.product.findMany();
        },

        boughtProducts: async (_, __, { user }) => {
            if (!user) throw new AuthenticationError('You must be logged in.');
            return prisma.productTransaction.findMany({
                where: {
                    userId: user.id,
                    transactionType: 'PURCHASE',
                },
                include: {
                    product: true,
                },
            });
        },

        soldProducts: async (_, __, { user }) => {
            if (!user) throw new AuthenticationError('You must be logged in.');
            return prisma.product.findMany({
                where: {
                    creatorId: user.id,
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

        rentProducts: async (_, __, { user }) => {
            if (!user) throw new AuthenticationError('You must be logged in.');
            return prisma.productTransaction.findMany({
                where: {
                    userId: user.id,
                    transactionType: 'RENT',
                },
                include: {
                    product: true,
                },
            });
        },

        lentProducts: async (_, __, { user }) => {
            if (!user) throw new AuthenticationError('You must be logged in.');
            return prisma.product.findMany({
                where: {
                    creatorId: user.id,
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
        deleteProduct: async (_, { id }, { req }) => {
            const userId = verifyToken(req.headers.authorization);
            const deleted = await productService.deleteProduct(id, userId);
            if (!deleted) {
                throw new Error('Product not found or not authorized');
            }
            return true;
        },
        buyProduct: async (_, { productId }, { user }) => {
            if (!user) throw new AuthenticationError('You must be logged in.');
            const product = await prisma.product.findUnique({ where: { id: productId } });
            if (!product) throw new Error('Product not found');

            return prisma.productTransaction.create({
                data: {
                    productId,
                    userId: user.id,
                    transactionType: 'PURCHASE',
                    quantity: 1,
                    price: product.purchasePrice,
                },
            });
        },

        rentProduct: async (_, { productId }, { user }) => {
            if (!user) throw new AuthenticationError('You must be logged in.');
            const product = await prisma.product.findUnique({ where: { id: productId } });
            if (!product) throw new Error('Product not found');

            return prisma.productTransaction.create({
                data: {
                    productId,
                    userId: user.id,
                    transactionType: 'RENT',
                    quantity: 1,
                    price: product.rentPrice,
                },
            });
        },
    },
};

module.exports = productResolvers;