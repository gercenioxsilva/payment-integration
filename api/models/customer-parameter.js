"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class customerParameter extends Model {
        static associate(models) {
            this.belongsTo(models["customer"], {
                foreignKey: "customerId",
            });
        }
    }
    customerParameter.init(
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            key: DataTypes.STRING,
            value: DataTypes.STRING,
            customerId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "customer-parameter",
        }
    );
    return customerParameter;
};
