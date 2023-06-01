"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class transaction extends Model {
        static associate(models) {
            this.hasOne(models["payment-method"], {
                foreignKey: "paymentMethodId",
            });
            this.belongsTo(models["customer"], {
                foreignKey: "customerId",
            });
        }
    }
    transaction.init(
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            code:{ type: DataTypes.UUID },
            transactioncode: DataTypes.STRING,
            amount: DataTypes.INTEGER,
            currency: DataTypes.STRING,
            customerId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "transaction",
        }
    );
    return transaction;
};
