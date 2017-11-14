"use strict";

module.exports = function(sequelize, DataTypes) {
    var Escenario = 
    sequelize.define("escenario", {
    	idEscenario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        idSesion: {
		    type: DataTypes.INTEGER,
            primaryKey: true,
		    references: {
		      model: 'sesion',
              key: 'idSesion'

		    },
		    allowNull: false,
		},
        titulo: {
        	type: DataTypes.STRING,
        	unique: false,
        	allowNull: false
        },
        descripcion: DataTypes.TEXT,
        estado: DataTypes.BOOLEAN

    }, /*{
        classMethods: {
            associate: function(models){
                //Usuario.hasMany(models.sesion, {foreignKey: 'idModerador'})
                Escenario.belongsToMany(models.usuario, {through: 'usuario_escenario'});
            }

        },

        timestamps: true
    }*/);
    return Escenario;
};

