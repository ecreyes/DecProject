"use strict";

module.exports = function(sequelize, DataTypes) {
    var Objetivos = 
    sequelize.define("objetivos", {
    	/*foreign_id: {
		    type: DataTypes.INTEGER,
		    references: {
		      model: 'sesion',
		      key: 'id'
		    },
		  	unique: true,
		    allowNull: false,
		    //foreignKey: true
		},*/
        titulo: {
        	type: DataTypes.STRING,
        	unique: true,
        	allowNull: false
        },
        descripcion: DataTypes.TEXT	
    });
    return Objetivos;
};

