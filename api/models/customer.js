"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class customer extends Model {
        static associate(models) {
            this.hasOne(models["customer-parameter"]);
            this.hasMany(models["subscription"]);
            this.hasMany(models["transaction"]);
            this.hasMany(models["invoice"]);
        }
    }
    customer.init(
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING,
            email: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "customer",
        }
    );
    return customer;
};
