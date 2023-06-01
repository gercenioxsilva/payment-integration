"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("invoice", {
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
                type: Sequelize.DECIMAL,
            },
            url: {
                type: Sequelize.STRING,
            },
            pdf: {
                type: Sequelize.STRING,
            },
            currency: {
                type: Sequelize.STRING,
            },
            status: {
                type: Sequelize.STRING,
            },
            customerId: {
                type: Sequelize.INTEGER,
                allowNull: true,
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
        await queryInterface.dropTable("invoice");
    },
};
