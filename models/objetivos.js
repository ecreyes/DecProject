"use strict";

module.exports = function(sequelize, DataTypes) {
    var Objetivos = 
    sequelize.define("objetivos", {
    	id: {
    	    type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idSesion: {
		    type: DataTypes.INTEGER,
            primaryKey: true,
		    references: {
		      model: 'sesion',
              key: 'id'

		    },
		    allowNull: false,
		},
        titulo: {
        	type: DataTypes.STRING,
        	unique: true,
        	allowNull: false
        },
        descripcion: DataTypes.TEXT
    });
    return Objetivos;
};

