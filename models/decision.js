"use strict";

module.exports = function(sequelize, DataTypes) {
    var Decision = sequelize.define("decision", {
        nombre: {
        	type: DataTypes.STRING,
        	unique: true,
        	allowNull: false
        },
        idCreador: {
            type: DataTypes.INTEGER,
            references: {
                model: 'usuario',
                key: 'id'
            },
            allowNull: false,
        },
        mecanismo: DataTypes.TEXT,
        resultado: DataTypes.TEXT
 	}, {

        timestamps: false
    });
    return Decision;
};
