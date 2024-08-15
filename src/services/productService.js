const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllProducts = async (userId) => {
    return await prisma.product.findMany({
        where: { userId },
        include: { user: true },
    });
};

const createProduct = async (userId, productInput) => {
    const { title, description, purchasePrice, rentPrice, rentType, categories } = productInput;

    return await prisma.product.create({
        data: {
            title,
            description,
            purchasePrice,
            rentPrice,
            rentType,
            userId,
            categories,
        },
        include: { user: true },
    });
};

const updateProduct = async (id, userId, productInput) => {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product || product.userId !== userId) {
        return null;
    }

    const { title, description, purchasePrice, rentPrice, rentType, categories } = productInput;

    return await prisma.product.update({
        where: { id },
        data: {
            title,
            description,
            purchasePrice,
            rentPrice,
            rentType,
            categories,
        },
        include: { user: true },
    });
};

const deleteProduct = async (id, userId) => {
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product || product.userId !== userId) {
        return false;
    }

    await prisma.product.delete({ where: { id } });
    return true;
};

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};