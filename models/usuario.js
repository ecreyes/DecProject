"use strict";

module.exports = function(sequelize, DataTypes) {
    var Usuario = sequelize.define("usuario", {
        idUsuario: {
    	    type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        username: {
        	type: DataTypes.STRING,
        	allowNull: false
        },
        password: {
        	type: DataTypes.STRING,
        	allowNull: true
        },
        email: {
        	type: DataTypes.STRING,
        	unique: false,
        	allowNull: true
        },
        registrado: DataTypes.BOOLEAN
    }, /*{
        classMethods: {
        	associate: function(models){
                //Usuario.hasMany(models.sesion, {foreignKey: 'idModerador'})
                Usuario.belongsToMany(models.escenario, {through: 'votos'});
        	}

        }
    }*/);
    return Usuario;
};

