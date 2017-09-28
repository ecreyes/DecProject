"use strict";

module.exports = function(sequelize, DataTypes) {
    var Sesion = sequelize.define("sesion", {
        titulo: {
        	type: DataTypes.STRING,
        	unique: true,
        	allowNull: false
        },
        escenario: {
        	type: DataTypes.STRING,
        	unique: true,
        	allowNull: false
        },
        descripcion: DataTypes.TEXT,
        miembros: DataTypes.INTEGER
 	}, {
        classMethods: {
        	associate: function(models){
        		Sesion.hasMany(models.objetivos)
        		Sesion.belongsToMany(models.usuario, {through: 'usuario_sesion'});
        	}

        }
    });
    return Sesion;
};
