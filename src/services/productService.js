const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllProducts = async (userId) => {
    return await prisma.product.findMany({
        where: { userId },
        include: { user: true },
    });
};

const createProduct = async (user, productInput) => {
    const { title, description, purchasePrice, rentPrice, rentType, categories } = productInput;
    return await prisma.product.create({
        data: {
            title,
            description,
            purchasePrice,
            rentPrice,
            rentType,
            categories,
            creatorId: user.userId,
        }
    });
};

const updateProduct = async (id, userId, productInput) => {
    const product = await prisma.product.findUnique({ where: { id: Number(id) } });

    if (!product || product.creatorId !== userId) {
        return null;
    }

    const { title, description, purchasePrice, rentPrice, rentType, categories } = productInput;

    return await prisma.product.update({
        where: { id: Number(id) },
        data: {
            title,
            description,
            purchasePrice,
            rentPrice,
            rentType,
            categories,
        },

    });
};

const deleteProduct = async (id, userId) => {
    const product = await prisma.product.findUnique({ where: { id: Number(id) } });

    if (!product || product.creatorId !== userId) {
        return false;
    }

    await prisma.product.delete({ where: { id: Number(id) } });
    return true;
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};