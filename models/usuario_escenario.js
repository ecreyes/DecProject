"use strict";

module.exports = function(sequelize, DataTypes) {
    var Usuario_escenario = sequelize.define("usuario_escenario", {
    	/*idUsuario: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'usuario',
                    key: 'idUsuario'

                },
                unique: true,
                allowNull: false,
            },
        idEscenario: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'escenario',
                    key: 'idEscenario'

                },
                unique: true,
                allowNull: false,
            },
        idSesion: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'escenario',
                    key: 'idSesion'

                },
                unique: true,
                allowNull: false,
            },*/
        
    }, {
    	 classMethods: {
            associate: function(models){
                //Usuario.hasMany(models.sesion, {foreignKey: 'idModerador'})
                Usuario_escenario.belongsToMany(models.decision, {through: 'votos'});
            }

        },
        timestamps: true
    });
    return Usuario_escenario;
};
