"use strict";

module.exports = function(sequelize, DataTypes) {
    var Usuario = sequelize.define("usuario", {
        username: {
        	type: DataTypes.STRING,
        	unique: true,
        	allowNull: false
        },
        password: {
        	type: DataTypes.STRING,
        	allowNull: false
        },
        email: {
        	type: DataTypes.STRING,
        	unique: true,
        	allowNull: false
        },
        admin: DataTypes.BOOLEAN
    }, {
        classMethods: {
        	associate: function(models){
                Usuario.hasMany(models.sesion, {foreignKey: 'idCreador'})
        		Usuario.belongsToMany(models.sesion, {through: 'usuario_sesion'});
        	}

        }
    });
    return Usuario;
};

