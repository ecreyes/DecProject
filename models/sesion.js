"use strict";

module.exports = function(sequelize, DataTypes) {
    var Sesion = sequelize.define("sesion", {
        idSesion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        titulo: {
        	type: DataTypes.STRING,
        	unique: true,
        	allowNull: false
        },
        idModerador: {
            type: DataTypes.INTEGER,
            references: {
              model: 'usuario',
              key: 'idUsuario'

            },
            allowNull: false
        },
        descripcion: DataTypes.TEXT,
        miembros: DataTypes.INTEGER
 	}, {
            
        timestamps: true
    });
    return Sesion;
};
