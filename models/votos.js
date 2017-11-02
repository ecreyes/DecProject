"use strict";

module.exports = function(sequelize, DataTypes) {
    var Votos =
        sequelize.define("votos", {

            idUsuario: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'usuario_escenario',
                    key: 'idUsuario'

                },
                allowNull: false,
            },
            idEscenario: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'usuario_escenario',
                    key: 'idEscenario'

                },
                allowNull: false,
            },

            idDecision: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'decision',
                    key: 'idDecision'

                },
                allowNull: false,
            },
            prioridad: {
                type: DataTypes.INTEGER,
                allowNull: false
            }

        }, {

            timestamps: false
        });
    return Votos;
};
