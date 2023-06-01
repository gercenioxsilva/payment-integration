"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class subscription extends Model {
        static associate(models) {
            this.belongsTo(models["customer"], {
                foreignKey: "customerId",
            });
        }
    }
    subscription.init(
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            amount: DataTypes.DECIMAL,
            productId: DataTypes.STRING,
            dueDate: DataTypes.DATE,
            dueSinceDate: DataTypes.DATE,
            expirationDate: DataTypes.DATE,
            suspendedAt: DataTypes.DATE,
            currency: DataTypes.STRING,
            interval: DataTypes.STRING,
            status: DataTypes.STRING,
            customerId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "subscription",
        }
    );
    return subscription;
};
