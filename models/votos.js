"use strict";

module.exports = function(sequelize, DataTypes) {
    var Votos =
        sequelize.define("votos", {

            idUsuario: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'usuario',
                    key: 'id'

                },
                unique: true,
                allowNull: false,
            },
            idObjetivo: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'objetivos',
                    key: 'id'

                },
                unique: true,
                allowNull: false,
            },

            idSesion: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'objetivos',
                    key: 'idSesion'

                },
                unique: true,
                allowNull: false,
            },
            idDecision: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                references: {
                    model: 'decision',
                    key: 'id'

                },
                unique: true,
                allowNull: false,
            }

        }, {

            timestamps: false
        });
    return Votos;
};
