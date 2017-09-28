"use strict";

module.exports = function(sequelize, DataTypes) {
    var Decision = sequelize.define("decision", {
        nombre: {
        	type: DataTypes.STRING,
        	unique: true,
        	allowNull: false
        },
        mecanismo: DataTypes.TEXT,
        resultado: DataTypes.TEXT
        //timestamps: false
 	}, {
        /*classMethods: {
        	associate: function(models){
        		Sesion.hasMany(models.objetivos)
        		Sesion.belongsToMany(models.usuario, {through: 'usuario_sesion'});
        	}

        }*/
        timestamps: false
    });
    return Decision;
};
