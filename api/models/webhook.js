"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class webhook extends Model {
        static associate(models) {}
    }
    webhook.init(
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            payload: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "webhook",
        }
    );
    return webhook;
};
