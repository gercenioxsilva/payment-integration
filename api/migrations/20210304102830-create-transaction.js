"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("transaction", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            code: {
                type: Sequelize.STRING,
            },
            amount: {
                type: Sequelize.INTEGER,
            },
            currency: {
                type: Sequelize.STRING,
            },
            paymentMethodId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "payment-method",
                    key: "id",
                },
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
        await queryInterface.dropTable("transaction");
    },
};
