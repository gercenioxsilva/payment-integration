"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("subscription", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            amount: {
                type: Sequelize.DECIMAL,
            },
            productId: {
                type: Sequelize.STRING,
            },
            dueDate: {
                type: Sequelize.DATE,
            },
            dueSinceDate: {
                type: Sequelize.DATE,
            },
            expirationDate: {
                type: Sequelize.DATE,
            },
            suspendedAt: {
                type: Sequelize.DATE,
            },
            currency: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.STRING,
            },
            interval: {
                type: Sequelize.STRING,
            },
            customerId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "customer",
                    key: "id",
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("subscription");
    },
};
