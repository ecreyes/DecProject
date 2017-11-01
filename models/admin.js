"use strict";

module.exports = function(sequelize, DataTypes) {
    var Admin = sequelize.define("admin", {
        idAdmin: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        username: {
        	type: DataTypes.STRING,
        	unique: true,
        	allowNull: true
        },
        password: {
        	type: DataTypes.STRING,
        	allowNull: false
        }
    });
    return Admin;
};

