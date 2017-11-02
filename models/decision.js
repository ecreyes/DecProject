"use strict";

module.exports = function(sequelize, DataTypes) {
    var Decision = sequelize.define("decision", {
        idDecision: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        nombre: {
        	type: DataTypes.STRING,
        	unique: true,
        	allowNull: false
        },
        mecanismo: DataTypes.TEXT,
        resultado: DataTypes.TEXT
 	}, {
         /*classMethods: {
            associate: function(models){
                //Usuario.hasMany(models.sesion, {foreignKey: 'idModerador'})
                Decision.belongsToMany(models.usuario_escenario, {through: 'votos'});
            }

        },*/
        timestamps: false
    });
    return Decision;
};
