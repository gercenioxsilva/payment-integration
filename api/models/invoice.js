"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class invoice extends Model {
        static associate(models) {
            this.belongsTo(models["customer"], {
                foreignKey: "customerId",
            });
        }
    }
    invoice.init(
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            code: DataTypes.STRING,
            amount: DataTypes.DECIMAL,
            currency: DataTypes.STRING,
            url: DataTypes.STRING,
            pdf: DataTypes.STRING,
            customerId: DataTypes.INTEGER,
            status: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "invoice",
        }
    );
    return invoice;
};
