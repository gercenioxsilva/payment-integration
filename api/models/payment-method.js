"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class paymentMethod extends Model {
        static associate(models) {
            this.belongsTo(models["subscription"]);
            this.belongsTo(models["transaction"]);
        }
    }
    paymentMethod.init(
        {
            description: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "payment-method",
        }
    );
    return paymentMethod;
};
